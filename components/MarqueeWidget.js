import Marquee from "react-fast-marquee";

export default function MarqueeWidget({ autoFill = true, children }) {
  return (
    <Marquee
      autoFill={autoFill}
      pauseOnHover={true}
      gradientColor={[255, 255, 255]}
      gradientWidth={300}
    >
      {children}
    </Marquee>
  );
}
