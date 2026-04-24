import Link from "next/link";

export default function Footer() {
  return (
    <div className="framer-ky49qn" data-framer-name="Footer">
      <div className="framer-tcjvj3" data-framer-name="1">
        <div
          className="framer-fh8u2r"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="framer-text framer-styles-preset-txwsq6"
            data-styles-preset="fDRzSjw63"
            dir="auto"
          >
            &copy; 2026 Vipass. All rights reserved.
          </p>
        </div>
      </div>
      <div className="framer-d1p2d9" data-framer-name="Links">
        <div
          className="framer-139ywha"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="framer-text framer-styles-preset-1mf8d9g"
            data-styles-preset="ypR5VEWEl"
            dir="auto"
            style={
              {
                "--framer-text-color":
                  "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
              } as React.CSSProperties
            }
          >
            <Link
              className="framer-text framer-styles-preset-t6j6v0"
              data-styles-preset="XvoIJb93z"
              href="/legal/privacy-policy"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div
          className="framer-w2nkxd"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="framer-text framer-styles-preset-1mf8d9g"
            data-styles-preset="ypR5VEWEl"
            dir="auto"
            style={
              {
                "--framer-text-color":
                  "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
              } as React.CSSProperties
            }
          >
            <Link
              className="framer-text framer-styles-preset-t6j6v0"
              data-styles-preset="XvoIJb93z"
              href="/legal/terms-of-service"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
