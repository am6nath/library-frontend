import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { EditBook } from './edit-book';

describe('EditBook', () => {
  let component: EditBook;
  let fixture: ComponentFixture<EditBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBook],
      providers: [
        provideRouter([]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
