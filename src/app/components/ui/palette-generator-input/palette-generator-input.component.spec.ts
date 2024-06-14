import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteGeneratorInputComponent } from './palette-generator-input.component';

describe('PaletteGeneratorInputComponent', () => {
  let component: PaletteGeneratorInputComponent;
  let fixture: ComponentFixture<PaletteGeneratorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaletteGeneratorInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaletteGeneratorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
