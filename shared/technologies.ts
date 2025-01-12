export interface TechnologyOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  options: TechnologyOption[];
}

export const webSteps: Step[] = [
  // Web adımlarını buraya taşıyın
];

export const mobileSteps: Step[] = [
  // Mobil adımlarını buraya taşıyın
]; 