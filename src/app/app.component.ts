import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServiceWorkerUpdateService } from './core/services/sw-update.service';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title, private swUpdateService: ServiceWorkerUpdateService) {
    this.titleService.setTitle('ColoradoCareExchange');
  }

  ngOnInit() {
    this.swUpdateService.checkForUpdates();
  }
}
