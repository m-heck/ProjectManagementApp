import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }
  url = '../../golang-database/users/newUsers';
  //url = '/newUsers';
  //url = 'http://localhost:3000/project-management-app';

  submitUser(name: string, phone: string, email: string, password: string, code: string) {
    const data = {
      name: name,
      phone: phone,
      email: email,
      password: password,
      code: code
    };
    return this.http.post(this.url, data);
  }

  submitTeam(tname: string, code: string) {
    const data = {
      name: tname,
      code: code
    };
    return this.http.post(this.url, data);
  }

  getDisplayNames() {
    return this.http.get('/api/data');
  }
}
