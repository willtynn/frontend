import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';
import { saveAs } from 'file-saver';

export const UPDATE_PLAN_NAME = 'UPDATE_PLAN_NAME';
export const UPDATE_PLAN_COMMENT = 'UPDATE_PLAN_COMMENT';
export const UPDATE_SERIALIZE_THREADGROUPS = 'UPDATE_SERIALIZE_THREADGROUPS';
export const UPDATE_FUNCTIONAL_MODE = 'UPDATE_FUNCTIONAL_MODE';
export const UPDATE_TEARDOWN_ON_SHUTDOWN = 'UPDATE_TEARDOWN_ON_SHUTDOWN';

export const UPDATE_PLAN_NAMESPACE = "UPDATE_PLAN_NAMESPACE";
export const UPDATE_PLAN_PODNAME = "UPDATE_PLAN_PODNAME";

export const UPDATE_GROUP_NAME = 'UPDATE_GROUP_NAME';
export const UPDATE_GROUP_COMMENT = 'UPDATE_GROUP_COMMENT';
export const UPDATE_ON_SAMPLE_ERROR = 'UPDATE_ON_SAMPLE_ERROR';
export const UPDATE_NUM_THREADS = 'UPDATE_NUM_THREADS';
export const UPDATE_RAMP_TIME = 'UPDATE_RAMP_TIME';
export const UPDATE_LOOPS = 'UPDATE_LOOPS';
export const UPDATE_LOOPS_CONTINUE_FOREVER = 'UPDATE_LOOPS_CONTINUE_FOREVER';
export const UPDATE_SAME_USER_ON_NEXT_ITERATION =
  'UPDATE_SAME_USER_ON_NEXT_ITERATION';
export const UPDATE_DELAY_START = 'UPDATE_DELAY_START';
export const UPDATE_SCHEDULER = 'UPDATE_SCHEDULER';
export const UPDATE_DURATION = 'UPDATE_DURATION';
export const UPDATE_DELAY = 'UPDATE_DELAY';

export const UPDATE_WEB_SERVER_PROTOCOL = 'UPDATE_WEB_SERVER_PROTOCOL';
export const UPDATE_WEB_SERVER_NAME_OR_IP = 'UPDATE_WEB_SERVER_NAME_OR_IP';
export const UPDATE_WEB_SERVER_PORT = 'UPDATE_WEB_SERVER_PORT';
export const UPDATE_HTTP_REQUEST_METHOD = 'UPDATE_HTTP_REQUEST_METHOD';
export const UPDATE_HTTP_REQUEST_PATH = 'UPDATE_HTTP_REQUEST_PATH';
export const UPDATE_HTTP_REQUEST_CONTENT_ENCODING =
  'UPDATE_HTTP_REQUEST_CONTENT_ENCODING';
export const UPDATE_REQUEST_PARAMETERS = 'UPDATE_REQUEST_PARAMETERS';
export const UPDATE_REQUEST_BODY_DATA = 'UPDATE_REQUEST_BODY_DATA';

export const UPDATE_REQUEST_HEADER = 'UPDATE_REQUEST_HEADER';

export const UPDATE_TIMER = 'UPDATE_TIMER';

export const UPDATE_THREAD_GROUPS = 'UPDATE_THREAD_GROUPS';

export const UPDATE_GROUP_EDIT = 'UPDATE_GROUP_EDIT';

export const UPDATE_CURRENT_GROUP_EDIT_STAGE =
  'UPDATE_CURRENT_GROUP_EDIT_STAGE';

export const RESET_GROUP = 'RESET_GROUP';
export const RESET_PLAN = 'RESET_PLAN';
export const FILL_GROUP_FORM = 'FILL_GROUP_FORM';
export const UPDATE_GROUP_EDIT_INDEX = 'UPDATE_GROUP_EDIT_INDEX';

export const UPDATE_TEST_PLAN_PAGE_SIZE = 'UPDATE_TEST_PLAN_PAGE_SIZE';
export const UPDATE_TEST_PLAN_PAGE_NUM = 'UPDATE_TEST_PLAN_PAGE_NUM';

export const UPDATE_CURRENT_PLAN = 'UPDATE_CURRENT_PLAN';

