import React from "react";
import styles from "./style.module.css";
import PredictPage from './Predict'
import LocatePage from './Locate'
import { Tabs } from 'antd'
import BackButton from "../BackButton";

const History = () => {
  const tabs = [
    {
      key: 1,
      name: "Predict",
      Component: <PredictPage />,
    },
    {
      key: 2,
      name: `Locate`,
      Component: <LocatePage />,
    },
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.actionBar}>
      <BackButton>Manage History</BackButton>
      </div>
      <Tabs centered>
        {tabs.map(({ key, name, Component }) => (
          <Tabs.TabPane key={key} tab={name}>
            {Component}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default History;
