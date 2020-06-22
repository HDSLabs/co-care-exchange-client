import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('ColoradoCareExchange');
  }
}
