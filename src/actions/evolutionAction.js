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

//演化功能对应的一些变量，前面会加上EVO以便于区别，后续再和其他开发人员交流是否保留上述内容
export const EVO_GET_EVOLIST = 'EVO_GET_EVOLIST'
export const EVO_GET_ONE = 'EVO_GET_ONE'
export const EVO_DEL_ONE = 'EVO_DEL_ONE'
export const EVO_MODIFY = 'EVO_MODIFY'
export const EVO_GET_DATASOURCE = 'EVO_GET_DATASOURCE'
//暂时禁用，逻辑错误
// export const EVO_ADD_PLAN = 'EVO_ADD_PLAN'
export const EVO_GET_ALGORITHM = 'EVO_GET_ALGORITHM'
export const EVO_UPDATE_TRIGGER = 'EVO_UPDATE_TRIGGER'
export const EVO_UPDATE_DATARESOURCE = 'EVO_UPDATE_DATARESOURCE'
export const EVO_UPDATE_ANA_ALG = 'EVO_UPDATE_ANA_ALG'
export const EVO_UPDATE_EXE_ALG = 'EVO_UPDATE_EXE_ALG'
export const EVO_UPDATE_EXE_MTD = 'EVO_UPDATE_EXE_MTD'
export const EVO_UPDATE_NAME = 'EVO_UPDATE_NAME'
export const EVO_UPDATE_REMARKS = 'EVO_UPDATE_REMARKS'
export const EVO_UPDATE_FROM_CURRENT = 'EVO_UPDATE_FROM_CURRENT'
export const EVO_RESET_FORM = 'EVO_RESET_FORM'
export const EVO_UPDATE_CURRENT_DATARESOURCE = 'EVO_UPDATE_CURRENT_DATARESOURCE'
export const EVO_UPDATE_CURRENT_ALGLIST = 'EVO_UPDATE_CURRENT_ALGLIST'
export const EVO_UPDATE_ENABLE = 'EVO_UPDATE_ENABLE'
export const EVO_GET_ALGORITHM_DATA_MAPPING = 'EVO_GET_ALGORITHM_DATA_MAPPING'
export const EVO_GET_PLAN_RESULT = 'EVO_GET_PLAN_RESULT'
export const EVO_UPDATE_EVO_DATA_ARGS = 'EVO_UPDATE_EVO_DATA_ARGS'
export const EVO_UPDATE_EVO_ANA_ARGS = 'EVO_UPDATE_EVO_ANA_ARGS'
export const EVO_UPDATE_EVO_EXE_ARGS = 'EVO_UPDATE_EVO_EXE_ARGS'


const baseURLLink = 'http://192.168.1.104:14447';
// const baseURLLink = 'http://localhost:8848';

