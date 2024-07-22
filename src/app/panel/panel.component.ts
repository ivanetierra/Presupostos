import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() numPages: number = 1;
  @Input() numLanguages: number = 1;

  @Output() numPagesChange = new EventEmitter<number>();
  @Output() numLanguagesChange = new EventEmitter<number>();

  incrementPages() {
    this.numPages += 1;
    this.numPagesChange.emit(this.numPages);
  }

  decrementPages() {
    if (this.numPages > 1) {
      this.numPages -= 1;
      this.numPagesChange.emit(this.numPages);
    }
  }

  incrementLanguages() {
    this.numLanguages += 1;
    this.numLanguagesChange.emit(this.numLanguages);
  }

  decrementLanguages() {
    if (this.numLanguages > 1) {
      this.numLanguages -= 1;
      this.numLanguagesChange.emit(this.numLanguages);
    }
  }
}
