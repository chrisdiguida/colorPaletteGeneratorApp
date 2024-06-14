import { PaletteColorDto } from './paletteColorDto';

export interface PaletteDto {
  id: string;
  name: string;
  baseColor: string;
  colors: PaletteColorDto[];
  alreadyCreated: boolean;
}
