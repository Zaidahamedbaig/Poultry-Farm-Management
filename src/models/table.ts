export interface ITableColumn {
  id: string;
  name: string;
  type?: "action" | "data";
  actions?: Array<Action>;
}

interface Action {
  actionType: ActionTypes;
  handler: (data: any) => void;
}

type ActionTypes = "ADD" | "DELETE" | "EDIT";
