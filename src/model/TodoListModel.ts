import { EventEmitter } from "../EventEmitter";
import { TodoItemModel } from "./TodoItemModel";

export type OnUpdateArgs = {
  id: number;
  completed: boolean;
};

export type OnDeleteArgs = {
  id: number;
};

export class TodoListModel extends EventEmitter {
  public items: TodoItemModel[];

  constructor(items = []) {
    super();
    this.items = items;
  }

  getTotalCount(): number {
    return this.items.length;
  }

  getTodoItems(): TodoItemModel[] {
    return this.items;
  }

  onChange(listener: Function) {
    this.addEventListener("change", listener);
  }

  emitChange() {
    this.emit("change");
  }

  addTodo(todoItem: TodoItemModel) {
    this.items.push(todoItem);
    this.emitChange();
  }

  updateCheckedTodo(props: OnUpdateArgs) {
    const { id, completed } = props;
    const todoItem = this.items.find((todo) => todo.id === id);
    todoItem.completed = completed;
    this.emitChange();
  }

  deleteTodo(props: OnDeleteArgs) {
    const { id } = props;
    this.items = this.items.filter((todo) => todo.id !== id);
    this.emitChange();
  }
}
