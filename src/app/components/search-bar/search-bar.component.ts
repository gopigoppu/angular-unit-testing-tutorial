import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchContainer: boolean;
  searchData: any;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }

  searchRepo(searchQuery) {
    console.log(searchQuery);

    if (!searchQuery) {
      return;
    }
    this.apiService.getRepos(searchQuery).subscribe((data: any) => {
      console.log(data.items);
      this.searchContainer = true;
      if (data.items.length > 0) {
        this.searchData = data.items;
      } else {
        this.searchData = null;
      }

    });

  }
}
