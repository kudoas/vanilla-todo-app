export type OnUpdateArgs = {
  id: number;
  completed: boolean;
};

export type OnDeleteArgs = {
  id: number;
};

export interface CreateElementHandler {
  onUpdateTodo: (args: OnUpdateArgs) => void;
  onDeleteTodo: (args: OnDeleteArgs) => void;
}
