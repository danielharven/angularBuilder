import { Component, Input, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../services/utilities.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-related-tutorials',
  templateUrl: './related-tutorials.component.html',
  styleUrls: ['./related-tutorials.component.scss']
})
export class RelatedTutorialsComponent implements OnInit {
  @Input('tutorial') tut :any ={}
  results: any=[]
  constructor(private utilities:UtilitiesService, private router:Router) { }

  ngOnInit(): void {
    this.getRelated()
  }
  async getRelated(){
    let x  = await this.utilities.graphqlRequests(this.utilities
      .queries.getRelatedTutorials(this.tut?.topic?.id));
    this.results = x.data?.blogs || []
  }

  moveToTutorial(id: any, slug: any) {
    setTimeout(()=>{
      this.router.navigate([`/tutorial/view/${id}/${slug}`])
    },400)
    this.router.navigate([`/loading`])
  }
}
