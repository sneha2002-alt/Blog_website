import Loading from "../../../Loading/Loading";
import PostsCard from "../../../Common/Posts/PostsCard";
import { Blog } from "../../../../context/BlogContext";
import PropTypes from "prop-types";

const ProfileHome = ({ getUserData }) => {
  const { postData, postLoading } = Blog();
  const userPost =
    postData &&
    postData?.filter((post) => post?.userId === getUserData?.userId);

  return (
    <div className="flex flex-col gap-5 mb-[4rem]">
      {userPost.length === 0 && (
        <p className="text-gray-500">
          <span className="capitalize">{getUserData?.username}</span> has no
          posts
        </p>
      )}
      {postLoading ? (
        <Loading />
      ) : (
        userPost &&
        userPost?.map((post, i) => <PostsCard post={post} key={i} />)
      )}
    </div>
  );
};

ProfileHome.propTypes = {
  getUserData: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default ProfileHome;
