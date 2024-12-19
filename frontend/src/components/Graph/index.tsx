import { color } from "chart.js/helpers";
import React, { Component } from "react";
import Chart from "react-apexcharts";

interface DonutProps {
  categories: string[];
  data: number[];
}

interface DonutState {
  options: {
    chart: {
      type: "donut";
    };
    labels: string[];
    dataLabels: {
      enabled: boolean;
    };
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: boolean;
            name: object;
            value: object;
          };
        };
      };
    };
  };
  series: number[];
}

class Donut extends Component<DonutProps, DonutState> {
  constructor(props: DonutProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "donut"
        },
        labels: props.categories,
        dataLabels: {enabled: false},
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: false,
                name: {
                  color: "white"
                },
                value: {
                  color: "white"
                }
              }
            }
          }
        },

      },
      series: props.data
    };
  }

  componentDidUpdate(prevProps: DonutProps) {
    if (prevProps.categories !== this.props.categories || prevProps.data !== this.props.data) {
      this.setState({
        options: {
          ...this.state.options,
          labels: this.props.categories
        },
        series: this.props.data
      });
    }
  }

  render() {
    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" width="520" />
      </div>
    );
  }
}

export default Donut;