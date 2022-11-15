import React, {useContext, useState} from 'react';
import { Accordion, Container } from "react-bootstrap";
import axios from "axios";
import {DataContext} from "../user/DataContext";
import { elementType } from 'prop-types';


export function AdminUI() {
    const { data } = useContext(DataContext);

    // console.log("Hey this is line 10 of AdminUI.js");
    const createCourse = async (coursestring, schoolNum,departmentNum,courseNum, namE, credits) => {
        //alert(coursestring);
        axios.post("http://localhost:3001/createCourse", {
            token: data.token,
            coursestring: coursestring,
            schoolNum: schoolNum,
            departmentNum: departmentNum,
            courseNum:courseNum,
            namE:namE,
            credits:credits
        }
        ).then((response) => {
            alert(JSON.stringify(response.data));
        }).catch(() => {console.log("Hey this is line 23 of AdminUI.js")});
    };

    const removeCourse = async (coursestring) => {
        axios.post("http://localhost:3001/removeCourse", {
            token: data.token,
            coursestring: coursestring
        }
        ).then((response) => {
            alert(JSON.stringify(response.data));
        }).catch(() => {console.log("Hey this is line 36 of AdminUI.js")});
    };

    const updateCourse = async (coursestring, namE, credits) => {
        axios.post("http://localhost:3001/updateCourse", {
            token: data.token,
            coursestring: coursestring,
            namE: namE,
            credits: credits
        }
        ).then((response) => {
            alert(JSON.stringify(response.data));
        }).catch(() => {console.log("Hey this is line 47 of AdminUI.js")});
    };


    return (
        <Container fluid>
            <form onSubmit={async (values, actions) => {
                let coursestring = document.getElementById("courseString").value;
                let schoolNum = coursestring.substring(0,2);
                let departmentNum = coursestring.substring(3,6);
                let courseNum = coursestring.substring(7,10);
                let namE = document.getElementById("namE").value;
                let credits = document.getElementById("credits").value;
                await createCourse(coursestring,schoolNum,departmentNum,courseNum,namE,credits);
                //alert("LINE 40-ish of AdminUI");
                actions.resetForm();
                }}> 
                
                <input id='courseString' placeholder='00:000:000'></input>
                <input id='namE' placeholder='Name'></input>
                
                <input id='credits' placeholder='Number of credits'></input>
                <button type='submit' id='createClass'>
                    CreateClass
                </button>

            </form>
            <form onSubmit={async (values, actions) => {
                let coursestring = document.getElementById("courseStringDeletor").value;
                await removeCourse(coursestring);
                actions.resetForm();
                }}> 
                
                <input id='courseStringDeletor' placeholder='00:000:000'></input>
                <button type='submit' id='removeClass'>
                    Remove Class
                </button>
                
            </form>
            <form onSubmit={async (values, actions) => {
                let coursestring = document.getElementById("courseStringChanger").value;
                let namE = document.getElementById("namEChanger").value;
                let credits = document.getElementById("creditsChanger").value;
                await updateCourse(coursestring, namE, credits);
                actions.resetForm();
                }}> 
                
                <input id='courseStringChanger' placeholder='00:000:000'></input>
                <input id='namEChanger' placeholder='new Name'></input>
                <input id='creditsChanger' placeholder='new Number of credits'></input>

                <button type='submit' id='updateClass'>
                    Update Class
                </button>
                
            </form>
        </Container>
    );
}