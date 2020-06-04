import React from "react";
import { Link } from "react-router-dom"

// reactstrap components
import {
    Row,
    Col,
    Card,
    Input,
    CardHeader,
    CardBody
} from "reactstrap";

// core components

class SideBar extends React.Component {
    state = {
        keyword: ""
    }
    handleChange = (event) => {
        this.setState({ keyword: event.target.value })
    }
    onSubmit = (event) => {
        event.preventDefault()
        console.log("submitted")
    }
    render() {
        console.log(this.props)
        return (
            <Col lg="12" md="12" >
                <Card>
                    <CardHeader>
                        cardr haed
                    </CardHeader>
                    <CardBody>
                        <Input
                            type="text"
                            id="search"
                            onChange={this.handleChange}
                        />
                        <Link className="btn btn-info" to={{ pathname: "/search-results", state: this.state.keyword }}>submit</Link>
                    </CardBody>
                </Card>
            </Col>
        );
    }

}

export default SideBar;
