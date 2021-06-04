/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';

import {
    Col,
    Row,
    Badge
} from 'reactstrap';

import PaginationComponent from './Pagination';

const Pages = ({
    resultsCount,
    selectedPage,
    onChange,
    hideTotals
}) => {
    const currentAmount = 50 * (selectedPage + 1);
    const PAGE_SIZE_MINUS_ONE = 50 - 1;
    const seeing = currentAmount > resultsCount ? resultsCount : currentAmount;
    if (resultsCount) {
        return (
            <Row className={
                classNames({
                    'align-items-left justify-content-left': resultsCount < 50,
                    'align-items-center justify-content-center': resultsCount > 49
                })
            }
            >
                {!hideTotals && (
                    <Col
                        sm="2"
                        md="2"
                    >
                        <code>
                            <Badge color="dark">
                                {
                                    currentAmount > seeing
                                        ? currentAmount - PAGE_SIZE_MINUS_ONE
                                        : seeing - PAGE_SIZE_MINUS_ONE
                                }
                                &nbsp;-&nbsp;
                                {seeing}
                            </Badge>
                            &nbsp;|&nbsp;
                            <Badge color="warning">
                                {resultsCount}
                            </Badge>
                        </code>
                    </Col>
                )}
                {resultsCount > 50 && (
                    <Col
                        sm="10"
                        md="10"
                    >
                        <br/>
                        <PaginationComponent
                            hideTotals={hideTotals}
                            totalItems={resultsCount}
                            pageSize={50}
                            onSelect={page => onChange(page)}
                            maxPaginationNumbers={10}
                            activePage={selectedPage}
                        />
                    </Col>
                )}
            </Row>
        );
    }

    return null;
};


Pages.defaultProps = {
    hideTotals: false,
    maxPage: 0,
    pageSize: 0,
    resultsCount: 0,
    paginationSize: 'md'
};

export default Pages;
