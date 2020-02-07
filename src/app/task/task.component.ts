import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { ActivatedRoute } from '@angular/router';
// import { resolve } from 'dns';
// import { resolve } from 'path';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  public todos;
  public activeTasks;
  public newTodo;
  public path;

  constructor(public taskSevice: TaskService, public route: ActivatedRoute) { }

  addTodo() {
    this.taskSevice.add({ title: this.newTodo, isDone: false }).then(() => {
      return this.getTodos();
    }).then(() => {
      this.newTodo = '';
    });
  }



  updateTodo(todo, newValue) {
    todo.title = newValue;
    return this.taskSevice.put(todo).then(()  => {
      todo.editing = false;
      return this.getTodos();
    });
  }

  destroyTodo(todo) {
    this.taskSevice.delete(todo).then(() => {
      return this.getTodos();
    });
  }
  
  

  getTodos(query = '') {
    return this.taskSevice.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
    });
  }

  clearCompleted() {
    this.taskSevice.deleteCompleted().then(() => {
      return this.getTodos();
    });
  }

  toggleTodo(toggle) {
    this.taskSevice.toggle(toggle).then(() => {
      return this.getTodos;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
    
  }

}
