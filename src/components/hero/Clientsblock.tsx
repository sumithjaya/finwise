import Image from "next/image";
import styles from "./Clientsblock.module.css";
export default function Clientsblock() {
  const items = [
    { src: "/images/clients_logos/client01.png", alt: "Client 1", width: 107 },
    { src: "/images/clients_logos/image2.png", alt: "Client 2", width: 36 },
    { src: "/images/clients_logos/client03.png", alt: "Client 3", width: 100 },
  ];
  // Duplicate once in code to make it seamless
  const loop = [
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
  ];

  return (
    <div className={styles.container}>
      <div className={styles.viewport}>
        <div className={styles.track} aria-label="infinite-clients">
          {loop.map((item, i) => (
            <div
              className={styles.slide}
              key={`${item.src}-${i}`}
              aria-hidden={i >= items.length} // second half is the clone
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={0}
                draggable={false}
                priority={i < 3} // prioritize the first set
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
