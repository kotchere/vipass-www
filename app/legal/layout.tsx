import Header from "@/components/layout/Header";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="main">
      <div
        className="framer-D2wOp framer-128kipa"
        data-layout-template="true"
        data-selection="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div
          className="framer-gdzxqr-container"
          data-framer-layout-hint-center-x="true"
        >
          <div className="ssr-variant hidden-1l0aw67 hidden-xwr0r7">
            <Header />
          </div>
        </div>
        <div
          data-framer-root=""
          className="framer-PyYLC framer-vhYuT framer-0CPYn framer-WyC4r framer-loOMQ framer-838gv framer-WMoCk framer-1mJbV framer-m9VkI framer-3Qg2r framer-5rZVb framer-4fll0k"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
