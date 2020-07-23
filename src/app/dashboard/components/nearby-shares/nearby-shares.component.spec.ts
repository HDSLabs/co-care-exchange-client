import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbySharesComponent } from './nearby-shares.component';

describe('NearbySharesComponent', () => {
  let component: NearbySharesComponent;
  let fixture: ComponentFixture<NearbySharesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbySharesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbySharesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
