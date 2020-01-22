const scrap = require('../services/scrapping/scrap')

scrap.test(BucketNames.extras).then((e) => {
    const listDiv = document.getElementById('list')
    for (let i = 0; i < e.length; i++) {
        const appDiv = document.createElement("div")
        const appName = document.createElement("span")
        const appSite = document.createElement("a")
        appDiv.appendChild(appName)
        appDiv.appendChild(appSite)

        appName.textContent = 'null'
        appSite.href = e[i].homepage
        appSite.textContent = 'Official website'

        appDiv.classList.add('appDiv')
        appName.classList.add('appName')
        appSite.classList.add('appSite')

        listDiv.appendChild(appDiv)
    }

    ParseFiles(BucketNames.extras).then((e) => {
        for (let i = 0; i < e.length; i++) {
            let a = document.querySelectorAll('.appName')
            a[i].textContent = e[i].substring(0, e[i].length - 5);
        }
    })
});

scrap.ParseFiles(installedBuckets).then((e) => {
    const installedBucketsDiv = document.getElementById('installedBuckets')
    for (let i = 0; i < e.length; i++) {
        const bucketDiv = document.createElement("div")
        const bucketName = document.createElement("span")
        bucketDiv.appendChild(bucketName)
        installedBucketsDiv.appendChild(bucketDiv)
        bucketName.textContent = e[i]
    }
})

scrap.GetNotInstalledBuckets().then((e) => {
    const knownBucketsDiv = document.getElementById('availableBuckets')
    for (let i = 0; i < e.length; i++) {
        const bucketDiv = document.createElement("div")
        const bucketName = document.createElement("span")
        bucketDiv.appendChild(bucketName)
        knownBucketsDiv.appendChild(bucketDiv)
        bucketName.textContent = e[i]
    }
})