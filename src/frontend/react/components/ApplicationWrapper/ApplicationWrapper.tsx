import React from 'react';
import { Box, IconButton } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';

export default function ApplicationWrapper(props: any) {
  return (
    <Box display="flex" flexWrap="nowrap" alignItems="center">
      <IconButton aria-label="delete">
        <AddIcon />
      </IconButton>
      <h2>{props.appName}</h2>
      <span>Description : {props.description}</span>
    </Box>
  );
}
