import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyItemsComponent } from './nearby-items.component';

describe('NearbyItemsComponent', () => {
  let component: NearbyItemsComponent;
  let fixture: ComponentFixture<NearbyItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
