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

    SaveDesign() {
        DesignManager.Save(this.state.Design);

        this.setState({Design:this.state.Design});
    }

    UpdateDBName(value) {
        this.state.Design.Name = value;

        this.SaveDesign();
    }

    UpdateEntityName(entityIndex, value) {
        this.state.Design.Entities[entityIndex].Name = value;

        this.SaveDesign();
    }

    UpdateColumnName(entityIndex, columnIndex, value) {
        this.state.Design.Entities[entityIndex].Columns[columnIndex].Name = value;

        this.SaveDesign();
    }

    Clear() {
        DesignManager.Initialize();
    }

    AddEntity() {
        this.state.Design.Entities.push(DesignManager.NewEntity());

        this.SaveDesign();
    }

    AddColumn(entityIndex) {
        this.state.Design.Entities[entityIndex].Columns.push(DesignManager.NewColumn());

        this.SaveDesign();
    }

    RemoveEntity(entityIndex) {
        this.state.Design.Entities.splice(entityIndex, 1);

        this.SaveDesign();
    }

    RemoveColumn(entityIndex, columnIndex) {
        this.state.Design.Entities[entityIndex].Columns.splice(columnIndex, 1);

        this.SaveDesign();
    }

    RenderCards() {
        if (this.state.Design.Entities) {
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
                            {this.RenderRow(row, index)}
                        </Row>
                    );
                });
            }
        }
    }

    RenderRow(data, rowNumber) {
        return data.map((entity, index) => {
            let newindex = (rowNumber * 4) + index;

            return (
                <Card key={newindex} className="w-25 d-flex align-self-start">
                    <Card.Header className="bg-secondary text-light font-weight-bold">
                        {this.state.Settings.Schema + this.state.Settings.SchemaSeperator}
                        <InlineText key={newindex} text={entity.Name} allowSpace={false} onSave={this.UpdateEntityName.bind(this, newindex)} />
                    </Card.Header>
                    <ButtonGroup>
                        <Button variant="success" className="bi-plus-square-fill rounded-0" onClick={this.AddColumn.bind(this, newindex)} />
                        <Button variant="danger" className="bi-x-square-fill rounded-0" onClick={this.RemoveEntity.bind(this, newindex)} />
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
                            {this.RenderColumns(entity.Columns, newindex)}
                        </tbody>
                    </Table>
                </Card>
            );
        });
    }

    RenderColumns(data, entityIndex) {
        return data.map((column, index) => {
            return (
                <tr key={index}>
                    <td><InlineText text={column.Name} allowSpace={false} onSave={this.UpdateColumnName.bind(this, entityIndex, index)} /></td>
                    <td>{column.Type}</td>
                    <td>{column.Flags}</td>
                    <td><Button variant="danger" className="bi-x-square-fill" onClick={this.RemoveColumn.bind(this, entityIndex, index)} /></td>
                </tr>
            );
        });
    }

    render() {
        return (
            <>
                <Container className="d-flex justify-content-end bg-secondary rounded-pill mb-3">
                    <InlineText className="db-title w-25 m-2" text={this.state.Design.Name} allowSpace={false} onSave={this.UpdateDBName.bind(this)} />
                    <Button variant="danger" className="d-flex align-items-center bi-x-square-fill m-2" onClick={this.Clear.bind(this)}>&nbsp;Clear Design</Button>
                    <Button variant="success" className="d-flex align-items-center bi-plus-square-fill m-2" onClick={this.AddEntity.bind(this)}>&nbsp;Add Entity</Button>
                </Container>
                <Container>
                    {this.RenderCards()}
                </Container>
            </>
        );
    }
}