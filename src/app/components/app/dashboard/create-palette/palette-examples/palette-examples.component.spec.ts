import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteExamplesComponent } from './palette-examples.component';

describe('PaletteExamplesComponent', () => {
  let component: PaletteExamplesComponent;
  let fixture: ComponentFixture<PaletteExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaletteExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaletteExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
