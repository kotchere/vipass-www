import ExperienceCard from "@/components/ui/ExperienceCard";

const experiences = [
  {
    href: "#getapp",
    logoSrc: "/assets/images/uesNBJIRG5fZ2tDJzkhxXbuauQw_da6599a2.svg",
    logoWidth: 135,
    logoHeight: 42,
    imageSrc: "/assets/images/TQUaM9GTresksymLH16ncQaPo_3aa7a644.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/PyQzA1IF3BF1gkVO1xuZHClY0c_4fd0c46e.svg",
    logoWidth: 164,
    logoHeight: 42,
    imageSrc: "/assets/images/r3DvXiPExOamPrqqTNfWM1K9o4_4a2a03f6.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/j2k0BUaOnC0jNyx5dP4hieQnFL4_9e93260f.svg",
    logoWidth: 181,
    logoHeight: 44,
    imageSrc: "/assets/images/UPqJOHQLdYtNuK2jee5437Lno_6c2252b7.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/kH7hh1Be4txgKwuTgZl3jpdZp8_ccd01b9a.svg",
    logoWidth: 174,
    logoHeight: 46,
    imageSrc: "/assets/images/HlvuJF9yIQ3Q8fP86EjFIq5ExE_126955d4.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/JLzkuHlsyLa7VHaiV3ZJ16kiHhg_d3b67ddb.svg",
    logoWidth: 181,
    logoHeight: 44,
    imageSrc: "/assets/images/0KGHRsvK3go8kOWricmADe0VWs_7d54889a.jpg",
  },
  {
    href: "#getapp",
    logoSrc: "/assets/images/zCY9SAfJ5gqVMOvrM5dzywwbU_dbabd644.svg",
    logoWidth: 189,
    logoHeight: 42,
    imageSrc: "/assets/images/qiCYd5j7XEmvyt9BpMldI3mNm8_d9fab17e.jpg",
  },
];

export default function ExperiencesSection() {
  return (
    <section className="framer-hv8rku" data-framer-name="Experiences" id="experiences">
      <div className="framer-4olikp" data-framer-name="Container">
        <div className="framer-1hxsd0l" data-framer-name="Top">
          <div className="framer-7l5kym" data-framer-name="Heading">
            <div className="ssr-variant hidden-f3lv8x">
              <div
                className="framer-1vc39i"
                data-framer-component-type="RichTextContainer"
                style={{ willChange: "transform", opacity: 1, transform: "none" }}
              >
                <h2
                  className="framer-text framer-styles-preset-1yvd34u"
                  data-styles-preset="GKtOymhXV"
                  dir="auto"
                >
                  Experiences.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="framer-aeexdy">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              href={exp.href}
              logoSrc={exp.logoSrc}
              logoWidth={exp.logoWidth}
              logoHeight={exp.logoHeight}
              imageSrc={exp.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
