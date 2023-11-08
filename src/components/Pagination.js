// components/Pagination.js
import Link from "next/link";

export const Pagination = ({ totalCount }) => {
  const PER_PAGE = 5;

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <>
      <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          list-style: none;
          padding: 0;
        }

        .pageItem {
          margin: 0 5px;
        }

        .pageLink {
          display: block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          background-color: #fff;
          text-align: center;
          border: 1px solid #000;
          border-radius: 15px;
          color: #000;
          text-decoration: none;
          transition: background-color 0.3s;
        }

        .pageLink:hover {
          background-color: #000;
          color: #fff;
        }
      `}</style>

      <ul className="pagination">
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
          <li key={index} className="pageItem">
            <Link href={`/blog/page/${number}`}>
              <span className="pageLink">{number}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
