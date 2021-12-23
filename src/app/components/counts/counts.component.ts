import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss']
})
export class CountsComponent implements OnInit {
  studentsCount: any = 0
  teachersCount: any=0
  answersCount: any=0
  questionCount: any=0
  url = environment.url
  constructor(private utilities: UtilitiesService) { }

  ngOnInit(): void {
    this.utilities.http.get(this.url+'/answers/count').subscribe(
      data=>{
        this.answersCount = data
      }
    )
    this.utilities.http.get(this.url+'/questions/count').subscribe(
      data=>{
        this.questionCount = data
      }
    )
  }

}
