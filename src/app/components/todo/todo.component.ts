import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm!:FormGroup
  tasks: ITask[] = []
  inprogress:ITask[] = []
  done:ITask[] = []
  updateIndex!:any
  isEditEnable:boolean=false

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    //initialize the form
    this.todoForm = this.fb.group({
      //form control name
      item: ['', Validators.required]
    })
  }

  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset()
  }

  deleteTask(i:number){
    this.tasks.splice(i, 1)   
  }

  deleteInProgressTask(i:number){
    this.inprogress.splice(i, 1)
  }

  deleteDoneTask(i:number){
    this.done.splice(i, 1)
  }

  onEdit(item:ITask, i:number){
    this.todoForm.controls["item"].setValue(item.description)
    this.updateIndex = i
    this.isEditEnable = true
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false
    this.isEditEnable= false
    this.updateIndex= undefined;
    this.todoForm.reset()
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
