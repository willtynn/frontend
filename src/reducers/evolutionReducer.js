import * as actions from '../actions/evolutionAction';

const initState = {
  // Evolution Plan
  planName: 'Evolution Plan',
  planComment: '',
  functionalMode: false,
  tearDownOnShutdown: false,
  serializeThreadgroups: false,
  namespace: '',
  podName: '',

  // Create Exvolution Plan
  dataResource: 'Jaeger',
  moniterInterval: 'per minute',

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

  currentPlan: null,
  evolutionPlans: [],
  currrentTestResults: [],
  currentResult: null,

  aggregateReport: null,
  changeFlag: 0,
  startAndEnd: [-1, -1],

  //此处是后续添加的变量，由于演化计划还没有确定，所以上面的变量暂时不删除
  //并且为了做出命名上的区别采用下划线的命名方式
  //用于展示的列表
  evo_plans: [],
  current_evo_plan: {},
  data_resource_list: [{ name: "example1" }, { name: "example2" }],
  trigger_list: ["per minute", "per hour", "per day"],
  exe_alg_list: [{ name: "example1" }, { name: "example2" }],
  ana_alg_list: [{ name: "example1" }, { name: "example2" }],
  exe_mtd_list: ["now", "after notice"],
  current_data_resource: {},
  current_alg_list: [],
  ana_data_mapping: [],
  exe_data_mapping: [],
  //进入详情界面后展示出来的某一演化计划的详细信息
  evo_id: "-1",
  evo_name: '',
  cre_time: "",
  exe_times: "0",
  last_time: "",
  evo_enable: "0",
  evo_remarks: "none",
  data_resource: "",
  trigger: "",
  ana_alg: "",
  exe_alg: "",
  exe_mtd: "",
  create_by: "admin",
  evo_data_args: "{\"dataArgs\":{},\"timeArgs\":{}}", // 数据源所带参数
  evo_ana_args: "{\"anaArgs\":{}}", // 分析算法所带参数  
  evo_exe_args: "{\"exeArgs\":{}}", // 执行算法所带参数
  //存储对应演化计划的执行结果，是数组
  evolution_plan_result_list: [],

  //表示现在修改界面中正在使用的算法
  evo_ana_alg: [],
  evo_plan_alg: [],

  pageNum: 1,
  pageSize: 10,
  //结束


  // // 算法部分
  // algorithms: [], // 存储算法数据
  // algorithm: null, // 存储单个算法数据（例如更新后的算法）
  // error: null, // 存储错误信息
  // loading: false, // 存储请求的加载状态

};

