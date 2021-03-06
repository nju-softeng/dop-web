import React, {Component} from 'react'
import {injectIntl} from "react-intl";
import {Link} from 'react-router-dom';
import Axios from 'axios';

import Select from "@icedesign/base/lib/select";
import Button from "@icedesign/base/lib/button";
import Dialog from "@icedesign/base/lib/dialog";
import Table from "@icedesign/base/lib/table";
import Feedback from "@icedesign/base/lib/feedback"
import Input from "@icedesign/base/lib/input";
import Icon from "@icedesign/base/lib/icon";
import IceContainer from '@icedesign/container';
import IceEllipsis from '@icedesign/ellipsis';
import Pagination from "@icedesign/base/lib/pagination";
import Form from "@icedesign/base/lib/form";
import Grid from "@icedesign/base/lib/grid";
import Field from "@icedesign/base/lib/field";
import Card from "@icedesign/base/lib/card";
import DatePicker from "@icedesign/base/lib/date-picker";
import Tag from "@icedesign/base/lib/tag";

import API from "../../API";
import "../linkStyles.css";
// import {Table,Search,Dialog,Select,Button} from "@icedesign/base";

import {getCurrentTimestamp, toTimestamp, getCurrentTime, toMicroseconds, timestampToDate, formatDuration} from "../util/TimeUtil";
import SearchConditionDescription from "../components/SearchConditionDescription/SearchConditionDescription";

const lookBackBase = 3600000;
class LinkList extends Component{

    constructor(props) {
        super(props);
        this.field = new Field(this);
        this.state = {
            buttonPrompt: this.props.intl.messages['link.choose.project'],

            projectList: [],
            currentPageProList: [],
            isLoading: false,

            clickedProjectID: "",
            clickedProjectName: "",
            chosenProjectID: "",
            chosenProjectName: "",

            chooseProRowSelection: {
                mode: 'single',
                selectedRowKeys: [],
                onChange: this.onChangeChooseProject.bind(this)
            },
            chooseProDialogVisible: false,
            helpDialogVisible: false,
            displayChooseButton: 'block',
            displayChangeButton: 'none',

            pageNoForPro: 1,
            pageSizeForPro: 8,
            totalCountForPro: 0,

            historySearchTraceId: [],
            searchedTraceId: '',

            serviceList: [],
            spanNameList: ["all"],

            timeRangeDisplay: 'none',

            linkList: [],
            pageNo: 1,
            pageSize: 8,
            totalCount: 0
        }
    }

    componentWillMount() {
        // alert("componentWillMount");
        this.state.isLoading = true;
        let projectId = window.sessionStorage.getItem("link_chosenProjectID");
        let projectName = window.sessionStorage.getItem("link_chosenProjectName");

        if (projectId !== '' && projectId !== null && projectName !== '' && projectName !== null) {
            // ??????????????????????????????????????????????????????
            this.setState({
                chosenProjectID: projectId,
                chosenProjectName: projectName,
                displayChooseButton: 'none',
                displayChangeButton: 'block',
                buttonPrompt: this.props.intl.messages['link.change.project']
            });
            this.getServiceList();
        }
        this.state.isLoading = false;
    }
    componentDidMount() {
        let searchConditions = window.sessionStorage.getItem("linkSearchCondition");
        const {setValues} = this.field;
        let searchObj = JSON.parse(searchConditions);
        if (searchObj !== undefined && searchObj !== null) {
            searchObj['start-date'] = new Date(searchObj['start-date']);
            searchObj['end-date'] = new Date(searchObj['end-date']);
            setValues(searchObj);
            if (searchObj['lookback-type'] === -1) { // ?????????????????????
                this.setState({
                    timeRangeDisplay: 'flex'
                });
            }
            this.setState({isLoading: true});
            this.getTraceList(searchObj);
        }
    }

