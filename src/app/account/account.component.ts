import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DASHBOARD_ROUTE, INFO_ROUTE, PROMPT_ROUTE } from '../core/constants/routes';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  edit() {
    this.router.navigate(['/', INFO_ROUTE]);
  }
  add() {
    this.router.navigate(['/', PROMPT_ROUTE]);
  }
  close() {
    this.router.navigate(['/', DASHBOARD_ROUTE]);
  }
  resource() {
    this.router.navigate(['/resources']);
  }
  showContributors() {
    this.router.navigate(['/contributors']);
  }
}
