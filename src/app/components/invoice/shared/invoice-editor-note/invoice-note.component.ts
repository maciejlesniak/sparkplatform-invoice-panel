import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-invoice-note',
  templateUrl: './invoice-note.component.html',
  styleUrls: ['./invoice-note.component.css']
})
export class InvoiceNoteComponent implements OnInit {

  @Output() public onNoteUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Input() public initialNote: string;

  public note: string;

  constructor() { }

  ngOnInit() {
    this.note = this.initialNote;
  }

  public onModelUpdate(newNote: string): void {
    this.onNoteUpdate.emit(newNote);
  }

}
