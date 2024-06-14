import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PaletteDto } from '../../../models/paletteDto';
import { FormValidationService } from '../../../services/form-validation.service';
import { PalettesService } from '../../../services/palettes.service';

@Component({
  selector: 'app-palette-generator-input',
  templateUrl: './palette-generator-input.component.html',
  styleUrl: './palette-generator-input.component.css',
})
export class PaletteGeneratorInputComponent implements OnInit {
  hexValueFormControl = new FormControl('', [
    this.formValidationService.isValidHexValue(false),
  ]);
  colorPickerHexValue: string;
  generatedPalette: PaletteDto;
  isLoading: boolean;
  @Output() onGeneratedPalette = new EventEmitter<PaletteDto>();

  constructor(
    private palettesService: PalettesService,
    private formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.hexValueFormControl.valueChanges.subscribe((newValue) => {
      if (this.isShortHexValue(newValue)) {
        newValue = this.convertShortHexToLong(newValue);
      }
      this.colorPickerHexValue = newValue;
    });
    this.randomizeHexColor();
  }

  async generatePalette() {
    if (!this.hexValueFormControl.isValid() || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.generatedPalette = await firstValueFrom(
      this.palettesService.generatePalette(this.hexValueFormControl.value)
    );
    this.onGeneratedPalette.emit(this.generatedPalette);
    this.isLoading = false;
  }

  convertShortHexToLong(hex: string): string {
    return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  isShortHexValue(hex: string) {
    return hex?.length === 4 && hex.startsWith('#');
  }

  async setHexValue(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.colorPickerHexValue = value;
    this.hexValueFormControl.setValue(value);
    await this.generatePalette();
  }

  showErrorMessage() {
    return (
      this.hexValueFormControl?.errors && this.hexValueFormControl?.touched
    );
  }

  async randomizeHexColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = `#${randomColor.padStart(6, '0')}`;
    this.hexValueFormControl.setValue(randomColor);
    await this.generatePalette();
  }
}
