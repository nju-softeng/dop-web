import BasicLayout from '../../layouts/BasicLayout';
import Agent from './Agent';

const agentConfig =[
    {
        path: '/agent',
        layout: BasicLayout,
        component: Agent,
        isLogin: true
    }
];

export {agentConfig,Agent}