import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult, StudentProfile } from "@/types";
import { Trophy, School, Target, TrendingUp, MapPin, CheckCircle } from "lucide-react";

interface ResultsProps {
  results: AssessmentResult;
  profile: StudentProfile;
  onRestart: () => void;
}

const Results = ({ results, profile, onRestart }: ResultsProps) => {
  const getProbabilityColor = (probability: 'high' | 'medium' | 'low') => {
    switch (probability) {
      case 'high': return 'bg-success text-white';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
    }
  };

  const getProbabilityText = (probability: 'high' | 'medium' | 'low') => {
    switch (probability) {
      case 'high': return 'Cao';
      case 'medium': return 'Trung bình';
      case 'low': return 'Thấp';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* DSS Analysis Header */}
      <Card className="shadow-strong border-education-blue/20 bg-gradient-education">
        <CardHeader className="text-center text-white">
          <div className="mx-auto mb-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl mb-2">Kết Quả Phân Tích DSS</CardTitle>
          <CardDescription className="text-lg text-white/90">
            Hệ thống đã phân tích <strong className="text-yellow-200">{profile.examBlock}</strong> với tổng điểm: 
            <strong className="text-yellow-200 text-xl ml-2">{results.totalScore.toFixed(2)}</strong>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Recommended Majors */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Target className="mr-2 text-primary" />
          Ngành Học Phù Hợp Nhất
        </h2>
        
        {results.recommendedMajors.map((recommendation, index) => (
          <Card key={recommendation.major.id} className="shadow-medium hover:shadow-strong transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    #{index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-primary">
                      {recommendation.major.name}
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      {recommendation.major.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-success">
                    {recommendation.matchScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Độ phù hợp</div>
                </div>
              </div>
              <Progress value={recommendation.matchScore} className="mt-4" />
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Subjects */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <School className="h-4 w-4 mr-2" />
                  Môn Học Chính
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.major.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Career Opportunities */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Cơ Hội Nghề Nghiệp
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {recommendation.major.careers.map((career) => (
                    <div key={career} className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-success mr-2 flex-shrink-0" />
                      {career}
                    </div>
                  ))}
                </div>
              </div>

              {/* Universities */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <School className="h-4 w-4 mr-2" />
                  Trường Đại Học Phù Hợp & Tài Nguyên Học Tập
                </h4>
                <div className="space-y-3">
                  {recommendation.suitableUniversities.slice(0, 3).map((uni) => (
                    <div key={uni.university.id} className="flex items-center justify-between p-4 bg-muted rounded-lg border border-education-blue/10">
                      <div className="flex-1">
                        <div className="font-medium text-education-blue">{uni.university.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {uni.university.location}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            Thông tin tuyển sinh
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            Chương trình đào tạo
                          </Button>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm font-medium">
                          Điểm chuẩn: <span className="text-education-blue font-bold">{uni.benchmarkScore}</span>
                        </div>
                        <Badge 
                          variant="secondary"
                          className={getProbabilityColor(uni.admissionProbability)}
                        >
                          Xác suất: {getProbabilityText(uni.admissionProbability)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DSS Summary & Actions */}
      <Card className="shadow-medium border-education-yellow/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-education-blue">
              Tóm Tắt Phân Tích DSS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-education-light rounded-lg">
                <div className="font-semibold text-education-blue">Khối Thi</div>
                <div>{profile.examBlock}</div>
              </div>
              <div className="p-3 bg-education-light rounded-lg">
                <div className="font-semibold text-education-blue">Điểm Số</div>
                <div>{results.totalScore.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-education-light rounded-lg">
                <div className="font-semibold text-education-blue">Sở Thích</div>
                <div>{profile.interests.length} lĩnh vực</div>
              </div>
              <div className="p-3 bg-education-light rounded-lg">
                <div className="font-semibold text-education-blue">Ngành Đề Xuất</div>
                <div>{results.recommendedMajors.length} ngành</div>
              </div>
            </div>
            <Button variant="hero" size="lg" onClick={onRestart} className="mt-6">
              Chạy Lại Mô Hình DSS
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;