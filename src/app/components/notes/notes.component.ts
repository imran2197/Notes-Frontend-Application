import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { NoteItemComponent } from '../note-item/note-item.component';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteItemComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  title: String = '';
  description: String = '';

  notesData: any = [];

  constructor(
    private noteService: NotesService,
    private toasterService: ToasterService
  ) {}
  ngOnInit() {
    this.getAllNotes();
  }

  getAllNotes() {
    this.noteService.getAllNotes().subscribe((res: any) => {
      console.log(res);
      this.notesData = res.response;
    });
  }

  updateNotesDataEmitter() {
    this.getAllNotes();
  }

  handleSubmit() {
    const payload = {
      title: this.title,
      description: this.description,
    };
    this.noteService.createNotes(payload).subscribe((res: any) => {
      if (res.statusCode === 201) {
        this.toasterService.success(res.message);
        this.title = '';
        this.description = '';
        this.getAllNotes();
      } else {
        this.toasterService.error(res.message);
      }
    });
  }
}
