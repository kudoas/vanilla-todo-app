import { TodoListModel } from "./model/TodoListModel";
import { TodoItemModel } from "./model/TodoItemModel";
import { TodoListView } from "./view/TodoListView";
import { OnUpdateArgs, OnDeleteArgs } from "./view/types";
import { render } from "./view/html-util";
import { parseConfigFileTextToJson } from "typescript";

interface Props {
  inputElement: HTMLInputElement;
  containerElement: HTMLElement;
  todoItemCountElement: HTMLElement;
  formElement: HTMLElement;
}

export class App {
  public todoListModel: TodoListModel;
  public todoListView: TodoListView;
  public inputElement: HTMLInputElement;
  public containerElement: HTMLElement;
  public todoItemCountElement: HTMLElement;
  public formElement: HTMLElement;
  constructor(props: Props) {
    const { inputElement, containerElement, todoItemCountElement, formElement } = props;
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
    this.inputElement = inputElement;
    this.containerElement = containerElement;
    this.todoItemCountElement = todoItemCountElement;
    this.formElement = formElement;
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

  unmount() {
    this.todoListModel.offChange(this.handleChange);
    this.formElement.removeEventListener("submit", this.handleSubmit);
  }
}
