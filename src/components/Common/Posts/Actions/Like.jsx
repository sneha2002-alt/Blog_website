import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { Blog } from "../../../../context/BlogContext";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";
import useSingleFetch from "../../../hooks/useSingleFetch";
import { formatNum } from "../../../../utils/helper";
import PropTypes from "prop-types";

const Like = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser, setAuthModel } = Blog();

  const { data } = useSingleFetch("posts", postId, "likes");

  useEffect(() => {
    setIsLiked(
      data && data.findIndex((item) => item.id === currentUser?.uid) !== -1
    );
  }, [data, currentUser]);

  const handleLike = async () => {
    try {
      if (currentUser) {
        const likeRef = doc(db, "posts", postId, "likes", currentUser?.uid);
        if (isLiked) {
          await deleteDoc(likeRef);
        } else {
          await setDoc(likeRef, {
            userId: currentUser?.uid,
          });
        }
      } else {
        setAuthModel(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <button onClick={handleLike} className="flex items-center gap-1 text-sm">
      <BiLike
        className={`text-xl ${isLiked ? "text-black" : "text-gray-500"}`}
      />

      <span>{formatNum(data?.length)}</span>
    </button>
  );
};

Like.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default Like;
