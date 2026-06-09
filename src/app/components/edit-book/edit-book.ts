import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { BookService } from '../../services/book';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css'
})
export class EditBook implements OnInit {

  bookId!: number;

  loading = false;

  bookForm!: FormGroup;

  categories = [
    { categoryId: 1, name: 'Fiction' },
    { categoryId: 2, name: 'Non-Fiction' },
    { categoryId: 3, name: 'Science & Tech' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {

    this.initializeForm();

    this.bookId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadBook();
  }

  initializeForm(): void {

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
        Validators.required
      ],

      totalCopies: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      availableCopies: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      categoryId: [
        '',
        Validators.required
      ]

    });

  }

  loadBook(): void {

    this.loading = true;

    this.bookService
      .getBookById(this.bookId)
      .subscribe({

        next: (book: any) => {

          this.bookForm.patchValue({

            title: book.title,
            author: book.author,
            description: book.description,
            imageUrl: book.imageUrl,
            totalCopies: book.totalCopies,
            availableCopies: book.availableCopies,
            categoryId: book.categoryId

          });

          this.loading = false;

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  onSubmit(): void {

    if (this.bookForm.invalid) {

      this.bookForm.markAllAsTouched();

      return;
    }

    this.bookService
      .updateBook(
        this.bookId,
        this.bookForm.value
      )
      .subscribe({

        next: () => {

          alert(
            'Book Updated Successfully'
          );

          this.router.navigate([
            '/home'
          ]);

        },

        error: err => {

          console.error(err);

          alert(
            'Failed to update book'
          );

        }

      });

  }

}