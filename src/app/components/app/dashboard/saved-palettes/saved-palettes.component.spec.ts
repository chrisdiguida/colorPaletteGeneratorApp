import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPalettesComponent } from './saved-palettes.component';

describe('SavedPalettesComponent', () => {
  let component: SavedPalettesComponent;
  let fixture: ComponentFixture<SavedPalettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedPalettesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedPalettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
