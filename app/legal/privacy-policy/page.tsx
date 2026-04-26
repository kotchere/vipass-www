import type { Metadata } from "next";
import LegalContent from "@/components/ui/LegalContent";

export const metadata: Metadata = { title: "Privacy Policy - Vipass" };

export default function PrivacyPolicyPage() {
  return (
    <LegalContent
        title="Privacy policy."
        lastUpdated="Feb 27, 2026"
        lastUpdatedDatetime="2026-02-27T00:00:00.000Z"
        intro={
          <p
            className="f-text f-styles-preset-1rii1wr"
            data-styles-preset="pAxoS1kOX"
          >
            Vipass values your privacy. This Privacy Policy explains how we
            collect, use, store, and protect your personal information when you
            use the Vipass mobile application.
          </p>
        }
        body={
          <>
            <h2 className="f-text f-styles-preset-rmf37p">
              1. Information We Collect
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              We collect information you provide directly, such as your name,
              email address, phone number, and payment details when you create an
              account or purchase tickets. We also collect usage data
              automatically, including device information, IP address, app
              interactions, and location data (with your permission) to improve
              our services.
            </p>

            <h2 className="f-text f-styles-preset-rmf37p">
              2. How We Use Your Information
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              We use your information to:
            </p>
            <ul className="f-text">
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Provide and maintain the App and its features
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Process ticket purchases and payments
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Send order confirmations and event updates
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Personalise your experience and recommend events
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Communicate with you about your account or support requests
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Analyse usage patterns to improve the App
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Prevent fraud and ensure platform security
                </p>
              </li>
            </ul>

            <h2 className="f-text f-styles-preset-rmf37p">
              3. Sharing Your Information
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              We do not sell your personal information. We may share your data
              with:
            </p>
            <ul className="f-text">
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Event organisers, to fulfil ticket purchases and manage event
                  entry
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Payment processors, to complete transactions securely
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Analytics providers, to help us understand App usage
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Law enforcement, when required by law or to protect our rights
                </p>
              </li>
            </ul>
            <p className="f-text f-styles-preset-69h8uc">
              All third parties are required to handle your data in accordance
              with applicable privacy laws.
            </p>

            <h2 className="f-text f-styles-preset-rmf37p">
              4. Data Storage and Security
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              Your data is stored securely using industry-standard encryption and
              security measures. We use Supabase for database services and Stripe
              for payment processing, both of which maintain rigorous security
              standards. While we take reasonable precautions to protect your
              information, no method of electronic storage is completely secure.
            </p>

            <h2 className="f-text f-styles-preset-rmf37p">
              5. Cookies and Tracking
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              The App may use analytics tools and tracking technologies to
              collect usage data. This helps us understand how the App is used
              and improve our services. You can manage tracking preferences
              through your device settings.
            </p>

            <h2 className="f-text f-styles-preset-rmf37p">
              6. Your Rights
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              Depending on your location, you may have the right to:
            </p>
            <ul className="f-text">
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Access the personal data we hold about you
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Request correction of inaccurate information
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Request deletion of your personal data
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Withdraw consent for data processing
                </p>
              </li>
              <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
                <p className="f-text f-styles-preset-69h8uc">
                  Request a copy of your data in a portable format
                </p>
              </li>
            </ul>
            <p className="f-text f-styles-preset-69h8uc">
              To exercise any of these rights, please contact us at{" "}
              <span className="f-text f-styles-preset-1wi7vce">
                support@vipass.app
              </span>
              .
            </p>

            <h2 className="f-text f-styles-preset-rmf37p">
              7. Data Retention
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              We retain your personal information for as long as your account is
              active or as needed to provide services, comply with legal
              obligations, resolve disputes, and enforce our agreements. When data
              is no longer needed, it is securely deleted or anonymised.
            </p>

            <h2 className="f-text f-styles-preset-rmf37p">
              8. Children&apos;s Privacy
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              The App is not intended for children under 13. We do not knowingly
              collect personal information from children under 13. If we become
              aware that we have collected data from a child under 13, we will
              take steps to delete it promptly.
            </p>

            <h2 className="f-text f-styles-preset-rmf37p">
              9. Third-Party Services
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              The App may contain links to or integrations with third-party
              services (such as payment processors, mapping services, and
              analytics tools). These services have their own privacy policies,
              and we encourage you to review them. Vipass is not responsible for
              the privacy practices of third parties.
            </p>

            <h2 className="f-text f-styles-preset-rmf37p">
              10. Changes to This Policy
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              We may update this Privacy Policy from time to time. Changes will
              be posted within the App with a revised date. Your continued use of
              the App after changes are posted constitutes acceptance of the
              updated policy.
            </p>

            <h2 className="f-text f-styles-preset-rmf37p">
              11. Contact Us
            </h2>
            <p className="f-text f-styles-preset-69h8uc">
              If you have questions or concerns about this Privacy Policy or how
              your data is handled, please contact us at:
            </p>
            <p className="f-text f-styles-preset-69h8uc">
              <span className="f-text f-styles-preset-1wi7vce">
                support@vipass.app
              </span>
            </p>
          </>
        }
    />
  );
}
