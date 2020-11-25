import { Checkbox, Heading, Stack } from '@chakra-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { VictoryChart, VictoryLine } from 'victory';

interface Props {}
interface State {
  display: any;
}

const atriumData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  datasets: [
    {
      data: [
        {
          t: 3,
          y: 5,
        },
        {
          t: 7,
          y: 2,
        },
        {
          t: 33,
          y: 2,
        },
        {
          t: 99,
          y: 5,
        },
      ],
      fill: false,
      backgroundColor: 'rgb(58, 56, 197)',
      borderColor: 'rgb(58, 56, 197)',
    },
  ],
};

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
        type: 'time',
        time: {
          unit: 'millisecond',
          displayFormats: {
            millisecond: 'SSS',
          },
        },
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
export class Atrium extends Component<Props, State> {
  state = {
    display: true,
  };

  onClick = () => {
    this.setState({ display: !this.state.display });
  };

  render() {
    return (
      <>
        <Stack mt={6} mb={6}>
          <Stack isInline>
            <Checkbox isChecked={this.state.display}
              onChange={this.onClick}
              size="lg"
              colorScheme="purple"
            ></Checkbox>
            <Heading fontSize="xl" textAlign="center">
              Atrium EGRAM
            </Heading>
          </Stack>
        </Stack>
        {this.state.display && (
          <Line data={atriumData} options={atriumOptions} height={40}></Line>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Atrium);
