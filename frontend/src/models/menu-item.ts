export interface IMenueItem {
  id: string;
  title: string;
  children: IMenuItemChild[];
}

interface IMenuItemChild {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: any;
  breadcrumbs: boolean;
}
