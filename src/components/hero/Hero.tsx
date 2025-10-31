"use client";
import Image from "next/image";
import { PopupButton } from "@typeform/embed-react";
import styles from "./Hero.module.css";
import RevealStagger from "../ui/RevealStagger";
export default function Hero() {
  const typeformId = process.env.NEXT_PUBLIC_TYPEFORM_ID ?? "";
  return (
    <RevealStagger stagger={200}>
      <div style={{}} className={styles.hero}>
        <section
          className="relative   text-center  flex flex-row"
          aria-labelledby="hero-heading"
        >
          {/* Subtle backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <div className={styles.hero_content}>
            <div className={styles.hero_content_left}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "3px",
                  marginBottom: "50px",
                }}
              >
                <h2 className={styles.hero_content_left_title}>
                  Find the Right
                </h2>
                <h2 className={styles.hero_content_left_title_grn}>
                  Financial Expert
                </h2>
                <h2 className={styles.hero_content_left_title}>
                  for Your Future.
                </h2>
              </div>
              <div className={styles.hero_content_mobile_image}>
                <div
                  style={{
                    height: "200px",
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
                      backgroundColor: "#FFFFFF",
                      padding: "10px",
                      borderRadius: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#000000",
                      position: "absolute",
                      left: -20,
                      top: 30,
                      boxShadow: "0px 4px 14px 10px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
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
                      <p style={{ fontSize: "10px", fontWeight: 700 }}>
                        John Doe
                      </p>
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
                      boxShadow: "0px 4px 14px 10px rgba(0, 0, 0, 0.25)",
                      position: "absolute",
                      right: -10,
                      bottom: 30,
                    }}
                  >
                    <h5
                      style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#1F1F1F",
                      }}
                    >
                      1500+
                    </h5>
                    <p
                      style={{
                        fontWeight: 400,
                        fontSize: "10px",
                        color: "#545454",
                      }}
                    >
                      Financial Adviser
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.hero_content_left_subtitle}>
                Compare, connect, and build your financial plan with confidence
              </div>
              <div className={styles.hero_content_left_button}>
                <div className={styles.hero_content_left_button_text}>
                  Spend 5 mins and answer some simple questions and receive your
                  Free Wealth Journal & Financial Plan
                </div>
                {/* <PopupButton
                  id={typeformId}
                   className={styles.hero_content_left_button_text_main}
                >
                 <div >Get Started</div>
                </PopupButton> */}
              </div>
               <PopupButton
                  id={typeformId}
                   className={styles.hero_content_left_button_text_main}
                >
                 <div >Get Started</div>
                </PopupButton>
            </div>

            <div className={styles.hero_content_center}>
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
                    width="136"
                    height="61"
                    viewBox="0 0 136 61"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.2">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M55.0792 49.875L44.8271 53.549C48.4586 52.9246 51.8698 51.6667 55.0792 49.875ZM78.8689 48.1035C74.7969 49.0555 70.7965 50.1376 66.6685 50.6287C70.9946 50.9841 74.9783 49.6657 78.8689 48.1035ZM68.7693 35.5406C68.7909 33.9309 67.7519 34.1327 66.7987 34.2703C63.5751 34.7336 61.9179 37.2181 60.3564 39.6088C59.2181 41.3511 58.2544 43.3057 58.2279 45.5064C58.2174 46.3454 58.4407 47.0124 59.5266 46.4133C62.4911 44.7771 65.1563 42.7886 67.0794 39.95C67.9956 38.5976 68.6317 37.1145 68.7693 35.5406ZM66.6854 48.724C69.3074 48.8542 71.8234 48.1318 74.3351 47.4938C85.1874 44.7366 94.3289 38.9613 102.615 31.5923C108.149 26.6695 113.16 21.2674 117.991 15.6778C118.432 15.1682 118.857 14.6351 119.521 14.4019C120.267 14.1403 120.794 14.2002 120.443 15.1941C120.357 15.439 120.017 15.6679 120.482 15.8104C122.084 16.3028 121.65 17.4701 121.365 18.5318C120.832 20.5246 119.498 22.0954 118.357 23.7303C115.16 28.3113 111.786 32.7756 107.856 36.7587C104.208 40.4561 100.064 43.5835 95.8355 46.5931C93.1437 48.5087 90.3791 50.4201 87.2104 51.2857C85.1053 51.8607 83.405 53.1464 81.3511 53.7313C77.4137 54.8523 73.4799 55.927 69.3654 56.1553C65.9789 56.3429 62.78 55.6716 59.834 53.9867C58.8629 53.4308 57.9498 53.392 56.9639 53.7979C54.3067 54.8912 51.6062 55.9024 48.9144 56.8691C44.5352 58.443 39.9265 59.3148 35.3142 60.0033C27.9575 61.1015 20.5904 61.4476 13.2319 59.9885C8.90701 59.1309 4.69872 58.0044 1.45104 54.7258C0.595934 53.8627 -0.0383017 52.9101 0.00180075 51.6274C0.0184587 51.0747 0.193059 50.6564 0.734133 50.425C1.37392 50.1523 1.43006 50.6058 1.72497 51.0204C3.74675 53.8645 6.96914 54.2372 10.0311 54.8677C18.4693 56.6057 26.8649 55.8098 35.2401 54.3452C41.6491 53.2241 47.8872 51.4886 53.9149 49.0251C54.3937 48.8295 55.0538 48.8462 54.6552 47.9423C53.2665 44.7934 53.4904 41.5735 54.6207 38.4399C56.3648 33.6029 59.2066 29.6815 64.4285 28.1836C67.2345 27.3784 69.1057 28.2903 70.7517 30.681C74.9465 36.771 72.6446 43.3287 67.8619 47.2544C67.4331 47.6055 67.0049 47.9565 66.5774 48.307C66.6132 48.4464 66.6496 48.5852 66.6854 48.724Z"
                        fill="#137C7A"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M120.709 6.70027C123.994 5.66624 127.065 4.2133 129.824 2.14648C126.786 3.66421 123.748 5.18255 120.709 6.70027ZM127.499 20.5006C127.576 17.0136 128.247 13.6005 128.783 10.1702C128.863 9.65754 129.228 9.09857 128.584 8.65066C127.965 8.22064 127.488 8.65992 127.069 8.9357C124.784 10.4368 122.187 11.1833 119.698 12.2136C118.126 12.8651 116.664 13.8189 115.029 14.439C112.51 15.3928 110.06 16.5366 107.611 17.6632C106.37 18.2339 104.915 18.1987 103.835 19.2864C102.776 20.3532 101.628 20.0317 100.324 18.2543C99.6584 17.3473 99.3857 16.1381 100.518 15.2774C101.45 14.5698 102.453 13.922 103.503 13.4105C110.453 10.0265 117.43 6.6986 124.384 3.32259C125.945 2.56496 127.456 1.70122 128.98 0.868321C131.751 -0.646317 132.924 -0.23974 134.404 2.56496C135.554 4.74222 135.646 6.89109 134.873 9.21024C133.385 13.6746 132.025 18.1815 131.402 22.8673C131.277 23.8063 131.284 24.762 131.196 25.7071C131.095 26.8016 130.582 27.0811 129.642 26.437C127.559 25.0106 127.383 24.53 127.499 20.5006Z"
                        fill="#137C7A"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.hero_content_right}>
              {/* Red Box (Background) */}
              <div
                style={{
                  width: "490px",
                  height: "300px",
                  borderRadius: "20px",
                  backgroundColor: "#c3e4e0ff",
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
                    position: "absolute",
                    left: -140,
                    top: 100,
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
                    <p style={{ fontSize: "16px", fontWeight: 700 }}>
                      John Doe
                    </p>
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
                    position: "absolute",
                    right: -150,
                    bottom: 200,
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
      </div>
    </RevealStagger>
  );
}
