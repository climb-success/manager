import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationDetailComponent } from './information-detail.component';

describe('InformationDetailComponent', () => {
  let component: InformationDetailComponent;
  let fixture: ComponentFixture<InformationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
