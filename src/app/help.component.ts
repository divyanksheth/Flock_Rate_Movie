import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-help',
  template: ''
})
export class HelpComponent implements OnInit{
    public req_tkn;

    constructor(private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router){}

    ngOnInit() {
    if(this.router.url.includes('request_token')){
        this.route.queryParams.subscribe((queryParams: Params) => {
            this.req_tkn = queryParams['request_token'];
        }); 
  
        this.dataService.createSessionId(this.req_tkn).then(res=> {
            this.dataService.session_ID = res.session_id;
            this.router.navigate(['/user']);
        })
    }
    }
  
}
