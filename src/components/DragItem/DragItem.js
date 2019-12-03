import React from "react";

const DragItem = props => {
  const context = props.context;
  const drag = e => {
    e.dataTransfer.setData("transfer", context);
    e.dataTransfer.setData("droppable", props.isDroppable);
  };

  const noAllowDrop = e => {
    e.stopPropagation();
  };

  return (
    <div
      id={props.id}
      draggable="true"
      style={props.style}
      onDragStart={drag}
      onDragOver={noAllowDrop}
    >
      {props.children}
    </div>
  );
};

export default DragItem;
