import React from "react";
import { NavLink, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';

const Category = ({ history, match }) => {

    const handleLinkClick = () => {
        console.log(history);
        history.push("/fuegen/p1");
    }
    const handleMainMenuClick = () => {
        history.push('/')
    }
    return (
        <div>
            {" "}
            <ul>
                <li>
                    <NavLink to={`${match.url}/shoes`} activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                    }}>Shoes</NavLink>
                </li>
                <li>
                    <NavLink to={`${match.url}/boots`} activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                    }}>Boots</NavLink>
                </li>
                <li>
                    <NavLink to={`${match.url}/footwear`} activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                    }}>Footwear</NavLink>
                </li>
                <NavLink to={`/fuegen/p1`}>internal link</NavLink>

                <button onClick={handleMainMenuClick}>Go MainMenu</button>

            </ul>

        </div>
    );
};

export default withRouter(Category);
