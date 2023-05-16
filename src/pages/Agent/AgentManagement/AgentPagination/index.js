import React, {Component} from 'react';
import API from "../../../API"
import Axios from "axios";
import {Input, Table, Grid, Pagination, Loading, Switch, Feedback, Select, Button, Icon} from '@icedesign/base';
import {Link} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import DeleteNameSpaceDialog from "../DeleteNameSpaceDialog";
import CreateNamespaceDialog from "../CreateSlaveAgentDialog";
import "../../Style.scss"
import {injectIntl,FormattedMessage} from 'react-intl';
import PublicStatus from '../PublicStatus'
import CreateToolsDialog from "../CreateToolsDialog";
import {Modal} from "antd";
const {Row,Col} = Grid;
const Toast = Feedback.toast;
const styles = {
    body: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

class NamespacePagination extends Component {
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            currentData: [],
            toolsData:[],
            toolsLoading:true,
            rowSelection: {
                onChange: this.onChange.bind(this),
                selectedRowKeys: []
            },
            pageSize :10,
            totalCount: 0,
            queryKey: "",
            loading: true,
            select: 'all',
            visible: false,
            selectedFile: '',
            serverAddress: '',
        };
    }

    //选择器监听
    onChange(projectIds, records) {
        let {rowSelection} = this.state;
        rowSelection.selectedRowKeys = projectIds;
        console.log("onChange",rowSelection.selectedRowKeys, records);
        this.setState({rowSelection});
    }

    handleUploadFile = (value) => {
        this.setState({selectedFile: value});
    }
    handleServerAddressChange = (value) => {
        this.setState({serverAddress: value});
    }

    handleTransferFile = () => {
        // Implement the logic to transfer the selected file to the server address
        // console.log(`Transferring file ${this.state.selectedFile.name} to server at ${this.state.serverAddress}`);
        // Close the modal
        this.setState({visible: false});
    }

    refreshTools(){
        let url=API.agent+'/getTools';
        let _this=this;
        Axios.get(url,{})
            .then(function(response) {
                console.log("tools信息");
                console.log(response.data);
                _this.setState({
                    toolsData: response.data,
                    toolsLoading:false,
                });

            })
    }
    //获取最新数据并刷新
    refreshList(current, searchKey,select) {
        // 如果这三个参数没有接收到，那么使用他们的默认值
        if(current===undefined)
            var current = 1;
        if(searchKey===undefined)
            var searchKey = "";
        if(select===undefined)
            var select = "all";
        // let url = API.image + '/v1/projects';
        let url = API.agent+'/getslaveAttributes';
        let _this = this;

        let intervalId = setInterval(function() {
            Axios.get(url,{
                params:{
                    agentId:1
                }
            })
                .then(function(response) {
                    // console.log("agent信息");
                    // console.log(response.data);
                    _this.setState({
                        currentData: response.data,
                        loading:false,
                        current:current
                    });

                })
        }, 1000);

    }

    //初始化
    componentWillMount() {
        this.refreshList(this.state.current,this.state.queryKey,'all');
        this.refreshTools();
    }

    //搜索框内容变化
    onSearch(value) {
        this.setState({
            queryKey:value
        })
        this.refreshList(1,value,this.state.select);
    }

    //分页器监听
    handleChange(current,e){
        this.setState({
            current:current
        });
        this.refreshList(current,this.state.queryKey,this.state.select)
    }

    //选择器
    changeSelection(value){
        this.setState({
            select:value
        });
       this.refreshList(1,this.state.queryKey,value)
    }


    //链接跳转到对应的命名空间
    nameRender = function (value,index,record) {
        return <Link to={"/image/projects/" + record.projectId + "/repos"}
        >{value}</Link>
    };

    //根据不同的状态值更换不同的样式
    statusRender = function (value, index, record)  {
        let className = "";
        let val="";
        switch (value) {
            case 0:
                className = "not-available";
                val="禁用";
                break;
            case 1:
                className = "available";
                val="可用";
                break;
            case 2:
                className = "busy";
                val="繁忙";
                break;
            default:
                className = "";
        }

        return (
            <div className={`status ${className}`}>
                {val}
            </div>
        );
    }

    //命名空间公开状态监听
    renderSwitch = (value,index,record) => {
        return <PublicStatus refreshList={this.refreshList.bind(this)} value={value} record={record}/>
    };

    register(record){
        let url=API.agent+'/registerAgent';
        let _this = this;
        console.log("register!")
        Axios.get(url,{
            params:{
                agentId:record.agent_id
            }
        })
            .then(function(response) {
                _this.refreshList();
            })
    }

    // setOffline(record){
    //     console.log(record);
    //     console.log(record.id)
    // }

    operationRender(value, index, record) {
        let self = this;
        // console.log("查看",value,index,record);
        return (
            <Button.Group size="small">
                {/*<Button type="secondary" onClick={this.register.bind(this, record)} ><Icon type="form"/>注册</Button>*/}
                <Button type="normal" onClick={() => this.setState({visible: true})}><Icon type="upload"/>传输文件</Button>
                {/*<Button type="normal" className="button-start" onClick={this.networkStart.bind(this, record)}><Icon type="play"/>启动</Button>*/}
                {/*<Button type="normal" className="button-warning" onClick={this.networkDelete.bind(this, index, record)}><Icon type="ashbin"/>删除</Button>*/}
            </Button.Group>
        )

    }

    render() {
        return (
            <div>
                <Modal visible={this.state.visible} onClose={() => this.setState({visible: false})} title="传输文件">
                    <div style={{marginBottom: 20}}>
                        <Input placeholder="文件路径" value={this.state.selectedFile} onChange={this.handleUploadFile} />
                    </div>
                    <div style={{marginBottom: 20}}>
                        <Input placeholder="保存路径" value={this.state.serverAddress} onChange={this.handleServerAddressChange} />
                    </div>
                    <Button type="primary" onClick={this.handleTransferFile}>传输</Button>
                    <Button style={{ marginRight: 10 }} onClick={() => this.setState({visible: false})}>取消</Button>
                </Modal>

                <IceContainer title={this.props.intl.messages["agent.toolList"]}>
                    <Row wrap className="headRow">
                        <Col l="12">
                            <CreateToolsDialog refreshProjectList={this.refreshTools.bind(this)}/>
                        </Col>
                    </Row>
                    <Loading visible={this.state.toolsLoading} shape="dot-circle" color="#2077FF">
                        <Table dataSource={this.state.toolsData}
                               isLoading={this.state.toolsLoading}
                               primaryKey='projectId'>
                            <Table.Column title={this.props.intl.messages["agent.toolName"]}
                                          dataIndex="toolname"/>

                            <Table.Column title={this.props.intl.messages["agent.downUrl"]}
                                          dataIndex="toolurl"/>

                        </Table>
                    </Loading>

                    <Pagination language={this.props.intl.locale==='zh-CN'?'zh-cn':'en-us'}
                                style={styles.body}
                                current={this.state.current}
                                onChange={this.handleChange.bind(this)}
                                pageSize={this.state.pageSize}
                                total={this.state.totalCount}
                                hideOnlyOnePage={true}/>
                </IceContainer>
                <IceContainer title={this.props.intl.messages["agent.management"]}>
                    <Row wrap className="headRow">
                        <Col l="12">
                            <CreateNamespaceDialog refreshProjectList={this.refreshList.bind(this)}/>
                        </Col>
                    </Row>
                    <Loading visible={this.state.loading} shape="dot-circle" color="#2077FF">
                        <Table dataSource={this.state.currentData}
                               rowSelection={this.state.rowSelection}
                               isLoading={this.state.isLoading}
                               primaryKey='projectId'>
                            <Table.Column title={this.props.intl.messages["agent.agentId"]}
                                          dataIndex="agent_id"/>

                            <Table.Column cell={this.nameRender}
                                          title={this.props.intl.messages["agent.agentName"]}
                                          dataIndex="agent_name"/>

                            <Table.Column title={this.props.intl.messages["agent.memory"]}
                                          dataIndex="agent_memory"/>

                            <Table.Column title={this.props.intl.messages["agent.agentOs"]}
                                          dataIndex="agent_os" />

                            <Table.Column title={this.props.intl.messages["agent.agentIp"]}
                                          width={130} dataIndex="agent_ip"/>
                            <Table.Column title={this.props.intl.messages["agent.refreshTime"]}
                                          width={180} dataIndex="agent_online_time"/>
                            <Table.Column cell={this.statusRender}
                                          title={this.props.intl.messages["agent.isAvailable"]}
                                          dataIndex="agent_state"/>
                            <Table.Column title={this.props.intl.messages["agent.operations"]}
                                           cell={this.operationRender.bind(this)}/>
                        </Table>
                    </Loading>

                    <Pagination language={this.props.intl.locale==='zh-CN'?'zh-cn':'en-us'}
                                style={styles.body}
                                current={this.state.current}
                                onChange={this.handleChange.bind(this)}
                                pageSize={this.state.pageSize}
                                total={this.state.totalCount}
                                hideOnlyOnePage={true}/>
                </IceContainer>

            </div>
        )
    }
}
export default injectIntl(NamespacePagination);