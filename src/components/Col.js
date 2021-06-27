import React from 'react';

const Col = props => {
  return (
    <div className="col" style={{flex: props.flex ? props.flex : ''}}>
      {props.children}
    </div>
  );
}

export default Col;