import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }
sendEmail(name:string){
  alert("Hey "+ name + "\n\nYour Email is has been sent,\nWe will be contact soon as possible :)");
}
  ngOnInit(): void {
  }

}
