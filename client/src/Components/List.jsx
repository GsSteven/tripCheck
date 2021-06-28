import React, { useState } from "react";
import { motion } from "framer-motion";
import ExpandedList from "./ExpandedList";
import EditList from "./EditList";

const inOutVariant = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

export default function List(props) {
  const [expandList, setExpandList] = useState(false);
  const [expandEdit, setExpandEdit] = useState(false);

  const toggleExpand = () => {
    if (expandList) {
      setExpandList(false);
      props.refresh();
    } else {
      setExpandList(true);
    }
    props.toggleShade();
  };

  const toggleEdit = () => {
    //close expand and open edit
    if (expandEdit) {
      setExpandEdit(false);
      setExpandList(false);
      props.toggleShade();
      props.refresh();
    } else {
      setExpandEdit(true);
      setExpandList(false);
    }
  };

  const closeButtonSVG = (
    <motion.svg
      onClick={toggleExpand}
      className="closeButton"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transition={{ staggerChildren: 1.5 }}
    >
      <motion.path
        d="
        M 0, 100
        l 0, -100 
        "
        strokeWidth="20"
        variants={inOutVariant}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="
      M 0, 0
      l 100, 0
      "
        strokeWidth="20"
        variants={inOutVariant}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="
      M 100, 0
      l 0, 100
      "
        strokeWidth="20"
        variants={inOutVariant}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="
      M 100, 100
      l -100, 0
      "
        strokeWidth="20"
        variants={inOutVariant}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="
      M 25, 25
      l 50, 50
      "
        strokeWidth="10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 1, delay: 0.75 } }}
      />
      <motion.path
        d="
      M 75, 25
      l -50, 50
      "
        strokeWidth="10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 1, delay: 1.25 } }}
      />
    </motion.svg>
  );
  const closeEditSVG = (
    <motion.svg
      onClick={toggleEdit}
      className="closeButton"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transition={{ staggerChildren: 1.5 }}
    >
      <motion.path
        d="
        M 0, 100
        l 0, -100 
        "
        strokeWidth="20"
        variants={inOutVariant}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="
      M 0, 0
      l 100, 0
      "
        strokeWidth="20"
        variants={inOutVariant}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="
      M 100, 0
      l 0, 100
      "
        strokeWidth="20"
        variants={inOutVariant}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="
      M 100, 100
      l -100, 0
      "
        strokeWidth="20"
        variants={inOutVariant}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="
      M 25, 25
      l 50, 50
      "
        strokeWidth="10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 1, delay: 0.75 } }}
      />
      <motion.path
        d="
      M 75, 25
      l -50, 50
      "
        strokeWidth="10"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 1, delay: 1.25 } }}
      />
    </motion.svg>
  );

  return (
    <div className="listWrapper">
      <h2 onClick={toggleExpand}>{props.name}</h2>
      {expandList && (
        <div className="expandedContainer">
          {closeButtonSVG}
          <ExpandedList {...props} close={toggleExpand} openEdit={toggleEdit} />
        </div>
      )}
      {expandEdit && (
        <div className="editContainer">
          {closeEditSVG}
          <EditList {...props} close={toggleEdit} />
        </div>
      )}
    </div>
  );
}
