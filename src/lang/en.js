export const messages = {
  common: {
    executionNumber: 'Execution Number',
    createTime: 'Create Time',
    lastExecutionTime: 'Last Execution Time',
    enableOrDisable: 'Enable/Disable',
    remark: 'Remark',
    errorMessage: '{msg}',
    copyboard: 'Copied, please continue.',
    serviceTableContentNoData: 'No data',
    serviceTableContentNoDataHint: 'You can try to refresh the data',
    cancel: 'Cancel',
    create: 'Create',
    confirm: 'Confirm',
    nextStep: 'Next Step',
    previousStep: 'Previous Step',
    deploy: 'Deploy',
    name: 'Name',
    status: 'Status',
    startTime: 'Start Time',
    beginTime: 'Start Time',
    endTime: 'End Time',
    time: 'Time',
    serviceInstance: 'Service Instance',
    service: 'Service',
    repo: 'Code Repository',
    imageUrl: 'Image URL & TAG',
    serviceVersion: 'Version',
    serviceCollection: 'Service Collection',
    interfaceCollection: 'Interface Collection',
    serviceName: 'Service Name',
    serviceId: 'Service ID',
    schemeDeploy: 'Scheme Deploy',
    selectCluster: 'Select Cluster',
    lookupDependency: 'Lookup Dependency',
    allNamespaces: 'All Namespaces',
    namespace: 'Namespace',
    protocol: 'Protocol',
    containerPort: 'Container Port',
    container: 'Container',
    basicInfo: 'Basic Information',
    usage: 'Usage',
    received: 'Received',
    transferred: 'Transferred',
    timer: 'Timer',
    requestHeader: 'Request Header',
    requestParameters: 'Request Parameters',
    requestBody: 'Request Body',
    requestMethod: 'Request Method',
    port: 'Port',
    path: 'Path',
    hostIP: 'Host IP',
    httpRequest: 'HTTP Request',
    cycleIndex: 'Cycle-index',
    threadNum: 'Thread Number',
    key: 'Key',
    value: 'Value',
    delay: 'Delay',
    detailedInfo: 'Detailed Information',
    operation: 'Operation',
    moreOperation: 'More Operation',
    details: 'Details',
    serialized: 'Serialized',
    functionMode: 'Function Mode',
    basicResult: 'Basic Result',
    idleTime: 'Idle Time',
    connectTime: 'Connect Time',
    responseCode: 'Response Code',
    responseData: 'Response Data',
    responseMessage: 'Response Message',
    byteNum: 'Byte Number',
    headByteNum: 'Header Byte Number',
    bodyByteNum: 'Body Byte Number',
    sendByteNum: 'Sent Byte Number',
    testPlan: 'Test Plan',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    encode: 'Encoder',
    contentType: 'Content Type',
    includeEquals: 'Include Equals',
    webServer: 'WEB Server',
    serverNameOrIP: 'Server Name Or IP',
    contentEncoding: 'Content Encoding',
    parameters: 'Parameters',
    requestBodyData: 'Request Body',
    choose1from2: 'Choose 1 from 2',
    continue: 'Continue',
    annotation: 'Annotation',
    forever: 'Forever',
    yes: 'Yes',
    no: 'No',
    searchByName: 'Search By Name',
    createdOn: 'Created on',
    request: 'Request',
    responseTime: 'Response Time (ms)',
    cluster: 'Cluster',
    route: 'Route',
    routeLink: 'Route Link',
    routeControl: 'Route Control',
    application: 'Application',
    serviceCapabilityAutomaticTesting: 'Service Capability Automatic Testing',
    imageManagement: 'Image Management',
    imageList: 'Image List',
    bandwidth: 'Bandwidth',
    nameFormatError: 'The name format is incorrect, please check.',
    namespaceEmptyError: 'Please select a namespace.',
    memory: 'Memory',
    execute: 'Execute',
    description: 'Description',
    interface: 'Interface',
    id: 'ID',
    resourceRequest: 'Resources Request',
    resourceLimit: 'Resources Limit',
    schemeDetails: 'Scheme Details',
    cpu: 'CPU',
    portsDetails: 'Ports Details',
    deleteServiceError: 'Failed to delete a service',
    deleteServiceSuccess: 'Deleted successfully',
    boundaryTest: 'Boundary Test',
    tps: "Transaction Per Second",
    errorRate: "Error Rate",
  },
  lang: {
    language: 'Language',
  },
  menu: {
    clusterMangementDescription:
      'Unified management of multiple clusters and basic resources, service components, and application resources of each cluster.',
    platformManagement: 'Platform Management',
    clusterOverview: 'Cluster Overview',
    nodeNum: 'Node Number',
  },
  scheme: {
    addSuccess: 'The deployment scheme is successfully added, refresh to view.',
    addFail: 'Failed to add the deployment scheme.',
    getFail: 'The deployment scheme fails to be obtained.',
    addScheme: 'Add Scheme',
    deploySuccess: 'Scheme deployment is successful.',
    deployFail: 'Scheme deployment failed.',
    deployScheme: 'Deploy Scheme',
    schemeName: 'Scheme Name',
  },
  serviceOverview: {
    serviceDescription:
      'A Service provides an abstract way to expose an application running on a group of containers (Pod) as a network service.',
    allItems: 'All Items',
    requestedPath: 'Requested Path',
    inputSize: 'Input Size',
    outputSize: 'Output Size',
    cpuResource: 'CPU',
    ramResourceL: 'RAM',
    diskResource: 'Disk',
    gpuCoreResource: 'GPU-core',
    gpuMemResource: 'GPU Memory',
    resourceAndCapability: 'Resource And Capability',
    idleOccupation: 'Occupation during idle time',
    desiredResource: 'Desired Resource',
    processCapability: 'Process Capability',
    duration10M: 'Last 10 minutes',
    duration20M: 'Last 20 minutes',
    duration30M: 'Last 30 minutes',
    duration1H: 'Last 1 hour',
    duration2H: 'Last 2 hours',
    duration3H: 'Last 3 hours',
    duration5H: 'Last 5 hours',
    duration12H: 'Last 12 hours',
    duration1D: 'Last 1 day',
    duration2D: 'Last 2 days',
    duration3D: 'Last 3 days',
    duration7D: 'Last 7 days',
    requestMonitor: 'Request Monitor',
    selectTimeRange: 'Select a Time Range',
    customTimeRange: 'Custom a Time Range',
    containerGroupResourceMonitoring: 'Container Group Resource Monitoring',
    podIP: 'Pod IP',
    pod: 'Pod',
    resourceNotFound: 'Resource Not Found',
    total: 'Total',
    linkLength: 'Link Length',
    serviceRequestInterface: 'Request for Service Interface',
    resourceStatus: 'Resource Status',
    serviceRequestStatus: 'Service Request Status',
    resourceMonitor: 'Resource Monitor',
    editService: 'Edit Service',
    editInfo: 'Edit Information',
    cancelSelect: 'Deselect',
    deleteServicesTitle: 'Delete the selected services?',
    deleteServicesDescription: 'The deletion cannot be restored.',
  },
  serviceDependency: {
    serviceDependencyNotFound:
      'The queried service has no associated call relationship...',
    interfaceDependencyNotFound:
      'The queried interface has no related call relationship...',
    errorMessage: '{msg}',
    searchServiceByIdEmptyError: 'The queried ID has no related service...',
    searchServiceByNameVersionError:
      'No service corresponding to the target service name and version is found...',
    queryError: 'Query error, please try again...',
    podSearchError:
      'Error obtaining container group, please refresh and try again...',
    serviceDependencyDescription:
      'Service dependency refers to a software system relying on external services or APIs, typically communicating through a network.',
    serviceBasedMsg: 'Please select a service.',
    interfaceBasedMsg: 'Please select an interface.',
    graphNotFound: 'If the picture does not appear, please try again.',
    sourceInterfaceId: 'Source Interface ID',
    sourceInterfacePath: 'Source Interface Path',
    targetInterfaceId: 'Target Interface ID',
    targetInterfacePath: 'Target Interface Path',
    serviceDependency: 'Service Dependency',
    interfaceDependency: 'Interface Dependency',
    noOptionalService: 'No Optional Service',
    optionalService: 'Optional Service',
    noOptionalInterface: 'No Optional Interface',
    optionalInterface: 'Optional Interface',
    deleteServiceError: 'Failed to delete a service dependency',
    deleteServiceSuccess: 'Deleted successfully',
  },
  cluster: {
    clustersSearchError:
      'Cluster information acquisition failed, please refresh the page and try again...',
    clusterSelectHint: 'Please select a cluster!',
    instanceSelectHint: 'Please select a service instance!',
    serverSelectHint: 'Please select a server!',
    clusterInfo: 'Cluster Information',
    instanceInfo: 'Instance Information',
    instanceList: 'Instance List',
    clusterTopology: 'Cluster topology',
    clusterNodeDescription:
      'Cluster nodes are the basic servers in the platform cluster, and you can view cluster node information on this page.',
    schemeDeployDescription:
      'Develop specific plans or schemes to serve the actual deployment and implementation process.',
    nodeName: 'Node Name',
    ipAddress: 'IP Address',
    settedResource: 'Preset Resource',
    usedResource: 'Used Resource',
    cpuConfig: 'CPU Configuration',
    description: 'Description',
    clusterNode: 'Cluster Node',
    panelConfiguration: 'Panel Configuration',
    jsonConfiguration: 'JSON Configuration',
    addContainer: 'Add Container',
    containerSetting: 'Container Setting',
    image: 'Image',
    cpuReserved: 'CPU Reserved',
    noReserved: 'No Reserved',
    cpuLimited: 'CPU Limited',
    noLimited: 'No Limited',
    memReserved: 'Memory Reserved',
    memLimited: 'Memory Limited',
    portSetting: 'Port Setting',
    addPort: 'Add Port',
    instanceReplicas: 'Replicas',
    imageAddress: 'Image Url',
    makeDeployment: 'Make Deployment',
    podSetting: 'Pod Setting',
  },
  instance: {
    deploySuccess: 'Instance deployment successful!',
    deployFailed: 'Instance deployment failed, please try again...',
    serverIdDescription:
      'The unique identifier of a service, where each service ID corresponds to one service.',
    namePatternErrorMsg:
      'The name is invalid. The name can only contain lowercase letters, numbers, and hyphens (-), and must start and end with lowercase letters or numbers, with a maximum length of 253 characters.',
    nameEmptyErrorMsg: 'Please set a name.',
    nameDescription:
      'The name can only contain lowercase letters, numbers, and hyphens (-), and must start and end with lowercase letters or numbers, with a maximum length of 253 characters.',
    namespaceDescription:
      'Select the namespace where the resource will be created.',
    containerAddDescription:
      'Customize container settings to create containers.',
    containerConfigDescription:
      'Set the image, name, type, and computing resources of the container.',
    containerInputPlaceHolder:
      'Mirror path, for example 192.168.0.1:5000/namespace/jenkins:latest',
    containerResourceConfigDescription:
      'Set resource limits and resource reservations for containers to schedule them to appropriate nodes.',
    portConfigDescription: 'Set the port used to access the container.',
    protocolTip:
      'Choose the protocol that the service actually uses to fully utilize the application governance functionality. For example, selecting the HTTP protocol for an HTTP service.',
    instanceDescription:
      'A service instance (Pod) is an object that runs a service instance, configured and managed through a service. In the instance list, you can see the status, host IP, instance IP, and creation time of the instance.',
    serviceIdEmptyError: 'Please fill in the corresponding ID for the service.',
    namespaceEmptyErrorMsg: 'Please select a namespace',
    containerEmptyError: 'Please set up the container.',
    imageUrlEmptyError: 'Please set the container image path.',
    resourceConflictError:
      'Resource reservation cannot exceed the resource limit.',
    namespacesQueryError:
      'Failed to retrieve namespace list... Please refresh the page and try again.',
    resourceHistorySearchError: 'Resource history acquisition failed.',
    jsonConfig: 'Instance Deploying JSON Configuration',
    jsonConfigError: 'Check the json configuration format.',
  },
  stressTesting: {
    startTest: 'Start Test',
    stressTestingDescription:
      'Examine the maximum load that the system can withstand in the current software and hardware environment, and help identify the bottlenecks of the system.',
    planNameDescription:
      'The name can only contain letters, numbers, and hyphens (-), and must start and end with a letter or number, with a maximum length of 253 characters.',
    planCommentDescription: 'Additional explanation for the plan.',
    groupCommentDescription: 'Additional explanation for thread groups.',
    nameEmptyErrorMsg: 'Please set a name.',
    namePatternErrorMsg:
      'The name can only contain letters, numbers, and hyphens (-), and must start and end with a letter or number, with a maximum length of 253 characters.',
    serializeThreadgroupsDescription: 'Run each thread group independently',
    tearDownOnShutdownDescription:
      'After the main thread ends, run the tearDown thread group',
    functionalModeDescription:
      'Function testing (You only need to choose the function testing mode when you need to record the data obtained from the server for each request to a file. Choosing this option can greatly affect performance.)',
    groupAddDescription:
      'Customize the settings of thread groups to create them.',
    groupEmptyError: 'Please set up the thread group.',
    sameUserDescription: 'Same user on each iteration',
    delayStartDescription: 'Delay thread creation until needed',
    schedulerDescription: 'Scheduler',
    webServerDescription: 'Set up the web server.',
    httpRequestDescription: 'Set up HTTP requests.',
    timerAddDescription: 'Customize timer settings to create a timer.',
    planCreatedMsg: 'Successfully created test plan!',
    planCreationFailedMsg: 'Test plan creation failed, please try again.',
    planSearchError:
      'Unable to obtain test plan, please refresh the page and try again.',
    resultsSearchError:
      'Unable to obtain test results, please refresh the page and try again.',
    testStartMsg: 'The test has started, please check the results later.',
    testStartError: 'Test startup failed, please try again.',
    aggregateReportError:
      'Error in obtaining aggregation report, please try again.',
    aggregateReportCreateSuccess: 'The aggregation report has been generated.',
    aggregateReportCreateError:
      'Aggregation report generation failed, please try again.',
    aggregateReportUpdateeSuccess: 'The aggregation report has been updated.',
    aggregateReportUpdateeError:
      'Aggregation report update failed, please try again.',
    getStartAndEndFailedMsg: 'Test time acquisition failed.',
    aggregateExcelExportFailedMsg: 'Excel export failed, please try again.',
    updateAggregateReport: 'Update aggregation report',
    createAggregateReport: 'Create aggregation report',
    exportXlsReport: 'Export Report (xls)',
    cpuUsage: 'CPU Usage (m)',
    memUsage: 'Memory Usage (Mi)',
    transferredFlow: 'Transferred Flow (Kbps)',
    receivedFlow: 'Received Flow (Kbps)',
    threadDelay: 'Thread Delay',
    constantDelayOffset: 'Constant Delay Offset',
    randomDelayMaximum: 'Random Delay Maximum',
    testResult: 'Test Result',
    aggregateReport: 'Aggregate Report',
    deleteResult: 'Delete Result',
    threadMsDelay: 'Thread Delay (ms)',
    msDeviation: 'Deviation (ms)',
    constantMsDelayOffset: 'Constant Delay Offset (ms)',
    msLambda: 'Lambda (ms)',
    randomMsDelayMaximum: 'Random Delay Maximum (ms)',
    headerStorage: 'The header is stored in the header manager.',
    noParametersCurrently: 'No parameters currently available.',
    threadGroupSetting: 'Thread Group Setting',
    requestDefaults: 'Request Default Value',
    headerManager: 'Header Manager',
    addThreadGroup: 'Add Thread Group',
    startNextLoop: 'Start the next process loop',
    stopthread: 'Stop thread',
    stopTest: 'Stop test',
    stoptestnow: 'Stop test immediately',
    onSamplerError: 'Action performed on sampler error',
    rampUpTime: 'Ramp-Up Time (s)',
    durationS: 'Duration (s)',
    startDelayS: 'Start Delay (s)',
    timerList: 'Timer List',
    addTimer: 'Add Timer',
    constantTimer: 'Constant Timer',
    uniformRandomTimer: 'Uniform Random Timer',
    poissonRandomTimer: 'Poisson Random Timer',
    gaussianRandomTimer: 'Gaussian Random Timer',
    editTimer: 'Edit Timer',
    createTestPlan: 'Create Test Plan',
    editThreadGroup: 'Edit Thread Group',
    noOptionalNamespace: 'No optional namespace',
    noOptionalPod: 'No Optional Pod',
    planName: 'Plan Name',
    performancePressureTest: 'Performance Pressure Test',
    performBoundaryTest: 'Perform Boundary Test',
    delayedStartTime: 'Delayed start time (s)',
    newConcurrentRequestsPerRound:
      'Number of new concurrent requests per round',
    initialUsersCount: 'Initial concurrency',
    increasePeriod: 'Increase period (s)',
    rampUpPerPeriod: 'Luanch time per round (s)',
    flighttime: 'Flight time (s)',
    stopUsersCount: 'Number of concurrent periodic stops',
    stopUsersPeriod: 'Concurrent stop period (s)',
    boundaryTest: 'Boundary Test',
    boundaryResult: 'Boundary Test Result',
    stepReport: 'Step Report',
    communicationPressureBoundary: 'Communication pressure boundary',
    stepPressureDiagram: 'Stepped pressure diagram',
  },
  routectl: {
    jsonConfig: 'Configure Routerule through JSON',
    routeruleAddSuccess: 'Successfully added routerule',
    routeruleAddFailed: 'Failed to add routerule, please try again',
    routeruleUpdateSuccess: 'Successfully updated routerule',
    routeruleUpdateFailed: 'Failed to update routerule, please try again',
    routeruleDeleteSuccess: 'Successfully deleted routerule',
    routeruleDeleteFailed: 'Failed to delete routerule, please try again',
    routeruleQuerySuccess: 'Successfully get routerule',
    routeruleQueryFailed: 'Failed to get routerule, please try again',
  },
  routeTrace: {
    title: 'Route Trace',
    //查看服务的路由链路
    titleHint:
      'View the route trace of the service (This page will automatically load the previous search results. If you need to query fresh data, please click the search button first)',

    duration1M: 'Last 1 minute',
    duration2M: 'Last 2 minutes',
    duration5M: 'Last 5 minutes',
    duration10M: 'Last 10 minutes',
    duration30M: 'Last 30 minutes',
    duration1H: 'Last 1 hour',
    duration3H: 'Last 3 hours',
    duration6H: 'Last 6 hours',
    duration12H: 'Last 12 hours',
    duration1D: 'Last 1 day',
    duration7D: 'Last 7 days',
    durationCustom: 'Custom',

    serviceTableButtonSearch: 'Search',
    serviceTableTitleService: 'Service',
    serviceTableTitleApi: 'API',
    serviceTableTitleRequestCount: 'Request Count',
    serviceTableTitleLow: 'Low',
    serviceTableTitle05: '0.5',
    serviceTableTitle095: '0.95',
    serviceTableTitle099: '0.99',
    serviceTableTitleHigh: 'High',
    serviceTableContentNoData: 'No data',
    // 您可以尝试刷新数据"
    serviceTableContentNoDataHint: 'You can try to refresh the data',

    timeFormat: 'MM/DD/YYYY HH:mm:ss',

    popWindowTimeConsuming: 'Duration',
    popWindowNoLinkDiagram: 'No Link Diagram',

    popWindowToday: 'Today',
    popWindowYesterday: 'Yesterday',
    popWindowDaysAgo: 'days ago',
    popWindowHoursAgo: 'hours ago',
    popWindowMinutesAgo: 'minutes ago',
    popWindowSecondsAgo: 'seconds ago',

    popWindowTitle: 'Route Trace',
    popWindowDetail: 'Detail',
    popWindowServiceApi: 'Service API',
    popWindowRequestCount: 'Request Count',
    popWindowLow: 'Low',
    popWindow95: '95%',
    popWindowHigh: 'High',

    popWindowTableTitle: 'Request Information',
    popWindowTableTitleRequest: 'Request',
    popWindowTableTitleLinkLength: 'Link Length',
    popWindowTableTitleStartTime: 'Start Time',
    popWindowTableTitleResponseTime: 'Response Time',
    popWindowTableTitleStatus: 'Status',

    modalTitle: 'Link Diagram',
    modalServiceId: 'Service ID',
    modalServiceName: 'Service Name',
    modalTime: 'Time',

    modalEmpty: 'No data',
    modalEmptyHint:
      'Please click the request information row to view its link diagram',
  },
  table: {
    rowsPerPage: 'Rows per page display:',
  },
  evolution: {
    evolution: 'Evolution',
    evolutionPlan: 'Evolution Plan',
    evolutionPlanName: 'Evolution Plan Name',
    createEvolutionPlan: 'Create Evolution Plan',
    monitorConfiguration: 'Monitor Configuration',
    monitorResource: 'Monitor resource',
    monitorResourceErrMsg: 'Please select a monitoring data source',
    monitorResourceDescription: 'Configure the monitoring data source',
    moniterInterval: 'interval',
    monitorExecutiveInterval:
      'Configure the interval / trigger conditions for execution',
    analyseConfiguration: 'Analyze configuration',
    analyseConfigurationDescription: 'Analyze configuration',
    planConfiguration: 'Planning configuration',
    planConfigurationDescription: 'Planning configuration',
    executeConfiguration: 'Execute configuration',
    executeConfigurationDescription: 'Execute configuration',
    executeEvolution: 'Execute Evolution',
    evolutionGoal: 'Evolution Goal',
    triggerCondition: 'Trigger Condition',
    evolutionMean: 'Evolution Mean',
    evolutionAlgorithm: 'Evolution Algorithm',
  },
  image: {
    listQueryError:
      'Failed to get the image list... Please refresh the page and try again.',
    deleteError: 'Image deletion failed... Please try again',
    deleteSuccess: 'The image is deleted',
    pullError: 'Images caching failed... Please try again.',
    pullSuccess: 'The image cache is successful',
  },
};
