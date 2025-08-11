import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-soft">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-education rounded-lg flex items-center justify-center shadow-medium">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-education bg-clip-text text-transparent">
              Hệ Thống DSS Chọn Ngành
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Trang Chủ
            </button>
            <button 
              onClick={() => scrollToSection('assessment')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Đánh Giá
            </button>
            <button 
              onClick={() => scrollToSection('majors')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Ngành Học
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Liên Hệ
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => scrollToSection('assessment')}
            >
              Bắt Đầu Ngay
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Trang Chủ
              </button>
              <button 
                onClick={() => scrollToSection('assessment')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Đánh Giá
              </button>
              <button 
                onClick={() => scrollToSection('majors')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Ngành Học
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Liên Hệ
              </button>
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => scrollToSection('assessment')}
                className="w-full mt-4"
              >
                Bắt Đầu Ngay
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;