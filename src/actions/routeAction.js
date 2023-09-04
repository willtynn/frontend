import {test_data} from "../Pages/Route/trace/test_data.js"
const data_trace = JSON.parse(test_data)

export const UPDATE_ROUTE_TRACE = "UPDATE_ROUTE_TRACE";
export const UPDATE_ROUTE_GRAPH = "UPDATE_ROUTE_GRAPH";


export function getRouteTrace(start, end) {
  const url = "/trace";
  return async dispatch => {
      /*
    try {
      const res = await axios_instance.post(
        url,
        {
          namespaces: namespaces,
          duration: duration
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      if (res.data.code === 200 || res.data.code === 0) {
        //dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data.data });
      } else if (res.data.code === 1) {
        // alert(res.data.message)
        //dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
      }
      else {
        //dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
      }
    } catch {
      //dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
    }*/
    dispatch({ type: UPDATE_ROUTE_TRACE, data: data_trace });
  }
}


export function getRouteGraph(namespaces, duration) {
    const url = "/graph";
    return async dispatch => {
        /*
      try {
        const res = await axios_instance.post(
          url,
          {
            namespaces: namespaces,
            duration: duration
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        if (res.data.code === 200 || res.data.code === 0) {
          //dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data.data });
        } else if (res.data.code === 1) {
          // alert(res.data.message)
          //dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
        }
        else {
          //dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
        }
      } catch {
        //dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
      }*/
      //dispatch({ type: UPDATE_ROUTE_DEPENDENCY, data: data });
    }
  }
