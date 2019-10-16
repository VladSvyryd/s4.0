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
    return {
        handleItemClick,
        handleAccordionTitleClick,
    };
};