export default function EvolutionReducer(state = initState, action) {
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
      }
    case actions.UPDATE_GROUP_EDIT_INDEX:
      return {
        ...state,
        groupEditIndex: data
      }

    case actions.UPDATE_TEST_PLAN_PAGE_NUM:
      return {
        ...state,
        pageNum: data
      }

    case actions.UPDATE_TEST_PLAN_PAGE_SIZE:
      return {
        ...state,
        pageSize: data
      }

    case actions.UPDATE_CURRENT_PLAN:
      return {
        ...state,
        currentPlan: data
      }

    case actions.UPDATE_CURRENT_TEST_RESULTS:
      return {
        ...state,
        currrentTestResults: data
      }
    case actions.UPDATE_TEST_PLANS:
      return {
        ...state,
        testPlans: data
      }
    case actions.UPDATE_CURRENT_TEST_RESULT:
      return {
        ...state,
        currentResult: data
      }

    case actions.UPDATE_AGGREGATE_REPORT:
      return {
        ...state,
        aggregateReport: data
      }

    case actions.UPDATE_CHANGE_FLAG:
      return {
        ...state,
        changeFlag: data
      }

    case actions.UPDATE_START_AND_END:
      return {
        ...state,
        startAndEnd: data
      }

    case actions.UPDATE_PLAN_NAMESPACE:
      return {
        ...state,
        namespace: data
      }

    case actions.UPDATE_PLAN_PODNAME:
      return {
        ...state,
        podName: data
      }

    //以下演化功能新增内容
    case actions.EVO_GET_EVOLIST:
      return {
        ...state,
        evo_plans: data
      }

    case actions.EVO_GET_ONE:
      return {
        ...state,
        current_evo_plan: data,
      }

    case actions.EVO_DEL_ONE:
      return {
        ...state,
        evo_plans: data.filter(function (item) {
          return item.evo_id !== data;
        })
      }

    case actions.EVO_MODIFY:
      return {
        ...state,
        evo_id: data.evo_id,
        evo_name: data.evo_name,
        cre_time: data.cre_time,
        exe_times: data.exe_times,
        last_time: data.last_time,
        evo_enable: data.evo_remarks,
        evo_remarks: data.evo_remarks,
        data_resource: data.data_resource,
        trigger: data.trigger,
        ana_alg: data.ana_alg,
        exe_alg: data.exe_alg,
        exe_mtd: data.exe_mtd,
        create_by: data.create_by,
        evo_data_args: data.evo_data_args,
        evo_ana_args: data.evo_ana_args,
        evo_exe_args: data.evo_exe_args,

      }

    case actions.EVO_GET_DATASOURCE:
      return {
        ...state,
        data_resource_list: data
      }

    //因为把一个数组改成对象了，这个字段不合理
    // case actions.EVO_ADD_PLAN:
    //   return{
    //     ...state,
    //     evo_plan:data
    //   }


    case actions.EVO_GET_ALGORITHM:
      return {
        ...state,
        exe_alg_list: data.planAlgorithmList,
        ana_alg_list: data.analyzeAlgorithmList,
        exe_mtd_list: data.executeAlgorithmList,
      }


    case actions.EVO_UPDATE_TRIGGER:
      return {
        ...state,
        trigger: data
      }

    case actions.EVO_UPDATE_DATARESOURCE:
      return {
        ...state,
        data_resource: data
      }

    case actions.EVO_UPDATE_ANA_ALG:
      return {
        ...state,
        ana_alg: data
      }

    case actions.EVO_UPDATE_EXE_ALG:
      return {
        ...state,
        exe_alg: data
      }

    case actions.EVO_UPDATE_EXE_MTD:
      return {
        ...state,
        exe_mtd: data
      }

    case actions.EVO_UPDATE_NAME:
      return {
        ...state,
        evo_name: data
      }

    case actions.EVO_UPDATE_REMARKS:
      return {
        ...state,
        evo_remarks: data
      }

    case actions.EVO_UPDATE_FROM_CURRENT:
      return {
        ...state,
        evo_id: data.evo_id,
        evo_name: data.evo_name,
        cre_time: data.cre_time,
        exe_times: data.exe_times,
        last_time: data.last_time,
        evo_enable: data.evo_enable,
        evo_remarks: data.evo_remarks,
        data_resource: data.data_resource,
        trigger: data.trigger,
        ana_alg: data.ana_alg,
        exe_alg: data.exe_alg,
        exe_mtd: data.exe_mtd,
        create_by: data.create_by,
        evo_data_args: data.evo_data_args,
        evo_ana_args: data.evo_ana_args,
        evo_exe_args: data.evo_exe_args,
      }
    case actions.EVO_RESET_FORM:
      return {
        ...state,
        evo_id: "-1",
        evo_name: '',
        cre_time: "",
        exe_times: "0",
        last_time: "",
        evo_enable: "0",
        evo_remarks: "none",
        data_resource: "",
        trigger: "",
        ana_alg: "",
        exe_alg: "",
        exe_mtd: "",
        create_by: "admin",
        evo_data_args: "{\"dataArgs\":{},\"timeArgs\":{}}", // 数据源所带参数
        evo_ana_args: "{\"anaArgs\":{}}", // 分析算法所带参数  
        evo_exe_args: "{\"exeArgs\":{}}", // 执行算法所带参数
      }

    case actions.EVO_UPDATE_CURRENT_DATARESOURCE:
      return {
        ...state,
        current_data_resource: data,
      }

    case actions.EVO_UPDATE_CURRENT_ALGLIST:
      return {
        ...state,
        current_alg_list: data,
      }

    case actions.EVO_UPDATE_ENABLE:
      return {
        ...state,
        evo_enable: data,
      }

    case actions.EVO_GET_ALGORITHM_DATA_MAPPING:
      return {
        ...state,
        ana_data_mapping: data.anaMapping,
        exe_data_mapping: data.planMapping,
      }

    case actions.EVO_GET_PLAN_RESULT:
      return {
        ...state,
        evolution_plan_result_list: data,
      }
    case actions.EVO_UPDATE_EVO_DATA_ARGS:
      return {
        ...state,
        evo_data_args: data
      }
    case actions.EVO_UPDATE_EVO_ANA_ARGS:
      return {
        ...state,
        evo_ana_args: data
      }
    case actions.EVO_UPDATE_EVO_EXE_ARGS:
      return {
        ...state,
        evo_exe_args: data
      }
    case actions.EVO_UPDATE_EVO_ANA_ALG:
      return {
        ...state,
        evo_ana_alg: data
      }
    case actions.EVO_UPDATE_EVO_PLAN_ALG:
      return {
        ...state,
        evo_plan_alg: data
      }
    case actions.EVO_UPDATE_PLAN_ALG_LIST:
      return {
        ...state,
        exe_alg_list: data,
        pageNum: 1
      }
    case actions.EVO_UPDATE_ANA_ALG_LIST:
      return {
        ...state,
        ana_alg_list: data,
        pageNum: 1
      }

    // //  算法
    // case actions.ADD_ALGORITHM:
    //   return {
    //     ...state,
    //     algorithms: [...state.algorithms, action.data], // 假设返回的 data 是添加后的算法
    //     loading: false,
    //   };
    // case actions.DELETE_ALGORITHM:
    //   return {
    //     ...state,
    //     algorithms: state.algorithms.filter(algorithm => algorithm.id !== action.data.id), // 通过 id 删除算法
    //     loading: false,
    //   };
    // case actions.QUERY_ALGORITHM:
    //   return {
    //     ...state,
    //     algorithms: action.data, // 假设返回的 data 是查询到的算法列表
    //     loading: false,
    //   };
    // case actions.UPDATE_ALGORITHM:
    //   return {
    //     ...state,
    //     algorithms: state.algorithms.map(algorithm =>
    //         algorithm.id === action.data.id ? action.data : algorithm // 更新对应算法的数据
    //     ),
    //     algorithm: action.data, // 如果返回的 data 是更新后的单个算法
    //     loading: false,
    //   };

    //新增结束
    default:
      return state;
  }
}