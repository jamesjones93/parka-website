import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <div id="header-container" className="centre">
                    <Link to="/shop">Shop</Link>
                    <Link to="/dates">Dates</Link>
                    <Link to="/Info">Info</Link>
                </div>
            </header>
        );
    }
}
