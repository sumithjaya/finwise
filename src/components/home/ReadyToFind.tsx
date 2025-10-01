"use client";
import Image from "next/image";
import styles from "./ReadyToFind.module.css";
import Link from "next/link";

export default function ReadyToFind() {
  return (
    <div className={styles.ready_to_find_container}>
      <div className={styles.footer_bgCurve} aria-hidden="true" />
      <div className={styles.footer_layer}>
        {/* CTA card */}
        <div style={{ padding: "0 100px 100px 100px" }}>
          <div
            style={{
              borderRadius: "30px",
              backgroundColor: "#FFFFFF",
              padding: "20px 10px",
              width: "100%",
              marginTop: 0,
              textAlign: "center",
              boxShadow: "0px 7px 64px #699e9d91",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 50, 
            }}
          >
            {/* Headline + underline */}
            <div
              style={{
                position: "relative",
                marginBottom: "40px",
                paddingTop: "50px",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: 500,
                  fontStyle: "normal",
                  lineHeight: 1.2,
                  fontFamily: "Creato Display",
                }}
              >
                Ready to find your{" "}
                <span
                  style={{
                    color: "#137C7A",
                    fontWeight: 800,
                    fontStyle: "italic",
                    fontSize: "40px",
                  }}
                >
                  financial adviser?
                </span>
              </div>

              {/* underline image centered beneath the headline */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: -10,
                  width: 360,
                  height: 10,
                  backgroundImage: 'url("/images/svg/understrike.svg")',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Subtext */}
            <div style={{ width: "50%", maxWidth: 720, marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "#545454",
                  margin: 0,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. varius
                lacus vel elit accumsan, sollicitudin rhoncus quam scelerisque.
              </p>
            </div>

            {/* CTA button */}
            <Link
              href="/get-started"
              aria-label="Get Started"
              style={{
                backgroundColor: "#137C7A",
                borderRadius: "16px",
                color: "#FFF",
                fontWeight: 700,
                fontSize: "18px",
                padding: "20px 50px",
                marginTop: "10px",
              }}
            >
              Get Started
            </Link>

            {/* Decorative tiles */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: -40,
              }}
            >
              <Image
                src="/images/svg/tiles.svg"
                alt=""
                aria-hidden="true"
                width={100}
                height={100}
                style={{ transform: "rotate(270deg)" }}
              />
              <Image
                src="/images/svg/tiles.svg"
                alt=""
                aria-hidden="true"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
