// pages/category/[id].js
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import { Pagination } from "../../components/Pagination";
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";

//日時の整形
function formatDate(isoString) {
  const date = new Date(isoString);
  return `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

export default function CategoryId({ blog, category, tags, totalCount }) {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <article className={styles.contentb}>
          <p class={styles.aaa}>記事の一覧</p>
          <ul>
            {blog.map((blog) => (
              <li key={blog.id} className={styles.blogItem}>
                <Link href={`/blog/${blog.id}`} className={styles.blogLink}>
                  <div className={styles.blogContent}>
                    <div>
                      {blog.eyecatch && (
                        <Image
                          className={styles.blogImage}
                          src={blog.eyecatch.url}
                          alt={blog.title}
                          width={400}
                          height={250}
                        />
                      )}
                    </div>
                    <div className={styles.blogContentb}>
                      <p className={styles.blogTitle}>{blog.title}</p>
                      <span className={styles.categoryItem}>
                        {blog.category.name}
                      </span>
                      <ul className={styles.tagList}>
                        {blog.tags.map((tags) => (
                          <li key={tags.id} className={styles.categorytagItem}>
                            {tags.name}
                          </li>
                        ))}
                      </ul>
                      <p className={styles.blogDate}>
                        {formatDate(blog.publishedAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </article>

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
      <Pagination totalCount={totalCount} />
    </div>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });

  const paths = data.contents.map((content) => `/category/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blogs",
    queries: { filters: `category[equals]${id}` },
  });
  const categoryData = await client.get({ endpoint: "categories" });
  const tagData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      tags: tagData.contents,
      totalCount: data.totalCount,
    },
  };
};
