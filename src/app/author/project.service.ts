import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http:HttpClient) { }
  // url = "http://localhost/PHP/Development/failureboyAPI/api/";
  url = "https://failureboy.com/failureboyAPI/api/";
  newProject(data:any ){
    return this.http.post(this.url+"create.php?project",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  newUser(data:any ){
    return this.http.post(this.url+"create.php?user",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  newUserByImage(data:any ){
    return this.http.post(this.url+"create.php?userByImage",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  
  getProject(){ 
    return this.http.get<any>(this.url+"read.php?project").pipe(map((res:any)=>{
      return res;
    }))
  }

  getUser(){ 
    return this.http.get<any>(this.url+"read.php?user").pipe(map((res:any)=>{
      return res;
    }))
  }

  getOneProject(projectid:number){ 
    return this.http.get<any>(this.url+"single_read.php?project=1&id="+projectid).pipe(map((res:any)=>{
      return res;
    }))
  }

  getOneUser(userid:number){ 
    return this.http.get<any>(this.url+"single_read.php?user=1&id="+userid).pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteProject(projectid:number){
    return this.http.get<any>(this.url+"delete.php?project=1&projectid="+ projectid).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteUser(userid:number){
    return this.http.get<any>(this.url+"delete.php?user=1&userid="+ userid).pipe(map((res:any)=>{
      return res;
    }))
  }
  
  updateProject(data:any,projectid:number,){
    return this.http.post<any>(this.url+"update.php?project=1&id="+projectid, data).pipe(map((res:any)=>{
      return res;
    }))
  }

  updateUser(data:any,userid:number,){
    return this.http.post<any>(this.url+"update.php?user=1&id="+userid, data).pipe(map((res:any)=>{
      return res;
    }))
  }
  isLogin(email:any, password:any){ 
    return this.http.get<any>(this.url+`single_read.php?adminlogin&email=${email}&password=${password}`).pipe(map((res:any)=>{
      return res;
    }))
  }

  addComment(data:any){ 
    return this.http.post<any>(this.url+`comment.php?comment=1`,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  alreadyComment(data:any,id:number){ 
    return this.http.post<any>(`https://myfirstjson.herokuapp.com/comments?id=${id}`,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getComments(projectid:number){ 
      return this.http.get<any>(this.url+`read.php?comment=1&projectid=${projectid}`).pipe(map((res:any)=>{
      return res;
    }))
  }
  fetchComment(id:number){ 
    return this.http.get<any>(this.url+`read.php?comment=1&projectid=${id}`).pipe(map((res:any)=>{
      return res;
    }))
  }
  addReplyComment(data:any){ 
    return this.http.post<any>(this.url+`comment.php?commentreply=1`,data).pipe(map((res:any)=>{
      return res;
    }))
  }  
  getReplyComment(commentid:number){ 
    return this.http.get<any>(this.url+`read.php?commentreply=1&commentid=${commentid}`).pipe(map((res:any)=>{
      return res;
    }))
  }
  syncOneComment(email:any){ 
    return this.http.get<any>(`https://myfirstjson.herokuapp.com/comments/?email=${email}`).pipe(map((res:any)=>{
      return res;
    }))
  }
  getCountReplies(commentid:any){ 
    return this.http.get<any>(`https://myfirstjson.herokuapp.com/repliesComment?commentid=${commentid}&_sort=id&_order=desc`).pipe(map((res:any)=>{
      return res;
    }))
  }

}

