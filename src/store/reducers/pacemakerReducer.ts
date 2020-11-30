import { SET_PARAMS } from "types/types";

//import { SET_CURRENT_USER, USER_LOADING, SETTING_CURRENT_USER} from "../actions/types";
let defaultParams = {
  p_pacingMode: 'OFF',
  p_pacingState: 'PERMANENT',
  p_lowrateInterval: "1000",
  p_vPaceAmp: "3500",
  p_vPaceWidth: "0.4",
  p_VRP: "320",
  maximumSensorRate: "120",
  activityThreshold: 'MED',
  reaction_time: (10 + ((16 - 8) * 8) / 3),
  recovery_time: (120 + (((16 - 8) * 14) / 15) * 60),
  response_factor: "8",
  lower_rate_limit: "60",
  atrial_amplitude_regulated: "5",
  atrial_pulse_width: "1",
  ventricular_amplitude_regulated: "5",
  ventricular_pulse_width: "1",
  ventricular_refractory_period: "320",
  atrial_refractory_period: "250",
}

let params = localStorage.getItem('params') ? JSON.parse(localStorage.getItem('params')) : defaultParams

const initialState = {
  connected: false,
  port: "",
  paceMode: "O",
  params: {
    ...params
  }
};



export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PARAMS:
      return {
        ...state,
        paceMode: action.payload.p_pacingMode.charAt(0),
        params: {
          ...action.payload
        }
        
      }
    default:
      return state;
  }
}
