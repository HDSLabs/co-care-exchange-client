import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  toAddress: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.toAddress = 'mailto:support@care-exchange.org';
  }

  openNewTab(url: string) {
    window.open(url, '_blank');
  }
}
