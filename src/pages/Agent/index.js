// import Repos from './ReposManagement/Repos';
import BasicLayout from '../../layouts/BasicLayout';
import Agent from './Agent';
// import ImageList from "./ImageList/ImageList";
// import NamespaceLogList from "./NamespaceLog/NamespaceLogList";
// import ImageInfo from './ImageInfo'

const agentConfig =[
    {
        path: '/agent',
        layout: BasicLayout,
        component: Agent,
        isLogin: true
    }
];

export {agentConfig,Agent}