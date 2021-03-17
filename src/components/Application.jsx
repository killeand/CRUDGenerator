import React, { Component } from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import ModelDesigner from '../pages/ModelDesigner';
import Settings from '../pages/Settings';
import Output from '../pages/Output';
import FourOhFour from '../pages/FourOhFour';
import SettingsManager from '../scripts/SettingsManager';

export default class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            version: ""
        }
    }

    componentDidMount() {
        fetch(`https://api.github.com/repos/killeand/CRUDGenerator/releases/latest`, {headers:{"accept":"application/vnd.github.v3+json"}}).then((result) => {
            return result.json();
        }).then((data) => {
            if (data) {
                if (data.tag_name) {
                    this.setState({version:data.tag_name});
                }
                else {
                    this.setState({version:"error"});
                }
            }
            else {
                this.setState({version:"error"});
            }
        });
    }

    RenderVersion() {
        if (this.state.version.length != 0) {
            if (this.state.version == "error") {
                return (<span className="text-danger">Error checking version online</span>);
            }
            else {
                if (this.state.version == SettingsManager.Get().Version) {
                    return (<span className="text-success">Up to date!</span>);
                }
                else {
                    return (<span className="text-danger">Out of date! {this.state.version} on GitHub.</span>);
                }
            }
        }
    }

    render() {
        return (
            <HashRouter>
                <header>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand as={Link} to="/">
                            <span className="bi-gear-wide-connected"></span> CRUD Generator
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link as={Link} to="/">Model Designer</Nav.Link>
                            <Nav.Link as={Link} to="/output">Output</Nav.Link>
                            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>Version: {SettingsManager.Get().Version} ({this.RenderVersion()})</Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
                <main className="bg-light text-dark m-3 p-2 border rounded-sm">
                    <Switch>
                        <Route exact path="/" component={ModelDesigner} />
                        <Route exact path="/output" component={Output} />
                        <Route exact path="/settings" component={Settings} />
                        <Route component={FourOhFour} />
                    </Switch>
                </main>
                <footer className="bg-light text-dark my-3 mx-5 p-2 border rounded-sm text-center">
                    Powered by: <a href="https://getbootstrap.com/" className="bi-bootstrap" target="_blank">&nbsp;Bootstrap</a>, <a href="https://babeljs.io/" target="_blank">Babel</a>, <a href="https://reactjs.org/" target="_blank">React</a>, <a href="https://reactrouter.com/" target="_blank">React Router</a>, <a href="https://jquery.com/" target="_blank">JQuery</a>, <a href="https://popper.js.org/" target="_blank">PopperJS</a>, <a href="https://react-bootstrap.github.io/" target="_blank">React Bootstrap</a>, and <a href="https://ace.c9.io/" target="_blank">Ace Editor</a>/<a href="https://github.com/securingsincity/react-ace" target="_blank">React Ace</a>.<br />
                    <a href="https://github.com/killeand/CRUDGenerator">CRUD Generator</a> by Jason Johnston is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" style={{"display":"inline-block"}}>CC BY 4.0<img className="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" /><img className="cc-icon" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" /></a>
                </footer>
            </HashRouter>
        );
    }
}