import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: any;
  pet: any;
  clickLike: boolean;
  
  

  constructor(
    private _httpService: HttpService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getOne(this.id);
    })
    this.clickLike = true;
  }
  getOne(id){
    let observable = this._httpService.getOne({id: id});
    observable.subscribe(data => {
      this.pet = data[0];
      console.log(data[0])
    })
  }
  remove(){
    let observable = this._httpService.remove({id: this.id});
    observable.subscribe(data => {
      this.router.navigate(['/home']);
    })
  }
  like(){
    let observable = this._httpService.like({id: this.id});
    observable.subscribe(data => {
    this.pet = data[0]
    
    
   
      console.log(data)
      this.clickLike = false
    })
    this.getOne(this.id);

  }

}
