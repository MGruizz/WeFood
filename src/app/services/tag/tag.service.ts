import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {constants} from "../../../environments/constants";
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
}
