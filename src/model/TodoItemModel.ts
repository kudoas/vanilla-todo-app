let todoIdx = 0;

export interface TodoItem {
  title: string;
  completed: boolean;
}

export class TodoItemModel {
  public id: number;
  public title: string;
  public completed: boolean;

  constructor(init: TodoItem) {
    this.id = todoIdx++;
    this.title = init.title;
    this.completed = init.completed;
  }
}
