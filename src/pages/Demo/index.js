import Demo from './Demo/Demo'
import BasicLayout from "../../layouts/BasicLayout";

const demoConfig = [
    {
        path: '/demo',
        component: Demo,
        layout: BasicLayout,
        isLogin: true
    }
];


export {demoConfig};
