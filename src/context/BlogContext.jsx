import { createContext, useReducer } from "react";

const BlogContext = createContext();

const blogReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      return [...state, action.payload];
    case "EDIT_BLOG":
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.payload);
    default:
      return state;
  }
};

const BlogProvider = ({ children }) => {
  const [blogs, dispatch] = useReducer(blogReducer, []);

  const addBlog = (blog) => {
    dispatch({ type: "ADD_BLOG", payload: blog });
  };

  const editBlog = (blog) => {
    dispatch({ type: "EDIT_BLOG", payload: blog });
  };

  const deleteBlog = (id) => {
    dispatch({ type: "DELETE_BLOG", payload: id });
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, editBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
