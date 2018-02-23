import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  pet: any;
  pets: any;
  errors: any;

  constructor(
    private _httpService: HttpService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Grab id from url parameter
      this.id = params['id'];
      this.getOne(this.id);
    })
  }
  getOne(id){
    let observable = this._httpService.getOne({id:id});
    observable.subscribe(data =>{
      this.pet = {
        name: data[0]['name'],
        description: data[0]['description'],
        type: data[0]['type'],
        likes: data[0]['like'],
        skill1: data[0]['skill1'],
        skill2: data[0]['skill2'],
        skill3: data[0]['skill3']
      }
    })
  }
  update(){
    let observable = this._httpService.update(this.pet, this.id);
    observable.subscribe(data=>{
      if (data['code'] === 11000){
        this.errors = 'Oops! The name of the pet has been taken.'
      } 
      else if( data['errors']){
        this.errors = data['message']
      }
      else{
        this.router.navigate(['/details',this.id])
      }
    })
  }

}