    // ?????????????????????trace
    submitSearch = (e) => {
        // e.preventDefault();
        const Toast = Feedback.toast;
        this.field.validate((errors, values) => {
            // console.log(values);
            if (errors) {
                Toast.error(this.props.intl.messages['link.error.prompt.contentError']);
                return;
            }
            this.setState({
                isLoading: true
            });
            window.sessionStorage.setItem("linkSearchCondition", JSON.stringify(values));
            this.getTraceList(values);
        });
    };
    getTraceList = (values) => {
        console.log("values: "+ JSON.stringify(values));
        let getLinkListUrl = API.link + "/v2/link/trace";
        // ??????lookback???endTs
        var lookBack, endTs;
        if (values['lookback-type'] !== -1) { //??????????????????????????????
            // console.log("????????????????????? " + values['lookback-type']);
            lookBack = values['lookback-type'] * lookBackBase;
            // console.log("lookback: " + lookBack);
            endTs = getCurrentTimestamp();
        } else { // ????????????????????????
            let startTs = toTimestamp(values['start-date'], values['start-time']);
            endTs = toTimestamp(values['end-date'], values['end-time']);
            lookBack = endTs - startTs;
        }
        let params = {
            serviceName: values["service-name"],
            spanName: values["span-name"],
            annotation: values["annotation"],
            minDuration: toMicroseconds(values["min-duration"]),
            maxDuration: toMicroseconds(values["max-duration"]),
            endTs: endTs,
            lookback: lookBack,
            limit: values["limit"]
        };
        console.log("param: " + JSON.stringify(params));
        Axios.get(getLinkListUrl, {params: params}).then(response => {
            let linkListTmp = response.data;
            this.setState({
                linkList: linkListTmp,
                totalCount: linkListTmp.length
            });
        }).catch((error)=>{
            console.error("??????trace???????????????", error);
        }).finally(() => {
            this.setState({
                isLoading: false
            });
        });
    };

    // ??????project????????????
    onOpenChooseProDialog = () => {
        this.setState({
            chooseProDialogVisible: true,
            isLoading: true
        });
        this.getProjectList(this.state.pageNoForPro);
    };
    // project??????????????????
    onChangeProjectPage = (currentPage) => {
        this.setState({isLoading:true});
        // this.getProjectList(currentPage);
        let size = this.state.pageSizeForPro;
        let begin = size * (currentPage - 1);
        let currentList = this.state.projectList.slice(begin, begin + size);
        this.setState({
            pageNoForPro: currentPage,
            currentPageProList: currentList,
            isLoading: false
        });
    };
    // ????????????project??????
    getProjectList = (currentPageNo) => {
        // ????????????????????????
        let getProjectListUrl = API.link + "/projects";
        let param = {
            userId: window.sessionStorage.getItem('user-id'),
            pageNo: currentPageNo,
            pageSize: this.state.pageSizeForPro
        };
        // let param = {};
        Axios.get(getProjectListUrl, {params: param}).then(response=>
        {
            let projectListTmp = {};
            projectListTmp = response.data;
            this.setState({
                pageNoForPro: 1,
                projectList: projectListTmp,
                currentPageProList: projectListTmp.slice(0,8),
                totalCountForPro: projectListTmp.length,
            });

            // this.setState({
            //     currentPageProList: response.data.pageList,
            //     isLoading: false,
            //     totalCountForPro: response.data.totalCount,
            // });
        }).catch((error) => {
            console.log("????????????????????????", error)
        }).finally(() => {
            this.setState({isLoading: false})
        });
    };
    // ????????????project,?????????????????????????????????????????????
    onConfirmChooseProject = () => {
        const Toast = Feedback.toast;
        let clickedId = this.state.clickedProjectID;
        let clickedName = this.state.clickedProjectName;
        let clicked = (clickedId !== "" && clickedName !== "");
        if (!clicked) {
            Toast.prompt(this.props.intl.messages['link.warn.noChosenProject']);
            return;
        }
        window.sessionStorage.setItem("link_chosenProjectID", clickedId);
        window.sessionStorage.setItem("link_chosenProjectName", clickedName);
        window.sessionStorage.removeItem("linkSearchCondition");

        this.setState({
            chosenProjectID: clickedId,
            chosenProjectName: clickedName,
            chooseProDialogVisible: false,
            displayChooseButton: 'none',
            displayChangeButton: 'block',
            buttonPrompt: this.props.intl.messages['link.change.project']
        });
        this.getServiceList();
    };
    // ??????project??????
    onChangeChooseProject = (ids, records) => {
        this.state.chooseProRowSelection.selectedRowKeys = ids;
        this.setState({
            clickedProjectID: ids[0],
            clickedProjectName:  records[0].title
        });
    };

    // ???????????????project????????????projectId??????application
    getServiceList = () => {
        let getLinkListUrl = API.link + '/api/v2/services';
        Axios.get(getLinkListUrl).then(response => {
            let serviceListTmp = response.data;
            serviceListTmp.unshift("all");
            this.setState({serviceList: serviceListTmp});
        });
    };
    // ??????????????????trace??????service???????????????service name??????span name
    changeServiceNameAndSearchSpanName = (value) => {
        let getSpanNameListUrl = API.link + "/api/v2/spans";
        let params = {
            serviceName: value
        };
        Axios.get(getSpanNameListUrl, {params: params}).then(response => {
            let spanNameListTmp = response.data;
            spanNameListTmp.unshift("all");
            this.setState({
                spanNameList: spanNameListTmp
            });
        });
    };

