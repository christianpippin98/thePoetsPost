import React, { Component } from 'react';
import PromptManager from '../../Modules/PromptManager'
import { Jumbotron, Container, Button, ButtonGroup } from 'reactstrap';

class PromptCard extends Component {
    state = {
        cSelected: [],
        prompt: {}
    }
   

    onCheckboxBtnClick = (selected, typeButtons) => {
        const index = this.state.cSelected.indexOf(selected);
        const newArray = this.state.cSelected
        if (index < 0) {
            newArray.push(typeButtons);
        } else {
            newArray.splice(index, 1);
        }
        this.setState({cSelected:[...newArray]});
        PromptManager.getPrompt(JSON.stringify(newArray).replace(/,/g,"+").replace(/\"/g,"").replace(/\[|\]/g,""))
        .then((result)=>{
            this.setState({
                prompt: result
            })
        })
    };
    
    componentDidMount() {
        PromptManager.getPrompt(JSON.stringify(this.state.cSelected).replace(/,/g,"+").replace(/\"/g,"").replace(/\[|\]/g,""))
        .then((result)=>{
            this.setState({
                prompt: result
            })
        })
    };

    render() {
        const {cSelected}=this.state
        return (
            <div>
                <Jumbotron fluid>
                    <Container fluid>
                        {this.state.prompt.english ?
                            <p>{this.state.prompt.english}</p> : <h2>loading</h2>
                        }
                        <ButtonGroup size="sm">
                            <Button onClick={() => this.onCheckboxBtnClick(0,"adj")} active={cSelected.includes("adj")}>Adjective</Button>
                            <Button onClick={() => this.onCheckboxBtnClick(1,"noun")} active={cSelected.includes("noun")}>Noun</Button>
                            <Button onClick={() => this.onCheckboxBtnClick(2,"adv")} active={cSelected.includes("adv")}>Adverb</Button>
                            <Button onClick={() => this.onCheckboxBtnClick(3,"verb")} active={cSelected.includes("verb")}>Verb</Button>
                            <Button onClick={() => this.onCheckboxBtnClick(4,"location")} active={cSelected.includes("location")}>Location</Button>
                        </ButtonGroup>
                        <div>
                            {cSelected.map((selectedItem, index)=>{
                                return <span key={index}>{selectedItem} </span>
                            })}
                        </div>
                    </Container>
                </Jumbotron>
            </div>
        )
    };
}
export default PromptCard;