import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public ratedMovieList;
  public ratedShowList;
  public movieListFetched;
  public showListFetched;

  constructor(private dataService: DataService){}

  ngOnInit(){

    this.dataService.getRatedMovieContent().then(res => {
      this.ratedMovieList = res.results;
      this.movieListFetched = true;
    });

    this.dataService.getRatedShowContent().then(res => {
      this.ratedShowList = res.results;
      this.showListFetched = true;
    })
  }
}
