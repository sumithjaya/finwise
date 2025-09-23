"use client";
import Image from "next/image";
import styles from "./Testimonials.module.css";
export default function Testimonials() {
  return (
    <div style={{ display: "flex" }} className={styles.testi_main_container}>
      <div style={{ flex: 1 }} className={styles.tst_figure_container}>
        <div className={styles.tst_figure_back}  />
        <div style={{position:'absolute',bottom:430,left:150}}>
            <Image
            src="/images/quaters-green.png"
            alt="Scale hand illustration"
            width={110}
            height={656}
            priority
          />
        </div>
        <div style={{position:'absolute',bottom:-30,right:165,zIndex:-2}}>
            <Image
            src="/images/svg/dot-grid.svg"
            alt="Scale hand illustration"
            width={110}
            height={656}
            priority
          />
        </div>
        <div style={{width:'451px',height:'670px',overflow:'hidden'}}>
          <Image
            src="/images/Testimonial_figure.png"
            alt="Scale hand illustration"
            width={451}
            height={656}
            priority
            
          />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: "25px", color: "#137C7A" }}>
          — Testimonial
        </div>
        <div>
          <div style={{ fontSize: "40px", fontWeight: 500 }}>
            What Our{" "}
            <span
              style={{ color: "#137C7A", fontStyle: "italic", fontWeight: 800 }}
            >
              Customer’s Say
            </span>
          </div>
        </div>
        <div className={styles.tst_conatiner}>
            <div className={styles.tst_content}>
          Lorem Ipsum is simply dummy text of the printing and industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen bookLorem Ipsum is simply dummy text of the
          printing and industry.
        </div>
        <div className={styles.tst_customer_name}>Henry Paddington</div>
        <div className={styles.tst_customer_designation}>Designer</div>
        </div>
        <div style={{width:'15%',display:'flex',justifyContent:'space-between',paddingTop:'50px'}}>
          <button className={styles.pre_button}>
            <svg
              width="24"
              height="8"
              viewBox="0 0 24 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 7L2 7L6.95506 1"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>{" "}
           <button className={styles.pre_button}>
            <svg
              width="24"
              height="8"
              viewBox="0 0 24 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7H22L17.0449 1"
                stroke="#137C7A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
         <Image
            src="/images/svg/star01.svg"
            alt="Scale hand illustration"
            width={52}
            height={63}
            priority
            
          />
      </div>
    </div>
  );
}
