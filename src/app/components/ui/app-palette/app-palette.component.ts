import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaletteDto } from '../../../models/paletteDto';

@Component({
  selector: 'app-palette',
  templateUrl: './app-palette.component.html',
  styleUrl: './app-palette.component.css',
})
export class AppPaletteComponent {
  @Input() actionText: string;
  @Input() secondActionText: string;
  @Input() palette: PaletteDto;
  @Output() onActionButtonClicked = new EventEmitter();
  @Output() onSecondActionButtonClicked = new EventEmitter();
  copiedColor: string;
  exportText: string = 'Copy as CSS';

  defineColorText(color: string) {
    if (this.copiedColor === color) return 'Copied';
    return color.replace('#', '');
  }

  copyColorToClipboard(color: string) {
    navigator.clipboard.writeText(color).then(() => {
      this.copiedColor = color;
      setTimeout(() => {
        this.copiedColor = null;
      }, 1000);
    });
  }

  definePaletteTextColor(color: string) {
    const index = this.palette.colors.findIndex((x) => x.color === color);
    if (index > 4) {
      const color100 = this.palette.colors.find((x) => x.boldness === '100');
      return color100.color;
    }

    const color900 = this.palette.colors.find((x) => x.boldness === '900');
    return color900.color;
  }

  exportAsCssToClipboard() {
    let cssVariables = ':root {\n';

    this.palette.colors.forEach((color) => {
      const cssVariableName = `--app-color-${color.boldness}`;
      const cssVariableDeclaration = `${cssVariableName}: ${color.color};\n`;
      cssVariables += cssVariableDeclaration;
    });
    cssVariables += '}';

    navigator.clipboard.writeText(cssVariables).then(() => {
      this.exportText = 'Copied';
      setTimeout(() => {
        this.exportText = 'Copy as CSS';
      }, 1000);
    });
  }
}
