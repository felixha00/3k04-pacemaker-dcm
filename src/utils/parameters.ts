
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
  },

  upper_rate_limit: {
    max: 175,
    min: 50,
    unit: 'ppm',
    step: 5,
  },

  atrial_amplitude: {
    min: 0,
    max: 7,
    unit: 'V',
    step: 0.1
  },

  atrial_pulse_width: {
    min: 0.05,
    max: 1.9,
    unit: 'ms',
    step: 0.1
  },

  ventricular_amplitude:{
    min: 0,
    max: 7,
    unit: 'V',
    step: 0.1
  },

  ventricular_pulse_width:{
    min: 0.05,
    max: 1.9,
    unit: 'ms',
    step: 0.1
  },
  ventricular_refractory_period: {
    min: 150,
    max: 500,
    unit: 'ms',
    step: 10
  },
  atrial_refractory_period: {
    min: 150,
    max: 500,
    unit: 'ms',
    step: 10

  }
};

