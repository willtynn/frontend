import * as actions from '../actions/applicationAction';

const initState = {
  // Test Plan
  planName: 'Test Plan',
  planComment: '',
  functionalMode: false,
  tearDownOnShutdown: false,
  serializeThreadgroups: false,

  // Thread Group
  threadGroups: []
  // groupName: "",
  // groupComment: "",
  // onSampleError: 0,
  // numThreads: 1,
  // rampTime: 1,
  // loops: 1,
  // loopsContinueForever: false,
  // sameUserOnNextIteration: true,
  // delayedStart: false,
  // scheduler: false,
  // duration: null,
  // delay: null,
};

export default function ApplicationReducer(state = initState, action) {
  const { type, data } = action;
  switch (type) {
    case actions.UPDATE_PLAN_NAME:
      return {
        ...state,
        planName: data,
      };
    case actions.UPDATE_PLAN_COMMENT:
      return {
        ...state,
        planComment: data,
      };
    case actions.UPDATE_FUNCTIONAL_MODE:
      return {
        ...state,
        functionalMode: data,
      };
    case actions.UPDATE_SERIALIZE_THREADGROUPS:
      return {
        ...state,
        serializeThreadgroups: data,
      };
    case actions.UPDATE_TEARDOWN_ON_SHUTDOWN:
      return {
        ...state,
        tearDownOnShutdown: data,
      };
    case actions.UPDATE_THREAD_GROUPS:
      return {
        ...state,
        threadGroups: data,
      }
    default:
      return state;
  }
}
