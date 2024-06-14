import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPaletteComponent } from './app-palette.component';

describe('AppPaletteComponent', () => {
  let component: AppPaletteComponent;
  let fixture: ComponentFixture<AppPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppPaletteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
