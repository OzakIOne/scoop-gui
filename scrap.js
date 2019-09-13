const fs = require('fs').promises
const path = require('path')
const _ = require('lodash')
const BucketNames = {
    "main": `${process.env.USERPROFILE}\\scoop\\buckets\\main\\bucket`,
    "extras": `${process.env.USERPROFILE}\\scoop\\buckets\\extras\\bucket`
}
const installedApps = `${process.env.USERPROFILE}\\scoop\\apps`
const installedBuckets = `${process.env.USERPROFILE}\\scoop\\buckets`
const knownBuckets = `${process.env.USERPROFILE}\\scoop\\apps\\scoop\\current\\buckets.json`

async function ParseFiles(installed) {
    try {
        return await fs.readdir(installed)
    } catch (e) { console.error(e) }
}

async function GetNotInstalledBuckets() {
    try {
        return await fs.readFile(knownBuckets, { encoding: 'utf-8' }).then(async (e) => {
            let bucketsList = Object.keys(JSON.parse(e)) // parse all the known buckets
            return await ParseFiles(installedBuckets).then((instBuckets) => { // parse all the installed buckets
                return _.difference(bucketsList, instBuckets)
            })
        })
    } catch (e) { console.error(e) }
}

async function read(bucketPath) {
    try {
        const dirdata = await fs.readdir(bucketPath) //array of file names
        return parseBucketFiles(dirdata, bucketPath)
    }
    catch (e) { console.error(e) }
}

async function parseBucketFiles(FileName, bucketPath) {
    return Promise.all(
        FileName.map(
            File => (
                fs.readFile(
                    path.join(
                        bucketPath,
                        File)
                )
            )
                .then(
                    JSON.parse
                )
        )
    )
}

async function sweetPromise(P) {
    return P.then(data => [null, data], err => [err, null])
}

async function test(bucket) {
    const [err, appsArray] = await sweetPromise(read(bucket))

    if (err)
        return console.error(err);

    return appsArray
}

module.exports = { test, ParseFiles, GetNotInstalledBuckets }