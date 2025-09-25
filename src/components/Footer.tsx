"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

import { BsTelephone, BsTwitter, BsYoutube } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { MdCopyright } from "react-icons/md";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className={styles.footer_conatiner}>
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
                boxShadow: "0px 7px 54px #699e9d48",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 50,
              }}
            >
              {/* Headline + underline */}
              <div style={{ position: "relative", marginBottom: "40px",paddingTop:"50px" }}>
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
              <div
                style={{ width: "50%", maxWidth: 720, marginBottom: "20px" }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    color: "#545454",
                    margin: 0,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  varius lacus vel elit accumsan, sollicitudin rhoncus quam
                  scelerisque.
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

        {/* Footer body */}
        <div className={styles.footer_content}>
          <div className={styles.footer_branding_content}>
            <div
              style={{
                fontSize: "34px",
                fontWeight: 800,
                color: "#FFF",
                marginBottom: "26px",
              }}
            >
              FinWise
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#FFF",
                opacity: 0.6,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text ever
              since the 1500s
            </div>
          </div>

          <div className={styles.footer_menu_content}>
            <ul>
              <li>Company</li>
              <li>How It Works</li>
              <li>For Advisers</li>
              <li>Resources</li>
              <li>Testimonial</li>
            </ul>
          </div>

          <div className={styles.footer_menu_content}>
            <ul>
              <li>Links</li>
              <li>Privacy</li>
              <li>Terms</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className={styles.footer_menu_content_contact }>
            <ul>
              <li>Contact</li>
              <li>
                <div className="flex gap-4 items-center">
                  <BsTelephone aria-hidden="true" />
                  <span>+012 345 657 89</span>
                </div>
              </li>
              <li>
                <div className="flex gap-4 items-center">
                  <IoMailOutline aria-hidden="true" />
                  <span>FinWise@gmail.com</span>
                </div>
              </li>
              <li>
                <div className="flex gap-4 items-center">
                  <FaWhatsapp aria-hidden="true" />
                  <span>+78 568 585</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className={styles.footer_bottomline}>
          <div className={styles.copyright_box}>
            <div>
              <MdCopyright aria-hidden="true" />
            </div>
            <div>{year} FinWise. All rights reserved.</div>
          </div>

          <div className={styles.footer_social_conatainer}>
            <div className={styles.footer_social_icon}>
              <Link
                href="/"
                aria-label="Facebook"
                className={styles.footer_social_icon_link}
              >
                <FaFacebook />
              </Link>
            </div>
            <div className={styles.footer_social_icon}>
              <Link
                href="/"
                aria-label="Twitter"
                className={styles.footer_social_icon_link}
              >
                <BsTwitter />
              </Link>
            </div>
            <div className={styles.footer_social_icon}>
              <Link
                href="/"
                aria-label="YouTube"
                className={styles.footer_social_icon_link}
              >
                <BsYoutube />
              </Link>
            </div>
            <div className={styles.footer_social_icon}>
              <Link
                href="/"
                aria-label="LinkedIn"
                className={styles.footer_social_icon_link}
              >
                <LiaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
