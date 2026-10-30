import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Servicesection";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Blogs from "@/components/Blogs";
import ContactSection from "@/components/ContactSection";
import ContactMap from "@/components/ContactMap";
import { homePageData } from '@/data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#050505]">
      <section id="home" className="scroll-mt-24">
        <Hero data={homePageData.Hero} />
      </section>

      <section id="about" className="scroll-mt-24">
        <About data={homePageData.About} />
      </section>

      <section id="stats" className="scroll-mt-24">
        <Stats data={homePageData.Stats} />
      </section>

      <section id="services" className="scroll-mt-24">
        <Services data={homePageData.Services} />
      </section>

      <section id="process" className="scroll-mt-24">
        <Process data={homePageData.Process} />
      </section>

      <section id="team" className="scroll-mt-24">
        <Team data={homePageData.Team} />
      </section>

      <section id="gallery" className="scroll-mt-24">
        <Gallery data={homePageData.Gallery} />
      </section>

      <section id="testimonials" className="scroll-mt-24">
        <Testimonials data={homePageData.Testimonials} />
      </section>

      <section id="cta" className="scroll-mt-24">
        <CTA data={homePageData.CTA} />
      </section>

      <section id="blogs" className="scroll-mt-24">
        <Blogs data={homePageData.Blogs} />
      </section>

      <section id="contact" className="scroll-mt-24">
        <ContactSection data={homePageData.Contact} />
        {homePageData.Contact.map && (
          <ContactMap mapData={homePageData.Contact.map} />
        )}
      </section>
    </div>
  );
}
