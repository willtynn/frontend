import { axios_instance } from "../utils/axios_instance";
import { setSnackbarMessageAndOpen } from "./snackbarAction";
import { SEVERITIES } from "../components/CommonSnackbar";

export const UPDATE_SEARCH_SERVICE = "UPDATE_SEARCH_SERVICE";

export const UPDATE_SERVICE_DEPENDENCY = "UPDATE_SERVICE_DEPENDENCY";

export const UPDATE_INTERFACE_DEPENDENCY = "UPDATE_INTERFACE_DEPENDENCY";

export function searchServiceById(id) {
  const url = "/service/getById";
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
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
      }
      else {
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
      }
    } catch {
      dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
    }
  }

}

export function searchServiceByVersion(name, version) {
  const url = "/service/getByNameVersion";
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          name: name,
          version: version
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      if (res.data.code === 200) {
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data.data });
      }
    } catch {
      dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
    }
  }
}

export function searchDependenciesByServiceId(id) {
  const url = "/service/getServiceInvocation";
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          id: id
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      if (res.data.code === 200 || res.data.code === 0) {
        if (
          (res.data.data.invoked.length && res.data.data.invoked.length !== 0) ||
          (res.data.data.invoking.length && res.data.data.invoking.length !== 0)
        ) {
          dispatch({ type: UPDATE_SERVICE_DEPENDENCY, data: res.data.data });
        } else {
          dispatch(
            setSnackbarMessageAndOpen(
              'serviceDependency.serviceDependencyNotFound',
              {},
              SEVERITIES.warning
            )
          );
          dispatch({ type: UPDATE_SERVICE_DEPENDENCY, data: { invoked: [], invoking: [] } });
        }
      } else {
        dispatch({ type: UPDATE_SERVICE_DEPENDENCY, data: null });
      }
    } catch {
      dispatch({ type: UPDATE_SERVICE_DEPENDENCY, data: null });
    }
  }
}

export function searchDependenciesByInterfaceId(id) {
  const url = "/service/getInterfaceInvocation";
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          id: id
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

      if (res.data.code === 200 || res.data.code === 0) {

        dispatch({ type: UPDATE_INTERFACE_DEPENDENCY, data: res.data.data });


      } else {
        dispatch({ type: UPDATE_INTERFACE_DEPENDENCY, data: null });
      }
    } catch {
      dispatch({ type: UPDATE_INTERFACE_DEPENDENCY, data: null });
    }
  }
}