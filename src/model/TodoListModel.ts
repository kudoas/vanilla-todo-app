import { EventEmitter } from "../EventEmitter";
import { TodoItemModel } from "./TodoItemModel";

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

  updateCheckedTodo({ id, completed }) {
    const todoItem = this.items.find((todo) => todo.id === id);
    todoItem.completed = completed;
    this.emitChange();
  }

  deleteTodo({ id }) {
    this.items = this.items.filter((todo) => (todo.id = id));
    this.emitChange();
  }
}
