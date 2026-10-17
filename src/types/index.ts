export interface Project {
  id: string;
  title: string;
  /** i18n key prefix: `${key}-cat`, `${key}-desc` */
  key: string;
  image?: string;
  url: string;
  tags: string[];
  /** Tint used by the typographic cover when no screenshot exists yet */
  tint: string;
  featured?: boolean;
}

export interface Discipline {
  number: string;
  key: string;
  tags: string[];
}

export interface FAQItem {
  questionKey: string;
  answerKey: string;
}

export interface Social {
  name: string;
  url: string;
}
