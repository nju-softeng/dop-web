import { DatePicker, Form, Modal, Input } from "antd";
import { useDidUpdate } from "../../util/hook";

const { Item: FormItem } = Form;
const formatTime = (time) => time.format("YYYY-MM-DD HH:mm:ss");

const AddPredictModal = (props) => {
  const { visible, onOK, onCancel } = props;
  const [formRef] = Form.useForm();

  const handleOK = () => {
    formRef
      .validateFields()
      .then((formVals) => {
        formVals.startTime &&
          (formVals.startTime = formatTime(formVals.startTime));
        formVals.endTime && (formVals.endTime = formatTime(formVals.endTime));
        onOK && onOK(formVals);
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
      title="Create Predict Model"
      visible={visible}
      cancelText="Cancel"
      okText="Create"
      onOk={handleOK}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={formRef}>
        <FormItem
          name="modelName"
          rules={[{ required: true, message: "Please input model name" }]}
          label="Model name"
          labelCol={{ span: 6 }}
        >
          <Input type="text" />
        </FormItem>
        <FormItem
          name="gitBranch"
          rules={[{ required: true, message: "Please input git branch" }]}
          label="Git branch"
          labelCol={{ span: 6 }}
        >
          <Input type="text" />
        </FormItem>
        <FormItem
          name="startTime"
          rules={[{ required: true, message: "Pleade select start date" }]}
          label="Start time"
          labelCol={{ span: 6 }}
        >
          <DatePicker showTime />
        </FormItem>
        <FormItem
          name="endTime"
          rules={[{ required: true, message: "Pleade select end time" }]}
          label="End time"
          labelCol={{ span: 6 }}
        >
          <DatePicker showTime />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddPredictModal;
