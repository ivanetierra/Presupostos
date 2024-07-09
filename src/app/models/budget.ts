export interface Selection {
  numPages: number;
  numLanguages: number;
  seo: boolean;
  web: boolean;
  ads: boolean;
}

export interface Contact {
  name?: string;
  email?: string;
  phone?: string;
}

export interface Budget {
  selection: Selection;
  contact: Contact;
  total?: number;
  date?: Date;
}
