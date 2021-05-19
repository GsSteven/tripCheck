import React from "react";

export default function ExpandedList(props) {
  return (
    <div className="expandedListWrapper">
      <button
        type="button"
        className="closeButton"
        onClick={() => props.close()}
      >
        X
      </button>
      EXPANDED WOOOOOOOOOOOOOW
    </div>
  );
}
