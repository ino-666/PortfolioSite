// components/Profile.js
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Profile() {
  return (
    <div className={styles.Profile}>
      <Image
        src="/favicon.ico" // 画像へのパスを指定します
        alt="Profile Picture"
        width={100}
        height={100}
      />
      <h2>自己紹介</h2>
      <p>井上拓未　22歳</p>
      <Link href="https://github.com/Takumi-666">GitHub</Link>
    </div>
  );
}
