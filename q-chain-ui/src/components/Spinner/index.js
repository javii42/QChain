import React from 'react';
import PropTypes from 'prop-types';

import {Row, Col, Spinner} from 'reactstrap';

const Spinners = props => {
    const {width, height} = props;
    return (
        <Row>
            <Col className="text-center mt-5">
                <style jsx="true">
                    {`
                        .spinner {
                            width: ${width}px;
                            height: ${height}px;
                            border-radius: 50px;
                            -webkit-animation: rotateplane 1.6s infinite ease-in-out;
                            animation: rotateplane 1.6s infinite ease-in-out;
                        }
                        @-webkit-keyframes rotateplane {
                            0% { -webkit-transform: perspective(120px); background-color: #009d98; }
                            24.9% {background-color: #009d98;}
                            25.0% {background-color: #ee7fab;}
                            50% { -webkit-transform: perspective(120px) rotateY(180deg); background-color: #ee7fab;}
                            74.9% { background-color: #ee7fab; }
                            75% { background-color: #eeb100; }
                            100% { -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg); background-color: #eeb100; }
                        }
                    `}
                </style>
                <Spinner style={{width: '3rem', height: '3rem'}}/>
            </Col>
        </Row>
    );
};

Spinners.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

Spinners.defaultProps = {
    width: 75,
    height: 75
};

export default Spinners;
