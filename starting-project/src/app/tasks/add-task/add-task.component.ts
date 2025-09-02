import { Component, inject, input, output, signal } from '@angular/core';

import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  userId = input.required<string>();

  close = output<void>();

  private tasksService = inject(TasksService);

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDueDate = signal('');

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        dueDate: this.enteredDueDate(),
      },
      this.userId()
    );
    this.close.emit();
  }
}
