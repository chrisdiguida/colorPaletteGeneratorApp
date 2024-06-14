import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreatePaletteRequestDto } from '../models/createPaletteRequestDto';
import { PaletteDto } from '../models/paletteDto';
import { UpdatePaletteRequestDto } from '../models/updatePaletteRequestDto';

@Injectable({
  providedIn: 'root',
})
export class PalettesService {
  constructor(private http: HttpClient) {}

  generatePalette(hexColor: string) {
    let params = new HttpParams().set('hexColor', hexColor);
    return this.http.get<PaletteDto>(environment.api.palettes.generatePalette, {
      params,
    });
  }

  getAll(filter: string, page: number) {
    let params = new HttpParams().set('filter', filter).set('page', page);
    return this.http.get<PaletteDto[]>(environment.api.palettes.getAll, {
      params,
    });
  }

  create(request: CreatePaletteRequestDto) {
    return this.http.post(environment.api.palettes.create, request);
  }

  updateName(request: UpdatePaletteRequestDto) {
    return this.http.patch<void>(environment.api.palettes.updateName, request);
  }

  delete(paletteId: string) {
    let params = new HttpParams().set('paletteId', paletteId);
    return this.http.delete(environment.api.palettes.delete, {
      params,
    });
  }
}
