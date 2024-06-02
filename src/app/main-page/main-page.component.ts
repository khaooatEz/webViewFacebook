import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMovieComponent } from '../dialog-movie/dialog-movie.component';

export interface list_dataMovie {
  picture: any;
  nameMovie: string;
  language: string;
  overView: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {

  searchText: any;
  filterType: any;

  constructor(private apiService: ServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.plusApi();
  }

  plusApi() {
    for (let id = 1; id <= 100; id++) {
      this.getData(id)
    }
  }

  openDialog(movie: { nameMovie: any; language: any; overView: any; picture: any }): void {
  this.dialog.open(DialogMovieComponent, {
    data: {
      nameMovie: movie.nameMovie,
      language: movie.language,
      overView: movie.overView,
      picture: movie.picture,
    }
  });
}


  // plusApi() {
  //   this.apiService.getMultiplePages(1, 100).pipe(
  //     map(responses => {
  //       let allMovies: any[] = [];
  //       responses.forEach(response => {
  //         allMovies = allMovies.concat(response.results);
  //       });
  //       return allMovies;
  //     })
  //   ).subscribe(
  //     movies => {
  //       this.getMovie = movies;
  //       this.convertData(this.getMovie);
  //     },
  //     error => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }


  getMovie: any[] = [];
  getData(id: number): void {
    this.apiService.getApi(id).subscribe(
      response => {
        // this.getMovie.push(response);
        this.getMovie = response.results;
        console.log('Data:', response);
        this.convertData(this.getMovie);
      },
    );
  }

  dataMovie: list_dataMovie[] = [];
  convertData(data: any): void {
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
    let _data = [];
    for (let i = 0; i < data.length; i++) {
      _data.push({
        picture: data[i]?.poster_path ? baseImageUrl + data[i].poster_path : '',
        nameMovie: data[i]?.title || '',
        language: data[i]?.original_language?.toUpperCase() || '',
        overView: data[i]?.overview || '',
      })
    }
    this.dataMovie = this.dataMovie.concat(_data);
  }


  currentPage = 1;
  itemsPerPage = 20;

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage - 1, this.dataMovie.length - 1);
  }

  get displayedMovies(): any[] {
    let filteredMovies = this.dataMovie;

    if (this.filterType !== 'all') {
      filteredMovies = filteredMovies.filter(movie => {
        switch (this.filterType) {
          case 'หนังฝรั่ง': return movie.language === 'EN';
          case 'หนังเกาหลี': return movie.language === 'KO';
          case 'หนังญี่ปุ่น': return movie.language === 'JA';
          case 'หนังฝรั่งเศษ': return movie.language === 'FR';
          default: return true;
        }
      });
    }

    if (this.searchText && this.searchText.trim() !== '') {
      filteredMovies = filteredMovies.filter(movie => {
        return movie.nameMovie.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }

    return filteredMovies.slice(this.startIndex, this.endIndex + 1);
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const lastPage = Math.ceil(this.dataMovie.length / this.itemsPerPage);
    if (this.currentPage < lastPage) {
      this.currentPage++;
    }
  }

  get totalPages(): number[] {
    const totalItems = this.dataMovie.length;
    const pages = Math.ceil(totalItems / this.itemsPerPage);
    return Array(pages).fill(0).map((x, i) => i + 1);
  }

  get displayedPages(): number[] {
    const total = this.totalPages.length;
    const currentPageIndex = this.currentPage - 1;
    const start = Math.max(0, currentPageIndex - 2);
    const end = Math.min(start + 5, total);
    return this.totalPages.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
    }
  }

  setFilterType(type: string) {
    this.filterType = type;
    this.currentPage = 1; // Reset to first page on filter change
  }
}