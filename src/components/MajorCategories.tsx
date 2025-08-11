import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Building, 
  Palette, 
  Calculator, 
  Heart, 
  Users,
  Microscope,
  Globe
} from "lucide-react";

interface Major {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  subjects: string[];
  careers: string[];
  color: string;
}

const majors: Major[] = [
  {
    id: "it",
    name: "Công Nghệ Thông Tin",
    description: "Lập trình, phát triển phần mềm, an ninh mạng",
    icon: <Code className="h-6 w-6" />,
    subjects: ["Lập trình", "Cơ sở dữ liệu", "Mạng máy tính", "Trí tuệ nhân tạo"],
    careers: ["Lập trình viên", "Kỹ sư phần mềm", "Chuyên gia an ninh mạng", "Data Scientist"],
    color: "from-blue-500 to-purple-600"
  },
  {
    id: "business",
    name: "Kinh Doanh & Quản Trị",
    description: "Marketing, tài chính, quản lý doanh nghiệp",
    icon: <Building className="h-6 w-6" />,
    subjects: ["Marketing", "Tài chính", "Quản trị nhân lực", "Kinh tế học"],
    careers: ["Nhà quản lý", "Chuyên viên marketing", "Phân tích tài chính", "Tư vấn kinh doanh"],
    color: "from-green-500 to-teal-600"
  },
  {
    id: "design",
    name: "Thiết Kế & Nghệ Thuật",
    description: "Thiết kế đồ họa, mỹ thuật, kiến trúc",
    icon: <Palette className="h-6 w-6" />,
    subjects: ["Thiết kế đồ họa", "Mỹ thuật", "Kiến trúc", "Thiết kế thời trang"],
    careers: ["Nhà thiết kế", "Kiến trúc sư", "Nghệ sĩ", "Creative Director"],
    color: "from-pink-500 to-rose-600"
  },
  {
    id: "science",
    name: "Khoa Học & Kỹ Thuật",
    description: "Toán học, vật lý, hóa học, kỹ thuật",
    icon: <Calculator className="h-6 w-6" />,
    subjects: ["Toán học", "Vật lý", "Hóa học", "Kỹ thuật"],
    careers: ["Kỹ sư", "Nhà khoa học", "Nhà nghiên cứu", "Giảng viên"],
    color: "from-indigo-500 to-blue-600"
  },
  {
    id: "medical",
    name: "Y Tế & Sức Khỏe",
    description: "Y khoa, dược học, điều dưỡng",
    icon: <Heart className="h-6 w-6" />,
    subjects: ["Y học", "Dược học", "Điều dưỡng", "Y tế công cộng"],
    careers: ["Bác sĩ", "Dược sĩ", "Điều dưỡng viên", "Chuyên gia y tế"],
    color: "from-red-500 to-pink-600"
  },
  {
    id: "social",
    name: "Khoa Học Xã Hội",
    description: "Tâm lý học, xã hội học, giáo dục",
    icon: <Users className="h-6 w-6" />,
    subjects: ["Tâm lý học", "Xã hội học", "Giáo dục học", "Luật"],
    careers: ["Nhà tâm lý", "Giáo viên", "Luật sư", "Nhà xã hội học"],
    color: "from-orange-500 to-amber-600"
  },
  {
    id: "research",
    name: "Nghiên Cứu & Phát Triển",
    description: "Nghiên cứu khoa học, phát triển sản phẩm",
    icon: <Microscope className="h-6 w-6" />,
    subjects: ["Phương pháp nghiên cứu", "Thống kê", "Phân tích dữ liệu", "Đổi mới"],
    careers: ["Nhà nghiên cứu", "Phân tích viên", "Tư vấn R&D", "Nhà khoa học dữ liệu"],
    color: "from-violet-500 to-purple-600"
  },
  {
    id: "international",
    name: "Quan Hệ Quốc Tế",
    description: "Ngoại giao, thương mại quốc tế, ngôn ngữ",
    icon: <Globe className="h-6 w-6" />,
    subjects: ["Quan hệ quốc tế", "Ngôn ngữ", "Thương mại", "Văn hóa"],
    careers: ["Nhà ngoại giao", "Phiên dịch", "Chuyên gia thương mại", "Tư vấn quốc tế"],
    color: "from-emerald-500 to-green-600"
  }
];

const MajorCategories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Khám Phá Các Ngành Học</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tìm hiểu chi tiết về các lĩnh vực học tập và cơ hội nghề nghiệp tương lai
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {majors.map((major, index) => (
            <Card 
              key={major.id} 
              className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 animate-fade-in border-none bg-gradient-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${major.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {major.icon}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {major.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {major.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-muted-foreground">MÔN HỌC CHÍNH:</h4>
                  <div className="flex flex-wrap gap-1">
                    {major.subjects.slice(0, 3).map((subject) => (
                      <span 
                        key={subject}
                        className="text-xs bg-muted px-2 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                    {major.subjects.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{major.subjects.length - 3}</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-muted-foreground">CƠ HỘI NGHỀ NGHIỆP:</h4>
                  <div className="space-y-1">
                    {major.careers.slice(0, 2).map((career) => (
                      <div key={career} className="text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                        {career}
                      </div>
                    ))}
                    {major.careers.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{major.careers.length - 2} nghề nghiệp khác
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Tìm Hiểu Thêm
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Xem Tất Cả Ngành Học
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MajorCategories;