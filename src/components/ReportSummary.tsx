import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AssessmentResult, StudentProfile } from "@/types";
import { 
  FileText, Download, Share2, TrendingUp, Users, 
  Calendar, Clock, CheckCircle2
} from "lucide-react";

interface ReportSummaryProps {
  results: AssessmentResult;
  profile: StudentProfile;
  onViewDetailed: () => void;
}

const ReportSummary = ({ results, profile, onViewDetailed }: ReportSummaryProps) => {
  const currentDate = new Date().toLocaleDateString('vi-VN');
  
  const getRecommendationLevel = (score: number) => {
    if (score >= 80) return { text: "Rất phù hợp", color: "bg-success text-white" };
    if (score >= 60) return { text: "Phù hợp", color: "bg-primary text-white" };
    return { text: "Có thể cân nhắc", color: "bg-warning text-white" };
  };

  const topRecommendation = results.recommendedMajors[0];
  const recommendationLevel = getRecommendationLevel(topRecommendation?.matchScore || 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Summary */}
      <Card className="shadow-strong border-education-blue/20 bg-gradient-to-r from-education-blue to-primary">
        <CardHeader className="text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">Tóm Tắt Báo Cáo Tư Vấn</CardTitle>
              <CardDescription className="text-white/90 text-base">
                Phân tích DSS cho thí sinh - {currentDate}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                {results.totalScore.toFixed(2)}
              </div>
              <div className="text-sm text-white/80">Tổng điểm</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-2">
              {profile.examBlock}
            </div>
            <div className="text-sm text-muted-foreground">Khối Thi</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success mb-2">
              {results.recommendedMajors.length}
            </div>
            <div className="text-sm text-muted-foreground">Ngành Phù Hợp</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-education-blue mb-2">
              {profile.interests.length}
            </div>
            <div className="text-sm text-muted-foreground">Sở Thích</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-warning mb-2">
              {topRecommendation?.matchScore || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Độ Phù Hợp Cao Nhất</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Recommendation */}
      {topRecommendation && (
        <Card className="shadow-medium border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <TrendingUp className="mr-2 text-success" />
              Ngành Học Được Khuyến Nghị Hàng Đầu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {topRecommendation.major.name}
                </h3>
                <p className="text-muted-foreground mb-3">
                  {topRecommendation.major.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary">{topRecommendation.major.category}</Badge>
                  <Badge className={recommendationLevel.color}>
                    {recommendationLevel.text}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-success">
                  {topRecommendation.matchScore}%
                </div>
                <div className="text-sm text-muted-foreground">Độ phù hợp</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Trường Hàng Đầu:</h4>
                <div className="space-y-1">
                  {topRecommendation.suitableUniversities.slice(0, 3).map((uni) => (
                    <div key={uni.university.id} className="text-sm flex justify-between">
                      <span>{uni.university.name}</span>
                      <span className="text-education-blue font-medium">{uni.benchmarkScore}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Cơ Hội Nghề Nghiệp:</h4>
                <div className="space-y-1">
                  {topRecommendation.major.careers.slice(0, 3).map((career) => (
                    <div key={career} className="text-sm flex items-center">
                      <CheckCircle2 className="h-3 w-3 text-success mr-1" />
                      {career}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 text-primary" />
            Thống Kê Nhanh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-education-light rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Điểm Trung Bình</span>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-lg font-bold text-education-blue">
                {(results.totalScore / profile.examScores.length).toFixed(2)}
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Ngành Có Xác Suất Cao</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-lg font-bold text-primary">
                {results.recommendedMajors.filter(m => m.matchScore >= 70).length}
              </div>
            </div>
            
            <div className="p-4 bg-success/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Ngày Phân Tích</span>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-lg font-bold text-success">
                {currentDate}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="shadow-medium">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onViewDetailed}
              className="flex items-center"
            >
              <FileText className="mr-2 h-4 w-4" />
              Xem Báo Cáo Chi Tiết
            </Button>
            
            <Button variant="outline" size="lg" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Tải Xuống PDF
            </Button>
            
            <Button variant="outline" size="lg" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Chia Sẻ Kết Quả
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportSummary;