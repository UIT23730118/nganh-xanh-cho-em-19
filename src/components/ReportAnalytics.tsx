import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult, StudentProfile } from "@/types";
import { 
  BarChart3, PieChart, TrendingUp, Target, 
  Brain, Award, Lightbulb, BookOpen
} from "lucide-react";

interface ReportAnalyticsProps {
  results: AssessmentResult;
  profile: StudentProfile;
}

const ReportAnalytics = ({ results, profile }: ReportAnalyticsProps) => {
  // Tính toán các chỉ số phân tích
  const subjectScores = profile.examScores.map(score => ({
    ...score,
    percentage: (score.score / 10) * 100
  }));

  const averageScore = results.totalScore / profile.examScores.length;
  const highPerformanceSubjects = subjectScores.filter(s => s.score >= 8);
  const improvementSubjects = subjectScores.filter(s => s.score < 6);

  const matchScoreDistribution = {
    excellent: results.recommendedMajors.filter(m => m.matchScore >= 80).length,
    good: results.recommendedMajors.filter(m => m.matchScore >= 60 && m.matchScore < 80).length,
    fair: results.recommendedMajors.filter(m => m.matchScore >= 40 && m.matchScore < 60).length,
    poor: results.recommendedMajors.filter(m => m.matchScore < 40).length,
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 8.5) return { level: "Xuất sắc", color: "text-success", bgColor: "bg-success/10" };
    if (score >= 7.0) return { level: "Khá", color: "text-primary", bgColor: "bg-primary/10" };
    if (score >= 5.5) return { level: "Trung bình", color: "text-warning", bgColor: "bg-warning/10" };
    return { level: "Cần cải thiện", color: "text-destructive", bgColor: "bg-destructive/10" };
  };

  const performanceLevel = getPerformanceLevel(averageScore);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Phân Tích Điểm Số */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <BarChart3 className="mr-2 text-primary" />
            Phân Tích Điểm Số Chi Tiết
          </CardTitle>
          <CardDescription>Đánh giá hiệu suất học tập theo từng môn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tổng quan điểm */}
            <div className={`p-4 rounded-lg ${performanceLevel.bgColor}`}>
              <div className="text-center">
                <div className={`text-2xl font-bold ${performanceLevel.color} mb-2`}>
                  {averageScore.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mb-1">Điểm Trung Bình</div>
                <div className={`text-sm font-medium ${performanceLevel.color}`}>
                  {performanceLevel.level}
                </div>
              </div>
            </div>

            {/* Môn mạnh */}
            <div className="p-4 bg-success/10 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">
                  {highPerformanceSubjects.length}
                </div>
                <div className="text-sm text-muted-foreground mb-1">Môn Mạnh</div>
                <div className="text-sm text-success">≥ 8.0 điểm</div>
              </div>
            </div>

            {/* Môn cần cải thiện */}
            <div className="p-4 bg-warning/10 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-2">
                  {improvementSubjects.length}
                </div>
                <div className="text-sm text-muted-foreground mb-1">Cần Cải Thiện</div>
                <div className="text-sm text-warning">{"< 6.0 điểm"}</div>
              </div>
            </div>
          </div>

          {/* Chi tiết điểm theo môn */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Phân Tích Theo Môn Học
            </h4>
            <div className="space-y-4">
              {subjectScores.map((subject) => {
                const level = getPerformanceLevel(subject.score);
                return (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="text-right">
                        <span className={`font-bold ${level.color}`}>{subject.score.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground ml-2">({level.level})</span>
                      </div>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phân Tích Độ Phù Hợp */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <PieChart className="mr-2 text-primary" />
            Phân Tích Độ Phù Hợp Ngành Học
          </CardTitle>
          <CardDescription>Phân bố ngành học theo mức độ phù hợp</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success mb-2">
                {matchScoreDistribution.excellent}
              </div>
              <div className="text-sm text-muted-foreground">Rất Phù Hợp</div>
              <div className="text-xs text-success">≥ 80%</div>
            </div>
            
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">
                {matchScoreDistribution.good}
              </div>
              <div className="text-sm text-muted-foreground">Phù Hợp</div>
              <div className="text-xs text-primary">60-79%</div>
            </div>
            
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-warning mb-2">
                {matchScoreDistribution.fair}
              </div>
              <div className="text-sm text-muted-foreground">Có Thể</div>
              <div className="text-xs text-warning">40-59%</div>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-muted-foreground mb-2">
                {matchScoreDistribution.poor}
              </div>
              <div className="text-sm text-muted-foreground">Không Phù Hợp</div>
              <div className="text-xs text-muted-foreground">{"< 40%"}</div>
            </div>
          </div>

          {/* Top ngành theo độ phù hợp */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Top Ngành Theo Độ Phù Hợp
            </h4>
            <div className="space-y-3">
              {results.recommendedMajors.slice(0, 5).map((major, index) => (
                <div key={major.major.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{major.major.name}</div>
                      <div className="text-sm text-muted-foreground">{major.major.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{major.matchScore}%</div>
                    <Progress value={major.matchScore} className="w-20 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phân Tích Sở Thích & Năng Khiếu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 text-primary" />
              Phân Tích Sở Thích
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profile.interests.length > 0 ? (
                profile.interests.map((interest, index) => (
                  <div key={index} className="flex items-center p-3 bg-education-light rounded-lg">
                    <div className="w-8 h-8 bg-education-blue rounded-full flex items-center justify-center text-white text-sm">
                      {index + 1}
                    </div>
                    <span className="ml-3 font-medium">{interest}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  Chưa xác định sở thích cụ thể
                </div>
              )}
              
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Tổng số lĩnh vực quan tâm</div>
                <div className="text-2xl font-bold text-primary">{profile.interests.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 text-primary" />
              Phân Tích Năng Khiếu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profile.aptitudes.length > 0 ? (
                profile.aptitudes.map((aptitude, index) => (
                  <div key={index} className="flex items-center p-3 bg-success/10 rounded-lg">
                    <Award className="w-5 h-5 text-success mr-3" />
                    <span className="font-medium">{aptitude}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  Chưa xác định năng khiếu đặc biệt
                </div>
              )}
              
              <div className="mt-4 p-3 bg-success/5 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Năng khiếu được xác định</div>
                <div className="text-2xl font-bold text-success">{profile.aptitudes.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Khuyến nghị cải thiện */}
      <Card className="shadow-medium border-warning/20">
        <CardHeader>
          <CardTitle className="flex items-center text-warning">
            <TrendingUp className="mr-2" />
            Khuyến Nghị Cải Thiện
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {improvementSubjects.length > 0 && (
              <div className="p-4 bg-warning/10 rounded-lg">
                <h4 className="font-semibold text-warning mb-2">Cải thiện điểm số:</h4>
                <ul className="text-sm space-y-1">
                  {improvementSubjects.map((subject) => (
                    <li key={subject.subject}>
                      • Tập trung ôn tập <strong>{subject.subject}</strong> (hiện tại: {subject.score.toFixed(1)})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {profile.interests.length < 3 && (
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Khám phá sở thích:</h4>
                <p className="text-sm">
                  Hãy tìm hiểu thêm về các lĩnh vực khác để có được định hướng rõ ràng hơn.
                </p>
              </div>
            )}
            
            {results.recommendedMajors.length < 3 && (
              <div className="p-4 bg-education-blue/10 rounded-lg">
                <h4 className="font-semibold text-education-blue mb-2">Mở rộng lựa chọn:</h4>
                <p className="text-sm">
                  Cân nhắc các ngành học có yêu cầu điểm thấp hơn hoặc phù hợp với năng lực hiện tại.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportAnalytics;