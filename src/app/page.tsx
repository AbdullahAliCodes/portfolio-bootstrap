import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Contributions } from "@/components/sections/contributions";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Stack } from "@/components/sections/stack";

export default function Home() {
  return (
    <div className="space-y-20 sm:space-y-28">
      <Hero />
      <Stack />
      <FeaturedProjects />
      <Experience />
      <Education />
      <Achievements />
      <Contributions />
      <Contact />
    </div>
  );
}
