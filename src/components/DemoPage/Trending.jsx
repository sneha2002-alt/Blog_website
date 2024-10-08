import { Blog } from "../../context/BlogContext";
import { BsGraphUpArrow } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { readTime } from "../../utils/helper";
import PropTypes from "prop-types";

const Trending = () => {
  const { postData } = Blog();
  const getTrending =
    postData && postData?.sort((a, b) => b.pageViews - a.pageViews);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getTrending?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(getTrending?.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="border-b border-gray-600">
      <div className="size py-[2rem]">
        <div className="flex items-center gap-3 font-semibold">
          <span>
            <BsGraphUpArrow />
          </span>
          <h2>Trending on Blog</h2>
        </div>
        <div className="grid grid-cols-card gap-3">
          {currentItems &&
            currentItems.map((trend, i) => (
              <Trend
                trend={trend}
                key={i + indexOfFirstItem}
                index={i + indexOfFirstItem}
              />
            ))}
        </div>
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default Trending;

const Trend = ({ trend, index }) => {
  const navigate = useNavigate();
  return (
    <main className="flex gap-4 w-full">
      <span className="text-gray-400 text-4xl mt-4">{index + 1}</span>
      <div className="py-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate(`/profile/${trend?.userId}`)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-75"
          >
            <img
              className="w-[1.3rem] h-[1.3rem] object-cover rounded-full"
              src={trend?.userImg}
              alt="userImg"
            />
            <h2 className="font-semibold text-sm capitalize">
              {trend?.username}
            </h2>
          </div>
        </div>
        <div
          onClick={() => navigate(`/post/${trend?.id}`)}
          className="flex flex-col gap-4 cursor-pointer hover:opacity-75"
        >
          <p className="w-full md:w-[18rem] text-md font-bold line-clamp-2">
            {trend.title}
          </p>
          <p className="text-gray-500 text-xs">
            {moment(trend?.created).format("MMM YY")}
            {` ${readTime(trend.desc)} min read`}
          </p>
        </div>
      </div>
    </main>
  );
};

Trend.propTypes = {
  trend: PropTypes.shape({
    userId: PropTypes.string,
    userImg: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const Pagination = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center gap-2 mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-3 py-1 rounded ${
            currentPage === number
              ? "bg-black/90 text-white hover:bg-black/70"
              : "bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
