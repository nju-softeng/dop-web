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

class CreateToolsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //是否已经提交
            toolurl: "",
            toolname:"",
            tooldir:"",
            fixcmd:"",
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
        let url=API.agent+'/addtools';
        let _this=this;
        this.setState({
            isSubmit: true,
            visible: false
            // visible: false
        });
        console.log("submit!")
        Axios.get(url,{
            params:{
                toolurl:this.state.toolurl,
                toolname:this.state.toolname,
                tooldir:this.state.tooldir,
                fixcmd:this.state.fixcmd
            }
        })
            .then(function(response) {
                console.log(response);
                _this.state.refreshProjectList();
            })


    }

    urlOnChange(value) {
        // console.log(value);
        this.setState({
            toolurl: value
        })
    }

    nameOnChange(value){
        this.setState({
            toolname: value
        })
    }

    dirOnChange(value){
        this.setState({
            tooldir: value
        })
    }
    cmdOnChange(value){
        this.setState({
            fixcmd: value
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
                    <FormattedMessage id="agent.createTools"
                                      defaultMessage="新增工具"/>
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
                        <FormItem  label="工具下载链接：" >
                            <Input htmlType="text" onChange={this.urlOnChange.bind(this)}/>
                        </FormItem>
                        <FormItem  label="工具名称：" >
                            <Input htmlType="text" onChange={this.nameOnChange.bind(this)}/>
                        </FormItem>
                        <FormItem  label="工具下载目录：" >
                            <Input htmlType="text" onChange={this.dirOnChange.bind(this)}/>
                        </FormItem>
                        <FormItem  label="工具安装命令：" >
                            <Input htmlType="text" onChange={this.cmdOnChange.bind(this)}/>
                        </FormItem>
                    </Form>

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
export default injectIntl(CreateToolsDialog)