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

  const buildFinalDataObject = () => {
    if (
      jobs &&
      departments &&
      !loading &&
      !department_loading &&
      !error &&
      !department_error
    ) {
      const divARR = [];

      departments.map((department, index) => {
        department.jobs = [];
        jobs.map((job) => {
          if (job.function.title === department.title) {
            department.jobs.push(job);
          }
        });
      });

      departments.map((department) => {
        if (department.jobs.length > 0) {
          divARR.push(<h1>{department.title}</h1>);
          department.jobs.map((job) => {
            divARR.push(<Job key={job.id} job={job} />);
          });
        }
      });

      return divARR;
    }
  };

  return (
    <Container classname="my-4">
      <h1 className="mb-4">Teknorix jobs</h1>

      {loading && <div class="spinner-border text-primary" role="status" />}
      {error || (department_error && <h1>Error.Try Refreshing</h1>)}
      {buildFinalDataObject()}
    </Container>
  );
}

export default App;
