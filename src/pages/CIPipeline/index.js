import ConfigInfo from './ConfigInfo/ConfigInfo'
import BasicLayout from "../../layouts/BasicLayout";
import CIPipeline from "./CIPipeline/CIPipeline";

const ciPipelineConfig = [
    {
        path: '/cipipeline/configInfos',
        component: ConfigInfo,
        layout: BasicLayout,
        isLogin: true
    },
    {
        path: '/cipipeline/configInfos/:configInfoId/cipipelines',
        component: CIPipeline,
        layout: BasicLayout,
        isLogin: true
    }
];

export { ciPipelineConfig };