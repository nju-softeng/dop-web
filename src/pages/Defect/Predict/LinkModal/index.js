import { Table, Modal, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { apiGetDefectList } from "../../util/api";
import styles from "./style.module.css";

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
];

const LinkModel = (props) => {
  const { visible, onOK, onCancel } = props;
  const [modelList, setModelList] = useState([]);
  const [loading, setLoadng] = useState(true);
  const selectedNameRef = useRef([]);

  const getModelList = () => {
    setLoadng(true);
    apiGetDefectList()
      .then((list) => setModelList(list))
      .catch(() => message.error("Failed"))
      .finally(() => setLoadng(false));
  };

  useEffect(() => getModelList(), []);

  const handleOK = () => {
    onOK && onOK(selectedNameRef.current);
  };

  useEffect(() => {
    if (visible) {
      selectedNameRef.current = [];
      setModelList([]);
      getModelList();
    }
  }, [visible]);

  const rowSelection = {
    onChange(selectedName) {
      selectedNameRef.current = selectedName;
    },
  };

  return (
    <Modal
      title="Select Model"
      visible={visible}
      cancelText="Cancel"
      okText="Select"
      onOk={handleOK}
      onCancel={onCancel}
      destroyOnClose
      width={640}
      style={{ minHeight: 400, position: "relative" }}
      okButtonProps={{ disabled: loading }}
      cancelButtonProps={{ disabled: loading }}
    >
      {loading && (
        <div className={styles.loader}>
          <Spin tip="please wait..." />
        </div>
      )}
      <Table
        style={{ maxWidth: 1280, margin: "0 auto" }}
        rowKey={(data) => data.name}
        columns={modelTabelCol}
        dataSource={modelList.map((item) => {
          item.key = item.name;
          return item;
        })}
        bordered
        pagination={{ pageSize: 5 }}
        rowSelection={rowSelection}
      />
    </Modal>
  );
};

export default LinkModel;
