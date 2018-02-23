import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet:any;
  errors:any;

  constructor(
    private _httpService: HttpService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.newPet = {name: '', type: '', description: '', skill1: '', skill2: '', skill3: ''}
  }
  add(){
    let observable = this._httpService.add(this.newPet);
    observable.subscribe(data =>{
      if (data['code'] === 11000){
        this.errors = 'Oops! The name of the pet has been taken.'
      } 
      else if( data['errors']){
        this.errors = data['message']
      }
      else{
        this.router.navigate(['/home'])
      }

    })
  }



}
