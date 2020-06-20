import React, { useState } from "react";
import {
    Box,
    Checkbox,
    RadioGroup,
    FormControlLabel,
    TextField,
} from "@material-ui/core/";
import ApplicationWrapper from "./ApplicationWrapper";
import LongMenu from "./LongMenu";
import BucketName from "./BucketName";
import AppDescription from "./AppDescription";

async function NotInstalledBucketList() {
    const url = "http://localhost:3005/api/scrap/GetNotInstalledBuckets/async";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default function App() {
    const [UninstalledBuckets, setBuckets] = React.useState([]);

    return (
        <div className="overflow">
            <Box display="flex" className="overflow">
                <Box display="flex" flexDirection="column" width="400px">
                    <Box
                        display="flex"
                        flexDirection="column"
                        flexWrap="nowrap"
                        alignItems="center"
                        justifyContent="start"
                        height="50%"
                        overflow="auto"
                    >
                        <h1>Installed Buckets</h1>
                        {/* call nodejs function with a map to render bucket list */}
                        <BucketName title="Main bucket" />
                        <BucketName title="Main bucket" />
                        <BucketName title="Main bucket" />
                        <BucketName title="Main bucket" />
                        <BucketName title="Main bucket" />
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        flexWrap="nowrap"
                        alignItems="center"
                        justifyContent="start"
                        height="50%"
                        overflow="auto"
                    >
                        <h1>Available Buckets</h1>
                        {/* call nodejs function with a map to render bucket list */}
                        {/* {NotInstalledBucketList().then((e) =>
                            e.map((elem) => {
                                // console.log(elem);
                                <BucketName title={elem} />;
                            })
                        )} */}
                        <BucketName title="Php bucket lel" />
                        <BucketName title="Php bucket lel" />
                        <BucketName title="Php bucket lel" />
                        <BucketName title="Php bucket lel" />
                        <BucketName title="Php bucket lel" />
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" className="overflow">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="space-around"
                        className="secondPart"
                    >
                        {/* <FormControl component="fieldset" fullWidth="true"> */}
                        <div className="FilterBar">
                            <RadioGroup
                                row
                                aria-label="position"
                                name="appsFilter"
                                defaultValue="installed"
                            >
                                <FormControlLabel // need a callback to filter apps
                                    value="installed" // value controlled by default value
                                    control={<Checkbox color="primary" />}
                                    label="Installed apps" // Displayed text
                                    labelPlacement="start" // text placement compared to radio button pov
                                />
                                <FormControlLabel
                                    value="bucket"
                                    control={<Checkbox color="primary" />}
                                    label="Bucket"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value="recent update"
                                    control={<Checkbox color="primary" />}
                                    label="Recent update"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value="John doe"
                                    control={<Checkbox color="primary" />}
                                    label="John doe"
                                    labelPlacement="start"
                                />
                            </RadioGroup>
                            <TextField
                                id="outlined-basic"
                                label="Search an app"
                                variant="outlined"
                            ></TextField>
                        </div>
                        {/* </FormControl> */}
                        <Box
                            display="flex"
                            flexDirection="column"
                            className="itemList"
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <ApplicationWrapper
                                    appName="7-Zip"
                                    versions="3 / 4 / 5"
                                />
                                <LongMenu />
                            </Box>

                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <ApplicationWrapper
                                    appName="7-Zip"
                                    versions="3 / 4 / 5"
                                />
                                <LongMenu />
                            </Box>

                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <ApplicationWrapper
                                    appName="7-Zip"
                                    versions="3 / 4 / 5"
                                />
                                <LongMenu />
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        wrap="nowrap"
                        justifyContent="space-between"
                    >
                        <Box display="flex" flexDirection="column" width="50%">
                            {/* pass props and set them when user click on an app */}

                            <AppDescription title="Name" text="Discord" />
                            <AppDescription
                                title="Description"
                                text="Free voice and text chat"
                            />
                            <AppDescription title="Version" text="0.0.306" />
                            <AppDescription
                                title="Website"
                                text="https://discord.com"
                            />
                            <AppDescription title="License" text="Freeware" />
                        </Box>
                        <Box display="flex" flexDirection="column" width="50%">
                            {/* pass props and set them when user click on an app */}
                            <AppDescription title="Cache" text="Discord" />
                            <AppDescription
                                title="Checkup"
                                text="Free voice and text chat"
                            />
                            <AppDescription
                                title="Status"
                                text="Scoop is up to date. Everything is ok !"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
