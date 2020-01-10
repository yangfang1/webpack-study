import {getParams} from '../../helpers/axios'

const LOAD = 'home/LOAD';
const LOAD_SUCCESS = 'home/LOAD_SUCCESS';
const LOAD_FAIL = 'home/LOAD_FAIL';
const initialState = {
  loading: false,
  loaded: false,
  test:[]
};
export default function reducer(initState = initialState, action = {}) {
  const state = initState;
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case LOAD_SUCCESS: {
      const test = action.result.retDataList;
      return {
        ...state,
        loading: false,
        loaded: true,
        test,
      };
    }
    case LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        loadErrMsg: action.error.errMsg,
      };
    }

    default:
      return state;
  }
}
export function test() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise:getParams('api/test')
  };
}
