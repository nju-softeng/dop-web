import { Form, Input, Button, message, Spin } from "antd";
import React, { useRef, useState } from "react";
import styles from "./style.module.css";
import { PlayCircleOutlined, PlusOutlined } from "@ant-design/icons";
import LinkModal from "../LinkModal";
import { apiTrainModel, apiGetTrainData } from "../../util/api";

const { Item: FormItem } = Form;

const InputPredictData = (props) => {
  const { onOK } = props;
  const [showModal, setShowModal] = useState(false);
  const [formRef] = Form.useForm();
  const [trainResult, setTarinResult] = useState([]);
  const formValRef = useRef({});
  const [loading, setLoadng] = useState(false);

  const addInfo = () => {
    formRef
      .validateFields()
      .then((formVals) => {
        formValRef.current = {
          ...formValRef.current,
          ...formVals,
        };
        setLoadng(true);
        apiGetTrainData({
          gitBranch: formValRef.current.gitBranch,
          commitId: formValRef.current.commitId,
        })
          .then((data = []) => {
            setTarinResult(data);
            onOK && onOK(data);
          })
          .catch(() => message.error("failed"))
          .finally(() => setLoadng(false));
      })
      .catch(() => {});
  };

  const validateInput = () => {
    formRef
      .validateFields()
      .then((formVals) => {
        formValRef.current = {
          ...formValRef.current,
          ...formVals,
        };
        setShowModal(true);
      })
      .catch(() => {});
  };

  const handleModalOK = (selectedName) => {
    formValRef.current.modelNames = selectedName;
    setShowModal(false);
    setLoadng(true);
    apiTrainModel(formValRef.current)
      .then((data = []) => {
        if (data.length > 0) {
          message.success("Success! Please find defect in the defect tab");
        } else {
          message.success("Success! no defect found");
        }
        onOK && onOK(data);
      })
      .catch(() => message.error("failed"))
      .finally(() => setLoadng(false));
  };

  return (
    <div className={styles.formCard}>
      {loading && (
        <div className={styles.fullscreenLoader}>
          <Spin tip="please wait while processing data..." />
        </div>
      )}
      <h2 className={styles.title}>Input Predict Data</h2>
      <Form form={formRef}>
        <FormItem
          name="gitBranch"
          rules={[{ required: true, message: "Please input git branch" }]}
          label="Git branch"
          labelCol={{ flex: "0 0 100px" }}
        >
          <Input type="text" />
        </FormItem>
        <FormItem
          name="commitId"
          rules={[{ required: false, message: "Please input commit id" }]}
          label="Commit id"
          labelCol={{ flex: "0 0 100px" }}
        >
          <Input type="text" />
        </FormItem>
      </Form>
      <div>
        <Button
          onClick={addInfo}
          icon={<PlusOutlined />}
          size="large"
          style={{ width: 200 }}
        >
          Add
        </Button>
        <Button
          onClick={validateInput}
          icon={<PlayCircleOutlined />}
          size="large"
          type="primary"
          style={{ width: 200 }}
        >
          Run
        </Button>
      </div>

      {trainResult && trainResult.length > 0 && (
        <div className={styles.resultWrapper}>
          {trainResult.map((item, idx) => (
            <code><span className={styles.lineNum}>{idx}</span>{item}</code>
          ))}
        </div>
      )}
      <LinkModal
        visible={showModal}
        onOK={handleModalOK}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default InputPredictData;
