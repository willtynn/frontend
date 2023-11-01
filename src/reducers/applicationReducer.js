import * as actions from '../actions/applicationAction';

const initState = {
  // Test Plan
  planName: 'Test Plan',
  planComment: '',
  functionalMode: false,
  tearDownOnShutdown: false,
  serializeThreadgroups: false,

  // Thread Group
  threadGroups: [],
  groupName: 'Thread Group',
  groupComment: '',
  onSampleError: 'continue',
  numThreads: 1,
  rampTime: 1,
  loops: 1,
  loopsContinueForever: false,
  sameUserOnNextIteration: true,
  delayedStart: false,
  scheduler: false,
  duration: null,
  delay: null,

  requestDefaultName: "HTTP请求默认值",
  webServerProtocol: '',
  webServerNameOrIP: '',
  webServerPort: '',
  httpRequestPath: '',
  httpRequestContentEncoding: '',
  requestParameters: [],
  requestBodyData: '',

  headerManagerName: "HTTP Header Manager",
  requestHeader: [],

  groupEdit: false,
  currentGroupEditStage: 1,
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
      };
    case actions.UPDATE_GROUP_EDIT:
      return {
        ...state,
        groupEdit: data,
      };
    case actions.UPDATE_CURRENT_GROUP_EDIT_STAGE:
      return {
        ...state,
        currentGroupEditStage: data,
      };
    case actions.UPDATE_GROUP_NAME:
      return {
        ...state,
        groupName: data,
      };
    case actions.UPDATE_GROUP_COMMENT:
      return {
        ...state,
        groupComment: data,
      };
    case actions.UPDATE_ON_SAMPLE_ERROR:
      return {
        ...state,
        onSampleError: data,
      };
    case actions.UPDATE_NUM_THREADS:
      return {
        ...state,
        numThreads: data,
      };
    case actions.UPDATE_RAMP_TIME:
      return {
        ...state,
        rampTime: data,
      };
    case actions.UPDATE_LOOPS:
      return {
        ...state,
        loops: data,
      };
    case actions.UPDATE_LOOPS_CONTINUE_FOREVER:
      return {
        ...state,
        loopsContinueForever: data,
      };
    case actions.UPDATE_SAME_USER_ON_NEXT_ITERATION:
      return {
        ...state,
        sameUserOnNextIteration: data,
      };
    case actions.UPDATE_DELAY_START:
      return { ...state, delayedStart: data };
    case actions.UPDATE_SCHEDULER:
      return { ...state, scheduler: data };
    case actions.UPDATE_DURATION:
      return { ...state, duration: data };
    case actions.UPDATE_DELAY:
      return {
        ...state,
        delay: data,
      };
    case actions.UPDATE_WEB_SERVER_PROTOCOL:
      return {
        ...state,
        webServerProtocol: data,
      };
    case actions.UPDATE_WEB_SERVER_NAME_OR_IP:
      return {
        ...state,
        webServerNameOrIP: data,
      };
    case actions.UPDATE_WEB_SERVER_PORT:
      return {
        ...state,
        webServerPort: data,
      };
    case actions.UPDATE_HTTP_REQUEST_PATH:
      return {
        ...state,
        httpRequestPath: data,
      };
    case actions.UPDATE_HTTP_REQUEST_CONTENT_ENCODING:
      return {
        ...state,
        httpRequestContentEncoding: data,
      };
    case actions.UPDATE_REQUEST_PARAMETERS:
      return {
        ...state,
        requestParameters: data,
      };
    case actions.UPDATE_REQUEST_BODY_DATA:
      return {
        ...state,
        requestBodyData: data,
      };
    case actions.UPDATE_REQUEST_HEADER:
      return {
        ...state,
        requestHeader: data,
      }
    default:
      return state;
  }
}
