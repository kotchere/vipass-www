import Header from "@/components/layout/Header";
import PreLoader from "@/components/sections/PreLoader";
import HeroSection from "@/components/sections/HeroSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import StatsSection from "@/components/sections/StatsSection";
import FaqSection from "@/components/sections/FaqSection";
import GetAppSection from "@/components/sections/GetAppSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getExperienceEvents } from "@/lib/events";

export const revalidate = 60;

export default async function Home() {
  const events = await getExperienceEvents();

  return (
    <div id="main">
      <div
        className="f-D2wOp f-128kipa"
        data-layout-template="true"
        data-selection="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div
          className="f-gdzxqr-container"
          data-f-layout-hint-center-x="true"
        >
          <div className="ssr-variant hidden-1l0aw67 hidden-xwr0r7">
            <Header />
          </div>
        </div>
        <div
          data-f-root=""
          className="f-CG7Jx f-RKppn f-tOAQB f-loOMQ f-PU6Rs f-ofTFr f-ZkB8p f-Xxt6K f-Pv7XK f-m9VkI f-0CPYn f-EP1im f-72rtr7"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          <PreLoader />
          <main className="f-jpdxmw" data-f-name="Main">
            <ScrollReveal y={300} duration={1} delay={0.3}>
              <HeroSection />
            </ScrollReveal>
            {events.length > 0 && (
              <ScrollReveal delay={0.1}>
                <ExperiencesSection events={events} />
              </ScrollReveal>
            )}
            <ScrollReveal delay={0.1}>
              <FeaturesSection />
            </ScrollReveal>
            <StatsSection />
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
