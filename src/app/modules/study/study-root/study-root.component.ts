import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study-root',
  templateUrl: './study-root.component.html',
  styleUrls: ['./study-root.component.less']
})
export class StudyRootComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigateToHomepage() {
    this.router.navigate(['dashboard']);
  }

  exportCSV() {

  }

  exportStudyProtocol(){

  }
}
