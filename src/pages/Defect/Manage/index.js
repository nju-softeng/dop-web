import React, { useState } from "react";
import styles from "./style.module.css";
import { Button, message, Spin, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddModal from "./AddModal";
import {
  apiLocateDefect,
} from "../util/api";
import BackButton from "../BackButton";

const modelTabelCol = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 150,
  },
  {
    title: "Defect grade",
    dataIndex: "defectgrade",
    key: "defectgrade",
  },
  {
    title: "Defect line",
    dataIndex: "defectline",
    key: "defectline",
  },
];

const LocateDefect = () => {
  const [showModal, setShowModal] = useState(false);
  const [defectList, setDefectList] = useState([]);
  const [loading, setLoadng] = useState(false);

  const openAddModal = () => setShowModal(true);

  const handleAddModel = (modelInfo) => {
    setShowModal(false);
    setLoadng(true);
    apiLocateDefect(modelInfo)
      .then((list) => {
        message.success("Added");
        setDefectList(list);
      })
      .catch(() => message.error("Failed"))
      .finally(() => setLoadng(false));
  };

  return (
    <div className={styles.screen}>
      {loading && (
        <div className={styles.fullscreenLoader}>
          <Spin tip="please wait while model is running..." />
        </div>
      )}
      <div className={styles.actionBar}>
        <BackButton>Input your test information to locate</BackButton>
        <Button onClick={openAddModal} type="primary" icon={<PlusOutlined />}>
          Add a information
        </Button>
      </div>
      <AddModal
        visible={showModal}
        onOK={handleAddModel}
        onCancel={() => setShowModal(false)}
      />
      <Table
        style={{ maxWidth: 1280, margin: "0 auto" }}
        rowKey={(data) => data.id}
        columns={modelTabelCol}
        dataSource={defectList}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default LocateDefect;
