import React from 'react';
import Header from './Header.jsx';
import CommonLayout from '../CommonLayout.jsx';

export default function Layout(children) {

  return (
    <CommonLayout {...children.props} >
      <Header>
        {children}
      </Header>
    </CommonLayout>
  );
}
