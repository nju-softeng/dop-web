import React, { useState } from "react";
import { Table, Tabs } from "antd";
import InputPredictData from "./InputPredictData";
import styles from "./style.module.css";
import BackButton from "../BackButton";

const defactTabelCol = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 150,
  },
  {
    title: "Defect Code",
    dataIndex: "defectCode",
    key: "defectCode",
  },
  {
    title: "Defect Location",
    dataIndex: "defectLocation",
    key: "defectLocation",
  },
];

const PredictManagePage = () => {
  const [defectList, setdefectList] = useState([]);

  const tabs = [
    {
      key: 1,
      name: "Predict",
      Component: (
        <InputPredictData onOK={(defectList) => setdefectList(defectList)} />
      ),
    },
    {
      key: 2,
      name: `Defect ${defectList.length > 0 ? ` (${defectList.length})` : ""}`,
      Component: (
        <Table
          style={{ maxWidth: 1280, margin: "0 auto" }}
          rowKey={(data) => data.id}
          columns={defactTabelCol}
          dataSource={defectList}
          bordered
          pagination={{ pageSize: 10 }}
        />
      ),
    },
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.actionBar}>
        <BackButton>Predict Data</BackButton>
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
export default PredictManagePage;
