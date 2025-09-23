import Image from "next/image";
import styles from "./AdviserHero.module.css";
import Clientsblock from "./Clientsblock";
export default function AdviserHero() {
  return (
    <div>
        <div className="flex" style={{ padding: "0  100px" }}>
      <div className="flex-1   " style={{ padding: "120px 150px" }}>
        <div style={{ fontSize: "28px", fontWeight: 400 }}>Hello World! </div>
        <div style={{ fontSize: "60px", fontWeight: 500 }}>
          I’m{" "}
          <span
            style={{ color: "#137C7A", fontWeight: 800, fontStyle: "italic" }}
          >
            Carla Press,
          </span>{" "}
          Wealth Management Based in USA
        </div>
        <div style={{ color: "#545454", fontSize: "24px", fontWeight: 500 }}>
          Helping you retire with confidence
        </div>
      </div>
      <div className="flex-1  " style={{ position: "relative" }}>
        <div
          style={{
            backgroundImage: 'url("/images/svg/blob-green.svg")',
            backgroundRepeat: "no-repeat",
            width: "566px",
            height: "373px",
            position: "absolute",
            zIndex: -1,
            left: -80,
            bottom: 50,
          }}
        />
        <div>
          <Image
            src="/images/adviser-hero.png"
            alt="Scale hand illustration"
            width={459}
            height={559}
            priority
          />
        </div>
      </div>
    </div>
    <Clientsblock/>
    </div>
  );
}
