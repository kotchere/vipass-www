export default function GrainOverlay() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{
        background: 'url("/assets/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")',
        opacity: 0.05,
        inset: "-200%",
        width: "400%",
        height: "400%",
        position: "absolute",
        willChange: "transform",
        transform: "translateX(-2.5%) translateY(-5%)",
      }} />
    </div>
  );
}
