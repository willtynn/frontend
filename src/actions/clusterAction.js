import axios from "axios";
import { setSnackbarMessageAndOpen } from "./snackbarAction";
import { SEVERITIES } from "../components/CommonSnackbar";

export const UPDATE_SEARCH_SERVICE = "UPDATE_SEARCH_SERVICE";

export const UPDATE_SERVICE_DEPENDENCY = "UPDATE_SERVICE_DEPENDENCY";

export const UPDATE_INTERFACE_DEPENDENCY = "UPDATE_INTERFACE_DEPENDENCY";

const baseURLLink = "http://192.168.1.104:31931";

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function searchServiceById(id) {
    const url = "/cluster/get";
    return async dispatch => {
      try {
        const res = await axios_instance.post(
          url,
          {
            serviceId: id
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        if (res.data.code === 200 || res.data.code === 0) {
          dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data.data });
        } else if (res.data.code === 1) {
          // alert(res.data.message)
          dispatch(
            setSnackbarMessageAndOpen(
              'serviceDependency.errorMessage',
              { msg: res.data.message },
              SEVERITIES.warning
            )
          );
          dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
        }
        else {
          dispatch(
            setSnackbarMessageAndOpen(
              'serviceDependency.searchServiceByIdEmptyError',
              {},
              SEVERITIES.warning
            )
          );
          dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
        }
      } catch {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.queryError',
            {},
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
      }
    }
  
  }