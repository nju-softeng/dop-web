import ReactDOM,{render} from 'react-dom';
import React from 'react';
import Fuzz from './Fuzz/Fuzz';
import BasicLayout from "../../layouts/BasicLayout";
import Pipeline from "../Pipeline/Pipeline";

const fuzzConfig = [
    {
        path: '/fuzz',
        component: Fuzz,
        layout: BasicLayout,
        isLogin: true
    }
];
export {fuzzConfig};