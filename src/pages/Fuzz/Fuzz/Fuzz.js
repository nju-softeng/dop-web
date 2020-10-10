import React,
{
    Component
}
from 'react';
import {
    injectIntl
}
from "react-intl";
import {
    Form,
    Input,
    Upload,
    Checkbox,
    Button,
    Message,
    Dialog,
    Switch,
    Card
}
from '@alifd/next';
import API from "../../API";

const commonProps = {
    subTitle: '',

};

const FormItem = Form.Item;
var timer;

const formItemLayout = {
    labelCol: {
        fixedSpan: 5
    },
    wrapperCol: {
        span: 20
    }
};

//test if a string matches format
function isFormat(str) {
    var re = /^\{(\"(.+?)\"\:(.+?))(,\"(.+?)\"\:(.+?))\}$/
    return str.search(re) == 0;
}
function handleSubmit(){
	alert("Fuzzing start...")
	const axios = require('axios');
	var InitialCase=document.getElementById("InitialCase").value
	var Version=document.getElementById("Version").value
	var file=document.getElementById("upload").files[0];
	var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(){
    	    //读取完毕后输出结果
        console.log(this.result);
        let params={
        	    InitialCase: InitialCase,
			Version: Version,
	    		upload: this.result     
        }
	    let url=API.fuzz
	    axios.get(url,{params:params}).then((response)=>{})
	}
}

function handleData() {
    alert("ok") 
    const axios = require('axios');
    var Version = document.getElementById("Version").value 
    let params = {
        Version: Version
    }
    let url = API.fuzz + "/fuzzdata"
    axios.get(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        credentials: 'same-origin',
        withCredentials: false,
        proxy: {
            host: 'localhost',
            port: 8080
        },
        params: params
    }).then(function(response) {
        alert(response.data)
    })
}
//async
function handleResult() {
    alert("Fuzzing finished") 
    const axios = require('axios');
    var Version = document.getElementById("Version").value 
    let params = {
        Version: Version
    }
    let url = API.fuzz + "/fuzzstop"
    axios.get(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        credentials: 'same-origin',
        withCredentials: false,
        proxy: {
            host: 'localhost',
            port: 8080
        },
        params: params
    }).then(function(response) {
        window.open(url, "_self")
        //window.location.href=url
    }).
    catch(function(error) {
        if (error.response) {
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log(error.message);
        }
        console.log(error.config);
    });
}
class Fuzz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            footerActions: ['ok', 'cancel'],
            footerAlign: 'right',
            resultShow: "hidden",
            dataSource:[],
            timeShow: "block",
            timeUse: "",
            hour: 0,
            minute: 0,
            second: 0
        };
    }

    onOpen = () => {
        this.setState({
            visible: true
        });
    };

    onClose = reason => {
        console.log(reason);

        this.setState({
            visible: false
        });
    };
    handleSubmit = () => {
        this.setState({
            resultShow: "hidden",
            timeShow: "block"
        });
        var that = this;
        var InitialCase = document.getElementById("InitialCase").value
        var Version = document.getElementById("Version").value
        if (isFormat(InitialCase)) {
            try {
                const axios = require('axios');
                var file = document.getElementById("upload").files[0];
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function() {
                    //读取完毕后输出结果
                    console.log(this.result);
                    let params = {
                        InitialCase: InitialCase,
                        Version: Version,
                        upload: this.result
                    }
                    let url = API.fuzz 
                    axios.get(url, {
                        params: params
                    }).then((response) =>{})
                }
                alert("Fuzzing start...")
                //start timer
                timer = setInterval(function() {
                    if (that.state.second < 60) {
                        that.setState({
                            second: that.state.second + 1
                        });
                    } else if (that.state.minute < 60) {
                        that.setState({
                            minute: that.state.minute + 1,
                            second: 0
                        });
                    } else {
                        that.setState({
                            hour: that.state.hour + 1,
                            minute: 0,
                            second: 0
                        });
                    }
                    that.setState({
                        timeUse: that.state.hour + "h " + that.state.minute + "m " + that.state.second + "s"
                    });
                },
                1000)
            } catch(err) {
                alert("Please upload a smart contract file!")
            }
        } else {
            alert('Test Case Format Error!\n' + "Please use the format {key1:value1,key2:value2,...} to try again!")
        }
    }
    handleData = () => {
    	    //if stop before start
        if(this.state.timeUse==""){
            alert("Please click start first!");
            return;
        }
        const axios = require('axios');
        var Version = document.getElementById("Version").value 
        let params = {
            Version: Version
        }
        let url = API.fuzz + "/fuzzdata"
        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            credentials: 'same-origin',
            withCredentials: false,
            proxy: {
                host: 'localhost',
                port: 8080
            },
            params: params
        }).then(function(response) {
            alert(response.data)
        })
            clearInterval(timer);
            this.setState({
                timeUse: "Loading...",
                hour: 0,
                minute: 0,
                second: 0
            });
            var that = this;
            setTimeout(function(){
                try{              
                    that.setState({
                        timeUse: "",
                        timeShow: "none",
                        resultShow: "visible"
                    });
                }catch(err){
                    clearInterval(timer);
                    that.setState({
                        timeUse: "",
                        hour: 0,
                        minute: 0,
                        second: 0
                    });
                }     
            },1500)
        }
    render() {
        return (
       	<Card free style={{width: 1585,height:500}}>
        <Card.Header title="智能合约模糊测试" {...commonProps}/>
        <Card.Content>
        <center>
             <div>
                 <Form style={{width: '50%'}} {...formItemLayout} id="userForm">
                <FormItem label="Test Case :" help="">
                    <Input.TextArea placeholder="请以键值对形式（key为函数名，value为参数列表）输入单元测试用例" name="InitialCase" / > 
                </FormItem>
                <FormItem label="Version :" help="">
                    <Input.TextArea placeholder="eg:1.1" name="Version" / > 
                </FormItem>
                <FormItem label="Smart Contract：">
                    <Upload action="/upload.do" listType="text" name="upload">
                        <Button type="primary" style={{margin: '10px -1000px 10px'}}>Upload</Button>
                    </Upload>
                </FormItem>
                 <FormItem label="Start / Stop：">
                    <Button type="primary " onClick={this.handleSubmit}>start</Button>
                    <Button type="primary " onClick={this.handleData}>stop</Button>
                    <Message title={this.state.timeUse} style={{display: this.state.timeShow}} type="loading "></Message>
                </FormItem>            
                <FormItem label="             ">
                    <Button type="primary " onClick={handleResult}>Download</Button>
                </FormItem>
            
            </Form>
            </div>
            </center>
        </Card.Content>
        </Card>
         
        )
    }
}
export default injectIntl(Fuzz)
