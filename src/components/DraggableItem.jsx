import React from "react";
import { DragDropContainer } from "react-drag-drop-container";

/* 
    // https://github.com/peterh32/react-drag-drop-container <---- this is github page with instructions

*/

export default class DraggableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noDragging: false,
      exerciseBitValueAnswer: this.props.exerciseBitValueAnswer,
      multipleDroppable: this.props.multipleDroppable
    };
  }

  landedOn2 = e => {
    console.log("landed");
    console.log(e);
    console.log(e.dragData);
    console.log("I was dropped on " + e.dropData.name);
    console.log({ "onDrop event passed back to DropBox": e });
    // check if you can't drop and trigger function of failled drop
    // this function will trigger some feedback in the parent
    if (e.dropData.name !== "undefined" && !this.state.multipleDroppable) {
      let isMatched =
        (this.state.exerciseBitValueAnswer & e.dragData.value) ===
        e.dragData.value;
      if (isMatched) {
        this.setState({ noDragging: true });
      }
      // trigger function from parent
      this.props.callbackAfterDropFail(isMatched);
    } else if (
      this.state.multipleDroppable &&
      e.dropData.name !== "undefined"
    ) {
      // in this case it is name or indexName of Droppable container to be allowed to be droppped in
      let isMatched =
        e.dropData.name === "dr" + this.state.exerciseBitValueAnswer;
      if (isMatched) {
        this.setState({ noDragging: true });
      }
      // trigger function from parent
      this.props.callbackAfterDropFail(isMatched);
    } else {
      this.setState({ noDragging: false });
    }
  };
  landedOn = e => {
    let isMatched =
      (this.state.exerciseBitValueAnswer & e.dragData.value) ===
      e.dragData.value;
    if (isMatched) {
      this.setState({ noDragging: true });
    }
  };

  render() {
    // note use of render prop below, rather than child element
    return (
      <DragDropContainer
        targetKey={this.props.targetKey}
        dragClone={this.props.dragClone || false}
        dragData={{
          label: this.props.label,
          extraText: this.props.extraText,
          value: this.props.bitValue
        }}
        onDragStart={() => console.log("start")}
        onDrag={() => console.log("dragging")}
        onDragEnd={() => console.log("end")}
        onDrop={e => console.log(e)}
        customDragElement={this.props.customDragElement}
        noDragging={this.props.noDragging || this.state.noDragging}
        render={() => {
          return this.props.handler;
        }}
      />
    );
  }
}
