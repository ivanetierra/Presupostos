import { Component, EventEmitter, Input, Output, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() numPages: Signal<number> = signal(1);
  @Input() numLanguages: Signal<number> = signal(1);

  @Output() numPagesChange = new EventEmitter<number>();
  @Output() numLanguagesChange = new EventEmitter<number>();

  incrementPages() {
    const newPages = this.numPages() + 1;
    this.numPages = signal(newPages);
    this.numPagesChange.emit(newPages);
  }

  decrementPages() {
    if (this.numPages() > 1) {
      const newPages = this.numPages() - 1;
      this.numPages = signal(newPages);
      this.numPagesChange.emit(newPages);
    }
  }

  incrementLanguages() {
    const newLanguages = this.numLanguages() + 1;
    this.numLanguages = signal(newLanguages);
    this.numLanguagesChange.emit(newLanguages);
  }

  decrementLanguages() {
    if (this.numLanguages() > 1) {
      const newLanguages = this.numLanguages() - 1;
      this.numLanguages = signal(newLanguages);
      this.numLanguagesChange.emit(newLanguages);
    }
  }
}
