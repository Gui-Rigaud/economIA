import React, { Component } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DonutProps {
  categories: string[];
  data: number[];
  colors: string[]; // Adicione esta linha
}

interface DonutState {
  options: {
    chart: {
      foreColor: '#ffffff',
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
    colors: string[]; // Adicione esta linha
  };
  series: number[];
}

class DonutChart extends Component<DonutProps, DonutState> {
  constructor(props: DonutProps) {
    super(props);

    this.state = {
      options: {
        chart: {
          foreColor: '#ffffff',
          type: "donut"
        },
        labels: props.categories,
        dataLabels: { enabled: false },
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
        colors: props.colors // Adicione esta linha
      },
      series: props.data
    };
  }

  componentDidUpdate(prevProps: DonutProps) {
    if (
      prevProps.categories !== this.props.categories ||
      prevProps.data !== this.props.data ||
      prevProps.colors !== this.props.colors // Adicione esta verificação
    ) {
      this.setState({
        options: {
          ...this.state.options,
          labels: this.props.categories,
          colors: this.props.colors // Atualize as cores
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

export default DonutChart;