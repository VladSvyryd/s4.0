import React from "react";
import { NavLink, Route } from "react-router-dom";

const Category_1 = ({ match }) => {
    return (
        <div>
            {" "}
            <ul>
                <li>
                    <NavLink to={`${match.url}/shoes`} activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                    }}>BBB</NavLink>
                </li>
                <li>
                    <NavLink to={`${match.url}/boots`} activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                    }}>AAAA</NavLink>
                </li>
                <li>
                    <NavLink to={`${match.url}/footwear`} activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                    }}>CCCC</NavLink>
                </li>
            </ul>
            <Route
                path={`${match.path}/:name`}
                render={({ match }) => (
                    <div>
                        {" "}
                        <h3> {match.params.name} </h3>
                    </div>
                )}
            />
        </div>
    );
};

export default Category_1;
