import { Component, OnInit } from '@angular/core';
import { TodoService } from "./shared/todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todoList: any[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList().snapshotChanges()
    .subscribe(item => {
      this.todoList = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.todoList.push(x);
      })

      //sort all based on the flag
      this.todoList.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    })
  }

  onAdd(str: any){
    this.todoService.addTitle(str.value);
    str.value = null;
  }

  alterCheck($key: string, isChecked: boolean){
    this.todoService.checkOrUncheckTitle($key,!isChecked);

  }

  onDelete($key: string){
    this.todoService.removeTitle($key);

  }
}
