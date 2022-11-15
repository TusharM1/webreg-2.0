import {useState} from "react";
import axios from "axios";

export const defaultSchedule = {
    status: "loading",
    courseSections: []
};

export function useSchedule() {
    const [schedule, setSchedule] = useState(defaultSchedule);

    const addSection = (section) => {
        // post add section
        // on success, update schedule
        // on fail, report error
    }

    const removeSection = (section) => {
        // post remove section
        // on success, update schedule
        // on fail, report error
    }

    const swapSection = (section) => {
        // post swap section
        // on success, update schedule
        // on fail, report error
    }

    const initializeSchedule = () => {
        // post get schedule
        // put the schedule as loading in the meantime
        // update the schedule after populated
    }

    initializeSchedule();

    return [schedule, addSection, removeSection, swapSection];
}