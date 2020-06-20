import React from 'react';

function ApplicationsContainer(props) {
    return (
        <div className="appDiv">
            <span className="appName">{props.appname}</span>
            <a href={props.website} className="appSite">Homepage</a>
        </div>
    )
}

export default ApplicationsContainer