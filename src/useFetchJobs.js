import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

const BASE_URL = "https://teknorix.jobsoid.com/api/v1";
const JOBS_URL = BASE_URL + "/jobs";

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };

    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs,
        departments: action.payload.departmenst,
      };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
        departments: [],
      };

    default:
      return state;
  }
}

export default function useFetchJobs(params) {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    departments: [],
    loading: true,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(JOBS_URL, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { jobs: res.data },
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