export const UPDATE_CURRENT_TEST_RESULTS = 'UPDATE_CURRENT_TEST_RESULTS';
export const UPDATE_TEST_PLANS = 'UPDATE_TEST_PLANS';
export const UPDATE_CURRENT_TEST_RESULT = 'UPDATE_CURRENT_TEST_RESULT';

export const UPDATE_AGGREGATE_REPORT = 'UPDATE_AGGREGATE_REPORT';
export const UPDATE_CHANGE_FLAG = 'UPDATE_CHANGE_FLAG';
export const UPDATE_START_AND_END = 'UPDATE_START_AND_END';

const baseURLLink = 'http://192.168.1.104:14447';
// const baseURLLink = 'http://localhost:8848';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function getTestResultByResultId(testResultId) {
  const url = '/pressureMeasurement/getTestResultByResultId';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            testResultId: testResultId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_CURRENT_TEST_RESULT, data: res.data.data });
      } else if (res.data.code === 1) {
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.resultsSearchError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.resultsSearchError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function getTestResultsByID(testPlanId) {
  const url = '/pressureMeasurement/getTestResultsByID';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            testPlanId: testPlanId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_CURRENT_TEST_RESULTS, data: res.data.data });
      } else if (res.data.code === 1) {
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.resultsSearchError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.resultsSearchError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function getTestPlanById(testPlanId) {
  const url = '/pressureMeasurement/getTestPlanById';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            testPlanId: testPlanId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_CURRENT_PLAN, data: res.data.data });
      } else if (res.data.code === 1) {
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.planSearchError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.planSearchError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function getTestPlans() {
  const url = '/pressureMeasurement/testPlans';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_TEST_PLANS, data: res.data.data });
      } else if (res.data.code === 1) {
        // alert(res.data.message)
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.planSearchError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.planSearchError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function createTestPlan(testPlan) {
  const url = '/pressureMeasurement/createTestPlan';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          ...testPlan,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.planCreatedMsg',
            {},
            SEVERITIES.success
          )
        );
      } else if (res.data.code === 1) {
        // alert(res.data.message)
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.planCreationFailedMsg',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.planCreationFailedMsg',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function updateAggregateReport(planId) {
  const url = '/pressureMeasurement/updateAggregateReport';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            planId: planId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.aggregateReportUpdateeSuccess',
            {},
            SEVERITIES.success
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.aggregateReportUpdateeError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.aggregateReportUpdateeError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function createAggregateReport(planId) {
  const url = '/pressureMeasurement/createAggregateReport';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            planId: planId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.aggregateReportCreateSuccess',
            {},
            SEVERITIES.success
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.aggregateReportCreateError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.aggregateReportCreateError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function getAggregateReportByPlanId(planId) {
  const url = '/pressureMeasurement/getAggregateReportByPlanId';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            planId: planId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_AGGREGATE_REPORT, data: res.data.data });
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.aggregateReportError',
            {},
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_AGGREGATE_REPORT, data: null });
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.aggregateReportError',
          {},
          SEVERITIES.warning
        )
      );
      dispatch({ type: UPDATE_AGGREGATE_REPORT, data: null });
    }
  };
}

export function measure(testPlanId) {
  const url = '/pressureMeasurement/measure';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            testPlanId: testPlanId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.testStartMsg',
            {},
            SEVERITIES.success
          )
        );
      } else if (res.data.code === 1) {
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.testStartError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.testStartError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function getStartAndEndOfTest(planId) {
  const url = '/pressureMeasurement/getStartAndEndOfTest';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            planId: planId,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_START_AND_END, data: res.data.data });
      } else if (res.data.code === 1) {
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.getStartAndEndFailedMsg',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.getStartAndEndFailedMsg',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function getAggregateExcel(
  planId,
  cpuUsage,
  memoryUsage,
  byteTransmitted,
  byteReceived
) {
  const url = '/pressureMeasurement/aggregateReportExcel';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          cpuUsage: cpuUsage,
          memoryUsage: memoryUsage,
          byteTransmitted: byteTransmitted,
          byteReceived: byteReceived,
        },
        {
          responseType: 'blob',
          params: {
            planId: planId,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=UTF-8'});
        saveAs(blob, `Aggregate-Report-${planId}.xls`)
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'stressTesting.aggregateExcelExportFailedMsg',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'stressTesting.aggregateExcelExportFailedMsg',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}
