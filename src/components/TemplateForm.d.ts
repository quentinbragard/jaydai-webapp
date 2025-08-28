export interface Template {
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  folder_id?: string | null;
  is_free?: boolean;
}

export interface Folder {
  id: string;
  title?: string;
}

export function TemplateForm(props: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  template?: Template | null;
  folders?: Folder[];
  onSubmit: (data: Partial<Template> & Record<string, unknown>) => void;
}): JSX.Element;

