import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Assessment from "@/components/Assessment";
import MajorCategories from "@/components/MajorCategories";
import Footer from "@/components/Footer";
import ProjectReport from "@/components/ProjectReport";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="majors">
          <MajorCategories />
        </section>
        <Assessment />
        <section id="report">
          <ProjectReport />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
