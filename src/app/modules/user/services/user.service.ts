import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserI } from '../models/user';
import { UserResetI } from '../models/reset';
import { HttpClient } from '@angular/common/http';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: UserI[] = [];
  public url: string = `${url_base}/json/user.json`;

  constructor(private _http: HttpClient) { 
    this._http.get<any>(this.url).subscribe( data => {
      this.users = data.users;
    });
  }

  saveRecord(data: UserI) {
    let validUser = this.users.find(user => user.userName === data.userName);
    if(validUser){
      return false;
    }else{
      this.users.push(data);
      return true;
    }
  }

  getRecordByUserName(userName: string) {
    return this.users.find(user => user.userName === userName);
  }

  resetPassword(data: UserResetI) {
    return true; 
  }

  changePassword(id: string, password: string, newPassword: string) {
    let userChange = this.users.find(user => user.id === id);
    const index = this.users.findIndex(user => user.id === id);
    if(userChange){
      if(userChange.password === password){
        userChange.password = newPassword;
        this.users[index] = userChange;
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }
  }

  updateRecordStatusAndRole(recordId: string, role: number, isActive: boolean) {
    let userUpdate = this.users.find(user => user.id === recordId);
    const index = this.users.findIndex(user => user.id === recordId);

    if(userUpdate){
      userUpdate.role = role;
      userUpdate.isActive = isActive;
      this.users[index] = userUpdate;
      return true;
    }else{
      return false;
    }
  }

  login(userName: string, password: string){
    const userLogin = this.users.find(user => user.userName === userName && user.password === password);
    if(userLogin) return true;
    return false;
  }

  logout() {
    return true;
  }

  getAllRecords() {
    return this.users;
    // return this._http.get<UserI[]>(this.url)
    //   .pipe(
    //     map(data => {
    //       console.log(data);
    //       this.excludeCurrentUser(data)
    //     })
    //   );
  }

  excludeCurrentUser(data: UserI[]): UserI[] {
    let user = JSON.parse(localStorage.getItem('currentUser')!);
    let res = data.filter(elem => elem.id != user.id);
    return res;
  }

  setUser(user: UserI): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

}
