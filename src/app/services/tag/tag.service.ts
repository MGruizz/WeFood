import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TagService implements OnInit{

  tagsUrl: string = '../assets/data/tags.json';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {

  }

  cargarTags(): Observable<any>{
    return this.httpClient.get(this.tagsUrl);
  }
}
