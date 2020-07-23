import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyRequestsComponent } from './nearby-requests.component';

describe('NearbyRequestsComponent', () => {
  let component: NearbyRequestsComponent;
  let fixture: ComponentFixture<NearbyRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
