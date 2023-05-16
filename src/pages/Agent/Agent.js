import React, { Component } from 'react';
import "./Style.scss"
import NamespacePagination from './AgentManagement/AgentPagination';
import {FormattedMessage} from 'react-intl';

export default class Agent extends Component {
    render() {
        return (
            <div>
                <NamespacePagination/>
            </div>
        )
    };
}