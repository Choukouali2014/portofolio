import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router) { }
  images = [1, 2, 3].map(() => `https://picsum.photos/1264/512?random&t=${Math.random()}`);
  ngOnInit() {
    
  }
  open(){
    this.router.navigate(['employees/create']);
  }

}
