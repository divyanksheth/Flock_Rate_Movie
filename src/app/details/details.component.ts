import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy{
    public category; // 0 represents movie , 1 represents show
    public details;
    public id;
    public isDataFetched;
    public req_tkn;
    public session_ID;
    public displayApprove = true;
    public rating = new FormControl();
    public dispalySuccessMessage =false;
    constructor(private route: ActivatedRoute,
        public dataService: DataService,
        private router: Router) {}

    ngOnInit(){
        this.dataService.displaySpinner = true;
        this.route.queryParams.subscribe((queryParams: Params) => {
            this.category = Number(queryParams['category']);
        }); 
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
        })

        this.dataService.getDetails(this.id,this.category)
            .then(res => {
                this.details = res;
                this.isDataFetched = true;
                this.dataService.displaySpinner = false;
            });
        
        if(this.router.url.includes('request_token')){
            this.route.queryParams.subscribe((queryParams: Params) => {
                this.req_tkn = queryParams['request_token'];
            }); 
    
            this.dataService.createSessionId(this.req_tkn).then(res=> {
                this.dataService.session_ID = res.session_id;
                this.displayApprove = false;
            })
        }
    }

    approveClicked(){
        this.dataService.createReqToken().then(res => {
            this.req_tkn = res.request_token;
            let path = 'adoring-lewin-448097.netlify.app/details/' + this.id + '?category=' + this.category;
            
            let url = 'https://www.themoviedb.org/authenticate/'.concat(this.req_tkn).concat('?redirect_to=')
            .concat(path);

            window.open(url,"_self");

        });
    }

    submitClicked(){
        const value = Number(this.rating.value)
        if(value > 0){
            const type = this.category == 0 ? 'movie/' : 'tv/' ;
            this.dataService.postRating(type, this.id, value).then(res => {
                if(res.status_code == 12 || res.status_code == 1){
                    this.dispalySuccessMessage = true;
                    setTimeout(() => { this.dispalySuccessMessage = false; }, 3000);
                }
            });
        } else {

        }

    }

    ngOnDestroy(){
        this.dataService.displaySpinner = false;
    }
}