import React from 'react';
import Button from '../../custom_theme/components/Button';

export default function MesButton(props) {
  // function onClick(e) {
  //   console.log(props.id);
  // }

  return (
    <Button
      key={props.id}
      id={props.id}
      onClick={props.onClick}
      variant="text"
      color="secondary"
    >
      {props.text}
    </Button>
  );
}
