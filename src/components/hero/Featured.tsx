"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import styles from "./Featured.module.css";
import { GrLocation } from "react-icons/gr";

export default function Featured() {
  const [emblaRef] = useEmblaCarousel();
  return (
    <div style={{ backgroundColor: "#F1F9F8",borderRadius:'30px'}}>
      <div className="text-center p-10 mb-20">
        <h2 style={{ fontSize: "40px", fontWeight: 500 }}>
          Featured{" "}
          <span
            style={{ color: "#137C7A", fontWeight: 800, fontStyle: "italic" }}
          >
            Advisers
          </span>
        </h2>
        <p style={{ fontSize: "16px", fontWeight: 400, color: "#545454" }}>
          One disadvantage of Lorum Ipsum is that in Latin certain letters
          appear more frequently than others - which creates a distinct visual
          impression.
        </p>
      </div>

      <div>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__slide">
              {" "}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "20px 10px",
                  boxShadow: "2px 2px 2px",
                  borderRadius: "20px",
                  width: "260px",
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center'
                }}
              >
                <div className={styles.outerWrapper}>
                  {/* Rotating border layer */}
                  <div className={styles.border}> </div>

                  {/* Static inner image */}
                  <div className={styles.inner}>
                    <div
                      style={{
                        backgroundImage: 'url("/images/adviser01.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </div>

                <h4  className={styles.ftr_card_title}>Carla Press</h4>
                <div className={styles.ftr_card_dep}>Wealth Management</div>
                <div className="flex " style={{gap:10,alignItems:'center'}}>
                  <GrLocation/>
                  <div>Sydney  NSW</div>
                </div>
                <div>View Profile</div>
              </div> 
            </div> 
            <div className="embla__slide">
              {" "}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "20px 10px",
                  boxShadow: "2px 2px 2px",
                  borderRadius: "20px",
                  width: "260px",
                }}
              >
                <div
                  style={{
                    height: "110px",
                    width: "110px",
                    borderRadius: "50%",
                    border: "5px solid #15bd47ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden", // Clip inner content perfectly
                  }}
                >
                  <div
                    style={{
                      backgroundImage: 'url("/images/adviser02.jpg")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%", // Fill parent
                      height: "100%", // Fill parent
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <h4>Carla Press</h4>
                <div>Wealth Management</div>
                <div>
                  <div>Sydney, NSW</div>
                </div>
                <div>View Profile</div>
              </div>{" "}
            </div>
            <div className="embla__slide">
              {" "}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "20px 10px",
                  boxShadow: "2px 2px 2px",
                  borderRadius: "20px",
                  width: "260px",
                }}
              >
                <div
                  style={{
                    height: "110px",
                    width: "110px",
                    borderRadius: "50%",
                    border: "5px solid #15bd47ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden", // Clip inner content perfectly
                  }}
                >
                  <div
                    style={{
                      backgroundImage: 'url("/images/adviser03.jpg")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%", // Fill parent
                      height: "100%", // Fill parent
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <h4>Carla Press</h4>
                <div>Wealth Management</div>
                <div>
                  <div>Sydney, NSW</div>
                </div>
                <div>View Profile</div>
              </div>{" "}
            </div>
            <div className="embla__slide">
              {" "}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "20px 10px",
                  boxShadow: "2px 2px 2px",
                  borderRadius: "20px",
                  width: "260px",
                }}
              >
                <div
                  style={{
                    height: "110px",
                    width: "110px",
                    borderRadius: "50%",
                    border: "5px solid #15bd47ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden", // Clip inner content perfectly
                  }}
                >
                  <div
                    style={{
                      backgroundImage: 'url("/images/adviser04.jpg")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%", // Fill parent
                      height: "100%", // Fill parent
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <h4>Carla Press</h4>
                <div>Wealth Management</div>
                <div>
                  <div>Sydney, NSW</div>
                </div>
                <div>View Profile</div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
