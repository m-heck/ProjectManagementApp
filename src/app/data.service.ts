import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }
}

class User {

}

export class DataService {

  addUser(name: string, email: string, phone: string, password: string, code: string) {
    return this.HttpClient.post<UserInfo[]>("/users", {
      name, email, phone, password, code
    }).toPromise()
  }

}
