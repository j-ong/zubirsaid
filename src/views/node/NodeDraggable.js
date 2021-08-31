import React from 'react';
import Draggable from 'react-draggable';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export class DraggableDialog extends React.Component{

    state = {
        node_id:"",
        id:"",
        itemID:"",
        activeDrags: 0,
        deltaPosition: {
            x: 0, y: 0
        },
        controlledPosition: {
            x: -400, y: 200
        },
        showChild:true,
    };

    constructor(props){
        super(props);
        this.state.id=props.id && props.id || "";
        this.state.itemID = props.itemID && props.itemID ||"";
        this.state.node_id = props.node_id;
        this.state.showChild = props.showChild;
    }
    closeChild = () =>{
        console.log("close");
            this.state.showChild = false;
    }



    handleDrag = (e, ui) => {
        console.log(this.state.deltaPosition);
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            },
        });
    };

    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
    };

    onStop = () => {
        this.setState({activeDrags: --this.state.activeDrags});
    };
    onDrop = (e) => {
        this.setState({activeDrags: --this.state.activeDrags});
        if (e.target.classList.contains("drop-target")) {
            alert("Dropped!");
            e.target.classList.remove('hovered');
        }
    };
    onDropAreaMouseEnter = (e) => {
        if (this.state.activeDrags) {
            e.target.classList.add('hovered');
        }
    }
    onDropAreaMouseLeave = (e) => {
        e.target.classList.remove('hovered');
    }

    // For controlled component
    adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = this.state.controlledPosition;
        this.setState({controlledPosition: {x: x - 10, y}});
    };

    adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {controlledPosition} = this.state;
        const {x, y} = controlledPosition;
        this.setState({controlledPosition: {x, y: y - 10}});
    };

    onControlledDrag = (e, position) => {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
    };

    onControlledDragStop = (e, position) => {
        this.onControlledDrag(e, position);
        this.onStop();
    };


    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;
        return (
        <React.Fragment>
            { this.state.showChild &&
                <Draggable id={this.state.id} itemID={this.state.itemID} {...dragHandlers} onClose={this.closeChild} >
                    <div className="box no-cursor"  >
                        <strong className="cursor">
                            <Button className={"button"}>Drag</Button>
                            <Button align={"right"} onClick={this.closeChild}>&times;</Button>

                        </strong>
                        <div>You must click my handle to drag me</div>
                    </div>
                </Draggable>

            }
        </React.Fragment>
        );
    }

}