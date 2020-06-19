import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { DataService } from '../data.service';

@Component({
    selector: 'app-cast',
    templateUrl: './cast.component.html',
    styleUrls: ['./cast.component.scss']
  })
export class CastComponent implements OnInit, OnDestroy{
    public castId;
    public castDetails;
    public castDetailsFetched = false;

    constructor(private route : ActivatedRoute,
        public dataService : DataService) {}
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.castId = params.get('id');
        })
        this.dataService.displaySpinner = true;
        this.dataService.getCastDetails(this.castId).then(
            res => {
                console.log(res);
                this.castDetails = res;
                this.castDetailsFetched = true;
                this.dataService.displaySpinner = false;
            }
        );
    }
    ngOnDestroy() {
        this.dataService.displaySpinner = false;
    }
}