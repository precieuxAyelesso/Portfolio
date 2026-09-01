export interface Project {
  id: string;
  title: string;
  descKey: string;
  altKey: string;
  titleKey: string;
  image: string;
  url: string;
  tags: string[];
}

export interface Skill {
  icon: string;
  titleKey: string;
  descKey: string;
  tags: string[];
  accentTags?: string[];
}

export interface Service {
  number: string;
  icon: string;
  titleKey: string;
  descKey: string;
}

export interface FAQItem {
  questionKey: string;
  answerKey: string;
}

export interface Social {
  name: string;
  icon: string;
  url: string;
  label: string;
}
