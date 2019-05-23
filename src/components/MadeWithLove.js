import React, { Component } from 'react';

class MadeWithLove extends Component {
  render() {
    return (
      <div style={this.props.style} className="made-with-love">
        Made with <span role='img' aria-label='heart'>❤️</span> by <a href={this.props.link}>{this.props.by}</a>
      </div>
    );
  }
}

export default MadeWithLove;