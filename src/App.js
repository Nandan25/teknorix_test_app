import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import useFetchDepartments from "./useFetchDepartments";
import { Container } from "react-bootstrap";
import Job from "./Job";

function App() {
  const [params, setParams] = useState({});
  const { jobs, loading, error } = useFetchJobs(params);
  const { departments, department_loading, department_error } =
    useFetchDepartments(params);
  console.log(jobs);
  return (
    <Container>
      {loading && <h1>Loading.....</h1>}
      {error && <h1>Error.Try Refreshing</h1>}
      {departments.map((department) => {
        return (
          <>
            {jobs.map((job) => {
              return job.function.title === department.title ? (
                <>
                  <h1>{department.title}</h1>
                  <Job key={job.id} job={job} />
                </>
              ) : (
                <></>
              );
            })}
          </>
        );
      })}
    </Container>
  );
}

export default App;
