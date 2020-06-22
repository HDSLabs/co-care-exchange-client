import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, combineLatest } from 'rxjs';
import * as c3 from 'c3';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MetricsComponent implements OnInit, AfterViewInit, OnDestroy {
  chartReceived;
  chartShared;
  isAlive: boolean;
  isMobile$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  isDesktop$: Observable<boolean>;
  chartResizePayload$: Observable<{ width: number; height: number }>;
  constructor(private router: Router, private breakPointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.isAlive = true;
    window.scrollTo(0, 0);
    this.isMobile$ = this.breakPointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      takeWhile(() => this.isAlive)
    );

    this.isTablet$ = this.breakPointObserver.observe(Breakpoints.Tablet).pipe(
      map((result) => result.matches),
      takeWhile(() => this.isAlive)
    );

    this.isDesktop$ = this.breakPointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.Web]).pipe(
      map((result) => result.matches),
      takeWhile(() => this.isAlive)
    );
  }

  close() {
    this.router.navigate(['/dashboard']);
  }

  ngAfterViewInit() {
    const receivedData = ['data1', 3, 20, 10, 40, 15, 25];
    this.chartReceived = this.generateChart('chartReceived', receivedData);

    const sharedData = ['data1', 10, 4.5, 0, 6, 8.5, 5.5];
    this.chartShared = this.generateChart('chartShared', sharedData);

    this.chartResizePayload$ = combineLatest([this.isMobile$, this.isTablet$, this.isDesktop$]).pipe(
      map(([isMobile, isTablet, isDesktop]) => {
        const adjustedDeviceWidth = window.innerWidth - 32;
        if (isMobile) {
          return {
            width: adjustedDeviceWidth || 350,
            height: adjustedDeviceWidth || 350,
          };
        }
        if (isTablet) {
          return { width: 650, height: 650 };
        }
        if (isDesktop) {
          return { width: 960, height: 960 };
        }
        return { width: adjustedDeviceWidth, height: adjustedDeviceWidth };
      }),
      takeWhile(() => this.isAlive)
    );

    this.chartResizePayload$.subscribe((payLoad) => {
      this.chartReceived.resize(payLoad);
      this.chartShared.resize(payLoad);
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  generateChart(chartId, data) {
    return c3.generate({
      bindto: '#' + chartId,
      data: {
        columns: [data],
        type: 'bar',
        labels: true,
        colors: {
          data1: '#00bcd4',
        },
      },
      bar: {
        width: {
          ratio: 0.3, // this makes bar width 50% of length between ticks
        },
      },
      size: {
        height: 200,
        width: 300,
      },
      axis: {
        x: {
          show: true,
        },
        y: {
          show: true,
        },
      },
      legend: {
        show: false,
      },
    });
  }
}
