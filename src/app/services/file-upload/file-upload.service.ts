import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {constants} from "../../../environments/constants";
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url
  baseApiUrl = "https://file.io"

  constructor(private http:HttpClient) { }

  // Returns an observable
  upload(file:File):Observable<any> {
    console.log(file.name)
    // Create form data
    const formData = new FormData();
    console.log(formData)
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    console.log(formData.get('file'))
    // Make http post request over api
    // with formData as req

    return this.http.put(constants.API_URL + '/editimgusuario', formData,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')}),observe: 'response'})
  }
}
