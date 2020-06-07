import React, { Component } from "react";
import PropTypes from "prop-types";

// core components
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import "./Login.css";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleLogin = e => {
    e.preventDefault();
    console.log(this.state.email, this.state.password);
    this.props.onLogin(this.state.email, this.state.password);
  };

  render() {
    return (
        <div className="static-slider-head">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="8" md="6" className="align-self-center text-center">
                        <h1 className="title">Login</h1>
                    </Col>
                </Row>
            </Container>
        <Container className="form-container">
          <Row>
              <Form  name="login" onSubmit={this.handleLogin}>
                <Row>
                  <FormGroup >
                    <Label htmlFor="name">Email:</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Email"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup >
                    <Label htmlFor="email">Password:</Label>
                    <Input
                      type="password"
                      className="form-control"
                      id="email"
                      placeholder="Enter Password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </FormGroup>
                </Row>
                <Row>
                    <Button
                      type="submit"
                      className="btn btn-success-gradiant font-14"
                      disabled={!this.state.email && !this.state.password}
                    >
                      Submit
                    </Button>
                </Row>
              </Form>
          </Row>
        </Container>
    </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object
};
