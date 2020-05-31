import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public ratedMovieList;
  public ratedShowList;
  public movieListFetched;
  public showListFetched;

  constructor(public dataService: DataService){}

  ngOnInit(){
    this.dataService.displaySpinner = true;
    this.dataService.getRatedMovieContent().then(res => {
      this.ratedMovieList = res.results;
      this.movieListFetched = true;
    });

    this.dataService.getRatedShowContent().then(res => {
      this.ratedShowList = res.results;
      this.showListFetched = true;
      this.dataService.displaySpinner = false;
    })
  }

  ngOnDestroy(){
    this.dataService.displaySpinner = false;
  }
}
