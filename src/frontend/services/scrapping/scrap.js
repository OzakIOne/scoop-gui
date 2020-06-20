const fs = require("fs").promises;
const path = require("path");
const _ = require("lodash");
const BucketNames = {
    main: `${process.env.USERPROFILE}\\scoop\\buckets\\main\\bucket`,
    extras: `${process.env.USERPROFILE}\\scoop\\buckets\\extras\\bucket`,
};
const appsPath = `${process.env.USERPROFILE}\\scoop\\apps`;
const bucketPath = `${process.env.USERPROFILE}\\scoop\\buckets`;
const bucketList = `${process.env.USERPROFILE}\\scoop\\apps\\scoop\\current\\buckets.json`;

async function ParseFiles(dirName) {
    try {
        return await fs.readdir(dirName);
    } catch (e) {
        console.error(e);
    }
}

async function GetNotInstalledBuckets() {
    // function GetNotInstalledBuckets() {
    try {
        return await fs
            .readFile(bucketList, { encoding: "utf-8" })
            .then(async (e) => {
                let bucketsList = Object.keys(JSON.parse(e)); // parse all the known buckets
                return await ParseFiles(bucketPath).then((instBuckets) => {
                    // parse all the installed buckets
                    return _.difference(bucketsList, instBuckets);
                });
            });
    } catch (e) {
        console.error(e);
    }

    // return await new Promise((res, rej) => {
    //     res(console.log("toto res"))
    // })

    // return await Promise.resolve().then( () => {console.log('TOTOOO'); return "TAUTAU"})
    // return await Promise.resolve().then( function ()  {console.log('TOTOOO'); return "TAUTAU"})
}
// GetNotInstalledBuckets().then((a) => console.log(a))
// GetNotInstalledBuckets().then(function (a) {console.log(a)})

async function read(bucketPath) {
    try {
        const dirdata = await fs.readdir(bucketPath); //array of file names
        return parseBucketFiles(dirdata, bucketPath);
    } catch (e) {
        console.error(e);
    }
}

async function parseBucketFiles(FileName, bucketPath) {
    return Promise.all(
        FileName.map((File) =>
            fs.readFile(path.join(bucketPath, File)).then(JSON.parse)
        )
    );
}

async function sweetPromise(P) {
    return P.then(
        (data) => [null, data],
        (err) => [err, null]
    );
}

async function test(bucket) {
    const [err, appsArray] = await sweetPromise(read(bucket));

    if (err) return console.error(err);

    return appsArray;
}

function test2(bucket) {
    // console.log(bucket);
    console.log("totooo");
}

module.exports = {
    test,
    ParseFiles,
    GetNotInstalledBuckets,
    read,
    test2,
    BucketNames,
};
// module.exports = {GetNotInstalledBuckets};
// export { test, ParseFiles, GetNotInstalledBuckets, read, test2}
// export default GetNotInstalledBuckets;
