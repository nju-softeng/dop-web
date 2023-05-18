import React, { Component } from 'react';
import "./Style.scss"
import NamespacePagination from './AgentManagement/AgentPagination';

export default class Agent extends Component {
    render() {
        return (
            <div>
                <NamespacePagination/>
            </div>
        )
    };
}