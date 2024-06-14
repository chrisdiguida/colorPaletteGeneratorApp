import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSwitchComponent } from './app-switch.component';

describe('AppSwitchComponent', () => {
  let component: AppSwitchComponent;
  let fixture: ComponentFixture<AppSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppSwitchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
