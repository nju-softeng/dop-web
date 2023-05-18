import React, {Component} from 'react'
import "../../Style.scss"
import {injectIntl,FormattedMessage} from 'react-intl'
import {
    Button,
    Input,
    Dialog,
    Form
} from "@icedesign/base";
import FormItem from "antd/es/form/FormItem";
import Axios from "axios";
import API from "../../../API";

class CreateNamespaceDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //是否已经提交
            name: "",
            url:"",
            isSubmit: false,
            footerAlign: "center",
            visible: false,
            style: {
                width: "35%"
            },
            createDialogStyle: {
                width: "10%"
            },
            createDialogVisible: false,
            refreshProjectList: props.refreshProjectList
        }
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    onOk = () => {
        // console.log("click ok!");
        // console.log(this.state.name);
        let url=API.agent+'/createAgent';
        let _this=this;
        this.setState({
            isSubmit: true,
            visible: false
            // visible: false
        });
        console.log("submit!")
        console.log(url,this.state.name);
        Axios.get(url,{
            params:{
                name:this.state.name,
                url:this.state.url
            }
        })
            .then(function(response) {
                console.log(response);
                console.log("refresh!");
                _this.state.refreshProjectList();
            })


    }

    nameOnChange(value) {
        // console.log(value);
        this.setState({
            name: value
        })
    }

    urlOnChange(value) {
        // console.log(value);
        this.setState({
            url: value
        })
    }


    onOpen = () => {
        this.setState({
            visible: true
        });
    };
    onCreateDialogClose = () => {
        this.setState({
            createDialogVisible: false
        });
    };



    /**
     *    回调函数传给子组件表单用于创建完成后修改提交状态和关闭弹窗
     *
     * */
    finished() {
        this.setState({
            visible: false,
            createDialogVisible: true,
            isSubmit: false
        })

        this.state.refreshProjectList();
        console.log("finished");
    }

    render() {
        return (
            <span className={"dialog"}>
                <Button onClick={this.onOpen} type="primary">
                    <FormattedMessage id="agent.createAgent"
                            defaultMessage="新增节点"/>
                </Button>

                <Dialog
                    language={this.props.intl.locale==='zh-CN'?'zh-cn':'en-us'}
                    visible={this.state.visible}
                    onOk={this.onOk}
                    onCancel={this.onClose}
                    onClose={this.onClose}
                    title={this.props.intl.messages["agent.createAgent"]}
                    style={this.state.style}
                    footerAlign={this.state.footerAlign}
                >
                    {/*<NamespaceForm*/}
                    {/*    isSubmit={this.state.isSubmit}*/}
                    {/*    finished={this.finished.bind(this)}/>*/}
                    <Form language={this.props.intl.locale==='zh-CN'?'zh-cn':'en-us'}
                          labelAlign={"left"}
                    >
                        <FormItem  label="节点名称：" >
                            <Input htmlType="text" onChange={this.nameOnChange.bind(this)}/>
                        </FormItem>
                        <FormItem  label="节点url和端口（ip+端口）：" >
                            <Input htmlType="text" onChange={this.urlOnChange.bind(this)}/>
                        </FormItem>
                    </Form>

                        {/*                    <FormItem label="链码名称: " {...formItemLayout}>*/}
                        {/*    <Input htmlType="text" onChange={this.nameOnChange.bind(this)}/>*/}
                        {/*</FormItem>*/}
                </Dialog>

                <Dialog
                    language={this.props.intl.locale==='zh-CN'?'zh-cn':'en-us'}
                    visible={this.state.createDialogVisible}
                    onOk={this.onCreateDialogClose}
                    onCancel={this.onCreateDialogClose}
                    onClose={this.onCreateDialogClose}
                    title={this.props.intl.messages["image.createSuccess"]}
                    style={this.state.createDialogStyle}
                    footerAlign={this.state.footerAlign}>
                    <FormattedMessage id="image.namespace.successMessage"
                                defaultMessage="命名空间创建成功！"/>
                </Dialog>
            </span>
        );
    }


}
export default injectIntl(CreateNamespaceDialog)