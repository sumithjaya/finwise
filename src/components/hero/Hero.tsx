"use client";
import Image from "next/image";
import Link from "next/link";
import Clientsblock from "./Clientsblock";
import TypeformEmbed from "../TypeformEmbed";
import { PopupButton } from "@typeform/embed-react";
import { use } from "react";
import Reveal from "@/components/ui/Reveal"; // if @ alias points to project root
export default function Hero() {
  return (
    <Reveal><div
      style={{
        boxSizing: "border-box",
        justifyContent: "space-between",
        minHeight: "800px",
        // marginTop: "150px",
      }}
      className="w-full  m-0 flex flex-col justify-center items-center"
    >
      <section
        className="relative   text-center  flex flex-row"
        aria-labelledby="hero-heading"
      >
        {/* Subtle backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontWeight: "500", fontSize: "60px" }}>
              Find the Right
            </h2>
            <h2
              style={{
                fontWeight: "800",
                fontSize: "60px",
                fontStyle: "italic",
                fontFamily: "var(--font-creato)",
              }}
              className="text-brand"
            >
              Financial Adviser
            </h2>
            <h2 style={{ fontWeight: "500", fontSize: "60px" }}>
              for Your Future.
            </h2>
            <div style={{ borderLeft: "5px solid #137C7A" }}>
              <p>
                Compare, connect, and build your financial plan with confidence
              </p>
            </div>
            <div
              style={{
                border: "1px solid #DDEAE9",
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                padding: "10px 20px",
                maxWidth: "600px", // optional
              }}
            >
              <input
                style={{
                  padding: "10px 15px",
                  fontFamily: "var(--font-creato)",
                  fontSize: "16px",
                  border: "none",
                  outline: "none",
                  flex: 1,
                }}
                placeholder="What type of financial advice do you need?"
              />
              <PopupButton
                id={process.env.NEXT_PUBLIC_TYPEFORM_ID!}
                style={{
                  backgroundColor: "#137C7A",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  fontWeight: 700,
                  fontSize: "16px",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Get Started
              </PopupButton>
            </div>
          </div>
          <div>
            <div>
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
            </div>{" "}
            <div>
              <div>
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
            </div>
          </div>
          <div
            style={{
              position: "relative", // establish positioning context
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%", // full width container
              height: "600px", // adjust to fit content
            }}
          >
            {/* Red Box (Background) */}
            <div
              style={{
                width: "490px",
                height: "300px",
                borderRadius: "20px",
                backgroundColor: "#F1F9F8",
                position: "absolute",
                top: "50%", // center vertically
                left: "50%", // center horizontally
                transform: "translate(-50%, -50%)", // perfect centering
                zIndex: 1,
              }}
            />

            {/* Main Image Card */}
            <div
              style={{
                height: "515px",
                width: "300px",
                borderRadius: "200px",
                backgroundImage: 'url("/images/heromain.jpg")',
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                zIndex: 2, // above red box
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {/* Avatar Card */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "200px",
                  backgroundColor: "#FFFFFF",
                  padding: "10px",
                  borderRadius: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000000",
                }}
              >
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src="/images/heroavatar.jpg"
                    alt="Avatar"
                    width={54}
                    height={54}
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <p style={{ fontSize: "16px", fontWeight: 700 }}>John Doe</p>
                  <div
                    style={{
                      height: "5px",
                      width: "90px",
                      borderRadius: "10px",
                      backgroundColor: "#D2E9E6",
                      marginTop: "10px",
                    }}
                  />
                </div>
              </div>

              {/* Stats Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "10px",
                  borderRadius: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000000",
                  width: "200px",
                }}
              >
                <h5
                  style={{
                    fontWeight: 700,
                    fontSize: "30px",
                    color: "#1F1F1F",
                  }}
                >
                  1500+
                </h5>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "#545454",
                  }}
                >
                  Financial Adviser
                </p>
              </div>
            </div>
          </div>
          <div>
            <svg
              width="95"
              height="40"
              viewBox="0 0 95 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M140.5 6L129.5 16L119.5 6L111 14.5L102.5 6L94 14.5L85.5 6L77 14.5L68.5 5.99999L60 14.5L51.5 5.99999L43 14.5L34.5 5.99999L26 14.5"
                stroke="#C7E1E0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="26"
                cy="14"
                r="5"
                transform="rotate(-180 26 14)"
                fill="#137C7A"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M120.5 26L109.5 36L99.5 26L91 34.5L82.5 26L74 34.5L65.5 26L57 34.5L48.5 26L40 34.5L31.5 26L23 34.5L14.5 26L6 34.5"
                stroke="#C7E1E0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="6"
                cy="34"
                r="5"
                transform="rotate(-180 6 34)"
                fill="#137C7A"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </section>
      {/* <section
        style={{
          backgroundImage: 'url("/images/client-back-bar.svg")',
          height: "250px",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover", // or 'contain' depending on your needs
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Clientsblock />
      </section> */}

      <section>
        <div>
          <div className="text-center p-10">
            <h2 style={{ fontSize: "40px", fontWeight: 500 }}>
              How It{" "}
              <span
                style={{
                  color: "#137C7A",
                  fontWeight: 800,
                  fontStyle: "italic",
                }}
              >
                Works
              </span>
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 400, color: "#545454" }}>
              There is now an abundance of readable dummy texts. These are
              usually used when a text is required
            </p>
          </div>

          <div
            className="flex"
            style={{
              backgroundImage: 'url("./images/svg/curvedline.svg")',
              backgroundRepeat: "no-repeat",
              justifyContent: "space-between",
              backgroundPosition: "cover",
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #dddddd",
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={"./images/svg/doc-search.svg"}
                  alt="book icon"
                  width={49}
                  height={49}
                  draggable={false}
                />
              </div>
              <div>Tell us your needs</div>
            </div>
            <div>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #dddddd",
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={"./images/svg/user-tick.svg"}
                  alt="book icon"
                  width={49}
                  height={49}
                  draggable={false}
                />
              </div>
              <div>Tell us your needs</div>
            </div>
            <div>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #dddddd",
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={"./images/svg/book.svg"}
                  alt="book icon"
                  width={49}
                  height={49}
                  draggable={false}
                />
              </div>
              <div>Tell us your needs</div>
            </div>
          </div>
        </div>
      </section>
       
    </div></Reveal>
    
  );
}
