export interface Template {
  id: string;
  title?: string;
  description?: string;
  content?: string;
  folder_id?: string | null;
  created_at?: string;
  is_free?: boolean;
  usage_count?: number;
}

export interface Folder {
  id: string;
  title?: string;
}

export function TemplateList(props: {
  templates?: Template[];
  folders?: Folder[];
  onEdit: (t: Template) => void;
  onDelete: (id: string) => void;
}): JSX.Element;

