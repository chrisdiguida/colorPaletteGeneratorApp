import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CreatePaletteRequestDto } from '../../../../models/createPaletteRequestDto';
import { PaletteDto } from '../../../../models/paletteDto';
import { FormValidationService } from '../../../../services/form-validation.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { PalettesService } from '../../../../services/palettes.service';

@Component({
  selector: 'app-create-palette',
  templateUrl: './create-palette.component.html',
  styleUrl: './create-palette.component.css',
})
export class CreatePaletteComponent {
  paletteNameFormControl = new FormControl(
    '',
    this.formValidationService.minLength(1)
  );
  generatedPalette: PaletteDto;
  showCreatePaletteModal: boolean;
  isLoading: boolean;

  constructor(
    private formValidationService: FormValidationService,
    private palettesService: PalettesService,
    private notificationsService: NotificationsService
  ) {}

  openCreatePaletteModal() {
    if (this.generatedPalette.alreadyCreated) {
      return;
    }
    this.showCreatePaletteModal = true;
  }

  closeCreatePaletteModal() {
    this.paletteNameFormControl.reset();
    this.showCreatePaletteModal = false;
  }

  async savePalette() {
    if (!this.paletteNameFormControl.isValid()) return;
    this.isLoading = true;
    const request: CreatePaletteRequestDto = {
      baseColor: this.generatedPalette.baseColor,
      name: this.paletteNameFormControl.value,
    };
    await firstValueFrom(this.palettesService.create(request));
    this.notificationsService.show(
      'success',
      'The palette has been saved correctly.'
    );
    this.generatedPalette.alreadyCreated = true;
    this.isLoading = false;
    this.closeCreatePaletteModal();
  }

  defineActionText() {
    return this.generatedPalette?.alreadyCreated ? 'Already Saved' : 'Save';
  }
}
