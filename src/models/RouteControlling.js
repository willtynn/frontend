import PropTypes from 'prop-types';

let _RouteRule;
let _K8SResourceId;
let _EndpointControl;
let _RouteRuleExtraInfo;
_RouteRuleExtraInfo = PropTypes.shape({
  Hosts: PropTypes.arrayOf(PropTypes.string),
  PortNumber: PropTypes.number,
});
_EndpointControl = PropTypes.shape({
  Uri: PropTypes.string,
  UseRegex: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
});
_K8SResourceId = PropTypes.shape({
  Name: PropTypes.string,
  Namespace: PropTypes.string,
});
_RouteRule = PropTypes.shape({
  DesPods: PropTypes.arrayOf(_K8SResourceId),
  DesService: PropTypes.string,
  EndpointControls: PropTypes.arrayOf(_EndpointControl),
  ExtraInfo: PropTypes.oneOfType([_RouteRuleExtraInfo, PropTypes.any]),
  Name: PropTypes.string,
  Namespace: PropTypes.string,
  SrcPods: PropTypes.arrayOf(_K8SResourceId),
});

let _RouteRuleId;
_RouteRuleId = PropTypes.shape({
  DesService: PropTypes.string,
  Name: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  Namespace: PropTypes.string,
});

export const RouteRuleExtraInfo = _RouteRuleExtraInfo;
export const EndpointControl = _EndpointControl;
export const K8SResourceId = _K8SResourceId;
export const RouteRule = _RouteRule;
export const RouteRuleId = _RouteRuleId;
