import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
    public keyword='';
    public movieList=[];
    public showList=[];
    public isMovieListFetched = false;
    public isShowListFethed = false;
    searchForm = new FormGroup({
        searchTerm : new FormControl()

    });
    constructor(public dataService: DataService) {}

    onFormSubmit(){
        this.dataService.displaySpinner = true;
        this.keyword = this.searchForm.get('searchTerm').value;
        if(this.keyword == 'null' || this.keyword.length < 1){
            this.isMovieListFetched = false;
            this.isShowListFethed = false;
            return;
        }

        this.dataService.fetchMovieListForSearch(this.keyword).then(
            res => {
                this.movieList = res.results;
                this.movieList = this.movieList.slice(0,10);
                this.isMovieListFetched = true;
            }
        );

        this.dataService.fetchShowListForSearch(this.keyword).then(
            res => {
                this.showList = res.results;
                this.showList = this.showList.slice(0,10);
                this.isShowListFethed = true;
                this.dataService.displaySpinner = false;
            }
        );

    }

    ngOnDestroy(){
        this.dataService.displaySpinner = false;
    }
}
