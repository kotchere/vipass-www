import type { Metadata } from "next";
import LegalContent from "@/components/ui/LegalContent";

export const metadata: Metadata = {
  title: "Delete Account & Data - Vipass",
};

export default function DeleteAccountPage() {
  return (
    <LegalContent
      title="Delete account &amp; data."
      lastUpdated="Jun 8, 2026"
      lastUpdatedDatetime="2026-06-08T00:00:00.000Z"
      intro={
        <p
          className="f-text f-styles-preset-1rii1wr"
          data-styles-preset="pAxoS1kOX"
        >
          We respect your privacy and are committed to ensuring that your data
          is handled with the utmost care. If you wish to delete your account
          and all associated data, please follow the instructions below.
        </p>
      }
      body={
        <>
          <h2 className="f-text f-styles-preset-rmf37p">
            Steps to Request Deletion
          </h2>

          <h2 className="f-text f-styles-preset-rmf37p">1. Send Us an Email</h2>
          <p className="f-text f-styles-preset-69h8uc">
            To initiate the deletion process, please send an email to{" "}
            <a
              className="f-text f-styles-preset-1wi7vce"
              href="mailto:support@vipass.app"
            >
              support@vipass.app
            </a>
            . Include the following information in your email:
          </p>
          <ul className="f-text">
            <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
              <p className="f-text f-styles-preset-69h8uc">Your full name</p>
            </li>
            <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
              <p className="f-text f-styles-preset-69h8uc">
                The email address associated with your account
              </p>
            </li>
            <li data-preset-tag="p" className="f-text f-styles-preset-69h8uc">
              <p className="f-text f-styles-preset-69h8uc">
                A brief statement confirming that you would like your account
                and all associated data to be deleted
              </p>
            </li>
          </ul>

          <h2 className="f-text f-styles-preset-rmf37p">
            2. Confirmation Email
          </h2>
          <p className="f-text f-styles-preset-69h8uc">
            After receiving your request, we will send you a confirmation email
            to verify your identity. Please follow the instructions in the email
            to confirm your request.
          </p>

          <h2 className="f-text f-styles-preset-rmf37p">3. Processing Time</h2>
          <p className="f-text f-styles-preset-69h8uc">
            Once your request is confirmed, we will begin processing the
            deletion of your account and data. This process may take up to 2
            days.
          </p>

          <h2 className="f-text f-styles-preset-rmf37p">
            4. Final Notification
          </h2>
          <p className="f-text f-styles-preset-69h8uc">
            You will receive a final email once your account and data have been
            successfully deleted.
          </p>

          <h2 className="f-text f-styles-preset-rmf37p">Note</h2>
          <p className="f-text f-styles-preset-69h8uc">
            Please be aware that once your account and data are deleted, this
            action is irreversible. All your data, including personal
            information, purchase history, and preferences, will be permanently
            removed from our systems.
          </p>
          <p className="f-text f-styles-preset-69h8uc">
            If you have any questions or need further assistance with your
            deletion request, please contact our support team at{" "}
            <a
              className="f-text f-styles-preset-1wi7vce"
              href="mailto:support@vipass.app"
            >
              support@vipass.app
            </a>
            .
          </p>
          <p className="f-text f-styles-preset-69h8uc">
            By sending your request, you acknowledge that you have read and
            understood the consequences of account and data deletion.
          </p>
        </>
      }
    />
  );
}
