export const messages = {
  common: {
    errorMessage: "{msg}",
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
    namePatternErrorMsg: "名称无效。名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 63 个字符。",
    nameEmptyErrorMsg: "请设置一个名称。",
    nameDescription: "名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 253 个字符。",
    namespaceDescription: "选择将要创建资源的命名空间。"

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