import React, {Component} from 'react';
import './RegisterTransfer.scss';
import Logo from '../../../components/Logo'
import Footer from "../../../components/Footer";
import {injectIntl} from "react-intl";


class LoginTransfer extends Component {
    render() {
        return (
            <div className="register-body">
                <div className="header-content">
                    <Logo isDark/>
                </div>
                <div className="register-content">
                    <div className="title">
                        {this.props.intl.messages["login.transfer.loginTransfer"]}
                    </div>
                    <div className="tip">
                        {this.props.intl.messages["login.transfer.loginTransfer.tip"]}...
                    </div>
                </div>
                <Footer
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                    }}
                />
            </div>
        )
    }
}
export default injectIntl(LoginTransfer)
