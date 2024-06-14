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
  @Input() selectedTab: any;
  @Output() updateNotesDataEmitter = new EventEmitter<any>();

  constructor(
    private noteService: NotesService,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {}

  onSaveItem(type: any) {
    const payload = {
      title: this.item.title,
      description: this.item.description,
      status:
        type === 'save'
          ? this.item.status
          : type === 'reopen'
          ? 'inprogress'
          : 'completed',
      id: this.item._id,
    };
    this.noteService.updateNotes(payload).subscribe((res: any) => {
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
    const payload = {
      id: this.item._id,
      deleted: true,
    };
    this.noteService.deleteNotes(payload).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.toasterService.success(res.message);
        this.updateNotesDataEmitter.emit();
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
}
