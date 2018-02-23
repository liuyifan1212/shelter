import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets:any;

  constructor(
    private _httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.get()
  }
  get(){
    let observable = this._httpService.get();
    observable.subscribe(data =>{
      this.pets = data
      //console.log(data[0]._id)
    })

  }

}
