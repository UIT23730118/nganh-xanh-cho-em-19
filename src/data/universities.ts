import { ExamBlock, University, Major } from "@/types";

export const examBlocks: ExamBlock[] = [
  {
    code: "A00",
    name: "Khối A00 (Toán, Lý, Hóa)",
    subjects: ["Toán", "Vật Lý", "Hóa Học"]
  },
  {
    code: "A01",
    name: "Khối A01 (Toán, Lý, Anh)",
    subjects: ["Toán", "Vật Lý", "Tiếng Anh"]
  },
  {
    code: "B00",
    name: "Khối B00 (Toán, Hóa, Sinh)",
    subjects: ["Toán", "Hóa Học", "Sinh Học"]
  },
  {
    code: "C00",
    name: "Khối C00 (Văn, Sử, Địa)",
    subjects: ["Ngữ Văn", "Lịch Sử", "Địa Lý"]
  },
  {
    code: "D01",
    name: "Khối D01 (Toán, Văn, Anh)",
    subjects: ["Toán", "Ngữ Văn", "Tiếng Anh"]
  }
];

export const universities: University[] = [
  {
    id: "bach-khoa-hn",
    name: "Đại học Bách Khoa Hà Nội",
    location: "Hà Nội",
    type: "public"
  },
  {
    id: "quoc-gia-hn",
    name: "Đại học Quốc Gia Hà Nội",
    location: "Hà Nội", 
    type: "public"
  },
  {
    id: "bach-khoa-hcm",
    name: "Đại học Bách Khoa TP.HCM",
    location: "TP. Hồ Chí Minh",
    type: "public"
  },
  {
    id: "kinh-te-quoc-dan",
    name: "Đại học Kinh Tế Quốc Dân",
    location: "Hà Nội",
    type: "public"
  },
  {
    id: "y-ha-noi",
    name: "Đại học Y Hà Nội",
    location: "Hà Nội",
    type: "public"
  }
];

export const majors: Major[] = [
  {
    id: "cong-nghe-thong-tin",
    name: "Công Nghệ Thông Tin",
    description: "Lập trình, phát triển phần mềm, an ninh mạng",
    category: "technology",
    examBlocks: ["A00", "A01", "D01"],
    universities: [
      { universityId: "bach-khoa-hn", benchmarkScore: 27.5, year: 2023 },
      { universityId: "bach-khoa-hcm", benchmarkScore: 28.0, year: 2023 }
    ],
    subjects: ["Lập trình", "Cơ sở dữ liệu", "Mạng máy tính", "Trí tuệ nhân tạo"],
    careers: ["Lập trình viên", "Kỹ sư phần mềm", "Chuyên gia an ninh mạng"],
    icon: "Code",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: "y-khoa",
    name: "Y Khoa",
    description: "Chẩn đoán, điều trị bệnh, chăm sóc sức khỏe",
    category: "medical",
    examBlocks: ["B00", "A00"],
    universities: [
      { universityId: "y-ha-noi", benchmarkScore: 28.5, year: 2023 }
    ],
    subjects: ["Giải phẫu", "Sinh lý", "Bệnh lý", "Dược lý"],
    careers: ["Bác sĩ", "Chuyên khoa", "Nghiên cứu y học"],
    icon: "Heart",
    color: "from-red-500 to-pink-600"
  },
  {
    id: "kinh-te",
    name: "Kinh Tế",
    description: "Phân tích kinh tế, tài chính, quản lý",
    category: "business",
    examBlocks: ["A01", "D01", "C00"],
    universities: [
      { universityId: "kinh-te-quoc-dan", benchmarkScore: 26.0, year: 2023 }
    ],
    subjects: ["Vi mô", "Vĩ mô", "Thống kê", "Tài chính"],
    careers: ["Chuyên viên kinh tế", "Phân tích tài chính", "Tư vấn đầu tư"],
    icon: "TrendingUp",
    color: "from-green-500 to-teal-600"
  },
  {
    id: "ngoai-ngu",
    name: "Ngoại Ngữ",
    description: "Tiếng Anh, dịch thuật, quan hệ quốc tế",
    category: "language",
    examBlocks: ["D01", "C00"],
    universities: [
      { universityId: "quoc-gia-hn", benchmarkScore: 24.5, year: 2023 }
    ],
    subjects: ["Ngữ pháp", "Dịch thuật", "Văn học", "Văn hóa"],
    careers: ["Phiên dịch viên", "Giáo viên", "Chuyên viên ngoại thương"],
    icon: "Globe",
    color: "from-indigo-500 to-blue-600"
  }
];

export const subjects = [
  "Toán", "Ngữ Văn", "Tiếng Anh", "Vật Lý", 
  "Hóa Học", "Sinh Học", "Lịch Sử", "Địa Lý"
];

export const interests = [
  "Công nghệ và máy tính",
  "Y tế và chăm sóc sức khỏe", 
  "Kinh doanh và tài chính",
  "Ngôn ngữ và văn hóa",
  "Khoa học tự nhiên",
  "Nghệ thuật và sáng tạo",
  "Giáo dục và đào tạo",
  "Luật pháp và chính trị"
];

export const aptitudes = [
  "Tư duy logic và phân tích",
  "Giao tiếp và thuyết trình", 
  "Sáng tạo và thẩm mỹ",
  "Lãnh đạo và quản lý",
  "Tỉ mỉ và cẩn thận",
  "Làm việc nhóm",
  "Giải quyết vấn đề",
  "Nghiên cứu và khám phá"
];