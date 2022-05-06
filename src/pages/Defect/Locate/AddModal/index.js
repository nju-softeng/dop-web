import { DatePicker, Form, Modal, Input, Select } from "antd";
import React, { useRef } from "react";
import { useDidUpdate } from "../../util/hook";

const { Item: FormItem } = Form;

const AddPredictModal = (props) => {
  const { visible, onOK, onCancel } = props;
  const [formRef] = Form.useForm();
  const fileRef = useRef(null);

  const handleOK = () => {
    formRef
      .validateFields()
      .then((formVals) => {
        if (fileRef.current) {
          const reader = new FileReader();
          reader.onload = (e) => {
            formVals.file = e.currentTarget.result;
            onOK && onOK(formVals);
          };
          reader.readAsText(fileRef.current);
        } else {
          onOK && onOK(formVals);
        }
      })
      .catch(() => {});
  };

  useDidUpdate(() => {
    if (!visible) {
      formRef.resetFields();
    }
  }, [visible]);

  return (
    <Modal
      title="Input information"
      visible={visible}
      cancelText="Cancel"
      okText="OK"
      onOk={handleOK}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={formRef}>
        <FormItem
          name="file"
          rules={[{ required: true, message: "Please select" }]}
          label="Select file"
          labelCol={{ span: 6 }}
        >
          <input
            value=""
            onChange={(e) => (fileRef.current = e.target.files[0])}
            type="file"
            accept="text/*,application/json"
          />
        </FormItem>
        <FormItem
          name="method"
          rules={[{ required: true, message: "Please select" }]}
          label="Method"
          labelCol={{ span: 6 }}
        >
          <Select
            options={[
              {
                label: "Ochiai",
                value: "Ochiai",
              },
              {
                label: "Tarantula",
                value: "Tarantula",
              },
              {
                label: "Op2",
                value: "Op2",
              },
              {
                label: "SBI",
                value: "SBI",
              },

              {
                label: "Jaccard",
                value: "Jaccard",
              },
            ]}
          />
        </FormItem>

      </Form>
    </Modal>
  );
};

export default AddPredictModal;
