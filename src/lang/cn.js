export const messages = {
  common: {
    errorMessage: '{msg}',
    copyboard: '已复制，请您继续接下来的操作。',
    serviceTableContentNoData: '无数据',
    serviceTableContentNoDataHint: '您可以尝试刷新数据',
    cancel: "取消",
    create: "创建",
    confirm: "确认",
    nextStep: "下一步",
    previousStep: "上一步",
    deploy: "部署",
    name: "名称",
    status: "状态",
    startTime: "启动时间",
    beginTime: "开始时间",
    endTime: "结束时间",
    serviceInstance: "服务实例",
    service: "服务",
    repo: "代码仓库地址",
    imageUrl: "镜像仓库地址&TAG",
    serviceVersion: "服务版本",
    interfaceCollection: "接口集合",
    serviceName: "服务名称",
    serviceId: "服务ID",
    schemeDeploy: "方案部署",
    selectCluster: "选择集群",
    lookupDependency: "查看依赖",
    allNamespaces: "全部命名空间",
    namespace: "命名空间",
    protocol: "协议",
    containerPort: "容器端口",
    image: "镜像",
    container: "容器",
    basicInfo: "基本信息",
    usage: "用量",
    received: "入站",
    transferred: "出站",
    timer: "定时器",
    requestHeader: "请求头",
    requestParameters: "请求参数",
    requestBody: "请求体",
    requestMethod: "请求方法",
    port: "端口",
    path: "路径",
    hostIP: "主机地址",
    httpRequest: "HTTP请求",
    cycleIndex: "循环次数",
    threadNum: "线程数",
    key: "键",
    value: "值",
    delay: "延迟",
    detailedInfo: "详细信息",
    moreOperation: "更多操作",
    details: "详情",
    serialized: "序列化",
    functionMode: "函数模式",
    basicResult: "基本结果",
    idleTime: "空闲时间",
    connectTime: "连接时间",
    responseCode: "响应码",
    responseData: "响应数据",
    responseMessage: "响应消息",
    byteNum: "字节数",
    headByteNum: "头字节数",
    bodyByteNum: "体字节数",
    sendByteNum: "发送字节数",
  },
  lang: {
    language: '语言',
  },
  menu: {
    clusterMangementDescription:
      '对多集群以及每个集群的基础资源、服务组件和应用资源等的统一管理。',
    platformManagement: '平台管理',
    clusterOverview: "集群总览",
  },
  
  serviceOverview: {
    serviceDescription:
      '服务（Service）提供一种抽象的方法，将运行在容器组（Pod）上的应用程序公开为网络服务。',
    allItems: "全部项目",
  },
  serviceDependency: {
    serviceDependencyNotFound: '所查询服务没有相关调用关系...',
    interfaceDependencyNotFound: '所查询接口没有相关调用关系...',
    errorMessage: '{msg}',
    searchServiceByIdEmptyError: '所查询ID没有相关服务...',
    searchServiceByNameVersionError:
      '未查询到目标服务名称与版本所对应的服务...',
    queryError: '查询出错，请重试...',
    podSearchError: '获取容器组出错，请刷新重试...',
    serviceDependencyDescription:
      '服务依赖是指一个软件系统依赖于外部的服务或API，通常通过网络进行通信。',
    serviceBasedMsg: '请选择一个服务。',
    interfaceBasedMsg: '请选择一个接口。',
  },
  cluster: {
    clustersSearchError: '集群信息获取失败，请刷新页面重试...',
    clusterSelectHint: '请选择一个集群！',
    instanceSelectHint: '请选择一个服务实例！',
    serverSelectHint: '请选择一个服务器！',
    clusterInfo: '集群信息',
    instanceInfo: '实例信息',
    instanceList: '实例列表',
    clusterTopology: '集群拓扑结构',
    clusterNodeDescription:
      '集群节点是平台集群中的基础服务器，您可以在此页面查看集群节点信息。',
    schemeDeployDescription:
      '制定特定的计划或方案来服务的实际部署和实施过程。',
    nodeName: "节点名称",
    ipAddress: "IP地址",
    settedResource: "设定资源量",
    usedResource: "使用资源量",
    cpuConfig: "CPU配置",
    description: "描述",
    clusterNode: "集群节点",
    panelConfiguration: "面板配置",
    jsonConfiguration: "JSON配置",
    addContainer: "添加容器",
    containerSetting: "容器设置",
    cpuReserved: "CPU预留",
    noReserved: "不预留",
    cpuLimited: "CPU限制",
    noLimited: "不限制",
    memReserved: "内存预留",
    memLimited: "内存限制",
    portSetting: "端口设置",
    addPort: "添加端口",
    instanceReplicas: "实例副本数量",
    imageAddress: "镜像地址",
    makeDeployment: "创建Deployment",
    podSetting: "容器组设置",
  },
  instance: {
    deploySuccess: '实例部署成功！',
    deployFailed: '实例部署失败，请重试...',
    serverIdDescription: '服务的唯一标识,一个服务ID对应一个服务。',
    namePatternErrorMsg:
      '名称无效。名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。',
    nameEmptyErrorMsg: '请设置一个名称。',
    nameDescription:
      '名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。',
    namespaceDescription: '选择将要创建资源的命名空间。',
    containerAddDescription: '自定义容器的设置以创建容器。',
    containerConfigDescription: '设置容器的镜像、名称、类型和计算资源。',
    containerInputPlaceHolder:
      '镜像路径，例如 192.168.0.1:5000/namespace/jenkins:latest',
    containerResourceConfigDescription:
      '设置容器的资源限制与资源预留，以将容器调度到合适的节点上。',
    portConfigDescription: '设置用于访问容器的端口。',
    protocolTip:
      '选择服务实际使用的协议以充分利用应用治理功能。例如，为 HTTP 服务选择 HTTP 协议。',
    instanceDescription:
      '服务实例（Pod），是服务实例运行的对象，通过服务来配置和管理。在实例列表，可以看到实例的状态、所在的主机IP、实例的IP、创建时间。',
    serviceIdEmptyError: '请填写服务对应的ID。',
    namespaceEmptyErrorMsg: '请选择一个命名空间',
    containerEmptyError: '请对容器进行设置。',
    imageUrlEmptyError: '请设置容器镜像路径。',
    resourceConflictError: '资源预留不能超过资源限制。',
    namespacesQueryError: '命名空间列表获取失败...请刷新页面重试。',
    resourceHistorySearchError: '资源历史获取失败。',
    jsonConfig: "实例部署JSON配置",
    jsonConfigError: "请检查json配置格式。",
  },
  image: {
    listQueryError: '镜像列表获取失败...请刷新页面重试。',
    deleteError: '镜像删除失败...请重试。',
    deleteSuccess: '镜像删除成功',
  },
  routerule: {
    routeruleDesc: '控制实例间的路由规则',
  },
  table: {
    rowsPerPage: '每页显示',
  },
  instruction: {
    waiting: '未设置',
    now: '当前',
    finished: '已设置',
  },
  stressTesting: {
    startTest: '开始测试',
    stressTestingDescription:
      '考察当前软件和硬件环境下，系统所能承受的最大负荷，并帮助找出系统的瓶颈所在。',
    planNameDescription:
      '名称只能包含字母、数字和连字符（-），必须以字母或数字开头和结尾，最长 253 个字符。',
    planCommentDescription: '对于计划的补充说明。',
    groupCommentDescription: '对于线程组的补充说明。',
    nameEmptyErrorMsg: '请设置一个名称。',
    serializeThreadgroupsDescription: '独立运行每个线程组',
    tearDownOnShutdownDescription: '主线程结束后运行tearDown线程组',
    functionalModeDescription:
      '函数测试（只有当你需要记录每个请求从服务器取得的数据到文件时才需要选择函数测试模式。选择这个选项很影响性能。）',
    groupAddDescription: '自定义线程组的设置以创建线程组。',
    groupEmptyError: '请对线程组进行设置。',
    sameUserDescription: 'Same user on each iteration',
    delayStartDescription: '延迟创建线程直到需要',
    schedulerDescription: '调度器',
    webServerDescription: '对Web服务器进行设置。',
    httpRequestDescription: '对HTTP请求进行设置。',
    timerAddDescription: '自定义定时器的设置以创建定时器。',
    planCreatedMsg: '成功创建测试计划！',
    planCreationFailedMsg: '测试计划创建失败，请重试。',
    planSearchError: '无法获取测试计划，请刷新页面重试。',
    resultsSearchError: '无法获取测试结果，请刷新页面重试。',
    testStartMsg: '测试已启动，请稍后查看结果。',
    testStartError: '测试启动失败，请重试。',
    aggregateReportError: '聚合报告获取出错，请重试。',
    aggregateReportCreateSuccess: '聚合报告已生成。',
    aggregateReportCreateError: '聚合报告生成失败，请重试。',
    aggregateReportUpdateeSuccess: '聚合报告已更新。',
    aggregateReportUpdateeError: '聚合报告更新失败，请重试。',
    getStartAndEndFailedMsg: '测试时间获取失败。',
    aggregateExcelExportFailedMsg: 'Excel导出失败，请重试...',
    updateAggregateReport: "更新聚合报告",
    createAggregateReport: "创建聚合报告",
    exportXlsReport: "导出报告 (xls)",
    cpuUsage: "CPU 用量 (m)",
    memUsage: "内存用量 (Mi)",
    transferredFlow: "出站流量 (Kbps)",
    receivedFlow: "入站流量 (Kbps)",
    threadDelay: "线程延迟",
    constantDelayOffset: "恒定延迟偏移",
    randomDelayMaximum: "延迟最大值",
    testResult: "测试结果",
    aggregateReport: "聚合报告",
  },
  routeTrace: {
    title: '路由链路',
    titleHint: '查看服务的路由链路（页面会自动加载上一次搜索的内容，如果需要查询新的数据，请先点击一次搜索按钮）',

    duration1M: '1分钟内',
    duration2M: '2分钟内',
    duration5M: '5分钟内',
    duration10M: '10分钟内',
    duration30M: '30分钟内',
    duration1H: '1小时内',
    duration3H: '3小时内',
    duration6H: '6小时内',
    duration12H: '12小时内',
    duration1D: '1天内',
    duration7D: '7天内',
    durationCustom: '自定义',

    serviceTableButtonSearch: '搜索',
    serviceTableTitleService: '服务',
    serviceTableTitleApi: '接口',
    serviceTableTitleRequestCount: '请求次数',
    serviceTableTitleLow: 'Low',
    serviceTableTitle05: '0.5',
    serviceTableTitle095: '0.95',
    serviceTableTitle099: '0.99',
    serviceTableTitleHigh: 'High',
    serviceTableContentNoData: '无数据',
    serviceTableContentNoDataHint: '您可以尝试刷新数据',

    timeFormat: 'YYYY-MM-DD HH:mm:ss',

    popWindowTimeConsuming: '耗时',
    popWindowNoLinkDiagram: '无链路图',

    popWindowToday: '今天',
    popWindowYesterday: '昨天',
    popWindowDaysAgo: '天前',
    popWindowHoursAgo: '小时前',
    popWindowMinutesAgo: '分钟前',
    popWindowSecondsAgo: '秒前',

    popWindowTitle: '路由链路',
    popWindowDetail: '详情',
    popWindowServiceApi: '服务 API',
    popWindowRequestCount: '请求数量',
    popWindowLow: 'Low',
    popWindow95: '95%',
    popWindowHigh: 'High',

    popWindowTableTitleRequest: '请求',
    popWindowTableTitleLinkLength: '链路长度',
    popWindowTableTitleStartTime: '开始时间',
    popWindowTableTitleResponseTime: '响应时间',
    popWindowTableTitleStatus: '请求状态',

    modalTitle: '请求信息',
    modalServiceId: '服务ID',
    modalServiceName: '服务名',
    modalTime: '时间',
  },
  evolution: {
    evolution: '演化',
    evolutionPlan: '演化计划',
  },
};
