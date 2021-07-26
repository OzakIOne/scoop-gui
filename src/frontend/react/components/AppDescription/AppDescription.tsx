import React from 'react';

export default function AppDescription(props: any) {
  return (
    <>
      <span>Name: {props.name}</span>
      <span>Description: {props.description}</span>
      <span>Version: {props.version}</span>
      <span>
        Website:
        <a href={props.website} target="_blank">
          {props.website}
        </a>
      </span>
      <span>License: {props.license}</span>
    </>
  );
}
