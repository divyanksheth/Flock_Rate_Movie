export class DataService{
    public base_url = "https://api.themoviedb.org/3/";
    public api_key = "32c536397c46982176b89ff2bec547f0";
    public image_base_url;
    public req_tkn;
    public session_ID;
    public displaySpinner = false;
    /**
    * // TODO: Fetch configuration for API
    */
    public getConfig() {
        let url = this.base_url.concat('configuration?api_key=').concat(this.api_key);
        fetch(url)
            .then(response => response.json())
                .then(
                    res => {
                        this.image_base_url = res.images.base_url;
                    } 
                );
    }

    /**
    * // TODO: Fetch Movie list based on search term
    * @param keyword 
    * @returns list of movies
    */
    public fetchMovieListForSearch(keyword){
        let url = this.base_url.concat('search/movie?api_key=').concat(this.api_key)
            .concat('&language=en-US&query=').concat(keyword).concat('&page=1&include_adult=false');
        return fetch(url).then(response => response.json());
            
    }

    /**
    * // TODO: Fetch TV show list based on search term
    * @param keyword
    * @returns list of TV shows
    */
    public fetchShowListForSearch(keyword){
        let url = this.base_url.concat('search/tv?api_key=').concat(this.api_key)
            .concat('&language=en-US&page=1&query=').concat(keyword).concat('&include_adult=false');
        return fetch(url).then(response => response.json());
            
    }

    /**
    * // TODO: Get Movie, TV show details based on ID
    * @param id , category
    * @returns details of movie/show
    */
    public getDetails(id,category){ // category 0 represents movie, category 1 represents show

        let path = category ? 'tv/' : 'movie/';
        let url = this.base_url.concat(path).concat(id).concat('?api_key=').concat(this.api_key)
            .concat('&language=en-US');
        return fetch(url).then(response => response.json());
    }

    /* ********** AUTHENTICATION PROCESS **********
    step1;  GET /authentication/token/new
    https://api.themoviedb.org/3/authentication/token/new?api_key=32c536397c46982176b89ff2bec547f0

    {
        "success": true,
        "expires_at": "2020-05-30 16:39:50 UTC",
        "request_token": "f9ba700668b3c13c8552b657f5c4294a610a94c0"
      }

    step 2;
    https://www.themoviedb.org/authenticate/f9ba700668b3c13c8552b657f5c4294a610a94c0?redirect_to=http://localhost:4405/details/71618?category=1

    step 3;
    POST /authentication/session/new
    https://api.themoviedb.org/3/authentication/session/new?api_key=32c536397c46982176b89ff2bec547f0
    */

    /**
    * // TODO: Crete request_token
    */
    public createReqToken(){
        let url = this.base_url.concat('authentication/token/new?api_key=')
            .concat(this.api_key);
        return fetch(url).then(res => res.json());
   }

    /**
    * // TODO: Generate session_id
    */
    public createSessionId(req_tkn){
       const url = this.base_url.concat('authentication/session/new?api_key=')
            .concat(this.api_key);
        const data = {
            request_token:req_tkn
        };
        const otherParam = {
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            },
            body: JSON.stringify(data),
            method: 'POST'
        };
        return fetch(url, otherParam).then(res => res.json())

    }

    /**
    * // TODO: Send Rating for movie/show to database
    */
    public postRating(type, id, rating){
        const url = this.base_url.concat(type).concat(id).concat('/rating?api_key=')
            .concat(this.api_key).concat('&session_id=').concat(this.session_ID);
        const data = {
            value : rating
        }
        const otherParam = {
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            },
            body: JSON.stringify(data),
            method: 'POST'
        };

        return fetch(url, otherParam).then(res => res.json());

    }

    /**
    * // TODO: Fetch movies rated by user
    */
    public getRatedMovieContent(){
        const url = this.base_url.concat('account/9363527/rated/movies?api_key=').concat(this.api_key).concat('&language=en-US&session_id=')
            .concat(this.session_ID).concat('&sort_by=created_at.asc&page=1');
        return fetch(url).then(res => res.json());
    }

    /**
    * // TODO: Fetch shows rated by user
    */
    public getRatedShowContent(){
        const url = this.base_url.concat('account/9363527/rated/tv?api_key=').concat(this.api_key).concat('&language=en-US&session_id=')
            .concat(this.session_ID).concat('&sort_by=created_at.asc&page=1');
        return fetch(url).then(res => res.json());
    }


}