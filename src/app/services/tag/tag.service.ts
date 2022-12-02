import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {constants} from "../../../environments/constants";
import {TagMapper} from "./tag.mapper";
import {Tag} from "./tag.type";
@Injectable({
  providedIn: 'root'
})

export class TagService implements OnInit{
  private TAGS_ENDPOINT = '/tags';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {

  }

  cargarTags(): Observable<any>{
    return this.httpClient.get(constants.API_URL+this.TAGS_ENDPOINT);
  }
  getTagsByRecipeID(idReceta:number): Observable<any>{
    return this.httpClient.get(constants.API_URL+this.TAGS_ENDPOINT+'/'+idReceta)
  }
  editarTag(tag:Number,nombreNuevo:string): Observable<any>{
    let body= {id:tag,nombre:nombreNuevo}
    return this.httpClient.put(constants.API_URL+this.TAGS_ENDPOINT,body,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')}),observe: 'response'})
  }
}
