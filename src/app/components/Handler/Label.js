import React, { Component } from 'react';

class Label extends Component {
  static defaultProps = {
    styles: {},
    text: '',
    color: '#000000',
  };
  render() {
    return (
      <div style={{
          backgroundColor: this.props.color,
          color: '#FFFFFF',
          padding: '8px 10px',
          borderRadius: '5px',
          fontWeight: 'bold',
          display: 'inline-block',
          fontSize: '14px',
          lineHeight: 1,
          ...this.props.styles,
        }}
      >
        {this.props.text}
      </div>
    );
  }
}

export default Label;
