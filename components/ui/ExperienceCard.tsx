import Image from "next/image";

interface ExperienceCardProps {
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  imageSrc: string;
}

export default function ExperienceCard({
  href,
  logoSrc,
  logoWidth,
  logoHeight,
  imageSrc,
}: ExperienceCardProps) {
  return (
    <div className="ssr-variant hidden-f3lv8x">
      <div className="framer-g46orm-container">
        <a
          className="framer-tEL27 framer-1of3use framer-v-1of3use framer-1pxbyww"
          data-framer-name="Desktop"
          href={href}
          style={{
            width: "100%",
            willChange: "transform",
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            opacity: 1,
            transform: "none",
          }}
        >
          <div
            className="framer-1nwqy7f"
            data-framer-name="Background"
            style={{
              backgroundColor:
                "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
              borderRadius: 18,
              opacity: 1,
            }}
          >
            <div
              className="framer-jem6dr"
              data-framer-name="Logo"
              style={{ transform: "none", opacity: 1 }}
            >
              <div
                style={{
                  position: "absolute",
                  borderRadius: "inherit",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                data-framer-background-image-wrapper="true"
              >
                <Image
                  decoding="auto"
                  loading="lazy"
                  width={logoWidth}
                  height={logoHeight}
                  src={logoSrc}
                  alt=""
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "inherit",
                    objectPosition: "center",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div
              className="framer-ybsvxe"
              data-framer-name="Image container"
              style={{ borderRadius: 16, opacity: 1 }}
            >
              <div
                className="framer-16bbbzt"
                data-framer-name="blackout"
                style={{
                  backgroundColor:
                    "var(--token-88d5059b-bc5d-4e0a-ad79-b21e9a2c4948, rgb(10, 10, 10))",
                  opacity: 0.15,
                }}
              />
              <div
                className="framer-jh1lcx"
                data-framer-name="Image"
                style={{ filter: "none", transform: "none", opacity: 1 }}
              >
                <div
                  style={{
                    position: "absolute",
                    borderRadius: "inherit",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                  data-framer-background-image-wrapper="true"
                >
                  <Image
                    decoding="auto"
                    width={750}
                    height={540}
                    src={imageSrc}
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                      objectPosition: "center",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
