import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SeriesVerticalComponent, D0Types, formatLabel } from '@swimlane/ngx-charts';

function escapeLabel(label: any): string {
  return label.toLocaleString().replace(/[&'`"<>]/g, match => {
    return {
      '&': '&amp;',
      '\'': '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match];
  });
}

@Component({
  selector: 'g[custom-charts-series-vertical]',
  templateUrl: './custom-charts-series-vertical.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CustomChartsSeriesVerticalComponent extends SeriesVerticalComponent {
  update(): void {
    this.updateTooltipSettings();
    let width;
    if (this.series.length) {
      width = this.xScale.bandwidth();
    }
    width = Math.round(width);
    const yScaleMin = Math.max(this.yScale.domain()[0], 0);

    const d0 = {
      [D0Types.positive]: 0,
      [D0Types.negative]: 0
    };
    let d0Type = D0Types.positive;

    let total;
    if (this.type === 'normalized') {
      total = this.series.map(d => d.value).reduce((sum, d) => sum + d, 0);
    }
    this.bars = this.series.reduce((acc: any[], group) => {
      const x = this.xScale(this.getLabel(group));
      d0[d0Type] = 0;
      return acc.concat(acc, group.extra.stacks.map((d, index) => {
        let value = d.value;
        const label = this.getLabel(d);
        const formattedLabel = formatLabel(label);
        const roundEdges = value && this.roundEdges && this.type !== 'grouped-stacked'
          || (this.roundEdges && this.type === 'grouped-stacked' && index === group.extra.stacks.length - 1);
        d0Type = value > 0 ? D0Types.positive : D0Types.negative;

        const bar: any = {
          value,
          label,
          roundEdges,
          data: d,
          width,
          formattedLabel,
          height: 0,
          x: 0,
          y: 0
        };

        // if (this.type === 'standard') {
        //   bar.height = Math.abs(this.yScale(value) - this.yScale(yScaleMin));
        //   bar.x = this.xScale(label);

        //   if (value < 0) {
        //     bar.y = this.yScale(0);
        //   } else {
        //     bar.y = this.yScale(value);
        //   }
        // } else if (this.type === 'stacked') {
        const offset0 = d0[d0Type];
        const offset1 = offset0 + value;
        d0[d0Type] += value;

        bar.height = this.yScale(offset0) - this.yScale(offset1);
        bar.x = x;
        bar.y = this.yScale(offset1);
        bar.offset0 = offset0;
        bar.offset1 = offset1;
        // } else if (this.type === 'normalized') {
        //   let offset0 = d0[d0Type];
        //   let offset1 = offset0 + value;
        //   d0[d0Type] += value;

        //   if (total > 0) {
        //     offset0 = (offset0 * 100) / total;
        //     offset1 = (offset1 * 100) / total;
        //   } else {
        //     offset0 = 0;
        //     offset1 = 0;
        //   }

        //   bar.height = this.yScale(offset0) - this.yScale(offset1);
        //   bar.x = 0;
        //   bar.y = this.yScale(offset1);
        //   bar.offset0 = offset0;
        //   bar.offset1 = offset1;
        //   value = (offset1 - offset0).toFixed(2) + '%';
        // }

        // if (this.colors.scaleType === 'ordinal') {
        //   bar.color = this.colors.getColor(label);
        // } else {
        //   if (this.type === 'standard') {
        //     bar.color = this.colors.getColor(value);
        //     bar.gradientStops = this.colors.getLinearGradientStops(value);
        //   } else {
        bar.color = this.colors.getColor(bar.offset1);
        // bar.gradientStops = this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
        //   }
        // }

        let tooltipLabel = formattedLabel;
        bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
        if (this.seriesName) {
          tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
          bar.data.series = this.seriesName;
          bar.ariaLabel = this.seriesName + ' ' + bar.ariaLabel;
        }

        bar.tooltipText = this.tooltipDisabled
          ? undefined
          : `
          <span class="tooltip-label">${escapeLabel(tooltipLabel)}</span>
          <span class="tooltip-val">${value.toLocaleString()}</span>
        `;

        return bar;
      }));
    }, []);
    // this.bars = this.series.map((d, index) => {
    //   let value = d.value;
    //   const label = this.getLabel(d);
    //   const formattedLabel = formatLabel(label);
    //   const roundEdges = value && this.roundEdges && this.type !== 'stacked'
    //     || (this.roundEdges && this.type === 'stacked' && index === this.series.length - 1);
    //   d0Type = value > 0 ? D0Types.positive : D0Types.negative;

    //   const bar: any = {
    //     value,
    //     label,
    //     roundEdges,
    //     data: d,
    //     width,
    //     formattedLabel,
    //     height: 0,
    //     x: 0,
    //     y: 0
    //   };

    //   if (this.type === 'standard') {
    //     bar.height = Math.abs(this.yScale(value) - this.yScale(yScaleMin));
    //     bar.x = this.xScale(label);

    //     if (value < 0) {
    //       bar.y = this.yScale(0);
    //     } else {
    //       bar.y = this.yScale(value);
    //     }
    //   } else if (this.type === 'stacked') {
    //     const offset0 = d0[d0Type];
    //     const offset1 = offset0 + value;
    //     d0[d0Type] += value;

    //     bar.height = this.yScale(offset0) - this.yScale(offset1);
    //     bar.x = 0;
    //     bar.y = this.yScale(offset1);
    //     bar.offset0 = offset0;
    //     bar.offset1 = offset1;
    //   } else if (this.type === 'normalized') {
    //     let offset0 = d0[d0Type];
    //     let offset1 = offset0 + value;
    //     d0[d0Type] += value;

    //     if (total > 0) {
    //       offset0 = (offset0 * 100) / total;
    //       offset1 = (offset1 * 100) / total;
    //     } else {
    //       offset0 = 0;
    //       offset1 = 0;
    //     }

    //     bar.height = this.yScale(offset0) - this.yScale(offset1);
    //     bar.x = 0;
    //     bar.y = this.yScale(offset1);
    //     bar.offset0 = offset0;
    //     bar.offset1 = offset1;
    //     value = (offset1 - offset0).toFixed(2) + '%';
    //   }

    //   if (this.colors.scaleType === 'ordinal') {
    //     bar.color = this.colors.getColor(label);
    //   } else {
    //     if (this.type === 'standard') {
    //       bar.color = this.colors.getColor(value);
    //       bar.gradientStops = this.colors.getLinearGradientStops(value);
    //     } else {
    //       bar.color = this.colors.getColor(bar.offset1);
    //       bar.gradientStops = this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
    //     }
    //   }

    //   let tooltipLabel = formattedLabel;
    //   bar.ariaLabel = formattedLabel + ' ' + value.toLocaleString();
    //   if (this.seriesName) {
    //     tooltipLabel = `${this.seriesName} • ${formattedLabel}`;
    //     bar.data.series = this.seriesName;
    //     bar.ariaLabel = this.seriesName + ' ' + bar.ariaLabel;
    //   }

    //   bar.tooltipText = this.tooltipDisabled
    //     ? undefined
    //     : `
    //     <span class="tooltip-label">${escapeLabel(tooltipLabel)}</span>
    //     <span class="tooltip-val">${value.toLocaleString()}</span>
    //   `;

    //   return bar;
    // });

    this.updateDataLabels();
  }
}
