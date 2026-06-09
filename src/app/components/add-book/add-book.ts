import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { BookService } from '../../services/book';

interface Category {
  categoryId: number;
  name: string;
}

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {

  loading = false;

  categories: Category[] = [
    { categoryId: 1, name: 'Fiction' },
    { categoryId: 2, name: 'Non-Fiction' },
    { categoryId: 3, name: 'Science & Tech' }
  ];

  bookForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookService
  ) {

    this.bookForm = this.fb.group({

      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      author: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z .]+$')
        ]
      ],

      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ],

      imageUrl: [
        '',
        [
          Validators.required,
          Validators.pattern('https?:\\/\\/.+')
        ]
      ],

      totalCopies: [
        1,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      categoryId: [
        '',
        Validators.required
      ],

      isActive: [true]

    });

  }

  onSubmit(): void {

    if (this.bookForm.invalid) {

      this.bookForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.bookService
      .addBook(this.bookForm.value)
      .subscribe({

        next: () => {

          this.loading = false;

          alert(
            'Book added successfully'
          );

          this.router.navigate([
            '/home'
          ]);

        },

        error: err => {

          console.error(err);

          this.loading = false;

          alert(
            'Failed to add book'
          );

        }

      });

  }

}