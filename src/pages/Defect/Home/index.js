import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { BugOutlined, RobotOutlined, HistoryOutlined, BulbOutlined } from '@ant-design/icons'

const children = [
  {
    path: "/defect/model",
    name: "创建模型",
    color: '#fa8c16',
    icon: <RobotOutlined />
  },
  {
    path: "/defect/predict",
    name: "预测数据",
    color: '#7cb305',
    icon: <BulbOutlined />
  },
  {
    path: "/defect/locate",
    name: "缺陷定位",
    color: '#0050b3',
    icon: <BugOutlined />
  },
  {
    path: "/defect/history",
    name: "历史管理",
    color: '#9e1068',
    icon: <HistoryOutlined />
  },
];

export default () => {
  return (
    <div className={styles.cardWrapper}>
      {children.map((nav) => {
        return (
          <Link to={nav.path} className={styles.card} style={{ background: nav.color }}>
            {nav.icon && <div className={styles.icon}>{nav.icon}</div>}
            <span className="ice-menu-item-text">{nav.name}</span>
          </Link>
        );
      })}
    </div>
  );
};
