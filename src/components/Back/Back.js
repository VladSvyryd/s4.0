import React from 'react'
import { withRouter } from 'react-router-dom';
const Back = ({ history }) => {
    return (
        <div>
            <button onClick={() => history.goBack()}>Back</button>
        </div>
    )
}

export default withRouter(Back);
