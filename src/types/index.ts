export interface ExamScore {
  subject: string;
  score: number;
}

export interface ExamBlock {
  code: string;
  name: string;
  subjects: string[];
}

export interface University {
  id: string;
  name: string;
  location: string;
  type: 'public' | 'private';
}

export interface Major {
  id: string;
  name: string;
  description: string;
  category: string;
  examBlocks: string[];
  universities: {
    universityId: string;
    benchmarkScore: number;
    year: number;
  }[];
  subjects: string[];
  careers: string[];
  icon: string;
  color: string;
}

export interface StudentProfile {
  examScores: ExamScore[];
  examBlock: string;
  interests: string[];
  aptitudes: string[];
  aspirations: {
    preferredRegions: string[];
    universityType: 'public' | 'private' | 'both';
    careerGoals: string[];
  };
}

export interface AssessmentResult {
  recommendedMajors: {
    major: Major;
    matchScore: number;
    suitableUniversities: {
      university: University;
      benchmarkScore: number;
      admissionProbability: 'high' | 'medium' | 'low';
    }[];
  }[];
  totalScore: number;
  examBlockScore: number;
}