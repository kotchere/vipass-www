import Header from "@/components/layout/Header";
import "../legal-styles.css";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          className="f-PyYLC f-vhYuT f-0CPYn f-WyC4r f-loOMQ f-838gv f-WMoCk f-1mJbV f-m9VkI f-3Qg2r f-5rZVb f-4fll0k"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          {children}
        </div>
        <div id="overlay" />
        <div className="f-1kvak31" />
      </div>
    </div>
  );
}
