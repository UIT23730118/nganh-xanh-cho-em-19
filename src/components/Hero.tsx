import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-education.jpg";
import { GraduationCap, Target, Users } from "lucide-react";

const Hero = () => {
  const scrollToAssessment = () => {
    const assessmentSection = document.getElementById('assessment');
    assessmentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with education gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Students learning together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-education opacity-90"></div>
        <div className="absolute inset-0 bg-grid-white/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <div className="animate-fade-in">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hệ Thống DSS
            <span className="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Tư Vấn Chọn Ngành
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
            Mô hình Decision Support System phân tích toàn diện <strong>điểm thi đại học, sở thích, 
            năng khiếu và nguyện vọng</strong> để đưa ra tư vấn ngành học tối ưu nhất.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="dss" 
              size="xl" 
              onClick={scrollToAssessment}
              className="bg-white text-education-blue hover:bg-white/90 shadow-glow"
            >
              <Target className="mr-2" />
              Khởi Động DSS
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Users className="mr-2" />
              Tìm Hiểu DSS
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">100+</h3>
              <p className="opacity-90">Ngành học được phân tích</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">95%</h3>
              <p className="opacity-90">Độ chính xác đánh giá</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">50K+</h3>
              <p className="opacity-90">Học sinh đã sử dụng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-secondary rounded-full animate-float opacity-60"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-success rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;