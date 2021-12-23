import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service'

@Component({
  selector: 'app-search-tutorials',
  templateUrl: './search-tutorials.component.html',
  styleUrls: ['./search-tutorials.component.scss']
})
export class SearchTutorialsComponent implements OnInit {
  searchText: any=''
  isVisible = false;
  isConfirmLoading = false;
  results = []
  constructor(private utilities:UtilitiesService) { }

  ngOnInit(): void {
  }

  async search() {
    this.utilities.loadScreen()
    let x  = await this.utilities.graphqlRequests(this.utilities
      .queries.getSearchTutorials(this.searchText));
    this.results = x.data?.blogs || []
    // open page for tutorials
    // this.showModal() ;
    this.utilities.stopLoadScreen()
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
