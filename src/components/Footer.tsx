"use client";
import Image from "next/image";
import styles from "./Footer.module.css";
import Link from "next/link";
import { BsTelephone, BsTwitter, BsYoutube } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { relative } from "path";
import { MdCopyright } from "react-icons/md";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  return (
    <div>
      <div className={styles.footer_conatiner}>
        <div style={{ padding: "30px 150px" }}>
          <div
            style={{
              borderRadius: "30px",
              backgroundColor: "#ffffffff",
              padding: "20px 30px",
              width: "100%",
              marginTop: "0",
              textAlign: "center",
              boxShadow: "0px 7px 54px #699e9d48",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", marginBottom: "30px" }}>
              <div style={{ fontSize: "40px", fontWeight: 500 }}>
                Ready to find your{" "}
                <span
                  style={{
                    color: "#137C7A",
                    fontWeight: 800,
                    fontStyle: "italic",
                  }}
                >
                  financial adviser?
                </span>
              </div>
              <div
                style={{
                  height: "8px",
                  width: "100%",
                  position: "absolute",
                  right: 0,
                  backgroundImage: ' "./images/svg/understrike.svg"',
                  // backgroundColor:'red',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <div style={{ width: "50%", marginBottom: "20px" }}>
              <div
                style={{ fontSize: "18px", fontWeight: 400, color: "#545454" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. varius
                lacus vel elit accumsan, sollicitudin rhoncus quam scelerisque.
              </div>
            </div>
            <Link
              style={{
                backgroundColor: "#137C7A",
                borderRadius: "16px",
                color: "#FFF",
                fontWeight: 700,
                fontSize: "18px",
                padding: "20px 50px",
                marginTop: "50px",
              }}
              href="/get-started"
            >
              Get Started{" "}
            </Link>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Image
                src={"/images/svg/tiles.svg"}
                alt={"tiles"}
                width={100}
                height={100}
                style={{ transform: "rotate(270deg)" }}
              />{" "}
              <Image
                src={"/images/svg/tiles.svg"}
                alt={"tiles"}
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
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
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s
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
          <div className={styles.footer_menu_content}>
            <ul>
              <li>Contact </li>
              <li>
                <div className="flex gap-4">
                  <BsTelephone />
                  <div>+012 345 657 89</div>
                </div>
              </li>
              <li>
                <div className="flex gap-4">
                  <IoMailOutline />
                  <div>FinWise@gmail.com</div>
                </div>
              </li>
              <li>
                <div className="flex gap-4">
                  <FaWhatsapp />
                  <div>+78 568 585</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer_bottomline}>
          <div className={styles.copyright_box}>
           <div> <MdCopyright /></div> <div> {new Date().getFullYear()} FinWise. All rights
            reserved.</div>
          </div>
          <div className={styles.footer_social_conatainer}>
            <div className={styles.footer_social_icon}>
              <Link href={"/"} className={styles.footer_social_icon_link}>
                <FaFacebook />
              </Link>
            </div>
            <div className={styles.footer_social_icon}>
              <Link href={"/"} className={styles.footer_social_icon_link}>
                <BsTwitter />
              </Link>
            </div>
            <div className={styles.footer_social_icon}>
              <Link href={"/"} className={styles.footer_social_icon_link}>
                <BsYoutube />
              </Link>
            </div>
            <div className={styles.footer_social_icon}>
              <Link href={"/"} className={styles.footer_social_icon_link}>
                <LiaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
