
// export const parameterOpts = {
//   mode: [
//     'OFF',
//     'DDD',
//     'VDD',
//     'DDI',
//     'DOO',
//     'AOO',
//     'AAI',
//     'VOO',
//     'VVI',
//     'AAT',
//     'VVT',
//     'DDDR',
//     'VDDR',
//     'DDIR',
//     'DOOR',
//     'AOOR',
//     'AAIR',
//     'VOOR',
//     'VVIR',
//   ],
// }
export const parameterOpts = {
  mode: [
    'OFF',
    'AOO',
    'VOO',
    'AAI',
    'VVI',


  ],
}

export const y_pacingMode = [
    'OFF',
    'AOO',
    'VOO',
    'AAI',
    'VVI',
    'DOO',
    'AOOR',
    'VOOR',
    'AAIR',
    'VVIR',
    'DOOR',
]


export const y_pacingState = [
  'PERMANENT',
  'TEMPORARY',
  'PACE_NOW',
  'MAGNET',
  'POWER_ON_RESET'
]


/*
export const parameterOpts = {
  mode: {
    input: false,
    opts: [
      'OFF',
      'DDD',
      'VDD',
      'DDI',
      'DOO',
      'AOO',
      'AAI',
      'VOO',
      'VVI',
      'AAT',
      'VVT',
      'DDDR',
      'VDDR',
      'DDIR',
      'DOOR',
      'AOOR',
      'AAIR',
      'VOOR',
      'VVIR',
    ],
  },
  lower_rate_limit: {
    max: 175,
    min: 30,
    unit: 'ppm',
    step: 5,
  },
};
*/


export const inputParamOpts = {
  lower_rate_limit: {
    max: 175,
    min: 30,
    unit: 'ppm',
    step: 5,
    mode: 'D',
  },

  upper_rate_limit: {
    max: 175,
    min: 50,
    unit: 'ppm',
    step: 5,
    mode: 'D',
  },

  atrial_amplitude_regulated: {
    min: 0,
    max: 5,
    unit: 'V',
    step: 0.1,
    mode: 'A',
  },

  atrial_pulse_width: {
    min: 1,
    max: 30,
    unit: 'ms',
    step: 0.1,
    mode: 'A',
  },
  atrial_refractory_period: {
    min: 150,
    max: 500,
    unit: 'ms',
    step: 10,
    mode: 'A',
  },

  ventricular_amplitude_regulated:{
    min: 0,
    max: 5,
    unit: 'V',
    step: 0.1,
    mode: 'V',
  },

  ventricular_pulse_width:{
    min: 1,
    max: 30,
    unit: 'ms',
    step: 1,
    mode: 'V',
  },
  ventricular_refractory_period: {
    min: 150,
    max: 500,
    unit: 'ms',
    step: 10,
    mode: 'V',
  },
  
};



export const programmableParams = {

  p_lowrateInterval: {  
    min: 343,
    max: 2000,
    unit: 'ms',
  },
  p_vPaceAmp: {
    min: 500,
    max: 7000,
    unit : 'mV',
  },
  p_vPaceWidth: {
    min: 0.1,
    max: 1.9,
    unit : 'ms',
  },
  p_VRP: {
    min: 200,
    max: 500,
    unit: 'ms',
  },

};

export const activityThresholdOpts = [
  'V_LOW',
  'LOW',
  'MED_LOW',
  'MED',
  'MED_HIGH',
  'HIGH',
  'V_HIGH',
]

