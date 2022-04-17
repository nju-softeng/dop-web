import React, { useEffect, useState } from "react";
import { Drawer, Spin } from "antd";
import { FileFilled } from "@ant-design/icons";

import { apiGetPredictFileContent } from "../../util/api";


const Preview = (props) => {
  const { visible, filename, type, onClose } = props
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoadng] = useState(true);

  const getFileContent = () => {
    setLoadng(true);
    apiGetPredictFileContent({ filename, type })
      .then((file) => setFileContent(file))
      .catch(() => {
        message.error("Failed");
      })
      .finally(() => setLoadng(false));
  };

  useEffect(() => {
    if (visible) {
      setFileContent('')
      getFileContent()
    }
  }, [visible, filename]);

  return (
    <Drawer style={{ minWidth: 320 }} width="50vw" visible={visible} title={filename} onClose={onClose}>
      <Spin spinning={loading}>
        <code style={{ whiteSpace: 'pre-wrap', fontSize: 14 }}>{fileContent}</code>
      </Spin>
    </Drawer>
  );
};

export default Preview;
