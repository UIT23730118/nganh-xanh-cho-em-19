import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult, StudentProfile } from "@/types";
import { 
  Trophy, School, Target, TrendingUp, MapPin, CheckCircle, 
  BarChart3, PieChart, Calendar, BookOpen, Users, Award,
  Star, Lightbulb, Brain, Heart, Briefcase, GraduationCap
} from "lucide-react";

interface DetailedReportProps {
  results: AssessmentResult;
  profile: StudentProfile;
  onRestart: () => void;
}

const DetailedReport = ({ results, profile, onRestart }: DetailedReportProps) => {
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

  const getScoreAnalysis = (score: number) => {
    if (score >= 24) return { level: "Xuất sắc", color: "text-success", description: "Điểm số rất cao, có nhiều lựa chọn ngành học" };
    if (score >= 20) return { level: "Khá", color: "text-primary", description: "Điểm số tốt, phù hợp với nhiều ngành" };
    if (score >= 16) return { level: "Trung bình", color: "text-warning", description: "Điểm số ổn, cần cân nhắc kỹ lựa chọn" };
    return { level: "Cần cải thiện", color: "text-destructive", description: "Nên xem xét các phương án học tập khác" };
  };

  const scoreAnalysis = getScoreAnalysis(results.totalScore);

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* 1. Tóm Tắt Tổng Quan */}
      <Card className="shadow-strong border-education-blue/20 bg-gradient-education">
        <CardHeader className="text-center text-white">
          <div className="mx-auto mb-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl mb-2">Báo Cáo Tư Vấn Chọn Ngành Chi Tiết</CardTitle>
          <CardDescription className="text-lg text-white/90">
            Phân tích DSS cho thí sinh - Khối <strong className="text-yellow-200">{profile.examBlock}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold text-yellow-200">{results.totalScore.toFixed(2)}</div>
              <div className="text-sm opacity-90">Tổng Điểm</div>
              <div className={`text-sm font-medium ${scoreAnalysis.color.replace('text-', 'text-yellow-')}`}>
                {scoreAnalysis.level}
              </div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold text-yellow-200">{results.recommendedMajors.length}</div>
              <div className="text-sm opacity-90">Ngành Phù Hợp</div>
              <div className="text-sm">Đề xuất từ DSS</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold text-yellow-200">{profile.interests.length}</div>
              <div className="text-sm opacity-90">Sở Thích</div>
              <div className="text-sm">Lĩnh vực quan tâm</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Phân Tích Hồ Sơ Thí Sinh */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Users className="mr-2 text-primary" />
            Phân Tích Hồ Sơ Thí Sinh
          </CardTitle>
          <CardDescription>Đánh giá chi tiết về năng lực và định hướng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Điểm số theo môn */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Điểm Số Theo Môn
              </h4>
              {profile.examScores.map((score) => (
                <div key={score.subject} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{score.subject}</span>
                    <span className="font-medium">{score.score.toFixed(1)}</span>
                  </div>
                  <Progress value={(score.score / 10) * 100} className="h-2" />
                </div>
              ))}
            </div>

            {/* Phân tích điểm */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <PieChart className="h-4 w-4 mr-2" />
                Đánh Giá Tổng Quan
              </h4>
              <div className="p-4 bg-muted rounded-lg">
                <div className={`text-lg font-bold ${scoreAnalysis.color} mb-2`}>
                  {scoreAnalysis.level}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {scoreAnalysis.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Khối thi:</span>
                    <Badge variant="secondary">{profile.examBlock}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Điểm trung bình:</span>
                    <span className="font-medium">{(results.totalScore / profile.examScores.length).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Sở Thích và Năng Khiếu */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Heart className="mr-2 text-primary" />
            Sở Thích và Năng Khiếu
          </CardTitle>
          <CardDescription>Phân tích về định hướng cá nhân</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Sở Thích Cá Nhân
              </h4>
              <div className="space-y-2">
                {profile.interests.map((interest, index) => (
                  <div key={index} className="flex items-center p-3 bg-education-light rounded-lg">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                Năng Khiếu Đặc Biệt
              </h4>
              <div className="space-y-2">
                {profile.aptitudes.length > 0 ? (
                  profile.aptitudes.map((aptitude, index) => (
                    <div key={index} className="flex items-center p-3 bg-primary/5 rounded-lg">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span>{aptitude}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground text-sm p-3 bg-muted rounded-lg">
                    Chưa xác định năng khiếu đặc biệt
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Ngành Học Được Đề Xuất */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Target className="mr-2 text-primary" />
          Ngành Học Được Đề Xuất
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
                    <Badge variant="secondary" className="mt-2">
                      {recommendation.major.category}
                    </Badge>
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
              {/* Môn học */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
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

              {/* Cơ hội nghề nghiệp */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Cơ Hội Nghề Nghiệp
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {recommendation.major.careers.map((career) => (
                    <div key={career} className="flex items-center text-sm p-2 bg-muted rounded">
                      <CheckCircle className="h-3 w-3 text-success mr-2 flex-shrink-0" />
                      {career}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trường đại học */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Trường Đại Học Phù Hợp
                </h4>
                <div className="space-y-3">
                  {recommendation.suitableUniversities.slice(0, 5).map((uni) => (
                    <div key={uni.university.id} className="flex items-center justify-between p-4 bg-muted rounded-lg border">
                      <div className="flex-1">
                        <div className="font-medium text-education-blue">{uni.university.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {uni.university.location} • {uni.university.type === 'public' ? 'Công lập' : 'Tư thục'}
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
                          {getProbabilityText(uni.admissionProbability)}
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

      {/* 5. Khuyến Nghị và Kế Hoạch */}
      <Card className="shadow-medium border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-success">
            <Lightbulb className="mr-2" />
            Khuyến Nghị và Kế Hoạch Hành Động
          </CardTitle>
          <CardDescription>Lời khuyên từ hệ thống DSS</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Khuyến Nghị Ngắn Hạn</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                  Tập trung ôn tập các môn trong khối {profile.examBlock}
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                  Tìm hiểu kỹ về {results.recommendedMajors[0]?.major.name}
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                  Tham gia các hoạt động liên quan đến sở thích
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Kế Hoạch Dài Hạn</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                  Phát triển kỹ năng chuyên môn trong lĩnh vực đã chọn
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                  Xây dựng mạng lưới trong ngành nghề
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                  Cập nhật xu hướng thị trường lao động
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6. Tóm Tắt và Hành Động */}
      <Card className="shadow-medium border-education-yellow/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-education-blue">
              Tóm Tắt Báo Cáo DSS
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
            <div className="flex gap-4 justify-center mt-6">
              <Button variant="hero" size="lg" onClick={onRestart}>
                Chạy Lại Phân Tích DSS
              </Button>
              <Button variant="outline" size="lg">
                Xuất Báo Cáo PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedReport;