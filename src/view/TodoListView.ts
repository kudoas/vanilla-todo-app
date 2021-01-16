import { element } from "./html-util";
import { TodoItemModel } from "../model/TodoItemModel";
import { TodoItemView } from "./TodoItemView";
import { CreateElementHandler } from "./types";

export class TodoListView {
  /** `todoItems`に対するTodoリストのHTML要素を作成して返す */
  createElement(todoItems: TodoItemModel[], props: CreateElementHandler): Element {
    const { onDeleteTodo, onUpdateTodo } = props;
    const todoListElement = element`<ul />`;
    todoItems.forEach((todoItem) => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onDeleteTodo,
        onUpdateTodo,
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
