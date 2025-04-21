import { useSearchParams } from "react-router-dom";
import { searchUsersByKeyword } from "../../services/searchApi";
import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await searchUsersByKeyword(keyword);
      setResults(res.result);
    };
    if (keyword) fetchResults();
  }, [keyword]);

  return (
    <div className={cx("searchPage")}>
      <h2 className={cx("title")}>Kết quả tìm kiếm cho: "{keyword}"</h2>
      {results.length > 0 ? (
        <div className={cx("resultsList")}>
          {results.map((user) => (
            <UserCard key={user._id} userData={user} />
          ))}
        </div>
      ) : (
        <p className={cx("noResult")}>Không tìm thấy người dùng nào.</p>
      )}
    </div>
  );
}

export default Search;
