import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }
  url = 'localhost:3000/users/';
  //url = '/newUsers';
  //url = 'http://localhost:3000/project-management-app';

  submitUser(username: string, name: string, phone: string, email: string, password: string, code: string) {
    const data = {
      username: username,
      name: name,
      phone: phone,
      email: email,
      password: password,
      code: code
    };
    return this.http.post<any>(this.url, data);
  }

  submitTeam(tname: string, code: string) {
    const data = {
      name: tname,
      code: code
    };
    return this.http.post(this.url, data);
  }

  userLogin(email: string, password: string) {
    const data = {
      email: email,
      password: password
    };
    return this.http.post(this.url, data);
  }

  getDisplayNames() {
    return this.http.get('/api/data');
  }
}