//演化功能对应开发环境下的的baseURL
// const baseURL = 'http://172.31.0.3:1234';
//TODO
const baseURL = 'http://100.105.103.116:30030';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function getEvolutionResultByResultId(evolutionResultId) {
  const url = '/pressureMeasurement/getTestResultByResultId';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            evolutionResultId: evolutionResultId,
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

export function getEvolutionPlanById(testPlanId) {
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
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel;charset=UTF-8' });
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





//以下为新增内容，与学长提供的参数和方法并不完全相同，所以需要重新定义

const axios_for_evolution = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function evo_getPlanList(evo_name, cre_time) {
  const url = '/evolution/getlist';
  return async dispatch => {
    try {
      const res = await axios_for_evolution.get(
        url,
        {
          params: {
            evo_name: evo_name,
            cre_time: cre_time,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: res.data},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况下则更新演化计划列表以便于展示
        dispatch({ type: EVO_GET_EVOLIST, data: res.data });
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

export function evo_getone(id){
  const url = '/evolution/getone/'+id.toString()
  return async dispatch => {
    try {
      const res = await axios_for_evolution.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: res.data},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况下则更新演化计划列表以便于展示
        dispatch({ type: EVO_GET_ONE, data: res.data });
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );

      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function evo_delete(id){
  const url = '/evolution/delete/' + id.toString()
  return async dispatch => {
    try {
      const res = await axios_for_evolution.delete(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "删除错误"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况下则更新演化计划列表以便于展示
        dispatch({ type: EVO_DEL_ONE});
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.success
        )
      );
    }
  };
}

export function evo_modify(newPlan){
  const url = '/evolution/modify'
  return async dispatch => {
    try {
      const res = await axios_for_evolution.post(
        url,
        {
          ...newPlan
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "修改错误"},
            SEVERITIES.warning
          )
        );
      }else{        
        if(res.data.code === 403){
          dispatch(
            setSnackbarMessageAndOpen(
              'common.errorMessage',
              {msg: "演化计划重名，请重新修改"},
              SEVERITIES.warning
            )
          );
          return;
        }
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function evo_get_dataSource(){
  const url = '/data-source'
  return async dispatch => {
    try {
      const res = await axios_for_evolution.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "获取数据源错误，请等待数据源重启"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况下则更新演化计划列表以便于展示
        dispatch({ type: EVO_GET_DATASOURCE,data: res.data});
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function evo_add(evo_plan){
  const url = '/evolution/add'
  return async dispatch => {
    try {
      const res = await axios_for_evolution.post(
        url,
        {
          ...evo_plan
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "创建演化计划失败，请检查算法和数据源是否匹配"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况提示用户
        console.log(123123);
        if(res.data.code === 403){
          dispatch(
            setSnackbarMessageAndOpen(
              'common.errorMessage',
              {msg: "创建演化计划失败，名称重复"},
              SEVERITIES.warning
            )
          );
          return;
        }
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function evo_get_algorithm(){
  const url = '/evolution/algorithm';
  return async dispatch => {
    try {
      const res = await axios_for_evolution.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "获取算法失败，请等待后端重启"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况下则更新演化计划列表以便于展示
        dispatch({ type: EVO_GET_ALGORITHM,data: res.data});
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function evo_get_algorithm_data_mapping(){
  const url = '/evolution/getAlgorithmMapping';
  return async dispatch => {
    try {
      const res = await axios_for_evolution.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "获取匹配表失败，请等待后端重启服务"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况下则更新演化计划列表以便于展示
        dispatch({ type: EVO_GET_ALGORITHM_DATA_MAPPING,data:res.data});
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

//获取到演化计划的执行情况
export function evo_get_plan_result(id){
  const url = '/evolution/getPlanResult/'+id.toString();
  return async dispatch => {
    try {
      const res = await axios_for_evolution.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "获取演化计划运行结果失败，请等待后端重启服务"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况下则更新演化计划的运行状态以便于展示
        dispatch({ type: EVO_GET_PLAN_RESULT,data:res.data});
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

//注册分析算法
export function ana_register(data){
  const url = '/evolution/alg/anaAlg/register'
  return async dispatch => {
    try {
      const res = await axios_for_evolution.post(
        url,
        {
          ...data
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "创建新分析算法失败，请检查算法相关信息或网络情况"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况提示用户
        if(res.data.code === 403){
          dispatch(
            setSnackbarMessageAndOpen(
              'common.errorMessage',
              {msg: "创建分析算法失败，名称重复"},
              SEVERITIES.warning
            )
          );
          return;
        }
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}


//注册执行算法
export function exe_register(data){
  const url = '/evolution/alg/exeAlg/register'
  return async dispatch => {
    try {
      const res = await axios_for_evolution.post(
        url,
        {
          ...data
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "创建新执行算法失败，请检查算法相关信息或网络情况"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况提示用户
        if(res.data.code === 403){
          dispatch(
            setSnackbarMessageAndOpen(
              'common.errorMessage',
              {msg: "创建执行算法失败，名称重复"},
              SEVERITIES.warning
            )
          );
          return;
        }
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}


//修改分析算法
export function ana_modify(data){
  const url = '/evolution/alg/anaAlg/modify'
  return async dispatch => {
    try {
      const res = await axios_for_evolution.post(
        url,
        {
          ...data
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "修改分析算法失败，请检查算法相关信息或网络情况"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况提示用户
        if(res.data.code === 403){
          dispatch(
            setSnackbarMessageAndOpen(
              'common.errorMessage',
              {msg: "修改分析算法失败，名称重复"},
              SEVERITIES.warning
            )
          );
          return;
        }
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

//修改执行算法
export function exe_modify(data){
  const url = '/evolution/alg/exeAlg/modify'
  return async dispatch => {
    try {
      const res = await axios_for_evolution.post(
        url,
        {
          ...data
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "修改分析算法失败，请检查算法相关信息或网络情况"},
            SEVERITIES.warning
          )
        );
      }else{        //正确返回的情况提示用户
        if(res.data.code === 403){
          dispatch(
            setSnackbarMessageAndOpen(
              'common.errorMessage',
              {msg: "修改分析算法失败，名称重复"},
              SEVERITIES.warning
            )
          );
          return;
        }
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

//删除分析算法
export function ana_delete(id){
  const url = '/evolution/alg/anaAlg/delete/'+id.toString();
  return async dispatch => {
    try {
      const res = await axios_for_evolution.delete(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "删除分析算法失败，请等待后端重启服务"},
            SEVERITIES.warning
          )
        );
      }else{        
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}

//删除规划算法
export function exe_delete(id){
  const url = '/evolution/alg/exeAlg/delete/'+id.toString();
  return async dispatch => {
    try {
      const res = await axios_for_evolution.delete(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(res.status !== 200){      //未能正确返回则提示用户  status为返回头自带的状态字段，暂时可以用来表示是否成功返回，但是不够灵活
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            {msg: "删除规划算法失败，请等待后端重启服务"},
            SEVERITIES.warning
          )
        );
      }else{        
        dispatch(
          setSnackbarMessageAndOpen(
            'common.confirm',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.erroMessage',
          {msg: "未能成功连接后端，请等待后端服务重启"},
          SEVERITIES.warning
        )
      );
    }
  };
}