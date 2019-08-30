import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [TodoComponent]
})
export class TodoModule { }
