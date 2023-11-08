// components/Header.js
import Link from "next/link";

const headerStyle = {
  backgroundColor: "black",
  height: "50px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 10px",
};

const linkStyle = {
  color: "white",
  border: "1px solid white",
  borderRadius: "5px",
  padding: "5px 10px",
  textDecoration: "none", // リンクの下線を削除
};

const titleStyle = {
  color: "white",
  fontSize: "20px",
  fontWeight: "bold", // フォントを太く
  textDecoration: "none", // リンクの下線を削除
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <Link href="/" passHref>
        <span style={titleStyle}>技術ブログ</span>
      </Link>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/" passHref>
          <span style={linkStyle}>記事一覧</span>
        </Link>
        <Link href="/mypage" passHref>
          <span style={linkStyle}>マイページ</span>
        </Link>
        <Link href="/contact" passHref>
          <span style={linkStyle}>お問い合せ</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
