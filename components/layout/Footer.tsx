import Link from "next/link";

export default function Footer() {
  return (
    <div className="f-ky49qn" data-f-name="Footer">
      <div className="f-tcjvj3" data-f-name="1">
        <div
          className="f-fh8u2r"
          data-f-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="f-text f-styles-preset-txwsq6"
            data-styles-preset="fDRzSjw63"
            dir="auto"
          >
            &copy; 2026 Vipass. All rights reserved.
          </p>
        </div>
      </div>
      <div className="f-d1p2d9" data-f-name="Links">
        <div
          className="f-139ywha"
          data-f-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="f-text f-styles-preset-1mf8d9g"
            data-styles-preset="ypR5VEWEl"
            dir="auto"
            style={
              {
                "--f-text-color":
                  "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
              } as React.CSSProperties
            }
          >
            <Link
              className="f-text f-styles-preset-t6j6v0"
              data-styles-preset="XvoIJb93z"
              href="/legal/privacy-policy"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div
          className="f-w2nkxd"
          data-f-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <p
            className="f-text f-styles-preset-1mf8d9g"
            data-styles-preset="ypR5VEWEl"
            dir="auto"
            style={
              {
                "--f-text-color":
                  "var(--token-90ab9b9d-c64e-4230-9e06-707b75634f37, rgb(255, 255, 255))",
              } as React.CSSProperties
            }
          >
            <Link
              className="f-text f-styles-preset-t6j6v0"
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
