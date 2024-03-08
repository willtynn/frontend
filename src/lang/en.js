export const messages = {
  common: {
    errorMessage: '{msg}',
    copyboard: 'Copied, please continue.',
    serviceTableContentNoData: 'No data',
    serviceTableContentNoDataHint: 'You can try to refresh the data',
    cancel: "Cancel",
    create: "Create",
    confirm: "Confirm",
    nextStep: "Next Step",
    previousStep: "Previous Step"
  },
  lang: {
    language: 'Language',
  },
  menu: {
    clusterMangementDescription:
      'Unified management of multiple clusters and basic resources, service components, and application resources of each cluster.',
    platformManagement: 'Platform Management',
  },

  serviceOverview: {
    serviceDescription:
      'A Service provides an abstract way to expose an application running on a group of containers (Pod) as a network service.',
  },
  serviceDependency: {
    serviceDependencyNotFound: 'The queried service has no associated call relationship...',
    interfaceDependencyNotFound: 'The queried interface has no related call relationship...',
    errorMessage: '{msg}',
    searchServiceByIdEmptyError: 'The queried ID has no related service...',
    searchServiceByNameVersionError:
      'No service corresponding to the target service name and version is found...',
    queryError: 'Query error, please try again...',
    podSearchError: 'Error obtaining container group, please refresh and try again...',
    serviceDependencyDescription:
      'Service dependency refers to a software system relying on external services or APIs, typically communicating through a network.',
    serviceBasedMsg: 'Please select a service.',
    interfaceBasedMsg: 'Please select an interface.',
  },
  cluster: {
    clustersSearchError: 'Cluster information acquisition failed, please refresh the page and try again...',
    clusterSelectHint: 'Please select a cluster!',
    instanceSelectHint: 'Please select a service instance!',
    serverSelectHint: 'Please select a server!',
    clusterInfo: 'Cluster Information',
    instanceInfo: 'Instance Information',
    instanceList: 'Instance List',
    clusterTopology: 'Cluster topology',
    clusterNodeDescription:
      'Cluster nodes are the basic servers in the platform cluster, and you can view cluster node information on this page.',
  },
  instance: {
    deploySuccess: 'Instance deployment successful!',
    deployFailed: 'Instance deployment failed, please try again...',
    serverIdDescription: 'The unique identifier of a service, where each service ID corresponds to one service.',
    namePatternErrorMsg:
      'The name is invalid. The name can only contain lowercase letters, numbers, and hyphens (-), and must start and end with lowercase letters or numbers, with a maximum length of 253 characters.',
    nameEmptyErrorMsg: 'Please set a name.',
    nameDescription:
      'The name can only contain lowercase letters, numbers, and hyphens (-), and must start and end with lowercase letters or numbers, with a maximum length of 253 characters.',
    namespaceDescription: 'Select the namespace where the resource will be created.',
    containerAddDescription: 'Customize container settings to create containers.',
    containerConfigDescription: 'Set the image, name, type, and computing resources of the container.',
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
    resourceConflictError: 'Resource reservation cannot exceed the resource limit.',
    namespacesQueryError: 'Failed to retrieve namespace list... Please refresh the page and try again.',
    resourceHistorySearchError: 'Resource history acquisition failed.',
    jsonConfig: "Instance Deploying JSON Configuration"
  },
  stressTesting: {
    startTest: 'Start Test',
  },
  routeTrace: {
    title: 'Route Trace',
    //查看服务的路由链路
    titleHint: 'View the route trace of the service',

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

    popWindowTimeConsuming: 'Time Consuming',
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

    popWindowTableTitleRequest: 'Request',
    popWindowTableTitleLinkLength: 'Link Length',
    popWindowTableTitleStartTime: 'Start Time',
    popWindowTableTitleResponseTime: 'Response Time',
    popWindowTableTitleStatus: 'Status',

    modalTitle: 'Request Information',
    modalServiceId: 'Service ID',
    modalServiceName: 'Service Name',
    modalTime: 'Time',
  },
};
