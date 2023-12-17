import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient,private  userAuthService:UserAuthService) { }

  private url="http://localhost:9090/";

  requestHeader=new HttpHeaders({
    "No-Auth":"True"
  });

  public login(loginData){
    return this.httpClient.post(this.url+"authenticate",loginData,{headers:this.requestHeader});
  }
  public roleMatch(allowedRoles):boolean{
     let isMatch=false;
   const userRoles:any= this.userAuthService.getRoles();
   if(userRoles !=null && userRoles){
     for(let i=0;i<userRoles.length;i++){
       for (let j = 0; j < allowedRoles.length ;j++) {
         if(userRoles[i].roleName===allowedRoles[j]){
           isMatch=true;
           return isMatch;
         }
       }
     }
   }
   return isMatch;
  }
}
