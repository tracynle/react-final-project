/* eslint-disable */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
    return (
        <div className="footer4 b-t spacer bg-light">
            <Container>
                <Row>
                    <Col lg="12" md="6">
                        <h5 className="m-b-20">Social</h5>
                        <div className="round-social dark">
                            <a href="www.linkedin.com/in/tracyngocle" className="link"><i className="fa fa-linkedin"></i></a>
                            <a href="https://github.com/tracynle" className="link"><i className="fa fa-github"></i></a>

                        </div>
                    </Col>
                </Row>
                <div className="f4-bottom-bar footer">
                    <Row>
                        <Col md="12">
                            <div className="d-flex font-14">
                                <div className="m-t-10 m-b-10 copyright">All Rights Reserved by WrapPixel.</div>
                                <div className="links ml-auto m-t-10 m-b-10">
                                    <a href="#" className="p-10 p-l-0">Terms of Use</a>
                                    <a href="#" className="p-10">Legal Disclaimer</a>
                                    <a href="#" className="p-10">Privacy Policy</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
export default Footer;
