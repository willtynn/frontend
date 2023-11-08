import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';
import { RouteRule, RouteRuleId } from '../models/RouteControlling';
import { BaseResponse } from '../models/BaseResponse';
import { Dispatch, AnyAction } from 'redux';

export const UPDATE_ROUTERULES = 'UPDATE_ROUTERULES';
export const UPDATE_ROUTERULE = 'UPDATE_ROUTERULE';
const baseURLLink = 'http://192.168.1.104:30760';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});
const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};
/**
 * @param {string} namespace
 * @param {string} service
 */
export function getAllRouteRules(
  namespace,
  service
) {
  return getRouteRules({
    Namespace: namespace,
    DesService: service,
  });
}
/**
 * @param {RouteRuleId} searchInfo
 */
export function getRouteRules(searchInfo) {
  const url = '/route-rules/getRouteRules?exact=false';

  return async (dispatch) => {
    try {
      const res = await axios_instance.post(
        url,
        searchInfo,
        headers
      );
      if (res.status === 200) {
        dispatch({
          type: UPDATE_ROUTERULES,
          data: res.data,
        });
        return;
      }
    } catch {}
    dispatch(
      setSnackbarMessageAndOpen(
        'route.routerulesQueryError',
        {},
        SEVERITIES.warning
      )
    );
  };
}
/**
 * @param {RouteRuleId} searchInfo
 */
export function getRouteRule(searchInfo) {
  const url = '/route-rules/getRouteRules?exact=true';
  return async (dispatch) => {
    try {
      const res = await axios_instance.post(
        url,
        searchInfo,
        headers
      );
      if (res.status == 200 && res.data.length > 0) {
        dispatch({ type: UPDATE_ROUTERULE, data: res.data[0] });
        return;
      }
    } catch {}
    dispatch(
      setSnackbarMessageAndOpen(
        'route.routeruleQueryError',
        {},
        SEVERITIES.warning
      )
    );
  };
}
/**
 * @param {RouteRule} routerule
 */
export function updateRouteRule(routerule) {
  const url = '/route-rules/getRouteRules?allowOverwrite=true';

  return async (dispatch) => {
    try {
      const res = await axios_instance.post(
        url,
        routerule,
        headers
      );

      if (res.status == 200 && res.data.code == 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'route.routeruleUpdateSuccess',
            {},
            SEVERITIES.success
          )
        );
        return;
      }
    } catch {}
    dispatch(
      setSnackbarMessageAndOpen(
        'route.routeruleUpdateError',
        {},
        SEVERITIES.warning
      )
    );
  };
}
/**
 * @param {RouteRule} routerule
 */
export function addRouteRule(routerule) {
  const url = '/route-rules/getRouteRules?allowOverwrite=false';

  return  async (dispatch) => {
    try {
      const res = await axios_instance.post(
        url,
        routerule,
        headers
      );
      if (res.status == 200 && res.data.code == 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'route.routeruleAddSuccess',
            {},
            SEVERITIES.success
          )
        );
        return;
      }
    } catch {}
    dispatch(
      setSnackbarMessageAndOpen(
        'route.routeruleAddError',
        {},
        SEVERITIES.warning
      )
    );
  };
}
/**
 * @param {RouteRuleId} id
 * @param {boolean} fuzzy
 */
export function deleteRouteRule(
  id,
  fuzzy
) {
  const url = `/route-rules/delete?exact=${!fuzzy}`;

  return async (dispatch) => {
    try {
      const res = await axios_instance.post(url, id, headers);
      if (res.status == 200 && res.data.code == 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'route.routeruleDeleteSuccess',
            {},
            SEVERITIES.success
          )
        );
        return;
      }
    } catch {}
    dispatch(
      setSnackbarMessageAndOpen(
        'route.routeruleDeleteError',
        {},
        SEVERITIES.warning
      )
    );
  };
}
