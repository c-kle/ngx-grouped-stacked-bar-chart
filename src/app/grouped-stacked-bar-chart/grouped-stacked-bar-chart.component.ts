import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BarVertical2DComponent } from '@swimlane/ngx-charts';
import { trigger, transition, style, animate } from '@angular/animations';
import { scaleBand, scaleLinear } from 'd3-scale';

@Component({
  selector: 'app-grouped-stacked-bar-chart',
  templateUrl: './grouped-stacked-bar-chart.component.html',
  styleUrls: ['./grouped-stacked-bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':leave', [
        style({
          opacity: 1,
          transform: '*'
        }),
        animate(500, style({ opacity: 0, transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class GroupedStackedBarChartComponent extends BarVertical2DComponent implements OnInit {

  private _displayGrid: boolean;
  public get displayGrid(): boolean {
    return this._displayGrid;
  }
  private valueDomain: any[];

  ngOnInit(): void {
  }

  update(): void {
    super.update();
    this._displayGrid = this.results && this.results.length;
  }

  getXScale(): any {
    const spacing = this.groupDomain.length / (this.dims.width / this.barPadding + 1);
    return scaleBand()
      .rangeRound([0, this.dims.width])
      .paddingInner(spacing)
      .domain(this.groupDomain);
  }

  getYScale(): any {
    const scale = scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.valueDomain);
    return this.roundDomains ? scale.nice() : scale;
  }

  // getValueDomain() {
  //   const domain = [];
  //   let smallest = 0;
  //   let biggest = 0;
  //   for (const group of this.results) {
  //     let smallestSum = 0;
  //     let biggestSum = 0;
  //     for (const d of group.series) {
  //       if (d.value < 0) {
  //         smallestSum += d.value;
  //       } else {
  //         biggestSum += d.value;
  //       }
  //       smallest = d.value < smallest ? d.value : smallest;
  //       biggest = d.value > biggest ? d.value : biggest;
  //     }
  //     domain.push(smallestSum);
  //     domain.push(biggestSum);
  //   }
  //   domain.push(smallest);
  //   domain.push(biggest);

  //   const min = Math.min(0, ...domain);
  //   const max = this.yScaleMax ? Math.max(this.yScaleMax, ...domain) : Math.max(...domain);
  //   return [min, max];
  // }
}
