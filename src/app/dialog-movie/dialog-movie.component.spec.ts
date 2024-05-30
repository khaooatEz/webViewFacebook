import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMovieComponent } from './dialog-movie.component';

describe('DialogMovieComponent', () => {
  let component: DialogMovieComponent;
  let fixture: ComponentFixture<DialogMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
