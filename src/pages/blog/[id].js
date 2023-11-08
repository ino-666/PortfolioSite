// pages/blog/[id].js
import Link from "next/link";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";

//日時の整形
function formatDate(isoString) {
  const date = new Date(isoString);
  return `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export default function BlogId({ blog, category, tags }) {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <main className={styles.contentb}>
          <h1>{blog.title}</h1>
          <p className={styles.Date}>{formatDate(blog.publishedAt)}</p>
          <p className={styles.categoryItemb}>
            {blog.category && blog.category.name}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: `${blog.content}` }}
            className={styles.post}
          ></div>
        </main>
        <aside>
          <div className={styles.c}>
            <div className={styles.d}>
              <Profile />
              <p className={styles.Rightbar_category_title}>カテゴリー</p>
              <ul>
                {category.map((category) => (
                  <li key={category.id} className={styles.categorytagItemb}>
                    <Link href={`/category/${category.id}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className={styles.Rightbar_category_title}>・タグ</p>
              <ul>
                {tags.map((tag) => (
                  <li key={tag.id} className={styles.categorytagItemb}>
                    <Link href={`/tag/${tag.id}`}>{tag.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });
  const categoryData = await client.get({ endpoint: "categories" });
  const tagData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data,
      category: categoryData.contents,
      tags: tagData.contents,
    },
  };
};
