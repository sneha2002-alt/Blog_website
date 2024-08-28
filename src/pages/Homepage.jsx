// src/pages/HomePage.js
import { useContext } from "react";
import BlogList from "../components/BlogList";
import AddEditBlog from "../components/AddEditBlog";
import { BlogContext } from "../context/BlogContext";

const HomePage = () => {
  const { blogs, addBlog, editBlog, deleteBlog } = useContext(BlogContext);

  return (
    <div>
      <AddEditBlog onSave={addBlog} />
      <BlogList blogs={blogs} onDelete={deleteBlog} onEdit={editBlog} />
    </div>
  );
};

export default HomePage;
