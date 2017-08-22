import React from 'react';

export default class Home extends React.Component {
  render(){
    return (
      <div>this is layout
        {this.props.children}
      </div>
      
    )
  }
}