import { EventEmitter } from "../EventEmitter";
import { TodoItem } from "./TodoItemModel";

export class TodoListModel extends EventEmitter {
  public items: TodoItem[];

  constructor(items = []) {
    super();
    this.items = items;
  }

  getTotalCount(): number {
    return this.items.length;
  }

  getTodoItems(): TodoItem[] {
    return this.items;
  }

  onChange(listener: Function) {
    this.addEventListener("change", listener);
  }

  emitChange() {
    this.emit("change");
  }

  addTodo(todoItem: TodoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }
}
