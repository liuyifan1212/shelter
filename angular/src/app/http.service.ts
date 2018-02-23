import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  get(){
    return this._http.get('/pet');
  }
  add(pet){
    return this._http.post('/pet', pet);
  }
  getOne(id){
    return this._http.get('/pet/' + id.id);
  }
  update(pet,id){
    return this._http.put(`/pet/${id}`, pet);
  }
  remove(id){
    return this._http.delete('/pet/' + id.id);
  }
  like(id){
    return this._http.get('/pet/like/' + id.id);
  }
  
}
