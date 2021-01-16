import { TodoListModel } from "./model/TodoListModel";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListView } from "./view/TodoListView";
import { OnUpdateArgs, OnDeleteArgs } from "./view/types";
import { render } from "./view/html-util";

export class App {
  public todoListModel: TodoListModel;
  public todoListView: TodoListView;
  constructor() {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
  }

  handleAdd(title: string) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  handleUpdateChecked(props: OnUpdateArgs) {
    const { id, completed } = props;
    this.todoListModel.updateCheckedTodo({ id, completed });
  }

  handleDelete(props: OnDeleteArgs) {
    const { id } = props;
    this.todoListModel.deleteTodo({ id });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const inputElement = document.getElementById("js-form-input") as HTMLInputElement;
    if (inputElement.value !== "") {
      this.handleAdd(inputElement.value.trim());
    }
    inputElement.value = "";
  }

  handleChange() {
    const todoItems = this.todoListModel.getTodoItems();
    const todoListView = new TodoListView();
    const containerElement = document.getElementById("js-todo-list");
    const todoItemCountElement = document.getElementById("js-todo-count");
    const todoListElement = todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdateChecked({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    render(todoListElement, containerElement);
    todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
  }

  mount() {
    const formElement = document.getElementById("js-form");

    this.todoListModel.onChange(() => {
      this.handleChange();
    });

    formElement.addEventListener("submit", (event) => {
      this.handleSubmit(event);
    });
  }
}
