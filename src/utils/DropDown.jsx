import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const DropDown = ({ children, size, showDrop, setShowDrop }) => {
  const dropRef = useRef(null);
  useEffect(() => {
    const clickOutside = (e) => {
      if (showDrop && dropRef.current && !dropRef.current.contains(e.target)) {
        setShowDrop(false);
      }
    };
    window.addEventListener("mousedown", clickOutside);
    return () => window.removeEventListener("mousedown", clickOutside);
  }, [dropRef, showDrop, setShowDrop]);

  return (
    <>
      {showDrop && (
        <div
          ref={dropRef}
          className={`shadows flex flex-col absolute right-0 top-[2rem] bg-white ${size}`}
        >
          {children}
        </div>
      )}
    </>
  );
};

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  showDrop: PropTypes.bool.isRequired,
  setShowDrop: PropTypes.func.isRequired,
};

export default DropDown;
