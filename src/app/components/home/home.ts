import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book';

interface Book {
  bookId: number;
  title: string;
  author: string;
  description?: string;
  imageUrl?: string;
  totalCopies: number;
  availableCopies: number;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  books: Book[] = [];
  searchTerm = '';
  loading = false;

  constructor(
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {

    this.loading = true;

    this.bookService
      .getAllBooks()
      .subscribe({

        next: (response: any) => {

          this.books = response.items;

          this.loading = false;

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  onSearch(term: string): void {

    this.searchTerm = term;

    if (!term.trim()) {

      this.loadBooks();

      return;

    }

    this.bookService
      .searchBooks(term)
      .subscribe({

        next: (response: any) => {

          this.books = response;

        },

        error: err => {

          console.error(err);

        }

      });

  }

  editBook(id: number): void {

    this.router.navigate([
      '/edit-book',
      id
    ]);

  }

  deleteBook(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this book?'
    );

    if (!confirmed) {
      return;
    }

    this.bookService
      .deleteBook(id)
      .subscribe({

        next: () => {

          alert('Book deleted successfully');

          this.loadBooks();

        },

        error: err => {

          console.error(err);

          alert(
            'Unable to delete book. It may currently be borrowed.'
          );

        }

      });

  }

}