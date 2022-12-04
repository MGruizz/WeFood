import {Injectable, OnInit} from '@angular/core';
import {constants} from "../../../environments/constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewRecipe} from "../recipe/recipe.type";
import {NuevoComentario} from "./comentarios.type";

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private COMENTARIOS_ENDPOINT = '/comentarios';

  constructor(private httpClient: HttpClient) { }

  cargarComentarios(): Observable<any> {
    return this.httpClient.get(this.COMENTARIOS_ENDPOINT)
  }

  getComentariosByRecipeId(idReceta :number): Observable<any> {
    return this.httpClient.get(constants.API_URL+this.COMENTARIOS_ENDPOINT+'/'+idReceta)
  }

  guardarComentario(comentario: NuevoComentario):Observable<any>{
    const body = comentario;
    return this.httpClient.post(constants.API_URL + this.COMENTARIOS_ENDPOINT,body,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')}),observe: 'response'})
  }
}
