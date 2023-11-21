export const messages = {
  menu: {
    clusterMangementDescription:
      '对多集群以及每个集群的基础资源、服务组件和应用资源等的统一管理。',
  },
  common: {
    errorMessage: '{msg}',
    copyboard: '已复制，请您继续接下来的操作。',
  },
  serviceOverview: {
    serviceDescription:
      '服务（Service）提供一种抽象的方法，将运行在容器组（Pod）上的应用程序公开为网络服务。',
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
    serviceDependencyDescription: "服务依赖是指一个软件系统依赖于外部的服务或API，通常通过网络进行通信。",
    serviceBasedMsg: "请选择一个服务。",
    interfaceBasedMsg: "请选择一个接口。",
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
  },
  image: {
    listQueryError: '镜像列表获取失败...请刷新页面重试。',
    deleteError: '镜像删除失败...请重试。',
  },
  routerule:{
    routeruleDesc:'控制实例间的路由规则'
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
    groupAddDescription: "自定义线程组的设置以创建线程组。",
    groupEmptyError: "请对线程组进行设置。",
    sameUserDescription: "Same user on each iteration",
    delayStartDescription: "延迟创建线程直到需要",
    schedulerDescription: "调度器",
    webServerDescription: "对Web服务器进行设置。",
    httpRequestDescription: "对HTTP请求进行设置。",
    timerAddDescription: "自定义定时器的设置以创建定时器。",
    planCreatedMsg: "成功创建测试计划！",
    planCreationFailedMsg: "测试计划创建失败，请重试。"
  },
};
