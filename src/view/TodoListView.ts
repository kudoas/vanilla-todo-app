import { element } from "./html-util";
import { TodoItemModel } from "../model/TodoItemModel";
import { TodoItemView } from "./TodoItemView";

type OnUpdateArgs = {
  id: number;
  completed: boolean;
};

type OnDeleteArgs = {
  id: number;
};

interface CreateElementArgs {
  onUpdateTodo: (args: OnUpdateArgs) => void;
  onDeleteTodo: (args: OnDeleteArgs) => void;
}

export class TodoListView {
  /** `todoItems`に対するTodoリストのHTML要素を作成して返す */
  createElement(todoItems: TodoItemModel[], props: CreateElementArgs): Element {
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
