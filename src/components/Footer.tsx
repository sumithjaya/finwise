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
          {/* Branding */}
          <div className={styles.footer_branding_content}>
            <h1>WEALFY</h1>
            <p>
            FinWise helps individuals connect with trusted financial experts and build smarter, more confident financial futures.
            </p>
            <div className={styles.footer_branding_element}>
              <Image
                src="/images/svg/element02.svg"
                alt="logo"
                width={100}
                height={100}
              />
            </div>
          </div>

          {/* Footer menus */}
          <div className={styles.footer_menu_container_secondry}>
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
          </div>

          <div className={styles.footer_menu_content_contact}>
            <ul>
              <li>Contact</li>
              <li className="flex gap-4 items-center">
                <BsTelephone aria-hidden="true" />
                <span>+012 345 657 89</span>
              </li>
              <li className="flex gap-4 items-center">
                <IoMailOutline aria-hidden="true" />
                <span>wealfy@gmail.com</span>
              </li>
              <li className="flex gap-4 items-center">
                <FaWhatsapp aria-hidden="true" />
                <span>+78 568 585</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className={styles.footer_bottomline}>
          <div className={styles.copyright_box}>
            <MdCopyright aria-hidden="true" />
            <div>{year} WEALFY. All rights reserved.</div>
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
