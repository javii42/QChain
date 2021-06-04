/* eslint-disable no-plusplus */
import React, {PureComponent} from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import {
    min, ceil, times, toNumber
} from 'lodash';

class PaginationComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.getNumberOfPages = this.getNumberOfPages.bind(this);
        this.state = {
            activePage: this.props.activePage,
            firstPaginationNumber: 1,
            pages: null
        };
    }

    componentDidMount() {
        if (this.state.pages === null) {
            this.getNumberOfPages();
            this.forceUpdate();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.activePage !== prevProps.activePage) {
            this.handlePaginationNumber(this.props.activePage);
            this.forceUpdate();
        }
        if (this.state.pages === null || this.props.totalItems !== prevProps.totalItems) {
            this.getNumberOfPages();
            this.forceUpdate();
        }
    }

    componentWillUnmount() {
        this.setState({pages: null});
    }

    getNumberOfPages() {
        const {totalItems, pageSize} = this.props;
        const auxPages = toNumber(totalItems) / pageSize;
        const pages = ceil(auxPages);
        this.setState(() => ({pages}));
    }

    getLastPaginationNumber = () => {
        const minNumberPages = min(
            [
                this.state.pages,
                this.props.maxPaginationNumbers
            ]
        );
        return this.state.firstPaginationNumber + minNumberPages - 1;
    };

    numberedPagItem = i => (
        <PaginationItem
            key={`pagebutton${i - 1}`}
            id={`pagebutton${i - 1}`}
            active={this.state.activePage === (i - 1)}
            onClick={this.handleClick}
        >
            <PaginationLink style={{minWidth: '43.5px'}}>{i}</PaginationLink>
        </PaginationItem>
    );

    nextOrPreviousPagItem = (name, page, direction) => {
        const disabled = name === this.props.previousPageText
            ? (this.props.activePage + 1) < this.state.pages
            : (this.props.activePage + 1) >= this.state.pages;
        return (
            <PaginationItem
                key={name}
                disabled={disabled}
                onClick={() => !disabled && this.handleSelectNextOrPrevious(direction)}
            >
                <PaginationLink>{name}</PaginationLink>
            </PaginationItem>
        );
    }

    firstOrLastPagItem = (name, page) => {
        const {activePage, firstPageText, lastPageText} = this.props;
        let disabled = false;
        if (name === firstPageText) {
            disabled = activePage === page;
        } else if (name === lastPageText) {
            disabled = activePage === page;
        }
        return (
            <PaginationItem
                key={name}
                disabled={disabled}
                id={`pagebutton${page}`}
                onClick={event => !disabled && this.handleClick(event)}
            >
                <PaginationLink>{name}</PaginationLink>
            </PaginationItem>
        );
    };

    handleClick = event => {
        const newActivePage = parseInt(
            event.currentTarget
                .getAttribute('id')
                .split('pagebutton')
                .pop(),
            10
        );
        this.setState({
            activePage: newActivePage
        });
        this.handlePaginationNumber(newActivePage);
        this.props.onSelect(newActivePage);
    };

    handleSelect = event => {
        const newActivePage = parseInt(
            event.target.value,
            10
        );
        this.setState({
            activePage: newActivePage
        });
        this.handlePaginationNumber(newActivePage);
        this.props.onSelect(newActivePage);
    }

    handleSelectNextOrPrevious = direction => {
        const {activePage} = this.state;
        const newActivePage = direction === 'r' ? activePage + 1 : activePage - 1;
        this.setState({
            activePage: newActivePage
        });

        this.handlePaginationNumber(newActivePage);
        this.props.onSelect(newActivePage);
    };

    handlePaginationNumber = activePage => {
        const distance = Math.floor(this.props.maxPaginationNumbers / 2);
        const newFPNumber = activePage - distance;
        const newLPNumber = activePage + distance;
        if (newFPNumber <= distance) {
            if (this.state.firstPaginationNumber !== 1) {
                this.setState({
                    firstPaginationNumber: 1
                });
            }
        } else if (newLPNumber <= this.state.pages) {
            this.setState({
                firstPaginationNumber: newFPNumber
            });
        } else if (newLPNumber >= this.state.pages) {
            this.setState(state => ({
                firstPaginationNumber: state.pages - this.props.maxPaginationNumbers + 1
            }));
        }
    };

    paginationItems = () => {
        const items = [];
        this.lastPaginationNumber = this.getLastPaginationNumber();
        items.push(this.firstOrLastPagItem(this.props.firstPageText, 0));
        items.push(this.nextOrPreviousPagItem(this.props.previousPageText, 1, 'l'));
        for (
            let i = this.state.firstPaginationNumber;
            i <= this.lastPaginationNumber;
            i++
        ) {
            items.push(this.numberedPagItem(i));
        }
        items.push(
            this.nextOrPreviousPagItem(this.props.nextPageText, this.state.pages, 'r')
        );
        items.push(this.firstOrLastPagItem(this.props.lastPageText, this.state.pages - 1));

        return items;
    };

    render() {
        if (!this.props.hideTotals) {
            return (
                <Pagination className="d-flex align-items-center justify-content-center">
                    {this.paginationItems()}
                </Pagination>
            );
        }

        return (
            <Input
                type="select"
                onSelect={event => this.handleSelect(event)}
                onChange={event => this.handleSelect(event)}
                value={this.props.activePage}
            >
                <option value="">Seleccione</option>
                {times(this.state.pages, page => (
                    <option
                        value={page + 1}
                    >
                        {this.props.selectPage}
                        &nbsp;#
                        {page + 1}
                    </option>
                ))}
            </Input>
        );
    }
}

PaginationComponent.propTypes = {
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    maxPaginationNumbers: PropTypes.number,
    hideTotals: PropTypes.bool.isRequired,
    activePage: PropTypes.number,
    firstPageText: PropTypes.string,
    previousPageText: PropTypes.string,
    nextPageText: PropTypes.string,
    lastPageText: PropTypes.string,
    selectPage: PropTypes.string
};

PaginationComponent.defaultProps = {
    maxPaginationNumbers: 5,
    activePage: 1,
    firstPageText: '<< Primero',
    previousPageText: '< Anterior',
    nextPageText: 'Siguiente >',
    lastPageText: 'Último >>',
    selectPage: 'Página'
};

export default PaginationComponent;
