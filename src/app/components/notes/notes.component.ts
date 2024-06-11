import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  title: String = '';
  description: String = '';

  notesData: any = [];

  constructor(private noteService: NotesService) {}
  ngOnInit() {
    this.getAllNotes();
  }

  getAllNotes() {
    this.noteService.getAllNotes().subscribe((res) => {
      console.log(res);
      this.notesData = res;
    });
  }

  handleSubmit() {}
}
