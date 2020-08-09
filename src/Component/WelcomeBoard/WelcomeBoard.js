import React, {Component} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './WelcomeBoard.css'
import { Link } from "react-router-dom";
import SvgIcon from '@material-ui/core/SvgIcon';

export default class WelcomeBoard extends Component {
    render() {
        return (
            <div className="viewWelcomeBoard">
        <span className="textTitleWelcome">{`Welcome, ${
            this.props.currentUserNickname
            }`}</span>
                <img
                    className="avatarWelcome"
                    src={this.props.currentUserAvatar}
                    alt="icon avatar"
                />
                <span className="textDesciptionWelcome">
          Let's start talking. Great things might happen.
        </span>
        <p>Ir al Agenda de Contacto</p>

        <Link to="/main/crud">
            <SvgIcon style={{alignItems: 'center'}}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
 
        </Link>
        
            </div>
        )
    }
}
