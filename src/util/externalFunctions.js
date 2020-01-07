export default function findNode(currentExerciseId, currentNode) {
  var i, currentChild, result;

  if (currentExerciseId === currentNode.id) {
    currentNode.done = !currentNode.done;
  } else {
    // Use a for loop instead of forEach to avoid nested functions
    // Otherwise "return" will not work properly
    for (
      i = 0;
      currentNode.pages !== undefined && i < currentNode.pages.length;
      i += 1
    ) {
      currentChild = currentNode.pages[i];

      // Search in the current child
      result = findNode(currentExerciseId, currentChild);

      // Return the result if the node has been found
      if (result !== false) {
        currentNode.done = !currentNode.done;
      }
    }

    // The node has not been found and we have no more options
    return false;
  }
}
