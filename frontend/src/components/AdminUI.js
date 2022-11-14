import React from 'react';
import { Accordion, Container } from "react-bootstrap";

export function AdminUI() {
    return (
        <Container fluid>
            <div className={"h-25 bg-light-coral"}>
                <span>Search Courses</span>
            </div>
            <span>View Courses</span>
            <div className={"d-flex justify-content-between w-100"}>
                <span>Course String</span>
                <span>Course Name</span>
            </div>
        </Container>
    );
}