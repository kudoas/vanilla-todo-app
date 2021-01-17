import { TodoListModel } from "./model/TodoListModel";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListView } from "./view/TodoListView";
import { OnUpdateArgs, OnDeleteArgs } from "./view/types";
import { render } from "./view/html-util";

export class App {
  public todoListModel: TodoListModel;
  public todoListView: TodoListView;
  public inputElement: HTMLInputElement;
  public containerElement: HTMLElement;
  public todoItemCountElement: HTMLElement;
  public formElement: HTMLElement;
  constructor() {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
    this.inputElement = document.getElementById("js-form-input") as HTMLInputElement;
    this.containerElement = document.getElementById("js-todo-list");
    this.todoItemCountElement = document.getElementById("js-todo-count");
    this.formElement = document.getElementById("js-form");
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (this.inputElement.value !== "") {
      this.handleAdd(this.inputElement.value.trim());
    }
    this.inputElement.value = "";
  }

  handleChange() {
    const todoItems = this.todoListModel.getTodoItems();
    const todoListElement = this.todoListView.createElement(todoItems, {
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdateChecked({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    render(todoListElement, this.containerElement);
    this.todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
  }

  mount() {
    this.todoListModel.onChange(this.handleChange);
    this.formElement.addEventListener("submit", this.handleSubmit);
  }
}
