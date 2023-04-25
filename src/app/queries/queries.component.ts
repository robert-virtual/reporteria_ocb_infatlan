import {Component, OnInit} from '@angular/core';
import {IQuery, QueriesService} from "./queries.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {
  queries?: IQuery[]

  constructor(private queriesService: QueriesService) {
  }

  setStatuses(status?: string) {
    this.queriesService.getQueries(status ? [{status}] : undefined).subscribe(({data}) => {
      this.queries = data
    })
  }

  ngOnInit(): void {
    this.queriesService.getQueries([{page:0},{size:10}]).subscribe(({data}) => {
      this.queries = data
    })
  }

  page(event: PageEvent) {
    this.queriesService.getQueries([{page: event.pageIndex}, {size: event.pageSize}]).subscribe(({data}) => {
      this.queries = data
    })
  }
}
