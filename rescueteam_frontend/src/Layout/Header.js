import React from 'react';
import AppBar from '../custom_theme/components/AppBar';

export default function Header(props) {
  return <AppBar title={props.title} BackButton={props.BackButton} />;
}
