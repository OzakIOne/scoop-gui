import React from 'react';
import ApplicationContainer from './ApplicationContainer'
import scrap from '../../services/scrapping/scrap'

function ApplicationsList() {
    return (
        <div className="tabs__tab flex--column flex--grow">
            <span>Application list</span>
            <div className="app-list flex--column" id="list">
                <ApplicationContainer />
            </div>
        </div>
    )
}

export default ApplicationsList