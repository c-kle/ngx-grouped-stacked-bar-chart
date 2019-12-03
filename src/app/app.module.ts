import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupedStackedBarChartComponent } from './grouped-stacked-bar-chart/grouped-stacked-bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomChartsSeriesVerticalComponent } from './grouped-stacked-bar-chart/custom-charts-series-vertical/custom-charts-series-vertical.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupedStackedBarChartComponent,
    CustomChartsSeriesVerticalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
