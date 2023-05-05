import React, {Component} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import Axios from "axios";
import {Link} from "react-router-dom";
import IceContainer from "@icedesign/container";
import {Breadcrumb, Button, Dialog, Feedback, Loading, Table} from "@icedesign/base";
import Text from "antd/es/typography/Text";

const {toast} = Feedback;

class CIPipeline extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            id: props.location.pathname.match("[0-9]+")[0],
            loading: true,
            visible: false,

            prMergeResult: "",
            prMergeLog: "",
            staticCodeCheckResult: "",
            staticCodeCheckLog: "",
            testResult: "",
            testLog: ""
        }
    }

    componentWillMount() {
        this.reload()
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.reload(),
            10000
        );
    }

    reload(){
        this.getPipelineInfo();
        this.setState({
            loading: true
        })
    }

    getPipelineInfo() {
        let url = API.cipipeline + '/v1/cipipeline/coreScheduler/getCIPipelines/'+this.state.id;
        // let url = 'http://localhost:8888/cipipeline-server/v1/cipipeline/coreScheduler/getCIPipelines/'+this.state.id;
        let self = this;
        Axios.get(url).then((response) => {
            let dataSource = [];
            let data = response.data;
            self.setState({
                dataSource: response.data,
                loading: false
            });
        }).catch(() => {
            toast.show({
                type: "error",
                content: self.props.intl.messages["cipipeline.cipipeline.requestFailure"],
                duration: 1000
            });
            self.setState({
                loading: false
            });
        })
    }

    openResultLog = (ciPipelineId,e)=>{
        let url = API.cipipeline + '/v1/cipipeline/coreScheduler/getTestResult/'+ciPipelineId;
        // let url = API.cipipeline + '/v1/cipipeline/coreScheduler/getTestResult/'+ciPipelineId;
        let self = this;
        Axios.get(url).then((response) => {
            self.setState({
                prMergeResult: response.data.prMergeResult,
                prMergeLog: response.data.prMergeLog,
                staticCodeCheckResult: response.data.staticCodeCheckResult,
                staticCodeCheckLog: response.data.staticCodeCheckLog,
                testResult: response.data.testResult,
                testLog: response.data.testLog,
                visible: true
            });
        }).catch(() => {
            console.log("error")
        })
    };

    onClose = () => {
        this.setState({
            prMergeResult: "",
            prMergeLog: "",
            staticCodeCheckResult: "",
            staticCodeCheckLog: "",
            testResult: "",
            testLog: "",
            visible: false
        });
    };

    resultRender=(value, index, record)=>{
        if(record.runningState==="Done"){
            return (<Button onClick={(e)=>this.openResultLog(record.ciPipelineId,e)} type="primary" size="small">
                <FormattedMessage
                    id="cipipeline.cipipeline.seeResult"
                    defaultMessage="查看"
                />
            </Button>)
        }
        else{
            return <div/>
        }
    };

    render() {
        return (
            <div>
                <Breadcrumb style={{marginBottom: "10px"}}>
                    <Breadcrumb.Item style={{color: "#5485F7"}} link="#/cipipeline/configInfos">
                        <FormattedMessage id="cipipeline.cipipeline.allAonfigInfo" defaultMessage="< 流水线配置信息"/>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <IceContainer title={this.props.intl.messages["cipipeline.cipipeline.allCiPipeline"]}>
                    <Loading visible={this.state.loading} shape="dot-circle" color="#2077FF">
                        <Table dataSource={this.state.dataSource}
                               pagination={{pageSize: 10}}
                               primaryKey='configInfoId'>
                            <Table.Column title={this.props.intl.messages["cipipeline.cipipeline.ciPipelineId"]}
                                          width={120}
                                          dataIndex="ciPipelineId"/>
                            <Table.Column title={this.props.intl.messages["cipipeline.cipipeline.prNumber"]}
                                          width={120}
                                          dataIndex="prNumber"/>
                            <Table.Column title={this.props.intl.messages["cipipeline.cipipeline.sourceCodeBaseUrl"]}
                                          width={300}
                                          dataIndex="sourceCodeBaseUrl"/>
                            <Table.Column title={this.props.intl.messages["cipipeline.cipipeline.sourceCodeBaseBranch"]}
                                          width={150}
                                          dataIndex="sourceCodeBaseBranch"/>
                            <Table.Column title={this.props.intl.messages["cipipeline.cipipeline.runningState"]}
                                          width={200}
                                          dataIndex="runningState"/>
                            <Table.Column cell={this.resultRender}
                                          title={this.props.intl.messages["cipipeline.cipipeline.runResult"]}
                                          width={200}/>
                        </Table>
                    </Loading>
                </IceContainer>

                <Dialog
                    visible={this.state.visible}
                    onClose={this.onClose}
                    footerAlign="center"
                    footer={[<Button onClick={this.onClose}>OK</Button>]}
                    title={<FormattedMessage
                        id="cipipeline.cipipeline.runningResult"
                    />}
                >
                    <Text style={{color: 'green'}}>prMergeResult: {this.state.prMergeResult}</Text><br/>
                    <Text>prMergeLog: {this.state.prMergeLog}</Text><br/><br/>
                    <Text style={{color: 'green'}}>staticCodeCheckResult: {this.state.staticCodeCheckResult}</Text><br/>
                    <Text>staticCodeCheckLog:<br/> {this.state.staticCodeCheckLog}</Text><br/><br/>
                    <Text style={{color: 'green'}}>testResult: {this.state.testResult}</Text><br/>
                    <Text>testLog:<br/> {this.state.testLog}</Text><br/>
                </Dialog>
            </div>
        )
    }
}

export default injectIntl(CIPipeline)