import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((item) => item.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    const attributes = { ...task, reminder: !task.reminder };
    this.taskService.editTask(attributes).subscribe(
      (editTask) =>
        (this.tasks = this.tasks.map((item) => {
          if (item.id === editTask.id) {
            return {
              ...item,
              ...editTask,
            };
          }
          return item;
        }))
    );
  }

  addTask(task: Task) {
    this.taskService
      .addTask(task)
      .subscribe((newTask) => (this.tasks = [...this.tasks, newTask]));
  }
}
