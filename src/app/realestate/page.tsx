import Header from "../../components/realestate/Header";
import Hero from "../../components/realestate/Hero";
import About from "../../components/realestate/About";
import WhyChooseUESC from "../../components/realestate/WhyChooseUESC";
import AcademicPrograms from "../../components/realestate/AcademicPrograms";
import Testimonials from "../../components/realestate/Testimonials";
import Footer from "../../components/realestate/Footer";

export default function RealEstate() {
  return (
    <div className="bg-white text-black antialiased">
      <Header />
      <Hero />
      <About />
      <WhyChooseUESC />
      <AcademicPrograms />
      <Testimonials />
      <Footer />
    </div>
  );
}
