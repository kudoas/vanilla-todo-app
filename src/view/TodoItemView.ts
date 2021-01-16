import { element } from "./html-util";
import { TodoItemModel } from "../model/TodoItemModel";

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

export class TodoItemView {
  /** `todoItem`に対するTodoアイテムのHTML要素を作成して返す */
  createElement(todoItem: TodoItemModel, funcs: CreateElementArgs): Element {
    const todoItemElement = todoItem.id
      ? element`
        <li><input type="checkbox" class="checkbox" checked>
          <s>${todoItem.title}</s>
          <button class="delete">x</button>
        </li>`
      : element`
        <li><input type="checkbox" class="checkbox">
          ${todoItem.title}
          <button class="delete">x</button>
        </li>`;
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      funcs.onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
      });
    });
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      funcs.onDeleteTodo({
        id: todoItem.id,
      });
    });
    return todoItemElement;
  }
}
