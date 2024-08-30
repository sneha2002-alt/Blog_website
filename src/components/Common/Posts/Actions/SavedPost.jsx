import { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { Blog } from "../../../../context/BlogContext";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";
import useSingleFetch from "../../../hooks/useSingleFetch";
import PropTypes from "prop-types";

const SavedPost = ({ post }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { currentUser, setAuthModel } = Blog();
  const { data } = useSingleFetch("users", post?.userId, "savePost");

  useEffect(() => {
    setIsSaved(data && data.some((item) => item.id === post?.id));
  }, [data, post?.id]);

  const handleSave = async () => {
    try {
      if (currentUser) {
        const saveRef = doc(
          db,
          "users",
          currentUser?.uid,
          "savePost",
          post?.id
        );

        if (isSaved) {
          await deleteDoc(saveRef);
          toast.success("Post has been unsaved");
        } else {
          await setDoc(saveRef, {
            ...post,
          });
          toast.success("Post has been Saved");
        }
      } else {
        setAuthModel(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <button onClick={handleSave} className="hover:opacity-60">
        <CiSaveDown2
          className={`text-2xl pointer-event-none
        ${isSaved ? "text-yellow-600" : ""}
        `}
        />
      </button>
    </div>
  );
};

SavedPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};

export default SavedPost;
