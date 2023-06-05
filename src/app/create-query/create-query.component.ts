import {Component, OnInit} from '@angular/core';
import {IAction, ITable} from "../queries/queries.service";
import {AppsService} from "../queries/apps.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
  tables?: ITable[]
  table?:ITable
  action?:IAction
  queryForm = this.fb.group({
    password: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private appsService: AppsService
  ) {
  }

  setTable(table: ITable) {
    this.table = table
  }
  createQuery(){

  }

  ngOnInit(): void {
    this.appsService.getTables().subscribe(({data}) => {
      this.tables = data
    })
  }

  setAction(action: IAction) {
    this.action = action
  }
}
