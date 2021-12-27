import React, { useState } from "react";
import { Card, Badge, Button, Collapse } from "react-bootstrap";

export default function Job({ job }) {
  const [open, setOpen] = useState(false);
  console.log(job);
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

            <Badge
              variant="secondary"
              style={{
                color: "white",
                backgroundColor: "grey",
                marginRight: "4px",
              }}
            >
              {job.location.title}
            </Badge>
            <Badge
              variant="secondary"
              style={{ color: "white", backgroundColor: "grey" }}
            >
              {job.type}
            </Badge>
          </div>
          <span className="float-right">
            <a
              className="btn btn-default float-right"
              onClick={(event) => {
                // window.open(job.hostedUrl, "_blank");
                setOpen((prevOpen) => !prevOpen);
              }}
            >
              {!open ? "View" : "Hide"}
            </a>
            <a
              className="btn btn-default"
              onClick={(event) => {
                window.open(job.applyUrl, "_blank");
              }}
            >
              Apply
            </a>
          </span>
        </div>
        <Card.Text></Card.Text>
        <Collapse in={open}>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </Collapse>
      </Card.Body>
    </Card>
  );
}
