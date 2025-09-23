"use client";
import Image from "next/image";
import styles from "./Testimonials.module.css";
import Link from "next/link";

export default function ReadyToFind() {
  return (
    <div
      style={{
        borderRadius: "30px",
        backgroundColor: "#e9eee5ff",
        padding: "50px 30px",
        width: "100%",
        height:'100%',
        marginTop: "100px",
        textAlign: "center",
      }}
    >
      <div>
        <div style={{ fontSize: "40px", fontWeight: 500 }}>
          Ready to find your{" "}
          <span
            style={{ color: "#137C7A", fontWeight: 800, fontStyle: "italic" }}
          >
            financial adviser?
          </span>
        </div>
      </div>
      <div style={{fontSize:'18px',fontWeight:400,color:'#545454'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. varius lacus
        vel elit accumsan, sollicitudin rhoncus quam scelerisque.
      </div>
      <Link
        style={{
          backgroundColor: "#137C7A",
          borderRadius: "16px",
          color: "#FFF",
          fontWeight: 700,
          fontSize: "18px",
          padding: "10px 20px",
          marginTop: "50px",
        }}
        href="/get-started"
      >
        Get Started{" "}
      </Link>
    </div>
  );
}
