import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss'],
})
export class ContributorsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  backToAccount() {
    this.router.navigate(['/account']);
  }
}
