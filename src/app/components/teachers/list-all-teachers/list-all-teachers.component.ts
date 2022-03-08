import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-list-all-teachers',
  templateUrl: './list-all-teachers.component.html',
  styleUrls: ['./list-all-teachers.component.scss']
})
export class ListAllTeachersComponent implements OnInit {
  teachers = [];
  api='/teachers'
  constructor(private utilities: UtilitiesService) { }

  ngOnInit(): void {
  }
  async getNewPaginated(url){
    // console.log(url)
    this.teachers= await this.utilities.httpRequest({method:'get',api:url})
    console.log(this.teachers)
  }

}
