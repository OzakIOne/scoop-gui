const fs = require('fs').promises
const path = require('path')
const BucketNames = {
    "main": `${process.env.USERPROFILE}\\scoop\\buckets\\main\\bucket`,
    "extras": `${process.env.USERPROFILE}\\scoop\\buckets\\extras\\bucket`
}

async function read(bucketPath) {
    try {
        const dirdata = await fs.readdir(bucketPath)
        return parseBucketFiles(dirdata)
    }
    catch (e) { console.error(e) }
}

async function parseBucketFiles(FileName) {
    return Promise.all(
        FileName.map(
            File => (
                fs.readFile(
                    path.join(
                        BucketNames.main,
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

async function test() {
    const [err, appsArray] = await sweetPromise(read(BucketNames.main))

    if (err)
        return console.error(err);

    console.log(appsArray);
}
console.log(test())