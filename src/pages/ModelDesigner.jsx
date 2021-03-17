import React, { Component } from 'react';
import { Container, Row, Card, ButtonGroup, Button, Table } from 'react-bootstrap';

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
                    <Card.Header className="bg-secondary text-light font-weight-bold">{this.state.Settings.Schema + this.state.Settings.SchemaSeperator + entity.Name}</Card.Header>
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
                    <div className="db-title">{this.state.Design.Name}</div>
                    <Button variant="danger" className="d-flex align-items-center bi-x-square-fill m-2">&nbsp;Clear Entities</Button>
                    <Button variant="success" className="d-flex align-items-center bi-plus-square-fill m-2">&nbsp;Add Entity</Button>
                </Container>
                <Container>
                    {this.RenderCards()}
                </Container>
            </>
        );
    }
}