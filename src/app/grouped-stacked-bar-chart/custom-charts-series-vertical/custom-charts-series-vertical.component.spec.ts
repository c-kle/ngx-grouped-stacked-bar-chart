import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomChartsSeriesVerticalComponent } from './custom-charts-series-vertical.component';

describe('CustomChartsSeriesVerticalComponent', () => {
  let component: CustomChartsSeriesVerticalComponent;
  let fixture: ComponentFixture<CustomChartsSeriesVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomChartsSeriesVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomChartsSeriesVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
