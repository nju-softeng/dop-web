import HomePage from './Home'
import AddPage from './Add'
import PredictPage from './Predict'
import LocatePage from './Locate'
import HistoryPage from './History'
import BasicLayout from '../../layouts/BasicLayout'

const defectConfig = [
    {
        path: '/defect',
        component: HomePage,
        layout: BasicLayout,
        isLogin: true
    },
    {
        path: '/defect/model',
        component: AddPage,
        layout: BasicLayout,
        isLogin: true
    },
    {
        path: '/defect/predict',
        component: PredictPage,
        layout: BasicLayout,
        isLogin: true
    },
    {
        path: '/defect/locate',
        component: LocatePage,
        layout: BasicLayout,
        isLogin: true
    },
    {
        path: '/defect/history',
        component: HistoryPage,
        layout: BasicLayout,
        isLogin: true
    }
];

export { defectConfig };
