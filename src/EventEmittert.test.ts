import { EventEmitter } from "./EventEmitter";

test("subscribe and dispatch event emitter", () => {
  const event = new EventEmitter();
  event.addEventListener("test-event", () => console.log("test1"));
  event.addEventListener("test-event", () => console.log("test2"));
  const toBe1 = () => {
    console.log("test1");
    console.log("test2");
  };
  expect(event.emit("test-event")).toStrictEqual(toBe1());
});

test("remove event listener", () => {
  const event = new EventEmitter();
  event.addEventListener("test-event", () => console.log("test1"));
  event.addEventListener("test-event", () => console.log("test2"));
  event.removeEventListener("test-event", () => console.log("test1"));
  const toBe = () => {
    console.log("test2");
  };
  expect(event.emit("test-event")).toBe(toBe());
});
