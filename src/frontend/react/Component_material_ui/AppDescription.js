import React from "react";

export default function AppDescription(props) {
    return (
        <span>
            {props.title}: {props.text}
        </span>
    );
}
