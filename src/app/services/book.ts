import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:5263/api/books';

  getAllBooks(
    pageNumber = 1,
    pageSize = 10
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

  }

  getBookById(id: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${id}`
    );

  }

  addBook(book: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      book
    );

  }

  updateBook(
    id: number,
    book: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      book
    );

  }

  deleteBook(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  searchBooks(
    searchTerm: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/search?term=${searchTerm}`
    );

  }

}