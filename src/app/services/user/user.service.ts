import {User} from "./user.type";
import {Injectable, OnInit} from "@angular/core";
import {UserLogeado} from "./user.type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService implements OnInit{
  usuariosLogeados: UserLogeado[] = [];
  usuariosLogeadoUrl: string = '../assets/data/user.json';
  constructor(private httpClient:HttpClient) {
    this.httpClient.get(this.usuariosLogeadoUrl).subscribe((value)=>{
      this.usuariosLogeados= value as UserLogeado[];
    })
  }

  ngOnInit(): void {
  }


}
