import React from 'react';
import InstalledBuckets from './InstalledBuckets'
import Availablebuckets from './AvailableBuckets'

function bucketsColumn() {
    return (
        <div className="buckets flex--column">
            <InstalledBuckets />
            <Availablebuckets />
        </div>
    )
}

export default bucketsColumn