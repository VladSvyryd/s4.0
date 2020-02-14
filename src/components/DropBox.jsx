import React from "react";
import { DropTarget } from "react-drag-drop-container";

/*
   // https://github.com/peterh32/react-drag-drop-container <---- this is github page with instructions

*/
export default class DropBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thankYouMessage: "",
      items: [],
      exerciseBitValueAnswer: this.props.exerciseBitValueAnswer,
      exerciseCurrentState: this.props.exerciseCurrentState
    };
  }

  dropped = e => {
    if (
      (parseInt(this.state.exerciseBitValueAnswer) &
        parseInt(e.dragData.value)) ===
      parseInt(e.dragData.value)
    ) {
      // dropped element recieves a class to have disabled look
      e.containerElem.className = "dropped";
      // create new array for dropped items
      let items = this.state.items.slice();

      // push new items in items array
      items.push({
        label: e.dragData.label,
        extraText: e.dragData.extraText,
        uid: `${e.dragData.label}-${items.length}`
      });
      // update array state with new array
      this.setState({ items: items });
      // this function comes from Parent Component where you placed DropBox and DraggableItem
      // this changes  an internal state of the exercise   <DropBox  exerciseCurrentState={setExerciseCurrentState}/>
      // so the actual logic of exercise is in Parent component  E.x. "sterilisationsautoklav/ausstatung_entladung" this Page
      this.props.setExerciseCurrentState(
        lastState => (lastState += parseInt(e.dragData.value))
      );
      // update local state of bit values in current box
      this.setState({
        exerciseCurrentState: this.props.exerciseCurrentState
      });

      if (
        this.props.multipleDropBitValueAnswer &&
        this.props.exerciseCurrentState ===
          this.props.multipleDropBitValueAnswer
      )
        this.props.idDoneCallback();

      // check if the box current state matchs with bit value of exercise
      if (
        !this.props.multipleDropBitValueAnswer &&
        this.state.exerciseBitValueAnswer === this.props.exerciseCurrentState
      )
        this.props.idDoneCallback();

      console.log(e.dragData);
    }
  };

  render() {
    return (
      <DropTarget
        onHit={this.dropped}
        targetKey={this.props.targetKey}
        dropData={{ name: this.props.name }}
      >
        <div>
          {this.props.children}
          {this.state.items.map((item, index) => {
            return (
              <div
                key={item.uid}
                className={this.props.droppedItemsClass}
                index={index}
              >
                {this.props.withLabel && (
                  <span className="draggedLabel">{this.props.withLabel}</span>
                )}
                {/* <span> </span> */}
                <div className="draggedContext">
                  <span style={{ fontWeight: "bold" }}>{item.label}</span>
                  {item.extraText && (
                    <span style={{ fontSize: "10px" }}>{item.extraText}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DropTarget>
    );
  }
}
