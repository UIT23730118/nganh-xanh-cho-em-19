import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, ChevronLeft, BookOpen, Target, Heart, MapPin } from "lucide-react";
import ScoreInput from "./ScoreInput";
import Results from "./Results";
import { StudentProfile, ExamScore } from "@/types";
import { examBlocks, interests, aptitudes } from "@/data/universities";
import { calculateAssessmentResults } from "@/utils/calculations";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>({
    examScores: [],
    examBlock: '',
    interests: [],
    aptitudes: [],
    aspirations: {
      preferredRegions: [],
      universityType: 'both',
      careerGoals: []
    }
  });

  const steps = [
    { title: "Khối Thi & Điểm Số", icon: BookOpen },
    { title: "Sở Thích", icon: Heart },
    { title: "Năng Khiếu", icon: Target },
    { title: "Nguyện Vọng", icon: MapPin }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const results = calculateAssessmentResults(profile);
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setShowResults(false);
    setProfile({
      examScores: [],
      examBlock: '',
      interests: [],
      aptitudes: [],
      aspirations: {
        preferredRegions: [],
        universityType: 'both',
        careerGoals: []
      }
    });
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Khối thi & điểm số
        return profile.examBlock && profile.examScores.length >= 3;
      case 1: // Sở thích
        return profile.interests.length > 0;
      case 2: // Năng khiếu
        return profile.aptitudes.length > 0;
      case 3: // Nguyện vọng
        return true; // Optional step
      default:
        return false;
    }
  };

  if (showResults) {
    const results = calculateAssessmentResults(profile);
    return (
      <section id="assessment" className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-6">
          <Results results={results} profile={profile} onRestart={handleRestart} />
        </div>
      </section>
    );
  }

  return (
    <section id="assessment" className="py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-education rounded-full flex items-center justify-center shadow-glow">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-education bg-clip-text text-transparent">
            Mô Hình DSS - Thu Thập Dữ Liệu
          </h2>
          <p className="text-xl text-muted-foreground">
            Hệ thống Decision Support System sẽ phân tích <strong>điểm thi, sở thích, năng khiếu và nguyện vọng</strong> 
            để đưa ra kết quả tư vấn tối ưu
          </p>
        </div>

        <Card className="shadow-strong animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardDescription>
                Bước {currentStep + 1} / {steps.length}: {steps[currentStep].title}
              </CardDescription>
              <div className="text-sm font-medium">{Math.round(progress)}%</div>
            </div>
            <Progress value={progress} className="mb-6" />
            
            <div className="flex items-center space-x-3">
              {(() => {
                const IconComponent = steps[currentStep].icon;
                return <IconComponent className="h-6 w-6 text-primary" />;
              })()}
              <CardTitle className="text-2xl">
                {steps[currentStep].title}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 0: Exam Block & Scores */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="text-base font-semibold mb-3 block">
                    Chọn khối thi của bạn:
                  </label>
                  <Select 
                    value={profile.examBlock} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, examBlock: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn khối thi đại học" />
                    </SelectTrigger>
                    <SelectContent>
                      {examBlocks.map((block) => (
                        <SelectItem key={block.code} value={block.code}>
                          {block.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {profile.examBlock && (
                  <ScoreInput
                    scores={profile.examScores}
                    onScoresChange={(scores) => setProfile(prev => ({ ...prev, examScores: scores }))}
                    selectedBlock={profile.examBlock}
                  />
                )}
              </div>
            )}

            {/* Step 1: Interests */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-base text-muted-foreground mb-4">
                  Chọn những lĩnh vực bạn quan tâm (có thể chọn nhiều):
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent transition-colors">
                      <Checkbox
                        id={interest}
                        checked={profile.interests.includes(interest)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProfile(prev => ({ 
                              ...prev, 
                              interests: [...prev.interests, interest] 
                            }));
                          } else {
                            setProfile(prev => ({ 
                              ...prev, 
                              interests: prev.interests.filter(i => i !== interest) 
                            }));
                          }
                        }}
                      />
                      <label htmlFor={interest} className="text-sm font-medium cursor-pointer">
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Aptitudes */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-base text-muted-foreground mb-4">
                  Chọn những năng khiếu bạn tự nhận thấy mạnh (có thể chọn nhiều):
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aptitudes.map((aptitude) => (
                    <div key={aptitude} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent transition-colors">
                      <Checkbox
                        id={aptitude}
                        checked={profile.aptitudes.includes(aptitude)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProfile(prev => ({ 
                              ...prev, 
                              aptitudes: [...prev.aptitudes, aptitude] 
                            }));
                          } else {
                            setProfile(prev => ({ 
                              ...prev, 
                              aptitudes: prev.aptitudes.filter(a => a !== aptitude) 
                            }));
                          }
                        }}
                      />
                      <label htmlFor={aptitude} className="text-sm font-medium cursor-pointer">
                        {aptitude}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Aspirations */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="text-base font-semibold mb-3 block">
                    Khu vực bạn muốn học đại học:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Khác"].map((region) => (
                      <div key={region} className="flex items-center space-x-2">
                        <Checkbox
                          id={region}
                          checked={profile.aspirations.preferredRegions.includes(region)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setProfile(prev => ({ 
                                ...prev, 
                                aspirations: {
                                  ...prev.aspirations,
                                  preferredRegions: [...prev.aspirations.preferredRegions, region]
                                }
                              }));
                            } else {
                              setProfile(prev => ({ 
                                ...prev, 
                                aspirations: {
                                  ...prev.aspirations,
                                  preferredRegions: prev.aspirations.preferredRegions.filter(r => r !== region)
                                }
                              }));
                            }
                          }}
                        />
                        <label htmlFor={region} className="text-sm">{region}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-base font-semibold mb-3 block">
                    Loại trường đại học ưu tiên:
                  </label>
                  <Select 
                    value={profile.aspirations.universityType} 
                    onValueChange={(value: 'public' | 'private' | 'both') => 
                      setProfile(prev => ({ 
                        ...prev, 
                        aspirations: { ...prev.aspirations, universityType: value }
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">Cả công lập và tư thục</SelectItem>
                      <SelectItem value="public">Trường công lập</SelectItem>
                      <SelectItem value="private">Trường tư thục</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2" />
                Quay Lại
              </Button>
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                {currentStep === steps.length - 1 ? 'Xem Kết Quả' : 'Tiếp Theo'}
                <ChevronRight className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Assessment;