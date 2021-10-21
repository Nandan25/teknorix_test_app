import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

const BASE_URL = "https://teknorix.jobsoid.com/api/v1";
const DEPARTMENTS_URL = BASE_URL + "/departments";

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, departments: [] };

    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        departments: action.payload.departments,
      };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        departments: [],
      };

    default:
      return state;
  }
}

export default function useFetchJobs(params) {
  const [state, dispatch] = useReducer(reducer, {
    departments: [],
    loading: true,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(DEPARTMENTS_URL, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { departments: res.data },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [params]);

  return state;
}
