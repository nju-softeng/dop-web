import React, {Component, useRef, useState} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import API from "../../API";
import Axios from "axios";
import {Link} from "react-router-dom";
import {Table, Loading, Feedback, Input, Dialog} from '@icedesign/base';
import IceContainer from "@icedesign/container";
import TopBar from "../../Projects/components/projectManagement/TopBar";
import {Upload, Button} from "antd";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {string} from "prop-types";

const {toast} = Feedback;

class ConfigInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading: true,
            visible: false,
            file: null,
        }
    }

    componentWillMount() {
        this.getConfigInfo();
        this.setState({
            loading: true
        })
    }

    getConfigInfo() {
        let url = API.cipipeline + '/v1/cipipeline/configInfo/getConfigInfos/'+window.sessionStorage.getItem('user-id');
        // let url = 'http://localhost:8888/cipipeline-server/v1/cipipeline/configInfo/getConfigInfos/1';
        let self = this;
        Axios.get(url).then((response) => {
            let dataSource = [];
            let data = response.data.sort();
            self.setState({
                dataSource: response.data,
                loading: false
            });
        }).catch(() => {
            toast.show({
                type: "error",
                content: self.props.intl.messages["cipipeline.configInfo.requestFailure"],
                duration: 1000
            });
            self.setState({
                loading: false
            });
        })
    }

    //链接跳转到对应的配置信息下的所有流水线信息
    nameRender = function (value, index, record) {
        return <Link to={"/cipipeline/configInfos/" + record.configInfoId + "/cipipelines"}
        >{value}</Link>
    };

    onOpen = () => {
        this.setState({
            visible: true
        });
    };
    onClose = () => {
        this.setState({
            file: null,
            visible: false
        });
    };

    handleOK = () => {
        if (this.state.file) {
            const reader = new FileReader();
            reader.readAsText(this.state.file)
            reader.onload = (e) => {
                let fileContent=e.target.result
                let url = API.cipipeline + '/v1/cipipeline/configInfo/uploadConfigFile';
                let self = this;
                Axios.post(url,{fileContent}).then((response) => {
                    if(response.status===200){
                        this.getConfigInfo();
                        this.setState({
                            loading: true
                        })
                        toast.show({
                            type: "info",
                            content: self.props.intl.messages["cipipeline.configInfo.uploadSuccess"],
                            duration: 1000
                        });
                    }
                    else{
                        toast.show({
                            type: "error",
                            content: self.props.intl.messages["cipipeline.configInfo.uploadFail"],
                            duration: 1000
                        });
                    }
                }).catch(() => {
                    toast.show({
                        type: "error",
                        content: self.props.intl.messages["cipipeline.configInfo.requestFailure"],
                        duration: 1000
                    });
                })
            };
        } else {
            toast.show({
                type: "error",
                content: this.props.intl.messages["cipipeline.configInfo.nullFile"],
                duration: 1000
            });
        }
        this.onClose()
    };

    render() {
        return (
            <div>
                <TopBar
                    extraAfter={
                        <div>
                            <Button onClick={this.onOpen} type="primary" icon={<PlusOutlined/>}>
                                {this.props.intl.messages["cipipeline.configInfo.addConfigInfo"]}
                            </Button>
                            <Dialog
                                visible={this.state.visible}
                                onOk={this.handleOK}
                                onCancel={this.onClose}
                                onClose={this.onClose}
                                footerAlign="center"
                                title={<FormattedMessage
                                    id="cipipeline.configInfo.addConfigInfo"
                                />}
                            >
                                <input
                                    value={this.state.file}
                                    onChange={(e) => (this.state.file = e.target.files[0])}
                                    type="file"
                                    accept=".yaml"
                                />
                            </Dialog>
                        </div>
                    }
                />
                <IceContainer title={this.props.intl.messages["cipipeline.configInfo.allConfigInfo"]}>
                    <Loading visible={this.state.loading} shape="dot-circle" color="#2077FF">
                        <Table dataSource={this.state.dataSource}
                               pagination={{pageSize: 10}}
                               primaryKey='configInfoId'>
                            <Table.Column title={this.props.intl.messages["cipipeline.configInfo.configInfoId"]}
                                          width={120}
                                          dataIndex="configInfoId"/>
                            <Table.Column cell={this.nameRender}
                                          title={this.props.intl.messages["cipipeline.configInfo.configName"]}
                                          width={120}
                                          dataIndex="configName"/>
                            <Table.Column title={this.props.intl.messages["cipipeline.configInfo.codeBaseUrl"]}
                                          width={300}
                                          dataIndex="codeBaseUrl"/>
                            <Table.Column title={this.props.intl.messages["cipipeline.configInfo.codeBaseBranch"]}
                                          width={150}
                                          dataIndex="codeBaseBranch"/>
                            <Table.Column title={this.props.intl.messages["cipipeline.configInfo.createTime"]}
                                          width={200}
                                          dataIndex="createTime"/>
                            <Table.Column title={this.props.intl.messages["cipipeline.configInfo.updateTime"]}
                                          width={200}
                                          dataIndex="updateTime"/>
                        </Table>
                    </Loading>
                </IceContainer>
            </div>
        )
    }
}

export default injectIntl(ConfigInfo)