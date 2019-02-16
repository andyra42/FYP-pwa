import React, {Component} from 'react';
import immutableToJsComponent from '../immutableToJsComponent';

class StockGrade extends Component {
  render() {
    return (
      <div>
        Models' Summary
        <svg width="100%" height={40}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff5757" stopOpacity="100%" />
              <stop offset="50%" stopColor="white" stopOpacity="100%" />
              <stop offset="100%" stopColor="#77ff8e" stopOpacity="100%" />
            </linearGradient>
          </defs>
          <rect width="100%" height="47.5%" y="20" style={{ fill: 'url(#grad1)', strokeWidth: 2, stroke: '#FFFFFF' }} />
          <rect width="2" height="50%" x={this.props.grade * 97 + 1.5 + '%'} y="20" style={{ fill: '#ffb300' }} />
          <circle r="8" cx={this.props.grade * 97 + 1.6 + '%'} cy="12" fill='#ffb300' />
          <circle r="2" cx={this.props.grade * 97 + 1.6 + '%'} cy="12" fill='#fff' />
          <text x="0" y="15" fontSize="10" fill="grey">Downtrend</text>
          <text x="100%" y="15" fontSize="10" fill="grey" textAnchor="end">Uptrend</text>
        </svg>
      </div>
    );
  }
}

export default immutableToJsComponent(StockGrade);
