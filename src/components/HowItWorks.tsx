"use client";
import Image from "next/image";  // if @ alias points to project root
import styles from "./HowItWorks.module.css"; 
import RevealStagger from "./ui/RevealStagger";
export default function HowItWorks() {
  return (
    <RevealStagger stagger={200}>
      <div
        style={{
          boxSizing: "border-box",
          justifyContent: "space-between",
          padding: "100px 100px",
          paddingTop: "20px",
          width: "100vw",
          borderTop: "1px dashed #137c7a46",
        }}
      >
        <section style={{ backgroundColor: "#fff" }}>
          <div>
            <div className="text-center p-10">
              <h2
                style={{
                  fontSize: "40px",
                  fontWeight: 500,
                  fontFamily: "Creato Display",
                  fontStyle: "normal",
                }}
              >
                How It{" "}
                <span
                  style={{
                    color: "#137C7A",
                    fontWeight: 800,
                    fontStyle: "italic",
                    fontFamily: "Creato Display",
                    fontSize: "40px",
                  }}
                >
                  Works
                </span>
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "Creato Display",
                  fontStyle: "normal",
                  color: "#545454",
                  paddingTop: "20px",
                }}
              >
                There is now an abundance of readable dummy texts. These are
                usually used when a text is required
              </p>
            </div>

            <div style={{ padding: "10px 50px 0 50px",}}>
              <div
                className="flex"
                style={{
                  backgroundImage: 'url("./images/svg/curvedline.svg")',
                  backgroundRepeat: "no-repeat",
                  justifyContent: "space-between",
                  backgroundSize: "87%",
                  backgroundPosition: "center",
                  width: "100%",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "225px",
                    marginTop:"85px"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
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
                  <div className={styles.howitworks_bullet_text}>
                    Tell us a little about yourself and what sort of help you
                    are looking for
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                 maxWidth: "225px",
                  }}
                >
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
                    className={styles.howitworks_bullet_icon}
                  >
                    <Image
                      src={"./images/svg/bookjournal.svg"}
                      alt="book icon"
                      width={49}
                      height={49}
                      draggable={false}
                    />
                  </div>
                  <div className={styles.howitworks_bullet_text}>
                    Receive your Free Wealth Journal/Financial Plan 
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  maxWidth: "225px",
                    marginTop:"155px"
                  }}
                >
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
                  <div className={styles.howitworks_bullet_text}>
                    Get matched with a Qualified Financial Expert
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "225px",  marginTop:"105px"
                  }}
                >
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
                  <div className={styles.howitworks_bullet_text}>
                    Book a no obligation call and have your questions answered
                    and plan updated.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RevealStagger>
  );
}
