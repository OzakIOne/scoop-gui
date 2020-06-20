import React from "react";
// import * as scrap from "../../services/scrapping/scrap";
//const scrap = require('../../services/scrapping/scrap')

function InstalledBuckets() {
    return (
        <div className="buckets__installed">
            <span className="spanTitle">Installed buckets</span>
            <div id="installedBuckets">
                <AbailableBuckets />
            </div>
        </div>
    );
}

function AbailableBuckets() {
    return (
        <div>
            {/* {scrap.test2()} */}
            {/* {scrap.GetNotInstalledBuckets()} */}
            {/* {scrap.GetNotInstalledBuckets().then((a) => {console.log(a);})} */}
            {/* {scrap.GetNotInstalledBuckets().then((a) => {
                //     //GetNotInstalledBuckets().map((a) => {
                console.log(a);
                // <span>{a}</span>;
                //     console.log(bucketPath);
            })} */}
        </div>
    );
}

export default InstalledBuckets;
