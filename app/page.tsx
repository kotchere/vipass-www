import PreLoader from "@/components/sections/PreLoader";
import HeroSection from "@/components/sections/HeroSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import StatsSection from "@/components/sections/StatsSection";
import FaqSection from "@/components/sections/FaqSection";
import GetAppSection from "@/components/sections/GetAppSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <div id="main">
      <div
        className="framer-D2wOp framer-128kipa"
        data-layout-template="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div
          data-framer-root=""
          className="framer-CG7Jx framer-RKppn framer-tOAQB framer-loOMQ framer-PU6Rs framer-ofTFr framer-ZkB8p framer-Xxt6K framer-Pv7XK framer-m9VkI framer-0CPYn framer-EP1im framer-72rtr7"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          <PreLoader />
          <main className="framer-jpdxmw" data-framer-name="Main">
            <ScrollReveal y={300} duration={1} delay={0.3}>
              <HeroSection />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ExperiencesSection />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <FeaturesSection />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <StatsSection />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <FaqSection />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GetAppSection />
            </ScrollReveal>
          </main>
        </div>
      </div>
    </div>
  );
}
