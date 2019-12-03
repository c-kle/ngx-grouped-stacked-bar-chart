import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  data = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 40632,
          extra: {
            stacks: [
              {
                name: '1',
                value: 20316
              },
              {
                name: '2',
                value: 20316
              }
            ]
          }
        },
        {
          name: '2000',
          value: 36953,
          extra: {
            stacks: [
              {
                name: '1',
                value: 18450
              },
              {
                name: '2',
                value: 18450
              }
            ]
          }
        },
        {
          name: '1990',
          value: 31476,
          extra: {
            stacks: [
              {
                name: '1',
                value: 15074
              },
              {
                name: '2',
                value: 15074
              }
            ]
          }
        }
      ]
    },
    {
      name: 'United States',
      series: [
        {
          name: '2010',
          value: 0,
          extra: {
            stacks: [
              {
                name: '1',
                value: 0
              },
              {
                name: '2',
                value: 0
              }
            ]
          }
        },
        {
          name: '2000',
          value: 45986,
          extra: {
            stacks: [
              {
                name: '1',
                value: 22593
              },
              {
                name: '2',
                value: 22593
              }
            ]
          }
        },
        {
          name: '1990',
          value: 37060,
          extra: {
            stacks: [
              {
                name: '1',
                value: 17530
              },
              {
                name: '2',
                value: 17530
              }
            ]
          }
        }
      ]
    },
    // {
    //   name: 'France',
    //   series: [
    //     {
    //       name: '2010',
    //       value: 36745,
    //       extra: {
    //         code: 'fr'
    //       }
    //     },
    //     {
    //       name: '2000',
    //       value: 34774,
    //       extra: {
    //         code: 'fr'
    //       }
    //     },
    //     {
    //       name: '1990',
    //       value: 29476,
    //       extra: {
    //         code: 'fr'
    //       }
    //     }
    //   ]
    // },
    // {
    //   name: 'United Kingdom',
    //   series: [
    //     {
    //       name: '2010',
    //       value: 36240,
    //       extra: {
    //         code: 'uk'
    //       }
    //     },
    //     {
    //       name: '2000',
    //       value: 32543,
    //       extra: {
    //         code: 'uk'
    //       }
    //     },
    //     {
    //       name: '1990',
    //       value: 26424,
    //       extra: {
    //         code: 'uk'
    //       }
    //     }
    //   ]
    // }
  ];
}
