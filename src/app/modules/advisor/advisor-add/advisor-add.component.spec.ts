import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorAddComponent } from './advisor-add.component';

describe('AdvisorAddComponent', () => {
  let component: AdvisorAddComponent;
  let fixture: ComponentFixture<AdvisorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
