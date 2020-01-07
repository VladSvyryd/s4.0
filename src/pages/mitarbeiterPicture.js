import React from "react";
import { Image } from "semantic-ui-react";

import i0 from "../assets/pics/7-mitarbeiter/00-alles_falsch.jpg";
import i1 from "../assets/pics/7-mitarbeiter/01-brille.jpg";
import i2 from "../assets/pics/7-mitarbeiter/02-schuhe.jpg";
import i3 from "../assets/pics/7-mitarbeiter/03-schuhe_brille.jpg";
import i4 from "../assets/pics/7-mitarbeiter/04_kittel.jpg";
import i5 from "../assets/pics/7-mitarbeiter/05-kittel_brille.jpg";
import i6 from "../assets/pics/7-mitarbeiter/06-kittel_schuhe.jpg";
import i7 from "../assets/pics/7-mitarbeiter/07-kittel_schuhe_brille.jpg";
import i8 from "../assets/pics/7-mitarbeiter/08_aermel.jpg";
import i9 from "../assets/pics/7-mitarbeiter/09-aermel_brille.jpg";
import i10 from "../assets/pics/7-mitarbeiter/10-aermel_schuhe.jpg";
import i11 from "../assets/pics/7-mitarbeiter/11-aermel_schuhe_brille.jpg";
import i12 from "../assets/pics/7-mitarbeiter/12-aermel_kittel.jpg";
import i13 from "../assets/pics/7-mitarbeiter/13-aermel_kittel_brille.jpg";
import i14 from "../assets/pics/7-mitarbeiter/14-aermel_kittel_schuhe.jpg";
import i15 from "../assets/pics/7-mitarbeiter/15_alles_richtig.jpg";

function MitarbeiterPicture({ currentMittarbeiter }) {
  const pictures = [
    i0,
    i1,
    i2,
    i3,
    i4,
    i5,
    i6,
    i7,
    i8,
    i9,
    i10,
    i11,
    i12,
    i13,
    i14,
    i15
  ];
  return (
    <div
      style={{
        width: "260px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image src={pictures[currentMittarbeiter]} />
    </div>
  );
}
export default MitarbeiterPicture;
