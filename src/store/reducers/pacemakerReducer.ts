import { SET_PARAMS } from "types/types";

//import { SET_CURRENT_USER, USER_LOADING, SETTING_CURRENT_USER} from "../actions/types";
const initialState = {
  connected: false,
  port: "",
  params: {
    p_pacingMode: 'VVI',
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
    atrial_amplitude: "3.5",
    atrial_pulse_width: "0.4",
    ventricular_amplitude: "3.5",
    ventricular_pulse_width: "0.4",
    ventricular_refractory_period: "320",
    atrial_refractory_period: "250",
  }
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PARAMS:
      return {
        ...state,
        params: {
          ...action.payload
        }
        
      }
    default:
      return state;
  }
}
