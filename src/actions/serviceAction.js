import { axios_instance } from "../utils/axios_instance";

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
        }
      )
      if(res.data.code === 200) {
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data.data });
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
        }
      )
      if(res.data.code === 200) {
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data.data });
      }
    } catch {
      dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
    }
  }
}