import React, { Component } from 'react';
import { Container, Row, Card, ButtonGroup, Button, Table } from 'react-bootstrap';

import InlineText from '../components/InlineText';

import SettingsManager from '../scripts/SettingsManager';
import DesignManager from '../scripts/DesignManager';

export default class ModelDesigner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Design: DesignManager.Get(),
            Settings: SettingsManager.Get()
        }
    }

    SaveDesign(jsondata) {
        DesignManager.Save(jsondata);

        this.setState({Design:jsondata});
    }

    UpdateDBName(value, object) {
        let localData = this.state.Design;
        localData.Name = value;

        this.SaveDesign(localData);
    }

    UpdateEntityName(value, object) {
        console.log(value, object);
    }

    ClickClear(e) {
        let localData = DesignManager.DefaultStruct;

        this.SaveDesign(localData);
    }

    ClickAddEntity(e) {
        let localData = this.state.Design;
        localData.Entities.push(DesignManager.DefaultEntity);

        this.SaveDesign(localData);
    }

    RenderCards() {
        if (this.state.Design.Entities.length == 0) {
            return (<p>There are no entities</p>);
        }
        else {
            let rows = [];

            for (let i = 0; i < Math.ceil(this.state.Design.Entities.length/4); i++) {
                let newrow = [];

                for (let j = 0; j < 4; j++) {
                    if (this.state.Design.Entities[(i*4)+j]) {
                        newrow.push(this.state.Design.Entities[(i*4)+j]);
                    }
                }

                rows.push(newrow);
            }

            return rows.map((row, index) => {
                return (
                    <Row key={index} className="entity-row">
                        {this.RenderRow(row)}
                    </Row>
                );
            });
        }
    }

    RenderRow(data) {
        return data.map((entity, index) => {
            return (
                <Card key={index} className="w-25 d-flex align-self-start">
                    <Card.Header className="bg-secondary text-light font-weight-bold">
                        {this.state.Settings.Schema + this.state.Settings.SchemaSeperator}
                        <InlineText text={entity.Name} allowSpace={false} onSave={this.UpdateEntityName.bind(this)} />
                    </Card.Header>
                    <ButtonGroup>
                        <Button variant="success" className="bi-plus-square-fill rounded-0" />
                        <Button variant="danger" className="bi-x-square-fill rounded-0" />
                    </ButtonGroup>
                    <Table striped bordered hover responsive variant="dark" className="m-0">
                        <thead>
                            <tr>
                                <th>Column</th>
                                <th>Type</th>
                                <th>Flags</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.RenderColumns(entity.Columns)}
                        </tbody>
                    </Table>
                </Card>
            );
        });
    }

    RenderColumns(data) {
        return data.map((column, index) => {
            return (
                <tr>
                    <td>{column.Name}</td>
                    <td>{column.Type}</td>
                    <td>{column.Flags}</td>
                    <td><Button variant="danger" className="bi-x-square-fill" /></td>
                </tr>
            );
        });
    }

    render() {
        return (
            <>
                <Container className="d-flex justify-content-end bg-secondary rounded-pill mb-3">
                    <InlineText className="db-title w-25 m-2" text={this.state.Design.Name} allowSpace={false} onSave={this.UpdateDBName.bind(this)} />
                    <Button variant="danger" className="d-flex align-items-center bi-x-square-fill m-2" onClick={this.ClickClear.bind(this)}>&nbsp;Clear Design</Button>
                    <Button variant="success" className="d-flex align-items-center bi-plus-square-fill m-2" onClick={this.ClickAddEntity.bind(this)}>&nbsp;Add Entity</Button>
                </Container>
                <Container>
                    {this.RenderCards()}
                </Container>
            </>
        );
    }
}