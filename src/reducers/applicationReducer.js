import * as actions from '../actions/applicationAction';

const initState = {
  // Test Plan
  planName: 'Test Plan',
  planComment: '',
  functionalMode: false,
  tearDownOnShutdown: false,
  serializeThreadgroups: false,
  namespace: '',
  podName: '',
  isBoundary: false,

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
  initialDelay: 0,
  startUsersCount: 0,
  startUsersCountBurst: 0,
  startUsersPeriod: 0,
  stopUsersCount: 0,
  stopUsersPeriod: 0,
  flighttime: 0,
  rampUp: 0,

  requestDefaultName: 'HTTP请求默认值',
  webServerProtocol: '',
  webServerNameOrIP: '',
  webServerPort: '',
  httpRequestMethod: 'POST',
  httpRequestPath: '',
  httpRequestContentEncoding: '',
  requestParameters: [],
  requestBodyData: '',

  headerManagerName: 'HTTP Header Manager',
  requestHeader: [],

  timer: [],

  groupEdit: false,
  groupEditIndex: null,
  currentGroupEditStage: 1,

  pageNum: 1,
  pageSize: 10,
  currentPlan: null,
  testPlans: [],
  currrentTestResults: [],
  currentResult: null,

  aggregateReport: null,
  changeFlag: 0,
  jointChangeFlag: 0,
  startAndEnd: [-1, -1],
  aggregateGroupReport: [],

  boundaryResult: [],
  bound: null,

  //joint test plan
  jointPlanName: null,
  jointPlanComment: null,
  testPlanIds: [],
  jointTestPlans: [],
  currentJointPlan: null,
  currentJointPlanSon: [],
  aggregateReportEnhance: [],
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
    case actions.UPDATE_HTTP_REQUEST_METHOD:
      return {
        ...state,
        httpRequestMethod: data,
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
      };
    case actions.UPDATE_TIMER:
      return {
        ...state,
        timer: data,
      };
    case actions.RESET_GROUP:
      return {
        ...state,
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
        initialDelay: 0,
        startUsersCount: 0,
        startUsersCountBurst: 0,
        startUsersPeriod: 0,
        stopUsersCount: 0,
        stopUsersPeriod: 0,
        flighttime: 0,
        rampUp: 0,

        requestDefaultName: 'HTTP请求默认值',
        webServerProtocol: '',
        webServerNameOrIP: '',
        webServerPort: '',
        httpRequestMethod: 'POST',
        httpRequestPath: '',
        httpRequestContentEncoding: '',
        requestParameters: [],
        requestBodyData: '',

        headerManagerName: 'HTTP Header Manager',
        requestHeader: [],

        timer: [],
        currentGroupEditStage: 1,
      };
    case actions.RESET_PLAN:
      return {
        ...state,
        planName: 'Test Plan',
        planComment: '',
        functionalMode: false,
        tearDownOnShutdown: false,
        serializeThreadgroups: false,
        isBoundary: false,
        threadGroups: [],
      };
    case actions.FILL_GROUP_FORM:
      return {
        ...state,
        groupName: data.groupName,
        groupComment: data.groupComment,
        onSampleError: data.onSampleError,
        numThreads: data.numThreads,
        rampTime: data.rampTime,
        loops: data.loops,
        loopsContinueForever: data.loopsContinueForever,
        sameUserOnNextIteration: data.sameUserOnNextIteration,
        delayedStart: data.delayedStart,
        scheduler: data.scheduler,
        duration: data.duration,
        delay: data.delay,

        requestDefaultName: data.requestDefaultName,
        webServerProtocol: data.webServerProtocol,
        webServerNameOrIP: data.webServerNameOrIP,
        webServerPort: data.webServerPort,
        httpRequestMethod: data.httpRequestMethod,
        httpRequestPath: data.httpRequestPath,
        httpRequestContentEncoding: data.httpRequestContentEncoding,
        requestParameters: data.requestParameters,
        requestBodyData: data.requestBodyData,

        headerManagerName: data.headerManagerName,
        requestHeader: data.requestHeader,

        timer: data.timer,
      };
    case actions.UPDATE_GROUP_EDIT_INDEX:
      return {
        ...state,
        groupEditIndex: data,
      };

    case actions.UPDATE_TEST_PLAN_PAGE_NUM:
      return {
        ...state,
        pageNum: data,
      };

    case actions.UPDATE_TEST_PLAN_PAGE_SIZE:
      return {
        ...state,
        pageSize: data,
      };

    case actions.UPDATE_CURRENT_PLAN:
      return {
        ...state,
        currentPlan: data,
      };

    case actions.UPDATE_CURRENT_TEST_RESULTS:
      return {
        ...state,
        currrentTestResults: data,
      };
    case actions.UPDATE_TEST_PLANS:
      return {
        ...state,
        testPlans: data,
      };
    case actions.UPDATE_CURRENT_TEST_RESULT:
      return {
        ...state,
        currentResult: data,
      };

    case actions.UPDATE_AGGREGATE_REPORT:
      return {
        ...state,
        aggregateReport: data,
      };

    case actions.UPDATE_CHANGE_FLAG:
      return {
        ...state,
        changeFlag: data,
      };

    case actions.UPDATE_JOINT_CHANGE_FLAG:
      return {
        ...state,
        jointChangeFlag: data,
      };

    case actions.UPDATE_START_AND_END:
      return {
        ...state,
        startAndEnd: data,
      };

    case actions.UPDATE_PLAN_NAMESPACE:
      return {
        ...state,
        namespace: data,
      };

    case actions.UPDATE_PLAN_PODNAME:
      return {
        ...state,
        podName: data,
      };

    case actions.UPDATE_IS_BOUNDARY:
      return {
        ...state,
        isBoundary: data,
      };

    case actions.UPDATE_INITIAL_DELAY:
      return {
        ...state,
        initialDelay: data,
      };

    case actions.UPDATE_START_USERS_COUNT:
      return {
        ...state,
        startUsersCount: data,
      };

    case actions.UPDATE_START_USERS_COUNT_BURST:
      return {
        ...state,
        startUsersCountBurst: data,
      };

    case actions.UPDATE_START_USERS_PERIOD:
      return {
        ...state,
        startUsersPeriod: data,
      };

    case actions.UPDATE_STOP_USERS_COUNT:
      return {
        ...state,
        stopUsersCount: data,
      };

    case actions.UPDATE_STOP_USERS_PERIOD:
      return {
        ...state,
        stopUsersPeriod: data,
      };

    case actions.UPDATE_FLIGHTTIME:
      return {
        ...state,
        flighttime: data,
      };

    case actions.UPDATE_RAMP_UP:
      return {
        ...state,
        rampUp: data,
      };

    case actions.UPDATE_BOUNDARY_RESULT:
      return {
        ...state,
        boundaryResult: data,
      };

    case actions.UPDATE_BOUND:
      return {
        ...state,
        bound: data,
      };

    case actions.UPDATE_JOINT_TEST_PLANS:
        return {
          ...state,
          jointTestPlans: data,
      };

      case actions.UPDATE_CURRENT_JOINT_TEST_PLAN:
          return {
            ...state,
            currentJointPlan: data,
      };

      case actions.UPDATE_CURRENT_JOINT_TEST_PLAN_SON:
          return {
            ...state,
            currentJointPlanSon: data,
      };

      case actions.UPDATE_AGGREGATE_ENHANCE_REPORT:
          return {
            ...state,
            aggregateReportEnhance: data,
      };

      case actions.UPDATE_AGGREGATE_GROUP_REPORT:
        return {
          ...state,
          aggregateGroupReport: data,
    };
    default:
      return state;
  }
}
