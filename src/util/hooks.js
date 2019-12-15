import { useState } from "react";
export const usePager = (callback, initialState) => {
    const [activePageLink, setActivePageLink] = useState(initialState);
    const [activeAccordionIndex, setActiveAccordionIndex] = useState(initialState);
    const handleItemClick = (e, { name }) => {
        console.log(name)
        setActivePageLink(name);
    };
    const handleAccordionTitleClick = (e, itemProps) => {
        const { index } = itemProps
        const newIndex = activeAccordionIndex === index ? -1 : index
        setActiveAccordionIndex(newIndex)
    }
    const path = "hebebuehne"    // buero/prueffristen

const arr = [];
function checkNodeArrays(page, path){
  for (let index = 0; index < page.length; index++) {
    const element = page[index];
    if(element.filename === path){
      arr.push(element.id)
      return true
    } else {
      if(element.pages){
        if(checkNodeArrays(element.pages, path)){
          arr.push(element.id)
          return true
        }
      }
    }
  }
}
    return {
        handleItemClick,
        handleAccordionTitleClick,
    };
};