export interface Technology {
  icon?: string;
  description?: string;
}

export interface TechnologyGroup {
  description: string;
  technologies: {
    [key: string]: Technology | string[] | { [key: string]: Technology };
  };
}

export interface CreatePromptData {
  platform: 'web' | 'mobile';
  technologies: Record<string, string[]>;
  projectDetails: string;
}

export interface Prompt extends CreatePromptData {
  _id: string;
  createdAt: string;
} 