import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import * as filsaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly groupNb = 10;
  private readonly subGroupNb = 3;
  private count = 0;
  private _data: any[];
  public get data(): any[] {
    return this._data;
  }
  constructor() {
    this.randomValues();
  }
  readonly toPng = () => {
    const svg = document
      .getElementById('graph')
      .querySelector('.ngx-charts');
    html2canvas(svg as HTMLElement).then(canvas => {
      canvas.toBlob(blob => filsaver.saveAs(blob, 'test.png'));
    });
  }
  readonly randomValues = () => {
    const groupsNb = this.groupNb;
    const subGroupsNb = this.subGroupNb;
    const data = [];

    for (let i = 0; i < groupsNb; i++) {
      const group = {
        name: `group_${i}`,
        series: []
      };
      for (let j = 0; j < subGroupsNb; j++) {
        const stacks = [
          this.getRandomGraphData(`stack_1`),
          this.getRandomGraphData(`stack_2`),
        ];
        if (this.count % 2) {
          stacks[0].value = 0;
          stacks[1].value = 0;
        }
        const subGroup = this.getRandomGraphData(`subGroup_${j}`, stacks[0].value + stacks[0].value);
        subGroup.extra.stacks = stacks;
        group.series.push(subGroup);
      }
      data.push(group);
    }
    this._data = data;
    this.count++;
  }

  private readonly getRandomGraphData = (name: string, value: number = undefined) => {
    return {
      name,
      value: value !== undefined ? value : Math.random() * 5000,
      extra: { stacks: [] }
    };
  }
}
