import ExperienceCard from "@/components/ui/ExperienceCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Event } from "@/lib/events";

interface ExperiencesSectionProps {
  events: Event[];
}

export default function ExperiencesSection({ events }: ExperiencesSectionProps) {
  return (
    <section className="f-hv8rku" data-f-name="Experiences" id="experiences">
      <div className="f-4olikp" data-f-name="Container">
        <div className="f-1hxsd0l" data-f-name="Top">
          <div className="f-7l5kym" data-f-name="Heading">
            <div className="ssr-variant hidden-f3lv8x">
              <div
                className="f-1vc39i"
                data-f-component-type="RichTextContainer"
                style={{ willChange: "transform", opacity: 1, transform: "none" }}
              >
                <h2
                  className="f-text f-styles-preset-1yvd34u"
                  data-styles-preset="GKtOymhXV"
                  dir="auto"
                >
                  Experiences.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="f-aeexdy">
          {events.map((event, index) => (
            <ScrollReveal key={event.id} delay={index * 0.1} y={30}>
              <ExperienceCard
                title={event.title}
                description={event.description}
                coverImageUrl={event.cover_image_url}
                startsAt={event.starts_at}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
