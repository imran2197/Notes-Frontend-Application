import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isLocalEnv } from '../_helper/check-env';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  baseUrl: String = '';

  constructor(private http: HttpClient) {
    if (!isLocalEnv()) {
      this.baseUrl =
        'https://notes-backend-application-50a7671c7b2e.herokuapp.com';
    } else {
      this.baseUrl = 'http://localhost:8080';
    }
  }

  getAllNotes() {
    return this.http.get(`${this.baseUrl}/notes`);
  }

  createNotes(payload: any) {
    return this.http.post(`${this.baseUrl}/notes/create`, payload);
  }

  updateNotes(payload: any, id: any) {
    return this.http.put(`${this.baseUrl}/notes/${id}`, payload);
  }

  deleteNotes(id: any) {
    return this.http.delete(`${this.baseUrl}/notes/${id}`);
  }
}
