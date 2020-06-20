import React from "react";
import { Box, IconButton } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";

export default function BucketName(props) {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <span> - {props.title}</span>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}
