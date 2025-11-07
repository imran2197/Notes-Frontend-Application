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
      this.baseUrl = 'https://notes-backend-application.vercel.app';
    } else {
      this.baseUrl = 'http://localhost:8080';
    }
  }

  getAllNotes(payload: any) {
    return this.http.post(`${this.baseUrl}/notes`, payload);
  }

  createNotes(payload: any) {
    return this.http.post(`${this.baseUrl}/notes/create`, payload);
  }

  updateNotes(payload: any) {
    return this.http.put(`${this.baseUrl}/notes/update`, payload);
  }

  deleteNotes(payload: any) {
    return this.http.put(`${this.baseUrl}/notes/delete`, payload);
  }

  deleteAllNotes() {
    return this.http.delete(`${this.baseUrl}/notes/deleteAll`);
  }
}
