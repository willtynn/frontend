export const messages = {
  menu: {
    clusterMangementDescription: "对多集群进行统一管理。"
  },
  common: {
    errorMessage: "{msg}"
  },
  serviceOverview: {

  },
  serviceDependency: {
    serviceDependencyNotFound: "所查询服务没有相关调用关系...",
    interfaceDependencyNotFound: "所查询接口没有相关调用关系...",
    errorMessage: "{msg}",
    searchServiceByIdEmptyError: "所查询ID没有相关服务...",
    queryError: "查询出错，请重试..."
  },
  cluster: {
    clustersSearchError: "集群信息获取失败，请刷新页面重试...",
    clusterSelectHint: "请选择一个集群！",
    instanceSelectHint: "请选择一个服务实例！",
    serverSelectHint: "请选择一个服务器！",
    clusterInfo: "集群信息",
    instanceInfo: "实例信息",
    instanceList: "实例列表",
    clusterTopology: "集群拓扑结构"
  },
  instance: {
    deploySuccess: "实例部署成功！",
    deployFailed: "实例部署失败，请重试...",
    serverIdDescription: "服务的唯一标识,一个服务ID对应一个服务。",
    namePatternErrorMsg: "名称无效。名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。",
    nameEmptyErrorMsg: "请设置一个名称。",
    nameDescription: "名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。",
    namespaceDescription: "选择将要创建资源的命名空间。",
    containerAddDescription: "自定义容器的设置以创建容器。",
    containerConfigDescription: "设置容器的镜像、名称、类型和计算资源。",
    containerInputPlaceHolder: "镜像路径，例如 192.168.0.1:5000/namespace/jenkins:latest",
    containerResourceConfigDescription: "设置容器的资源限制与资源预留，以将容器调度到合适的节点上。",
    portConfigDescription: "设置用于访问容器的端口。",
    protocolTip: "选择服务实际使用的协议以充分利用应用治理功能。例如，为 HTTP 服务选择 HTTP 协议。",
    instanceDescription: "服务实例（Pod），是服务实例运行的对象，通过服务来配置和管理。在实例列表，可以看到实例的状态、所在的主机IP、实例的IP、创建时间。",
    serviceIdEmptyError: "请填写服务对应的ID。",
    namespaceEmptyErrorMsg: "请选择一个命名空间",
    containerEmptyError: "请对容器进行设置。",
    imageUrlEmptyError: "请设置容器镜像路径。",
    resourceConflictError: "资源预留不能超过资源限制。",
  },
  table: {
    rowsPerPage: "每页显示"
  },
  instruction: {
    waiting: "未设置",
    now: "当前",
    finished: "已设置"
  }
};