import React from 'react';
import API from "../../API";
import Axios from 'axios';
import copy from 'copy-to-clipboard';
import {Feedback} from '@icedesign/base';
import ReactMarkdown from 'react-markdown';
import {Loading} from "@icedesign/base";
import Spinner from '../components/Spinner';
import {injectIntl} from 'react-intl';


import './ProjectOverview.css'

import imgPublic from './imgs/public.png'
import imgPrivate from './imgs/private.png'
import imgStar from './imgs/star.png'
import imgFork from './imgs/fork.png'
import imgDownload from './imgs/download.png'
import imgCopy from './imgs/copy.png'
import imgEdit from './imgs/edit.png'

const {toast} = Feedback;

const spinner = (
    <Spinner/>
);


class ProjectOverview extends React.Component {

    constructor(props) {

        super(props);
        const {username, projectname} = this.props.match.params;

        this.state = {
            username: username,
            projectname: projectname,
            projectid: username + "/" + projectname,
            url: "",
            projectInfo: {
                commit_count: 0,
                description: "",
                file_size: "",
                forks_count: 0,
                http_url_to_repo: "",
                id: 0,
                name: "",
                default_branch: "",
                ssh_url_to_repo: "",
                star_count: 0,
                tag_count: 0,
                branch_count: 0,
                visibility: "",

            },
            readmeInfo: null,
            // readmeInfo:{
            //     "file_name": null,
            //     "size": 0,
            //     "file_size": "0B",
            //     "file_content": ""
            // },
            accessInfo: {
                access_level: 0,
                visibility: "private",
            },
            projectInfoLoading: false,
            readmeInfoLoading: false,
            accessInfoLoading: false,

        }
        ;

    }

    componentDidMount() {

        let url = API.code + "/projects/" + this.state.projectid;
        let self = this;
        this.loadAccess();
        Axios.get(url).then((response) => {
            self.setState({
                url: response.data.http_url_to_repo,
                projectInfo: response.data,
                projectInfoLoading: true
            }, () => {
                // 先取得default_branch
                let default_branch = self.state.projectInfo.default_branch;
                url = API.code + "/projects/" + self.state.projectid + "/repository/blob?file_path=README.md&ref=" + default_branch + "&userId=" + sessionStorage.getItem("user-id");
                Axios.get(url).then((response) => {
                    self.setState({readmeInfo: response.data, readmeInfoLoading: true})
                })
            });
        });


    }

    loadAccess() {
        let url = API.code + "/projects/" + this.state.projectid + "/access";
        Axios.get(url).then(response => {
            this.setState({
                accessInfo: response.data,
                accessInfoLoading: true,
            });
        });
    }

    star() {
        let self = this;
        Axios({
            method: "POST",
            url: API.code + "/projects/" + this.state.projectid + "/star",
            params: {
                userId: sessionStorage.getItem("user-id"),
            },
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
        }).then(response => {
            let code = response.data;
            let projectInfo = this.state.projectInfo;
            if (code === 304) {
                projectInfo.star_count -= 1;
            } else {
                projectInfo.star_count += 1;
            }
            self.setState({
                projectInfo: projectInfo
            });
        })

    }


    changeSSH() {
        this.setState({url: this.state.projectInfo.ssh_url_to_repo});
    }

    changeHttp() {
        this.setState({url: this.state.projectInfo.http_url_to_repo});
    }

    copyUrl = () => {
        copy(this.state.url);
        toast.success(this.props.intl.messages["code.projectoverview.copy.success"]);
    };

    editProjectLink() {
        let {username, projectname} = this.state;
        this.props.history.push("/code/" + username + "/" + projectname + "/edit");
    }

    downLoadZipLink() {
        window.open("http://gitlab.dop.clsaa.com/api/v4/projects/" + encodeURIComponent(this.state.projectid) + "/repository/archive.zip");
    }


