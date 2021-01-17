import { App } from "./src/App";

const inputElement = document.getElementById("js-form-input") as HTMLInputElement;
const containerElement = document.getElementById("js-todo-list");
const todoItemCountElement = document.getElementById("js-todo-count");
const formElement = document.getElementById("js-form");

const app = new App({
  inputElement: inputElement,
  containerElement: containerElement,
  todoItemCountElement: todoItemCountElement,
  formElement: formElement,
});

window.addEventListener("load", () => {
  app.mount();
});
