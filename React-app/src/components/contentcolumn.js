import React from 'react';
import Appcontainer from './AppContainer'
import Appinfo from './InstalledApplications'

function contentColumn() {
    return (
        <div className="content flex--column">
            <Appcontainer />
            <Appinfo />
        </div>
    )
}

export default contentColumn