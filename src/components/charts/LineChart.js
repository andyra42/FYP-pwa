import React, {Component} from 'react';

const google = window.google;

export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    let data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Stock Price');
    data.addRows(this.props.data);
    let chart = new google.charts.Line(this.ref.current);
    chart.draw(data, google.charts.Line.convertOptions(this.props.options));
  }

  render() {
    return <div ref={this.ref} />;
  }
}
