import Image from "next/image"; 

export default function RootLayout( ) {
  return (
    <div>
      <div>
        <h1 className="text-7xl text-center font-semibold text-brand ">
          How It Works
        </h1>
      </div>
      <div
        className="mx-auto max-w-5xl p-18 text-center bg-orange-100 m-10   w-full"
        style={{ borderRadius: "20px" ,border: "3px dashed #f89728ff" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/images/svg/cone.svg"
            alt="Scale hand illustration"
            width={100}
            height={400}
            priority
          />
          <p className="text-orange-700 text-5xl mt-12">
            This page is under construction
          </p>
        </div>
      </div>
    </div>
  );
}
