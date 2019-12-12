import React, { Component } from 'react';
import PromptManager from "../../Modules/PromptManager";
import { Jumbotron, Container, Button, ButtonGroup } from 'reactstrap';

class PromptCard extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">Fluid jumbotron</h1>
                        <ButtonGroup size="sm">
                            <Button>Left</Button>
                            <Button>Middle</Button>
                            <Button>Right</Button>
                        </ButtonGroup>
                    </Container>
                </Jumbotron>
            </div>
        )
    };
}
export default PromptCard;