import { Popup, Image } from "semantic-ui-react";
import React from "react";
import popupArrow from "../../assets/pics/popupArrow.gif";
// Custom elment made of Popup(Semantic UI React), improved: use as word or as picture
// new properties: name: is used as Name of link
//               : title: is used as Title name in Popup Windows (P.S First is looking for a Name but if name and title is different will take title)
//               : img_source: used as placeholder for picture if the link has to be a picture
//               : img_size: used to display img size of Image component

function PopUp({ component: Component, ...rest }) {
  return (
    <Popup
      {...rest}
      trigger={
        rest.img_source && rest.img_source ? (
          <Image
            size={rest.img_size && rest.img_size}
            src={rest.img_source}
            title={rest.name || rest.title}
            alt={rest.name || rest.title}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <span
            style={
              !rest.fluid ? { display: "inline-block" } : { display: "initial" }
            }
          >
            &nbsp;
            <img src={popupArrow} />
            <b style={{ cursor: "pointer" }}>{rest.name}&nbsp;</b>
          </span>
        )
      }
      header={
        <div className="popUpHeader bckOrange">{rest.title || rest.name}</div>
      }
    />
  );
}

export default PopUp;
