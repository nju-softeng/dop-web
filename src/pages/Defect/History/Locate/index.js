import React, { useEffect, useState } from "react";
import { Button, message, Spin, Table, Modal } from "antd";
import { FileFilled } from "@ant-design/icons";

import {
    apiGetLocateList,
    apiDeleteLocate
} from "../../util/api";
import FilePreview from "../FilePreview";

const History = () => {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoadng] = useState(true);
  const [fileName, setFileName] = useState("");
  const [showFilePreview, setShowFilePreview] = useState(false);

  const getPredictlList = () => {
    setLoadng(true);
    apiGetLocateList()
      .then((list) => setHistoryList(list))
      .catch(() => {
        message.error("Failed");
      })
      .finally(() => setLoadng(false));
  };

  useEffect(() => getPredictlList(), []);

  const deleteData = (name) => {
    Modal.confirm({
      content: "Are you sure you want to delete?",
      onOk(close) {
        setLoadng(true);
        apiDeleteLocate({ name })
          .then(() => {
            message.success("Done");
            getPredictlList();
          })
          .catch(() => {
            message.success("Failed");
          })
          .finally(() => setLoadng(false));
        close();
      },
    });
  };

  const showFile = (fileName) => {
    setShowFilePreview(true);
    setFileName(fileName);
  };

  const tabelCol = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render(name, data) {
        return (
          <Button type="link" onClick={() => showFile(data.name)}>
            <FileFilled /> {name}
          </Button>
        );
      },
    },
    {
          title: "Creat Date",
          dataIndex: "creatDate",
          key: "creatDate",
        },
    {
      title: "Action",
      key: "Action",
      render(_, data) {
        return (
          <Button danger onClick={() => deleteData(data.name)}>
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <FilePreview
        filename={fileName}
        type="locate"
        visible={showFilePreview}
        onClose={() => setShowFilePreview(false)}
      />
      <Spin spinning={loading}>
        <Table
          style={{ maxWidth: 1280, margin: "0 auto" }}
          rowKey={(data) => data.id}
          columns={tabelCol}
          dataSource={historyList}
          bordered
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </div>
  );
};

export default History;