    // ????????????trace list
    onChangeLinkPage = (currentPage) => {
        // ?????????????????????
        this.setState({isLoading:true});
        let size = this.state.pageSize;
        this.setState({
            pageNo: currentPage,
            isLoading: false
        });
    };
    // ????????????????????????????????????
    chooseLookBackType = (value) =>{
        const {setValues, setErrors} = this.field;
        if (value === -1) {
            this.setState({
                timeRangeDisplay: 'flex'
            });
            setValues({
                'start-date': new Date(),
                'start-time': getCurrentTime(),
                'end-date': new Date(),
                'end-time': getCurrentTime(),
            });
        } else {
            this.setState({
                timeRangeDisplay: 'none'
            });
            setErrors({
                'start-time': "",
                'end-time': "",
            });
        }
    };
    // trace list??????
    onSortLinkListTable = (dataIndex, order) => {
        let dataSource = this.state.linkList.sort(function(a, b) {
            if (dataIndex === 'spanName' || dataIndex === 'traceId') { //????????????????????????
                let result = a[dataIndex] > b[dataIndex];
                return order === "asc"? (result ? 1 : -1) : (result ? -1 : 1);
            } else {
                let result = a[dataIndex] - b[dataIndex];
                return order === "asc" ? (result > 0 ? 1 : -1) : result > 0 ? -1 : 1;
            }
        });
        this.setState({
            dataSource
        });
    };
    render() {
        const {Row, Col} = Grid;
        const {init} = this.field;

        const lookBackOptions = [
            {value: 1, label: this.props.intl.messages['link.time.one.hour']},
            {value: 3, label: this.props.intl.messages['link.time.three.hours']},
            {value: 6, label: this.props.intl.messages['link.time.six.hours']},
            {value: 12, label: this.props.intl.messages['link.time.twelve.hours']},
            {value: 24, label: this.props.intl.messages['link.time.one.day']},
            {value: 48, label: this.props.intl.messages['link.time.two.days']},
            {value: 84, label: this.props.intl.messages['link.time.seven.days']},
            {value: -1, label: this.props.intl.messages['link.time.customize']},
        ];
        const datePickerLocale = {
            now: this.props.intl.messages['link.datepicker.now'],
            ok: this.props.intl.messages['link.confirm']
        };
        const chooseProDialogFooter = (<div>
                <Button type="primary" size="medium" onClick={this.onConfirmChooseProject.bind(this)}>
                    {this.props.intl.messages['link.confirm']}
                </Button>
                <Button type="normal" size="medium" onClick={()=>{this.setState({chooseProDialogVisible: false});}}>
                    {this.props.intl.messages['link.cancel']}
                </Button>
            </div>);
        const cardTitle = <i>{this.props.intl.messages['link.project.name']}:&nbsp;&nbsp;{this.state.chosenProjectName}</i>;
        // ????????????????????????????????????
        const checkTime = (rule, value, callback) => {
            let pattern = /^(20|21|22|23|[0-1]\d):[0-5]\d$/;
            let reg = new RegExp(pattern);
            if (!reg.test(value)) {
                callback(new Error(this.props.intl.messages['link.error.prompt.format']));
            } else {
                callback();
            }
        };
        const checkDuration = (rule, value, callback) => {
            let pattern = /^$|^\d+(\.\d+)?(ms|s)$|^\d+(??s)?$/;
            let reg = new RegExp(pattern);
            if (!reg.test(value)) {
                callback(new Error(this.props.intl.messages['link.error.prompt.format']));
            } else {
                callback();
            }
        };
        const checkLimit =  (rules, value, callback) => {
            value = value.replace(/\b(0+)/gi,"");
            let pattern = /^[1-9]\d*$/; //?????????
            if (!new RegExp(pattern).test(value)) {
                callback(new Error(this.props.intl.messages['link.error.positive.integer']));
            } else {
                return callback();
            }
        };
        // ????????????
        const renderTraceId = (value, index, record) => {
            return <Link to={"/link/detail/" + value}>{value}</Link>;
        };
        const renderSpanName = (value, index, record) => {
            return <IceEllipsis lineLimit={1} text={value} showTooltip={true} />;
        };
        const renderHasError = (hasError) => {
            if (hasError) {
                return <Tag shape='readonly' style={{color:'#a94442',margin:'0',width:'86px',backgroundColor: '#f2dede'}}>{this.props.intl.messages['link.fail']}</Tag>
            } else {
                return <Tag shape='readonly' style={{margin:'0',width:'86px'}}>{this.props.intl.messages['link.success']}</Tag>
            }
        };
        const setRowProps = (record, index) => {
            if (record['hasError']) {
                return {
                    className: 'error-link',
                    style: {background: '#f2dede', color: '#a94442'}
                };
            }
        };
        return (
        <div>
            {/*?????????????????? + ??????traceId??????*/}
            <div style={{marginBottom: '15px', marginTop: '-5px'}}>
                <Row>
                    <Col span='4'>
                        <Button className="change-button" type="primary" size="medium" onClick={this.onOpenChooseProDialog.bind(this)}>
                            {this.state.buttonPrompt}
                        </Button>
                    </Col>
                </Row>
            </div>
            {/*?????????????????????*/}
            <Dialog
                visible={this.state.chooseProDialogVisible}
                footer={chooseProDialogFooter}
                footerAlign='right' shouldUpdatePosition
                minMargin={50}
                onClose={()=>{this.setState({chooseProDialogVisible: false});}}
                title={this.props.intl.messages['link.choose.project']}
                hasMask={false}
                style={{width: "50%"}}>
                <Table dataSource={this.state.currentPageProList} isLoading={this.state.isLoading} rowSelection={this.state.chooseProRowSelection}>
                    <Table.Column title={this.props.intl.messages['link.project.id']} dataIndex="id" width="25%" align='center'/>
                    <Table.Column title={this.props.intl.messages['link.project.name']} dataIndex="title" align='center'/>
                </Table>
                <Pagination total={this.state.totalCountForPro}
                            current={this.state.pageNoForPro}
                            onChange={this.onChangeProjectPage.bind(this)}
                            pageSize={this.state.pageSizeForPro}
                            style={{paddingTop: '10px',textAlign: 'center'}}
                />
            </Dialog>
            {/*??????????????????????????????????????????*/}
            <IceContainer style={{display: this.state.displayChooseButton, margin: '0 auto'}}>
                <div className="empty-prompt">
                    <div className='prompt-icon-div'>
                        <Icon type="add" size='xxxl' style={{opacity:'0.5',cursor:'pointer'}} onClick={this.onOpenChooseProDialog.bind(this)}/>
                    </div>
                    <div className='prompt-h-div'>
                        <p className="prompt-p">{this.props.intl.messages['link.please.choose.project']}</p>
                    </div>
                </div>
            </IceContainer>
            {/*??????????????????????????????????????????????????????*/}
            <div style={{display: this.state.displayChangeButton}}>
                <Card className='search-condition' bodyHeight='auto'
                      title={cardTitle} style={{padding: '15px'}}>
                    <Form labelAlign="top" field={this.field}>
                        {/*????????????span?????????????????????*/}
                        <Row>
                            <Col span='6'>
                                <Form.Item label={this.props.intl.messages['link.search.by.serviceName']}>
                                    {/*??????????????????????????????will/mounted???????????????*/}
                                    <Select className='search-select'
                                            dataSource={this.state.serviceList}
                                            showSearch
                                            defaultValue='all'
                                            {...init("service-name",{
                                                props: {
                                                    onChange: (v) => {
                                                        this.changeServiceNameAndSearchSpanName(v);
                                                    }
                                                }
                                            })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span='6'>
                                <Form.Item label={this.props.intl.messages['link.search.by.spanName']}>
                                    {/*span?????????serviceName?????????????????????????????????changeServiceName??????*/}
                                    <Select className='search-select'
                                            dataSource={this.state.spanNameList}
                                            showSearch
                                            defaultValue='all'
                                            {...init("span-name",{})}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span='12'>
                                <Form.Item label={this.props.intl.messages['link.search.by.time']}>
                                    <Select className='search-select'
                                            autoWidth={true}
                                            dataSource={lookBackOptions}
                                            defaultValue={lookBackOptions[0].value.toString()}
                                            // defaultValue={lookBackOptions[0]}
                                            {...init("lookback-type",{
                                                props: {
                                                    onChange : (v) => {
                                                        this.chooseLookBackType(v);
                                                    }
                                                }
                                            })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*startTime-endTime*/}
                        <Row style={{display: this.state.timeRangeDisplay}}>
                            <Col span='12'/>
                            <Col span='4'>
                                <Form.Item label={this.props.intl.messages['link.search.by.startTime']}>
                                    <DatePicker  id="date-picker1" className='date-picker-style'
                                                readOnly
                                                hasClear={false}
                                                popupAlign={"bl tl"}
                                                formater={["YYYY-MM-DD"]}
                                                defaultValue={"2020-04-01"}
                                                locale={datePickerLocale}
                                                {...init("start-date",{})}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span='2'>
                                <Form.Item label=''>
                                    <Input defaultValue='00:00'
                                           trim={true}
                                           {...init("start-time", {
                                               rules: [
                                                   { validator: checkTime.bind(this)}
                                               ]
                                           })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span='4'>
                                <Form.Item label={this.props.intl.messages['link.search.by.endTime']}>
                                    <DatePicker className='date-picker-style'
                                                readOnly
                                                hasClear={false}
                                                popupAlign={"bl tl"}
                                                formater={["YYYY-MM-DD"]}
                                                defaultValue='2020-04-01'
                                                locale={datePickerLocale}
                                                {...init("end-date",{})}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span='2'>
                                <Form.Item label=''>
                                    <Input defaultValue="00:00"
                                           trim={true}
                                           {...init("end-time", {
                                               rules: [
                                                   { validator: checkTime.bind(this)}
                                               ]
                                           })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*annotation,duration,limit,sort*/}
                        <Row>
                            <Col span='12'>
                                <Form.Item label={this.props.intl.messages['link.search.by.annotation']}>
                                    <Input placeholder='For example: http.path=/foo/bar/ and cluster=foo and cache.miss'
                                           defaultValue=''
                                           {...init("annotation", {})}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span='4'>
                                <Form.Item label={this.props.intl.messages['link.search.by.minDuration']}>
                                    <Input placeholder='Ex: 100ms or 5s'
                                           defaultValue=''
                                           {...init("min-duration", {
                                               rules:[
                                                   {validator: checkDuration.bind(this)}
                                               ]
                                           })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span='4'>
                                <Form.Item label={this.props.intl.messages['link.search.by.maxDuration']}>
                                    <Input placeholder='Ex: 100ms or 5s'
                                           defaultValue=''
                                           {...init("max-duration", {
                                               rules:[
                                                   {validator: checkDuration.bind(this)}
                                                   ]
                                           })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span='4'>
                                <Form.Item label={this.props.intl.messages['link.search.by.resultlimit']}>
                                    <Input defaultValue='10'
                                           {...init("limit", {
                                               rules:[{
                                                   validator: checkLimit.bind(this)
                                               }]
                                           })}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*??????????????????*/}
                        <Row>
                            <Button type="primary" size='medium' onClick={this.submitSearch.bind(this)}>
                                {this.props.intl.messages['link.search.submit.search']}
                            </Button>
                            <Icon type='help' size='small'
                                  style={{margin: '4px', color: '#0062cc', cursor:'pointer'}}
                                  onClick={()=>{this.setState({helpDialogVisible: true});}}/>
                        </Row>
                    </Form>
                </Card>
                <SearchConditionDescription helpDialogVisible={this.state.helpDialogVisible}/>
                <Table dataSource={this.state.linkList} isLoading={this.state.isLoading}
                       onSort={this.onSortLinkListTable.bind(this)}
                       locale={{"empty": this.props.intl.messages['link.no.data']}}
                       // getRowProps={setRowProps}
                >
                    <Table.Column title={this.props.intl.messages['link.list.table.traceId']} dataIndex='traceId' cell={renderTraceId} sortable={true} align='center' width='20%'/>
                    <Table.Column title={this.props.intl.messages['link.list.table.timestamp']} dataIndex='timestamp' cell={timestampToDate} sortable={true} align='center'/>
                    <Table.Column title={this.props.intl.messages['link.list.table.spanName']} dataIndex='spanName' cell={renderSpanName} sortable={true} align='center' width='18%'/>
                    <Table.Column title={this.props.intl.messages['link.list.table.spanNum']} dataIndex='spanNum' sortable={true} align='center' width='12%'/>
                    <Table.Column title={this.props.intl.messages['link.list.table.duration']} dataIndex='duration' cell={formatDuration} sortable={true} align='center'/>
                    <Table.Column title={this.props.intl.messages['link.list.table.successOrFail']} dataIndex='hasError' cell={renderHasError} sortable={true} align='center'/>
                    {/*<Table.Column title={this.props.intl.messages['link.list.table.detail']} dataIndex='detail' align='center'/>*/}
                </Table>
                <Pagination total={this.state.totalCount}
                            current={this.state.pageNo}
                            onChange={this.onChangeLinkPage.bind(this)}
                            pageSize={this.state.pageSize}
                            style={{paddingTop: '10px',textAlign: 'center'}}
                />
            </div>
        </div>);
    }
}

export default injectIntl(LinkList);