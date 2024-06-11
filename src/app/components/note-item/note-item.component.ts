import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.scss',
})
export class NoteItemComponent {
  isEditModeEnabled: Boolean = false;
  @Input() item: any;
  @Output() updateNotesDataEmitter = new EventEmitter<any>();

  constructor(
    private noteService: NotesService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {}

  onSaveItem() {
    const payload = {
      title: this.item.title,
      description: this.item.description,
    };
    this.noteService
      .updateNotes(payload, this.item._id)
      .subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toasterService.success(res.message);
          this.isEditModeEnabled = false;
          this.updateNotesDataEmitter.emit();
        } else {
          this.toasterService.error(res.message);
        }
      });
  }

  onDeleteItem() {
    this.noteService.deleteNotes(this.item._id).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.toasterService.success(res.message);
        this.updateNotesDataEmitter.emit();
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
}
