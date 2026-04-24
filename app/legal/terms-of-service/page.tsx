import type { Metadata } from "next";
import LegalContent from "@/components/ui/LegalContent";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Terms of Service - Vipass" };

export default function TermsOfServicePage() {
  return (
    <>
      <LegalContent
        title="Terms of service."
        lastUpdated="Mar 4, 2025"
        lastUpdatedDatetime="2025-03-04T00:00:00.000Z"
        intro={
          <p
            className="framer-text framer-styles-preset-1rii1wr"
            data-styles-preset="pAxoS1kOX"
          >
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of fabrica.com (the &ldquo;Site&rdquo;). By accessing or
            using our Site, you agree to these Terms.
          </p>
        }
        body={
          <>
            <h2 className="framer-text framer-styles-preset-rmf37p">
              1. Use of the Site
            </h2>
            <p className="framer-text framer-styles-preset-69h8uc">
              You agree to use the Site only for lawful purposes and in
              compliance with these Terms. You may not:
            </p>
            <ul className="framer-text">
              <li
                data-preset-tag="p"
                className="framer-text framer-styles-preset-69h8uc"
              >
                <p className="framer-text framer-styles-preset-69h8uc">
                  Violate any applicable laws or regulations
                </p>
              </li>
              <li
                data-preset-tag="p"
                className="framer-text framer-styles-preset-69h8uc"
              >
                <p className="framer-text framer-styles-preset-69h8uc">
                  Engage in unauthorized access or data collection (scraping,
                  crawling, etc.)
                </p>
              </li>
              <li
                data-preset-tag="p"
                className="framer-text framer-styles-preset-69h8uc"
              >
                <p className="framer-text framer-styles-preset-69h8uc">
                  Disrupt or interfere with the Site&apos;s functionality
                </p>
              </li>
              <li
                data-preset-tag="p"
                className="framer-text framer-styles-preset-69h8uc"
              >
                <p className="framer-text framer-styles-preset-69h8uc">
                  Impersonate another person or entity
                </p>
              </li>
            </ul>

            <h2 className="framer-text framer-styles-preset-rmf37p">
              2. Intellectual Property
            </h2>
            <p className="framer-text framer-styles-preset-69h8uc">
              All content on the Site, including text, graphics, logos, and
              software, is the property of Fabrica&reg; Studio and is protected
              by copyright and trademark laws. You may not reproduce, modify, or
              distribute any content without prior written consent.
            </p>

            <h2 className="framer-text framer-styles-preset-rmf37p">
              3. Service Availability
            </h2>
            <p className="framer-text framer-styles-preset-69h8uc">
              We strive to keep our Site accessible but do not guarantee
              uninterrupted service. We reserve the right to modify or
              discontinue any part of the Site at any time without notice.
            </p>

            <h2 className="framer-text framer-styles-preset-rmf37p">
              4. Limitation of Liability
            </h2>
            <p className="framer-text framer-styles-preset-69h8uc">
              To the fullest extent permitted by law, Fabrica&reg; Studio is not
              liable for any damages arising from your use of the Site, including
              but not limited to:
            </p>
            <ul className="framer-text">
              <li
                data-preset-tag="p"
                className="framer-text framer-styles-preset-69h8uc"
              >
                <p className="framer-text framer-styles-preset-69h8uc">
                  Loss of data or business opportunities
                </p>
              </li>
              <li
                data-preset-tag="p"
                className="framer-text framer-styles-preset-69h8uc"
              >
                <p className="framer-text framer-styles-preset-69h8uc">
                  Service interruptions or security breaches
                </p>
              </li>
              <li
                data-preset-tag="p"
                className="framer-text framer-styles-preset-69h8uc"
              >
                <p className="framer-text framer-styles-preset-69h8uc">
                  Third-party actions beyond our control
                </p>
              </li>
            </ul>

            <h2 className="framer-text framer-styles-preset-rmf37p">
              5. Third-Party Services
            </h2>
            <p className="framer-text framer-styles-preset-69h8uc">
              Our Site may include links to third-party services. We do not
              endorse or take responsibility for these external sites or their
              content.
            </p>

            <h2 className="framer-text framer-styles-preset-rmf37p">
              6. Indemnification
            </h2>
            <p className="framer-text framer-styles-preset-69h8uc">
              You agree to indemnify and hold harmless Fabrica&reg; Studio, its
              affiliates, and employees from any claims, damages, or expenses
              arising from your violation of these Terms.
            </p>

            <h2 className="framer-text framer-styles-preset-rmf37p">
              7. Governing Law
            </h2>
            <p className="framer-text framer-styles-preset-69h8uc">
              These Terms are governed by and construed in accordance with the
              laws of the United States. Any disputes shall be resolved in the
              appropriate courts.
            </p>

            <h2 className="framer-text framer-styles-preset-rmf37p">
              8. Changes to These Terms
            </h2>
            <p className="framer-text framer-styles-preset-69h8uc">
              We reserve the right to modify these Terms at any time. Continued
              use of the Site after changes are posted constitutes acceptance of
              the updated Terms.
            </p>

            <h2 className="framer-text framer-styles-preset-rmf37p">
              9. Contact Us
            </h2>
            <p className="framer-text framer-styles-preset-69h8uc">
              If you have any questions about these Terms, contact us at:
            </p>
            <p className="framer-text framer-styles-preset-69h8uc">
              Fabrica&reg; Studio
              <br className="framer-text" />
              (312) 555-2468
              <br className="framer-text" />
              <span className="framer-text framer-styles-preset-1wi7vce">
                hello@fabrica.com
              </span>
            </p>
          </>
        }
      />
      <Footer />
    </>
  );
}
