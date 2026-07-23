import TopBar from "../../components/realestate/TopBar";
import Header from "../../components/realestate/Header";
import Hero from "../../components/realestate/Hero";
import About from "../../components/realestate/About";
import WhyChooseUESC from "../../components/realestate/WhyChooseUESC";
import AcademicPrograms from "../../components/realestate/AcademicPrograms";
import CareerDevelopment from "../../components/realestate/CareerDevelopment";
import NewsAndEvents from "../../components/realestate/NewsAndEvents";
import Testimonials from "../../components/realestate/Testimonials";
import Footer from "../../components/realestate/Footer";

export default function RealEstate() {
  return (
    <div className="bg-white text-black antialiased">
      <TopBar />
      <Header />
      <Hero />
      <About />
      <WhyChooseUESC />
      <AcademicPrograms />
      <CareerDevelopment />
      <NewsAndEvents />
      <Testimonials />
      <Footer />
    </div>
  );
}
