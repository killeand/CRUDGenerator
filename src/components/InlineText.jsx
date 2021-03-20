import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export default class InlineText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: (props.text)?props.text:"",
            editMode: false
        };
    }

    static defaultProps = {
        text: "",
        className: "",
        allowSpace: true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.text != this.props.text && !this.state.editMode) {
            this.setState({text:this.props.text});
        }

        if (this.props.keyn) {
            console.log(this.state, this.props);
        }
    }

    TextChange(e) {
        this.setState({text:e.target.value});
    }

    EditClick() {
        let newtext = this.state.text;

        if (this.state.editMode) {
            if (!this.props.allowSpace) {
                newtext = newtext.replace(" ", "");
            }

            if (this.props.onSave)
                this.props.onSave(newtext);
        }

        this.setState({text: newtext, editMode: !this.state.editMode});
    }

    render() {
        if (this.state.editMode) {
            return (
                <InputGroup className={this.props.className}>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <span className="bi-pencil-fill" />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={this.state.text} onChange={this.TextChange.bind(this)} />
                    <InputGroup.Append>
                        <Button variant="info" onClick={this.EditClick.bind(this)}>Save</Button>
                    </InputGroup.Append>
                </InputGroup>
            );
        }   
        else {
            return (
                <span className={this.props.className + " inline-text"} onClick={this.EditClick.bind(this)}>{this.state.text}</span>
            );
        }
    }
}