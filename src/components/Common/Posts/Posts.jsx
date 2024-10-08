import Loading from "../../Loading/Loading";
import PostsCard from "./PostsCard";
import { Blog } from "../../../context/BlogContext";

const Posts = () => {
  const { postData, postLoading } = Blog();
  return (
    <section className="flex flex-col gap-[2.5rem]">
      {postLoading ? (
        <Loading />
      ) : (
        postData &&
        postData?.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </section>
  );
};

export default Posts;
