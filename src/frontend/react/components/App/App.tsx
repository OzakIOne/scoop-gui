import React, { useState, useEffect } from 'react';
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from '@material-ui/core/';
import ApplicationWrapper from '../ApplicationWrapper/ApplicationWrapper';
import LongMenu from '../LongMenu/LongMenu';
import BucketName from '../BucketName/BucketName';
import AppDescription from '../AppDescription/AppDescription';
import { FixedSizeList as List } from 'react-window';

async function apiCall(method: string) {
  const url = `http://localhost:3005/api/${method}`;
  const response = await fetch(url);
  return response.json();
}

export default function App() {
  const [appList, setAppList] = useState([]);
  const handleInstalledApps = () => {
    apiCall('getInstalledApps').then((data) => setAppList(data));
  };
  useEffect(() => handleInstalledApps(), []);

  const [getInstalledBuckets, setgetInstalledBuckets] = useState([]);
  const handlegetInstalledBuckets = () => {
    apiCall('getInstalledBuckets').then((data) => setgetInstalledBuckets(data));
  };
  useEffect(() => handlegetInstalledBuckets(), []);

  const [getNotInstalledBuckets, setgetNotInstalledBuckets] = useState([]);
  const handlegetNotInstalledBuckets = () => {
    apiCall('getNotInstalledBuckets').then((data) =>
      setgetNotInstalledBuckets(data),
    );
  };
  useEffect(() => handlegetNotInstalledBuckets(), []);

  const [search, setSearch] = useState('');
  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const [filter, setFilter] = useState('installed');
  const handleFilterChange = (event: any) => {
    const value = event.target.value;
    setFilter(value);
    if (value === 'installed') {
      apiCall('getInstalledApps').then((data) => {
        setAppList(data);
      });
    } else if (value === 'all') {
      apiCall('getAllAppsName').then((data) => {
        const cleandata = data
          .flat()
          .map((appname: string) => appname.slice(0, -5));
        console.log('cleandata:', cleandata);
        setAppList(cleandata);
      });
    } else if (value === 'notinstalled') {
      apiCall('getNotInstalledApps').then((data) => {
        setAppList(data);
      });
    }
  };

  interface rowTypes {
    index: any;
    style: any;
  }
  const Row = ({ index, style }: rowTypes) => (
    <div style={style}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        key={index}
      >
        <ApplicationWrapper appName={appList[index]} />
      </Box>
    </div>
  );

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
            {getInstalledBuckets.map((bucket) => (
              <BucketName title={bucket} key={bucket} />
            ))}
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
            {getNotInstalledBuckets.map((bucket) => (
              <BucketName title={bucket} key={bucket} />
            ))}
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
                value={filter}
                onChange={handleFilterChange}
              >
                <FormControlLabel // need a callback to filter apps
                  value="all"
                  control={<Radio color="primary" />}
                  label="Show all"
                  labelPlacement="start"
                />
                <FormControlLabel // need a callback to filter apps
                  value="installed"
                  control={<Radio color="primary" />}
                  label="Show only installed apps"
                  labelPlacement="start"
                />
                <FormControlLabel // need a callback to filter apps
                  value="notinstalled"
                  control={<Radio color="primary" />}
                  label="Show only not installed apps"
                  labelPlacement="start"
                />
              </RadioGroup>
              <TextField
                id="filled-basic"
                label="Search an app"
                variant="filled"
                onChange={handleSearchChange}
                value={search}
              ></TextField>
            </div>
            {/* </FormControl> */}

            <Box display="flex" flexDirection="column" className="itemList">
              <List
                height={1000}
                width={900}
                itemCount={appList.length}
                itemSize={50}
              >
                {Row}

                {/* {appList
                  .filter((app: string) => {
                    if (search === '') return app;
                    else if (
                      app
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    )
                      return app;
                  })
                  .map((app, i) => (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      key={i}
                    >
                      <ApplicationWrapper appName={app} />
                    </Box>
                  ))} */}
              </List>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column" width="50%">
              {/* pass props and set them when user click on an app */}
              <AppDescription title="Name" text="Discord" />
            </Box>
            <Box display="flex" flexDirection="column" width="50%">
              {/* pass props and set them when user click on an app */}
              <span>Cache: Total: 48 files, 1.5 GB</span>
              <span>Checkup: WARN Found 2 potential problems.</span>
              <span>Status: Scoop is up to date. Everything is ok !</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
