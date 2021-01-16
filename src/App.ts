import { TodoListModel } from "./model/TodoListModel";
import { TodoItemModel } from "./model/TodoItemModel";
import { element, render } from "./view/html-util";

export class App {
  public todoListModel: TodoListModel;
  constructor() {
    this.todoListModel = new TodoListModel();
  }

  mount() {
    const formElement = document.getElementById("js-form");
    const inputElement = document.getElementById("js-form-input") as HTMLInputElement;
    const containerElement = document.getElementById("js-todo-list");
    const todoItemCountElement = document.getElementById("js-todo-count");

    // TodoListModelの状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      const todoListElement = element`<ul/>`;
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach((item) => {
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
          : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
          this.todoListModel.updateCheckedTodo({
            id: item.id,
            completed: !item.completed,
          });
        });
        todoListElement.appendChild(todoItemElement);
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    // フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        }),
      );
      inputElement.value = "";
    });
  }
}
