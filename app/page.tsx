import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Programs } from "@/components/sections/Programs";
import { Plans } from "@/components/sections/Plans";
import { BmiCalculator } from "@/components/sections/BmiCalculator";
import { Trainers } from "@/components/sections/Trainers";
import { Transformations } from "@/components/sections/Transformations";
import { Timetable } from "@/components/sections/Timetable";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookingForm } from "@/components/sections/BookingForm";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SceneShell } from "@/components/three/SceneShell";

export default function HomePage() {
  return (
    <>
      <SceneShell />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <Stats />
        <Programs />
        <Plans />
        <BmiCalculator />
        <Trainers />
        <Transformations />
        <Timetable />
        <Testimonials />
        <BookingForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
