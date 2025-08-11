import { StudentProfile, AssessmentResult, ExamScore } from "@/types";
import { majors, universities, examBlocks } from "@/data/universities";

export const calculateExamBlockScore = (scores: ExamScore[], blockCode: string): number => {
  const block = examBlocks.find(b => b.code === blockCode);
  if (!block) return 0;

  const blockScores = block.subjects.map(subject => {
    const score = scores.find(s => s.subject === subject);
    return score ? score.score : 0;
  });

  return blockScores.reduce((sum, score) => sum + score, 0);
};

export const calculateMatchScore = (profile: StudentProfile, majorId: string): number => {
  const major = majors.find(m => m.id === majorId);
  if (!major) return 0;

  let matchScore = 0;

  // Điểm khối thi (40% trọng số)
  const examBlockScore = calculateExamBlockScore(profile.examScores, profile.examBlock);
  const examBlockMatch = major.examBlocks.includes(profile.examBlock) ? 1 : 0;
  matchScore += examBlockMatch * 0.4;

  // Sở thích (30% trọng số)
  const interestMatch = profile.interests.some(interest => 
    major.subjects.some(subject => 
      subject.toLowerCase().includes(interest.toLowerCase()) ||
      interest.toLowerCase().includes(major.category)
    )
  ) ? 1 : 0;
  matchScore += interestMatch * 0.3;

  // Năng khiếu (20% trọng số)
  const aptitudeMatch = profile.aptitudes.length > 0 ? 0.8 : 0.5;
  matchScore += aptitudeMatch * 0.2;

  // Nguyện vọng (10% trọng số)
  const aspirationMatch = major.universities.some(uni => {
    const university = universities.find(u => u.id === uni.universityId);
    if (!university) return false;
    
    const regionMatch = profile.aspirations.preferredRegions.length === 0 || 
      profile.aspirations.preferredRegions.includes(university.location);
    
    const typeMatch = profile.aspirations.universityType === 'both' ||
      profile.aspirations.universityType === university.type;
    
    return regionMatch && typeMatch;
  }) ? 1 : 0;
  matchScore += aspirationMatch * 0.1;

  return Math.round(matchScore * 100);
};

export const getAdmissionProbability = (
  studentScore: number, 
  benchmarkScore: number
): 'high' | 'medium' | 'low' => {
  const difference = studentScore - benchmarkScore;
  
  if (difference >= 1.5) return 'high';
  if (difference >= 0) return 'medium';
  return 'low';
};

export const calculateAssessmentResults = (profile: StudentProfile): AssessmentResult => {
  const examBlockScore = calculateExamBlockScore(profile.examScores, profile.examBlock);
  
  const recommendedMajors = majors.map(major => {
    const matchScore = calculateMatchScore(profile, major.id);
    
    const suitableUniversities = major.universities
      .map(uni => {
        const university = universities.find(u => u.id === uni.universityId);
        if (!university) return null;
        
        return {
          university,
          benchmarkScore: uni.benchmarkScore,
          admissionProbability: getAdmissionProbability(examBlockScore, uni.benchmarkScore)
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        // Ưu tiên những trường có xác suất đỗ cao hơn
        const probabilityOrder = { high: 3, medium: 2, low: 1 };
        return probabilityOrder[b!.admissionProbability] - probabilityOrder[a!.admissionProbability];
      }) as AssessmentResult['recommendedMajors'][0]['suitableUniversities'];

    return {
      major,
      matchScore,
      suitableUniversities
    };
  })
  .filter(result => result.matchScore > 30) // Chỉ hiển thị những ngành có độ phù hợp > 30%
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 6); // Top 6 ngành phù hợp nhất

  return {
    recommendedMajors,
    totalScore: examBlockScore,
    examBlockScore
  };
};