"use client";
import Image from "next/image";
import styles from "./Whyfinwise.module.css"; 
export default function Whyfinwise() {
  return (
    <div style={{ display: "flex", gap: 20, padding: "0 100px",marginTop:'100px' }}>
      <div style={{ flex: 1 }}>
        <div>
          <div style={{ fontSize: "40px", fontWeight: 500 ,fontFamily:"Creato Display"}}>
            Why{" "}
            <span
              style={{ fontWeight: 800, fontStyle: "italic", color: "#137C7A" }}
            >
              FinWise?
            </span>
          </div>
          <div
            style={{ 
              display: "felx",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingLeft: "100px",
            }}
          >
            <div style={{   width: "227px", height: "8px" }}> 
              <Image
                src="/images/svg/understrike.svg"
                alt="Scale hand illustration"
                width={227}
                height={8}
                priority
              />
            </div>
          </div>
        </div>
        <div style={{ fontSize: "16px", marginTop:"30px",fontWeight: 400, color: "#545454",fontFamily:"Creato Display" }}>
          There is now an abundance of readable dummy texts. These are usually
          used when a text is required
        </div>
      </div>
      <div style={{ display: "flex", flex: 3, justifyContent: "space-around" }}>
        <div style={{ position: "relative" }}>
          {" "}
          <div
            style={{
              backgroundColor: "#d5f0edff",
              width: "57px",
              height: "57px",
              borderRadius: "6px",
              position: "absolute",
              left: -30,
              bottom: 80,
              zIndex: -1,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffffffff",
              borderRadius: "20px",
              boxShadow: "5px 5px 25px 16px #699e9d3d",
              justifyContent: "center",
              width: "260px",
              height: "300px",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#ECF5F4",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/images/svg/scalehand.svg"
                alt="Scale hand illustration"
                width={52}
                height={52}
                priority
              />
            </div>
            <div className={styles.wfw_card_title}>
              Clear, Transparent Advice
            </div>
            <div className={styles.wfw_card_content}>
              There is now an abundance of readable dummy texts.
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              " linear-gradient(130deg,rgba(255, 255, 255, 0) 60%, rgba(19, 124, 122, 1) 100%)",
            boxShadow: "  0px 7px 54px 0px #699E9D26 ",
            borderRadius: "20px",
            width: "270px",
            height: "310px",
            padding: "5px",
            marginTop: "100px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffffff",
              borderRadius: "20px",
              width: "260px",
              height: "300px",
              boxShadow: "0px 7px 54px 30px #699e9d2f",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#ECF5F4",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/images/svg/chart.svg"
                alt="Scale hand illustration"
                width={52}
                height={52}
                priority
              />
            </div>
            <div className={styles.wfw_card_title}>
              Expert Financial Guidance
            </div>
            <div className={styles.wfw_card_content}>
              There is now an abundance of readable dummy texts.
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {" "}
          <div
            style={{
              backgroundColor: "#137C7A",
              width: "78px",
              height: "78px",
              borderRadius: "6px",
              position: "absolute",
              right: -40,
              top: -40,
              zIndex: -1,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              boxShadow: "5px 5px 35px 10px #699e9d50",
              justifyContent: "center",
              width: "260px",
              height: "300px",
              position: "relative", // 🔑 Needed for z-index stacking
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#ECF5F4",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/images/svg/piggybank.svg"
                alt="Scale hand illustration"
                width={52}
                height={52}
                priority
              />
            </div>
            <div className={styles.wfw_card_title}>Affordable Solutions</div>
            <div className={styles.wfw_card_content}>
              There is now an abundance of readable dummy texts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
