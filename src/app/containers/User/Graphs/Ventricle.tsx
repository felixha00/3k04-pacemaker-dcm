import { Checkbox, Heading, Stack } from '@chakra-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { VictoryChart, VictoryLine } from 'victory';
import { subscribeToVentricle } from 'utils/socket.io/socketIoAPI';

interface Props {}
interface State {
  display: any;
  ventricleData: any;
}

const genVentData = (y, t, data: Array<any>) => ({
  datasets: [
    {
      data: [
        ...data,
        {
          y: y,
          t: t,
        },
      ],
      fill: false,
      backgroundColor: 'rgb(58, 56, 197)',
      borderColor: 'rgb(58, 56, 197)',
    },
  ],
});

const atriumOptions = {
  scales: {
    yAxes: [
      {
        id: 'Voltage (mV)',

        scaleLabel: {
          display: true,
          labelString: 'Voltage (mV)',
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          display: false,
        },
        type: 'time',
        distribution: 'series',
        scaleLabel: {
          display: true,
          labelString: 'Time (ms)',
        },
      },
    ],
  },
  legend: { display: false },
  elements: {
    arc: {},
    point: { radius: 0 },
    line: { tension: 0, fill: false },
  },
};
export class Ventricle extends Component<Props, State> {
  state = {
    display: true,
    ventricleData: [],
  };

  componentDidMount = () => {
    subscribeToVentricle((byte, t) => {
      console.log(byte);
      this.setState({
        ventricleData: [...this.state.ventricleData, { y: byte, t: t }],
      });
    });
  };

  onClick = () => {
    this.setState({ display: !this.state.display });
  };

  render() {
    let ventricleChartData = {
      datasets: [
        {
          data: this.state.ventricleData,
          fill: false,
          backgroundColor: 'rgb(58, 56, 197)',
          borderColor: 'rgb(58, 56, 197)',
        },
      ],
    };
    return (
      <>
        <Stack mt={6} mb={6}>
          <Stack isInline>
            <Checkbox
              isChecked={this.state.display}
              onChange={this.onClick}
              size="lg"
              colorScheme="purple"
            ></Checkbox>
            <Heading fontSize="xl" textAlign="center">
              Ventricle EGRAM
            </Heading>
          </Stack>
        </Stack>
        {this.state.display && (
          <Line
            data={ventricleChartData}
            options={atriumOptions}
            height={40}
          ></Line>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Ventricle);
