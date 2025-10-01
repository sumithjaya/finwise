import React from "react";
import styles from "./QuestionsForm.module.css";
import {
  MdEmail,
  MdMessage,
  MdOutlineMail,
  MdOutlinePhone,
  MdOutlineWhatsapp,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import VsxIcon from "vue-iconsax";
import Image from "next/image";

export default function QuestionsForm() {
  return (
    <div className={styles.questions_form_container}>
        <div className={styles.footer_bgCurve} aria-hidden="true" />
      <div style={{width: "100%",zIndex:1}}>
        <div className={styles.questions_form_content}>
          <div
            style={{ display: "flex", flex: 2, width: "100%", padding: "70px" }}
          >
            <div className={styles.questions_form_content_left}>
              <div className={styles.questions_form_content_left_title}>
                Hi! Have <span style={{ fontWeight: 800 }}>Questions?</span>
              </div>
              <div className={styles.questions_form_content_left_description}>
                Send me a quick message, and I’ll get back to you shortly.
              </div>
              <div className={styles.questions_form_content_left_contact}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.904 24.6452C17.6798 24.6452 16.3907 24.3527 15.0582 23.7893C13.7582 23.2368 12.4473 22.4785 11.169 21.5577C9.9015 20.626 8.67734 19.586 7.51817 18.4485C6.36984 17.2894 5.32984 16.0652 4.409 14.8085C3.47734 13.5085 2.72984 12.2085 2.199 10.9518C1.63567 9.60852 1.354 8.30852 1.354 7.08435C1.354 6.23935 1.50567 5.43768 1.79817 4.69018C2.1015 3.92102 2.589 3.20602 3.24984 2.58852C4.084 1.76518 5.03734 1.35352 6.05567 1.35352C6.47817 1.35352 6.9115 1.45102 7.27984 1.62435C7.70234 1.81935 8.05984 2.11185 8.31984 2.50185L10.8332 6.04435C11.0607 6.35852 11.234 6.66185 11.3532 6.96518C11.494 7.29018 11.5698 7.61518 11.5698 7.92935C11.5698 8.34102 11.4507 8.74185 11.2232 9.12102C11.0607 9.41352 10.8115 9.72768 10.4973 10.0419L9.76067 10.811C9.7715 10.8435 9.78234 10.8652 9.79317 10.8868C9.92317 11.1143 10.1832 11.5043 10.6815 12.0893C11.2123 12.696 11.7107 13.2485 12.209 13.7577C12.8482 14.386 13.379 14.8843 13.8773 15.296C14.4948 15.816 14.8957 16.076 15.134 16.1952L15.1123 16.2493L15.9032 15.4693C16.239 15.1335 16.564 14.8843 16.8782 14.7218C17.474 14.3535 18.2323 14.2885 18.9907 14.6027C19.2723 14.7218 19.5757 14.8843 19.9007 15.1118L23.4973 17.6685C23.8982 17.9393 24.1907 18.286 24.364 18.6977C24.5265 19.1094 24.6023 19.4885 24.6023 19.8677C24.6023 20.3877 24.4832 20.9077 24.2557 21.3952C24.0282 21.8827 23.7465 22.3052 23.389 22.6952C22.7715 23.3777 22.0998 23.8652 21.3198 24.1793C20.5723 24.4827 19.7598 24.6452 18.904 24.6452ZM6.05567 2.97852C5.45984 2.97852 4.90734 3.23852 4.3765 3.75852C3.87817 4.22435 3.5315 4.73352 3.31484 5.28602C3.08734 5.84935 2.979 6.44518 2.979 7.08435C2.979 8.09185 3.21734 9.18602 3.694 10.3127C4.1815 11.461 4.864 12.6527 5.73067 13.8443C6.59734 15.036 7.58317 16.1952 8.6665 17.2893C9.74984 18.3618 10.9198 19.3585 12.1223 20.236C13.2923 21.0919 14.4948 21.7852 15.6865 22.2835C17.539 23.0744 19.2723 23.2585 20.7023 22.6627C21.2548 22.4352 21.7423 22.0885 22.1865 21.5902C22.4357 21.3193 22.6307 21.0268 22.7932 20.6802C22.9232 20.4093 22.9882 20.1277 22.9882 19.846C22.9882 19.6727 22.9557 19.4993 22.869 19.3043C22.8365 19.2393 22.7715 19.1202 22.5657 18.9794L18.969 16.4227C18.7523 16.271 18.5573 16.1627 18.3732 16.0869C18.1348 15.9894 18.0373 15.8918 17.669 16.1193C17.4523 16.2277 17.2573 16.3902 17.0407 16.6068L16.2173 17.4193C15.7948 17.831 15.1448 17.9285 14.6465 17.7443L14.354 17.6143C13.9098 17.376 13.3898 17.0077 12.8157 16.5202C12.2957 16.076 11.7323 15.556 11.0498 14.8843C10.519 14.3427 9.98817 13.7685 9.43567 13.1293C8.9265 12.5335 8.55817 12.0243 8.33067 11.6018L8.20067 11.2768C8.13567 11.0277 8.114 10.8868 8.114 10.7352C8.114 10.3452 8.25484 9.99852 8.52567 9.72768L9.33817 8.88268C9.55484 8.66602 9.71734 8.46018 9.82567 8.27602C9.91234 8.13518 9.94484 8.01602 9.94484 7.90768C9.94484 7.82102 9.91234 7.69102 9.85817 7.56102C9.78234 7.38768 9.66317 7.19268 9.5115 6.98685L6.99817 3.43352C6.88984 3.28185 6.75984 3.17352 6.59734 3.09768C6.424 3.02185 6.23984 2.97852 6.05567 2.97852ZM15.1123 16.2602L14.939 16.9968L15.2315 16.2385C15.1773 16.2277 15.134 16.2385 15.1123 16.2602Z"
                    fill="#137C7A"
                  />
                </svg>

                <div
                  className={styles.questions_form_content_left_contact_number}
                >
                  +012 345 657 89
                </div>
              </div>
              <div className={styles.questions_form_content_left_email}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.4165 23.0202H7.58317C3.629 23.0202 1.354 20.7452 1.354 16.791V9.20768C1.354 5.25352 3.629 2.97852 7.58317 2.97852H18.4165C22.3707 2.97852 24.6457 5.25352 24.6457 9.20768V16.791C24.6457 20.7452 22.3707 23.0202 18.4165 23.0202ZM7.58317 4.60352C4.48484 4.60352 2.979 6.10935 2.979 9.20768V16.791C2.979 19.8893 4.48484 21.3952 7.58317 21.3952H18.4165C21.5148 21.3952 23.0207 19.8893 23.0207 16.791V9.20768C23.0207 6.10935 21.5148 4.60352 18.4165 4.60352H7.58317Z"
                    fill="#137C7A"
                  />
                  <path
                    d="M12.9997 13.943C12.0897 13.943 11.1688 13.6613 10.4647 13.0871L7.07384 10.3788C6.72718 10.0971 6.66218 9.58795 6.94385 9.24129C7.22552 8.89462 7.73469 8.82963 8.08135 9.11129L11.4722 11.8196C12.2955 12.4805 13.693 12.4805 14.5163 11.8196L17.9072 9.11129C18.2538 8.82963 18.7738 8.88379 19.0447 9.24129C19.3263 9.58795 19.2722 10.108 18.9147 10.3788L15.5238 13.0871C14.8305 13.6613 13.9097 13.943 12.9997 13.943Z"
                    fill="#137C7A"
                  />
                </svg>

                <div
                  className={styles.questions_form_content_left_contact_number}
                >
                  FinWise@gmail.com
                </div>
              </div>
              <div className={styles.questions_form_content_left_whatsapp}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9832 15.1658C17.7665 15.0574 16.3582 14.4074 16.1415 14.2991C15.9248 14.1908 15.7082 14.1908 15.4915 14.4074C15.2748 14.6241 14.8415 15.2741 14.6248 15.4908C14.5165 15.7074 14.2998 15.7074 14.0832 15.5991C13.3248 15.2741 12.5665 14.8408 11.9165 14.2991C11.3748 13.7574 10.8332 13.1074 10.3998 12.4574C10.2915 12.2408 10.3998 12.0241 10.5082 11.9158C10.6165 11.8074 10.7248 11.5908 10.9415 11.4824C11.0498 11.3741 11.1582 11.1574 11.1582 11.0491C11.2665 10.9408 11.2665 10.7241 11.1582 10.6158C11.0498 10.5074 10.5082 9.20742 10.2915 8.66576C10.1832 7.90742 9.9665 7.90742 9.74984 7.90742C9.6415 7.90742 9.42484 7.90742 9.20817 7.90742C8.9915 7.90742 8.6665 8.12409 8.55817 8.23242C7.90817 8.88242 7.58317 9.64076 7.58317 10.5074C7.6915 11.4824 8.0165 12.4574 8.6665 13.3241C9.85817 15.0574 11.3748 16.4658 13.2165 17.3324C13.7582 17.5491 14.1915 17.7658 14.7332 17.8741C15.2748 18.0908 15.8165 18.0908 16.4665 17.9824C17.2248 17.8741 17.8748 17.3324 18.3082 16.6824C18.5248 16.2491 18.5248 15.8158 18.4165 15.3824C18.4165 15.3824 18.1998 15.2741 17.9832 15.1658ZM20.6915 5.30742C16.4665 1.08242 9.6415 1.08242 5.4165 5.30742C1.94984 8.77409 1.29984 14.0824 3.68317 18.3074L2.1665 23.8324L7.90817 22.3158C9.53317 23.1824 11.2665 23.6158 12.9998 23.6158C18.9582 23.6158 23.7248 18.8491 23.7248 12.8908C23.8332 10.0741 22.6415 7.36576 20.6915 5.30742ZM17.7665 20.4741C16.3582 21.3408 14.7332 21.8824 12.9998 21.8824C11.3748 21.8824 9.85817 21.4491 8.44984 20.6908L8.12484 20.4741L4.7665 21.3408L5.63317 18.0908L5.4165 17.7658C2.8165 13.4324 4.1165 8.01576 8.3415 5.30742C12.5665 2.59909 17.9832 4.00742 20.5832 8.12409C23.1832 12.3491 21.9915 17.8741 17.7665 20.4741Z"
                    fill="#137C7A"
                  />
                </svg>

                <div
                  className={styles.questions_form_content_left_contact_number}
                >
                  +78 568 585
                </div>
              </div>
            </div>
            <div className={styles.questions_form_content_right}>
              <form
                action=""
                className={styles.questions_form_content_right_form}
              >
                <div className={styles.questions_form_content_right_form_input}>
                  <div
                    className={
                      styles.questions_form_content_right_form_input_label
                    }
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0999 10.6497C10.0416 10.6414 9.9666 10.6414 9.89993 10.6497C8.43327 10.5997 7.2666 9.39974 7.2666 7.92474C7.2666 6.41641 8.48327 5.19141 9.99993 5.19141C11.5083 5.19141 12.7333 6.41641 12.7333 7.92474C12.7249 9.39974 11.5666 10.5997 10.0999 10.6497Z"
                        stroke="#137C7A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin ="round"
                      />
                      <path
                        d="M15.6166 16.1488C14.1333 17.5072 12.1666 18.3322 9.99997 18.3322C7.8333 18.3322 5.86663 17.5072 4.3833 16.1488C4.46663 15.3655 4.96663 14.5988 5.8583 13.9988C8.14163 12.4822 11.875 12.4822 14.1416 13.9988C15.0333 14.5988 15.5333 15.3655 15.6166 16.1488Z"
                        stroke="#137C7A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin ="round"
                      />
                      <path
                        d="M9.99984 18.3346C14.6022 18.3346 18.3332 14.6037 18.3332 10.0013C18.3332 5.39893 14.6022 1.66797 9.99984 1.66797C5.39746 1.66797 1.6665 5.39893 1.6665 10.0013C1.6665 14.6037 5.39746 18.3346 9.99984 18.3346Z"
                        stroke="#137C7A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin ="round"
                      />
                    </svg>

                    <div
                      className={
                        styles.questions_form_content_right_form_input_label_text
                      }
                    >
                      Full Name
                    </div>
                  </div>
                  <div
                    className={
                      styles.questions_form_content_right_form_input_input_container
                    }
                  >
                    <input
                      className={
                        styles.questions_form_content_right_form_input_input
                      }
                      placeholder="Enter your full name"
                    ></input>
                  </div>
                </div>
                <div className={styles.questions_form_content_right_form_input}>
                  <div
                    className={
                      styles.questions_form_content_right_form_input_label
                    }
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.1665 17.0846H5.83317C3.33317 17.0846 1.6665 15.8346 1.6665 12.918V7.08464C1.6665 4.16797 3.33317 2.91797 5.83317 2.91797H14.1665C16.6665 2.91797 18.3332 4.16797 18.3332 7.08464V12.918C18.3332 15.8346 16.6665 17.0846 14.1665 17.0846Z"
                        stroke="#137C7A"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin ="round"
                      />
                      <path
                        d="M14.1668 7.5L11.5585 9.58333C10.7002 10.2667 9.29183 10.2667 8.43349 9.58333L5.8335 7.5"
                        stroke="#137C7A"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin ="round"
                      />
                    </svg>

                    <div
                      className={
                        styles.questions_form_content_right_form_input_label_text
                      }
                    >
                      Email
                    </div>
                  </div>
                  <div
                    className={
                      styles.questions_form_content_right_form_input_input_container
                    }
                  >
                    <input
                      placeholder="Enter your email"
                      className={
                        styles.questions_form_content_right_form_input_input
                      }
                      type="email"
                    ></input>
                  </div>
                </div>
                <div className={styles.questions_form_content_right_form_input}>
                  <div
                    className={
                      styles.questions_form_content_right_form_input_label
                    }
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.1665 17.0846H5.83317C3.33317 17.0846 1.6665 15.8346 1.6665 12.918V7.08464C1.6665 4.16797 3.33317 2.91797 5.83317 2.91797H14.1665C16.6665 2.91797 18.3332 4.16797 18.3332 7.08464V12.918C18.3332 15.8346 16.6665 17.0846 14.1665 17.0846Z"
                        stroke="#137C7A"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin ="round"
                      />
                      <path
                        d="M14.1668 7.5L11.5585 9.58333C10.7002 10.2667 9.29183 10.2667 8.43349 9.58333L5.8335 7.5"
                        stroke="#137C7A"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin ="round"
                      />
                    </svg>

                    <div
                      className={
                        styles.questions_form_content_right_form_input_label_text
                      }
                    >
                      Message
                    </div>
                  </div>
                  <div
                    className={
                      styles.questions_form_content_right_form_input_input_container
                    }
                  >
                    <textarea
                      className={
                        styles.questions_form_content_right_form_input_textarea
                      }
                    ></textarea>
                  </div>
                  <div>
                    <button
                      className={
                        styles.questions_form_content_right_form_button
                      }
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "-100px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Image
                src="/images/svg/tiles.svg"
                alt="Profile"
                width={131}
                height={20}
              />
              <Image
                src="/images/svg/tiles.svg"
                alt="Profile"
                width={131}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