    render() {

        const projectInfo = this.state.projectInfo;
        const accessInfo = this.state.accessInfo;

        return (

            <div className="project-container">
                    <div className="div-project">
                        {
                            (() => {
                                if (projectInfo.visibility === "public") {
                                    return (
                                        <button className="btn-project btn-project-visibility">
                                            <img
                                                src={imgPublic}/>{this.props.intl.messages["code.projectoverview.public"]}
                                        </button>
                                    )
                                } else if (projectInfo.visibility === "private") {
                                    return (
                                        <button className="btn-project btn-project-visibility">
                                            <img
                                                src={imgPrivate}/>{this.props.intl.messages["code.projectoverview.private"]}
                                        </button>
                                    )
                                }
                            })()
                        }
                        {
                            (() => {
                                if (accessInfo.access_level === 40) {
                                    return (
                                        <button className="btn-project btn-project-edit"
                                                onClick={this.editProjectLink.bind(this)}>
                                            <img src={imgEdit}/>
                                        </button>
                                    )
                                }
                            })()
                        }

                        <div className="div-project-avatar">
                            {projectInfo.name.substring(0, 1).toUpperCase()}
                        </div>

                        <div className="div-project-intro">
                            <p className="text-project-title">{projectInfo.name}</p>
                            <p className="text-project-description">{projectInfo.description}</p>
                        </div>

                        <div className="div-project-1">
                            <button className="btn-project btn-project-star" onClick={this.star.bind(this)}>
                                <img src={imgStar}/>{projectInfo.star_count}
                            </button>
                            {/*<button className="btn-project btn-project-fork">*/}
                            {/*<img src={imgFork}/>{projectInfo.forks_count}*/}
                            {/*</button>*/}

                            <button className="btn-project btn-project-ssh" onClick={this.changeSSH.bind(this)}>
                                SSH
                            </button>
                            <button className="btn-project btn-project-http" onClick={this.changeHttp.bind(this)}>
                                HTTP
                            </button>
                            <input className="input-project-url" type="text" value={this.state.url}/>

                            <button className="btn-project btn-project-copy" onClick={this.copyUrl.bind(this)}>
                                <img src={imgCopy}/>
                            </button>
                            <button onClick={this.downLoadZipLink.bind(this)}
                                    className="btn-project btn-project-download">
                                <img src={imgDownload}/>
                            </button>
                        </div>

                        <div className="div-project-2">
                            <span>{projectInfo.commit_count}{this.props.intl.messages["code.projectoverview.commits"]}</span>
                            <span>{projectInfo.branch_count}{this.props.intl.messages["code.projectoverview.branches"]}</span>
                            <span>{projectInfo.tag_count}{this.props.intl.messages["code.projectoverview.tags"]}</span>
                            <span>{projectInfo.file_size}</span>
                        </div>
                    </div>
                    <div className="div-project-md">
                        {
                            (() => {
                                    if (this.state.readmeInfo !== null) {
                                        if (this.state.readmeInfo.file_name !== null) {
                                            return <ReactMarkdown source={this.state.readmeInfo.file_content}/>;
                                        } else if (this.state.projectInfo.branch_count === 0) {
                                            return [
                                                <h4>The repository for this project is empty</h4>,
                                                <span>You can also upload existing files from your computer using the instructions below.</span>,
                                                <br/>,
                                                <h5>- Git global setup</h5>,
                                                <span>git config --global user.name "{this.state.username}"</span>,
                                                <br/>,
                                                <span>git config --global user.email "{window.sessionStorage.getItem("user-email")}"</span>,
                                                <br/>,

                                                <h5>- Create a new repository</h5>,
                                                <span>git clone {this.state.projectInfo.ssh_url_to_repo}</span>, <br/>,
                                                <span>cd {this.state.projectname}</span>, <br/>,
                                                <span>touch README.md</span>, <br/>,
                                                <span>git add README.md</span>, <br/>,
                                                <span>git commit -m "add README"</span>, <br/>,
                                                <span>git push -u origin master</span>,

                                                <h5>- Push an existing folder</h5>,
                                                <span>cd existing_folder</span>, <br/>,
                                                <span>git init</span>, <br/>,
                                                <span>git remote add origin {this.state.projectInfo.ssh_url_to_repo}</span>,
                                                <br/>,
                                                <span>git add .</span>, <br/>,
                                                <span>git commit -m "Initial commit"</span>, <br/>,
                                                <span>git push -u origin master</span>,

                                                <h5>- Push an existing Git repository</h5>,
                                                <span>cd existing_repo</span>, <br/>,
                                                <span>git remote rename origin old-origin</span>, <br/>,
                                                <span>git remote add origin {this.state.projectInfo.ssh_url_to_repo}</span>,
                                                <br/>,
                                                <span>git push -u origin --all</span>, <br/>,
                                                <span>git push -u origin --tags</span>, <br/>,
                                            ];
                                        }else {
                                            return (<h5>The repository for this project does not have a README file</h5>)
                                        }
                                    }
                                }
                            )()
                        }

                    </div>

            </div>
        );
    }
}


export default injectIntl((props) => <ProjectOverview {...props} key={props.location.pathname}/>)

