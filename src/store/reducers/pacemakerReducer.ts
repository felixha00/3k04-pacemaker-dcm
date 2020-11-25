//import { SET_CURRENT_USER, USER_LOADING, SETTING_CURRENT_USER} from "../actions/types";
const initialState = {
  connected: false,
  port: "",
  params: {
    p_pacingMode: 'NONE',
    p_pacingState: 'PERMANENT',
    p_hysterisis: false,
    p_hysterisisInterval: 300,
    p_lowrateInterval: 1000,
    p_vPaceAmp: 3500,
    p_vPaceWidth: 0.4,
    p_VRP: 320,
  }

};

export default function (state = initialState, action) {
  switch (action.type) {
    
    default:
      return state;
  }
}
