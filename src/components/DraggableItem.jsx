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
      exerciseBitValueAnswer: this.props.exerciseBitValueAnswer
    };
  }

  landedOn = e => {
    console.log(e.dragData);
    console.log("I was dropped on " + e.dropData.name);
    console.log({ "onDrop event passed back to DropBox": e });
    // check if you can't drop and trigger function of failled drop
    // this function will trigger some feedback in the parent
    if (e.dropData.name !== "undefined") {
      let isMatched =
        (this.state.exerciseBitValueAnswer & e.dragData.value) ===
        e.dragData.value;
      if (isMatched) {
        this.setState({ noDragging: true });
      }
      // trigger function from parent
      this.props.callbackAfterDropFail(isMatched);
    }
  };
  handleDrop = currentTarget => {};
  render() {
    // note use of render prop below, rather than child element
    return (
      <DragDropContainer
        onDragEnd={this.handleDrop}
        targetKey={this.props.targetKey}
        dragClone={this.props.dragClone || false}
        dragData={{ label: this.props.label, value: this.props.bitValue }}
        customDragElement={this.props.customDragElement}
        onDrop={this.landedOn}
        noDragging={this.props.noDragging || this.state.noDragging}
        render={() => {
          return this.props.handler;
        }}
      />
    );
  }
}
