import Image from "next/image";
import styles from "./AdviserHero.module.css";
import Clientsblock from "./Clientsblock";
export default function AdviserHero() {
  return (
    <div
      style={{
        position: "relative",
        background:
          "linear-gradient(0deg,rgba(255, 255, 255, 0) 0%, rgba(19, 124, 122, 0.20) 100%)",
        backgroundImage: 'url("/images/svg/twistedlinesingle.svg")',
        backgroundPosition: "bottom",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <div className="flex" style={{ padding: "0  100px" }}>
        <div className="flex-1   " style={{ padding: "120px 150px" }}>
          <div style={{ fontSize: "28px", fontWeight: 400 ,display:"flex",alignItems:"center",gap:"10px"}}>
            Hello World!{" "}
            <Image
              src="/images/wavinghand.png"
              alt="Scale hand illustration"
              width={24}
              height={24}
              priority
            />{" "}
          </div>
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
          <div style={{ position: "absolute", left: 0, top: 100 }}>
            <svg
              width="56"
              height="68"
              viewBox="0 0 56 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 68C28.399 34.8697 28.7181 34.4824 56 34C28.7181 33.5176 28.399 33.1303 28 0C27.601 33.1303 27.2819 33.5176 0 34C27.2819 34.4824 27.601 34.8697 28 68Z"
                fill="#137C7A"
                fillOpacity="0.4"
              />
            </svg>
          </div>
          <div style={{ position: "absolute", right: -120, top: 200 }}>
            <Image
              src="/images/svg/element03.svg"
              alt="Scale hand illustration"
              width={146}
              height={559}
              priority
            />
          </div>
        </div>
      </div>
      {/* <Clientsblock/> */}
    </div>
  );
}
