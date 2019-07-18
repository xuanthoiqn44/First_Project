import React, {Component} from 'react'
import {
    Col, Container
    // , Row
} from "reactstrap";
import {connect} from "react-redux";
import List from "./component/list";
import Form from "./component/form";

class ProductionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({})
    }

    onPushNotifyId = (pushData) => {
        if (pushData) {
            this.setState({pushData});
        }
    };

    render() {
        const {pushData} = this.state;
        return (
            <div className="product">
                <Container>
                    <Col md={12} lg={12} className={this.props.toggleState ? 'Form' : 'hiddenAdd'}>
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Add User</legend>
                            <Form receiveData={pushData}
                            />
                        </fieldset>
                    </Col>

                    <Col md={12} lg={12} className='List mt-2'>
                        <List
                            onPushNotifyId={this.onPushNotifyId}
                            onHandleAddNewButtonClick={
                                (mode) => this.onHandleAddNewButtonClick(mode)
                            }
                        />
                    </Col>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {product: {toggleState}} = state;
    return {
        toggleState,
    };
}

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ProductionComponent)
