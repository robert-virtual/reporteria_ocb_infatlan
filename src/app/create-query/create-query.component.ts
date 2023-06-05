import {Component, OnInit} from '@angular/core';
import {IAction, ITable} from "../queries/queries.service";
import {AppsService} from "../queries/apps.service";
import {FormBuilder, Validators} from "@angular/forms";
import {take} from "rxjs";

interface ICondition {
  field:string
  value:string
}

@Component({
  selector: 'app-create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
  tables?: ITable[]
  table?: ITable
  action?: IAction
  queryForm = this.fb.group(this.getProps())
  whereForm = this.fb.group(this.getWhereProps())
  conditions: ICondition[] = [{field: "field1", value: ""}]
   operator?: string;

  getWhereProps() {
    const res: any = {}
    this.conditions?.forEach((e) => {
      res[e.field] = ['']
    })
    return res
  }
  getProps() {
    const res: any = {}
    this.table?.fields.forEach((e) => {
      res[e.name] = [e.type == "radio" ? false : e.type == "number" ? 0 : ""]
    })
    return res
  }

  constructor(
    private fb: FormBuilder,
    private appsService: AppsService
  ) {
  }

  setTable(table: ITable) {
    this.table = table
    this.queryForm = this.fb.group(this.getProps())
  }

  createQuery() {

  }

  ngOnInit(): void {
    this.appsService.getTables().subscribe(({data}) => {
      this.tables = data
    })
  }

  setAction(action: IAction) {
    this.action = action
  }

  addCondition() {
    this.conditions.push({field: "field2", value: ""})
  }

  removeCondition(condition: ICondition) {
    this.conditions = this.conditions?.filter((e) => e != condition)
  }

  setOperator(operator:string) {
   this.operator = operator
  }
}
