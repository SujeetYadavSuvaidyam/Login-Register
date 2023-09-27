import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000/posts';

  GetAll() {
    return this.http.get(this.apiUrl);
  }
  GetAllRole() {
    return this.http.get('  http://localhost:3000/role');
  }
  Getbycode(code: any) {
    return this.http.get(this.apiUrl + '/' + code)
  }
  Proceedregister(inputdata: any) {
    return this.http.post(this.apiUrl, inputdata)
  }
  Updateuser(code: any, inputdata: any) {
    return this.http.put(this.apiUrl + '/' + code, inputdata)
  }
  IsloggedIn() {
    return sessionStorage.getItem('username') != null
  }
  GetUserrole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : ''
  }
}
