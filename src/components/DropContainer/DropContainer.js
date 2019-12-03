import React from "react";

const DropContainer = props => {
  const drop = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    const isDroppable = e.dataTransfer.getData("droppable");
    if (isDroppable === "true") {
      const b = document.createElement("b");
      b.textContent = data;
      e.target.appendChild(b);
      console.log(e.nativeElement);
      // this is a callback function, it triggers function in parent after succesful drop
      props.isDroppedCallback();
    }
  };
  const allowDrop = e => {
    e.preventDefault();
  };

  return (
    <div
      id={props.id}
      className={props.className}
      style={props.style}
      onDragOver={allowDrop}
      onDrop={drop}
    >
      {props.children}
    </div>
  );
};
export default DropContainer;
