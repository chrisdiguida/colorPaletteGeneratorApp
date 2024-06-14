import { Component, Input } from '@angular/core';
import { PaletteDto } from '../../../../../models/paletteDto';

@Component({
  selector: 'app-palette-examples',
  templateUrl: './palette-examples.component.html',
  styleUrl: './palette-examples.component.css',
})
export class PaletteExamplesComponent {
  @Input() generatedPalette: PaletteDto;
}
