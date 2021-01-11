import { element } from "./view/html-util";

export class App {
  mount() {
    const formElement = document.getElementById("js-form");
    const inputElement = <HTMLInputElement>document.getElementById("js-form-input");
    const containerElement = document.getElementById("js-todo-list");
    const todoItemCountElement = document.getElementById("js-todo-count");

    let todoItemCount = 0;
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      containerElement.appendChild(todoItemElement);
      todoItemCount++;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      inputElement.value = "";
    });
  }
}
