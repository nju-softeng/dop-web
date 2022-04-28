import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Button, message, Spin, Table, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddModal from "./AddModal";
import {
  apiGetDefectList,
  apiAddPredictModel,
  apiDeleteDefect,
} from "../util/api";
import BackButton from "../BackButton";

const AddDefect = () => {
  const [showModal, setShowModal] = useState(false);
  const [defectList, setDefectList] = useState([]);
  const [loading, setLoadng] = useState(true);

  const openAddModal = () => setShowModal(true);

  const handleAddModel = (modelInfo) => {
    setShowModal(false);
    setLoadng(true);
    apiAddPredictModel(modelInfo)
      .then(() => {
        message.success("Added");
        getdefectList();
      })
      .catch(() => message.error("Failed"))
      .finally(() => setLoadng(false));
  };

  const getdefectList = () => {
    setLoadng(true);
    apiGetDefectList()
      .then((list) => setDefectList(list))
      .catch(() => {
        message.error("Failed");
      })
      .finally(() => setLoadng(false));
  };

  useEffect(() => getdefectList(), []);

  const deleteData = (name) => {
    Modal.confirm({
      content: "Are you sure you want to remove?",
      onOk(close) {
        setLoadng(true);
        apiDeleteDefect({ name })
          .then(() => {
            message.success("Done");
            getdefectList();
          })
          .catch(() => {
            message.success("Failed");
          })
          .finally(() => setLoadng(false));
        close();
      },
    });
  };
  const modelTabelCol = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Creat time",
      dataIndex: "creattime",
      key: "creattime",
    },
    {
      title: "Action",
      key: "Action",
      render(_, data) {
        return (
          <Button danger onClick={() => deleteData(data.name)}>
            Remove
          </Button>
        );
      },
    },
  ];

  return (
    <div className={styles.screen}>
      {loading && (
        <div className={styles.fullscreenLoader}>
          <Spin tip="please wait..." />
        </div>
      )}
      <div className={styles.actionBar}>
        <BackButton>Add a model to predict</BackButton>
        <Button onClick={openAddModal} type="primary" icon={<PlusOutlined />}>
          Add a model
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

export default AddDefect;
