import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

export default function Job({ job }) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              Posted on :&nbsp;
              {new Date(job.postedDate).toLocaleDateString([], {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Card.Subtitle>

            <span className="r-space">{job.location.title}</span>

            <span className="col-md-2" style={{ marginLeft: "10%" }}>
              {job.type}
            </span>
          </div>
          <span className="float-right">
            <a
              className="btn btn-default"
              onClick={(event) => {
                window.open(job.applyUrl, "_blank");
              }}
            >
              Apply
            </a>
            <a
              className="btn btn-default float-right"
              onClick={(event) => {
                window.open(job.hostedUrl, "_blank");
              }}
            >
              View
            </a>
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}
