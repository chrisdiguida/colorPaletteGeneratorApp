import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, firstValueFrom, tap } from 'rxjs';
import { PaletteDto } from '../../../../models/paletteDto';
import { UpdatePaletteRequestDto } from '../../../../models/updatePaletteRequestDto';
import { FormValidationService } from '../../../../services/form-validation.service';
import { NotificationsService } from '../../../../services/notifications.service';
import { PalettesService } from '../../../../services/palettes.service';

@Component({
  selector: 'app-saved-palettes',
  templateUrl: './saved-palettes.component.html',
  styleUrls: ['./saved-palettes.component.css'],
})
export class SavedPalettesComponent implements OnInit {
  filterFormControl = new FormControl('');
  paletteNameFormControl = new FormControl(
    '',
    this.formValidationService.minLength(1)
  );
  savedPalettes: PaletteDto[] = [];
  paletteToDelete: PaletteDto;
  paletteToUpdate: PaletteDto;
  loadingSource: string;
  currentPage: number = 1;
  loadingMore: boolean = false;
  stopLoading: boolean;

  constructor(
    private formValidationService: FormValidationService,
    private palettesService: PalettesService,
    private notificationsService: NotificationsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAllPalettes();
    this.filterFormControl.valueChanges
      .pipe(
        tap(() => (this.loadingSource = 'get-all')),
        debounceTime(300)
      )
      .subscribe(async () => {
        await this.restartRetrieving();
      });
  }

  async restartRetrieving() {
    this.currentPage = 1;
    this.stopLoading = false;
    this.savedPalettes = [];
    await this.getAllPalettes();
  }

  async getAllPalettes() {
    if (this.loadingMore || this.stopLoading) return;

    this.loadingMore = true;
    this.loadingSource = 'get-all';
    const newPalettes = await firstValueFrom(
      this.palettesService.getAll(
        this.filterFormControl.value,
        this.currentPage
      )
    );
    if (newPalettes.length === 0) {
      this.stopLoading = true;
    }
    this.savedPalettes = [...this.savedPalettes, ...newPalettes];
    this.loadingSource = null;
    this.loadingMore = false;
    this.currentPage++;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      this.getAllPalettes();
    }
  }

  openUpdatePaletteModal(palette: PaletteDto) {
    this.paletteToUpdate = palette;
    this.paletteNameFormControl.setValue(palette.name);
  }

  async closeUpdatePaletteModal() {
    this.paletteToUpdate = null;
    this.paletteNameFormControl.reset();
    this.filterFormControl.setValue('');
  }

  openDeletePaletteModal(palette: PaletteDto) {
    this.paletteToDelete = palette;
  }

  async closeDeletePaletteModal() {
    this.paletteToDelete = null;
    this.filterFormControl.setValue('');
  }

  async deletePalette() {
    this.loadingSource = 'delete';
    await firstValueFrom(this.palettesService.delete(this.paletteToDelete.id));
    this.notificationsService.show(
      'success',
      'The palette has been deleted correctly.'
    );
    this.loadingSource = null;
    this.closeDeletePaletteModal();
  }

  async updatePalette() {
    this.loadingSource = 'update';
    const request: UpdatePaletteRequestDto = {
      id: this.paletteToUpdate.id,
      name: this.paletteNameFormControl.value,
    };
    await firstValueFrom(this.palettesService.updateName(request));
    this.notificationsService.show(
      'success',
      'The palette name has been updated correctly.'
    );
    this.loadingSource = null;
    this.closeUpdatePaletteModal();
  }
}
