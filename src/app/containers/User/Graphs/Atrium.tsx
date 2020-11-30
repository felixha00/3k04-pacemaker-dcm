import { Checkbox, Heading, Stack } from '@chakra-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { VictoryChart, VictoryLine } from 'victory';
import { subscribeToVentricle } from 'utils/socket.io/socketIoAPI';

interface Props {
  pacemaker?: any;
}
interface State {
  display: any;
  atriumData: any;
}

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
export class Atrium extends Component<Props, State> {
  state = {
    display: true,
    atriumData: [],
  };

  componentDidMount = () => {
    subscribeToVentricle((byte, t) => {
      console.log(byte);
      this.setState({
        atriumData: [...this.state.atriumData, { y: byte, t: t }],
      });
    });
  };

  onClick = () => {
    this.setState({ display: !this.state.display });
  };

  render() {
    const {pacemaker} = this.props
    console.log(this.props)
    //if (pacemaker.paceMode == 'V' || pacemaker.paceMode == 'O') return null
    let atriumChartData = {
      datasets: [
        {
          data: this.state.atriumData,
          fill: false,
          backgroundColor: 'rgb(197, 56, 56)',
          borderColor: 'rgb(197, 56, 56)',
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
              Atrium EGRAM
            </Heading>
          </Stack>
        </Stack>
        {this.state.display && (
          <Line
            data={atriumChartData}
            options={atriumOptions}
            height={40}
          ></Line>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  pacemaker: state.pacemaker
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Atrium);
