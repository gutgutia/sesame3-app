import { Hero } from "@/components/marketing/sections/Hero";
import { HowItWorks } from "@/components/marketing/sections/HowItWorks";
import { Features } from "@/components/marketing/sections/Features";
import { ProblemStats } from "@/components/marketing/sections/ProblemStats";
import { Audience } from "@/components/marketing/sections/Audience";
import { Timeline } from "@/components/marketing/sections/Timeline";
import { Comparison } from "@/components/marketing/sections/Comparison";
import { Trust } from "@/components/marketing/sections/Trust";
import { WhatIncluded } from "@/components/marketing/sections/WhatIncluded";
import { Pricing } from "@/components/marketing/sections/Pricing";
import { FAQ } from "@/components/marketing/sections/FAQ";
import { ForParents } from "@/components/marketing/sections/ForParents";
import { CTA } from "@/components/marketing/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemStats />
      <HowItWorks />
      <Features />
      <Audience />
      <ForParents />
      <Timeline />
      <Comparison />
      <Pricing />
      <WhatIncluded />
      <Trust />
      <FAQ />
      <CTA />
    </>
  );
}
