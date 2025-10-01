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
            <Image src="/images/svg/element02.svg" alt="logo" width={100} height={100}  style={{position: "absolute", left: 0,bottom: 50}}/>
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
                <LiaLinkedin  />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
