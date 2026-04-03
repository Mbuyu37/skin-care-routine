export type SkinType = 'Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'Normal' | 'Not sure';

export interface SkinConcern {
  id: string;
  label: string;
  description: string;
}

export interface AnalysisResult {
  skinType: string;
  healthScore: number;
  confidence: number;
  observations: string[];
  concerns: string[];
  routine: {
    morning: RoutineStep[];
    night: RoutineStep[];
  };
  recommendations: ProductRecommendation[];
  tips: string[];
}

export interface RoutineStep {
  step: string;
  product: string;
  why: string;
  ingredients: string[];
}

export interface ProductRecommendation {
  category: string;
  why: string;
  ingredients: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
