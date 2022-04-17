import React, { useEffect, useState } from "react";
import { Button, message, Spin, Table, Modal } from "antd";
import { FileFilled } from "@ant-design/icons";
import FilePreview from "../FilePreview";

import {
  apiGetPredictFileList,
  apiDeletePredict,
} from "../../util/api";

const History = () => {
  const [predictList, setPredictList] = useState([]);
  const [loading, setLoadng] = useState(true);
  const [fileName, setFileName] = useState("");
  const [showFilePreview, setShowFilePreview] = useState(false);

  const getPredictlList = () => {
    setLoadng(true);
    apiGetPredictFileList()
      .then((list) => setPredictList(list))
      .catch(() => {
        message.error("Failed");
      })
      .finally(() => setLoadng(false));
  };

  const deleteData = (name) => {
    Modal.confirm({
      content: "Are you sure you want to delete?",
      onOk(close) {
        setLoadng(true);
        apiDeletePredict({ name })
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

  useEffect(() => getPredictlList(), []);

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
        type="prefict"
        visible={showFilePreview}
        onClose={() => setShowFilePreview(false)}
      />
      <Spin spinning={loading}>
        <Table
          style={{ maxWidth: 1280, margin: "0 auto" }}
          rowKey={(data) => data.id}
          columns={tabelCol}
          dataSource={predictList}
          bordered
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </div>
  );
};

export default History;
