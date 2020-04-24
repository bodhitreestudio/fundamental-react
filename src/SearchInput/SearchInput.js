import Button from '../Button/Button';
import { FORM_STATES } from '../utils/constants';
import FormInput from '../Forms/FormInput';
import InputGroup from '../InputGroup/InputGroup';
import Menu from '../Menu/Menu';
import Popover from '../Popover/Popover';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            searchExpanded: false,
            value: this.props.value,
            searchList: this.props.searchList,
            filteredResult: this.props.searchList
        };
    }

    shouldComponentUpdate(nextProps, nextState) {

      if (nextProps.value !== this.props.value) {
        nextState.value = nextProps.value;
      }

      return true;

    }

    onKeyPressHandler = event => {
        if (event.key === 'Enter') {
        }
    };

    listItemClickHandler = (event, item) => {
        this.props.onItemClick && this.props.onItemClick(item);
        this.setState({
            value: item.text,
            isExpanded: false
        });
    };

    onSearchAsync (query) {

        this.setState({ loading: true });

        let promise; 
        query = query || this.state.value;

        if (!this.props.onSearchAsync) {
            promise = new Promise((resolve, reject) => {
                let filteredResult = this.props.searchList.filter(item =>
                    item.text.toLowerCase().startsWith(query.toLowerCase())
                );
                resolve(filteredResult);
            });
        } else {
            promise = this.props.onSearchAsync(query);
        }

        return promise
            .then((filteredResult) => {
                this.setState({
                    isExpanded: true,
                    filteredResult
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });

    }

    _scheduleAsyncSearch (query) {

      if (this.__searchTimer) {
        //console.log('XXXXX clear last scheduled timer');
        clearTimeout(this.__searchTimer);
      }

      //console.log('SSSSS schedule new timer');
      this.__searchTimer = setTimeout(() => {
        //console.log('√√√√√ TIMER: trigger search');
        this.onSearchAsync(query);
      }, 360);

    }
    onChangeHandler = event => {

        let value = event.target.value;

        this.setState({
            value,
            isExpanded: true,
        }, () => {
            this._scheduleAsyncSearch(value);
        });
    };

    onClickHandler = () => {
        if (!this.state.isExpanded) {
            this.onSearchAsync();
        }
    };

    onSearchBtnHandler = () => {
        if (!this.state.isExpanded) {
            this.onSearchAsync();
        }
    };

    onEscHandler = event => {
        if (
            (event.keyCode === 27 && this.state.isExpanded === true) ||
            (event.keyCode === 27 && this.state.searchExpanded === true)
        ) {
            this.setState({
                isExpanded: false,
                searchExpanded: false,
                value: '',
                searchList: this.props.searchList,
                filteredResult: this.props.searchList
            });
        }
    };

    onOutsideClickHandler = e => {
        e.stopPropagation();
        if (this.node && !this.node.contains(e.target)) {
            if (this.state.isExpanded) {
                this.setState({
                    isExpanded: false
                });

                if (
                    this.props.inShellbar &&
                    this.state.searchExpanded &&
                    !this.state.value
                ) {
                    this.setState({
                        searchExpanded: false
                    });
                }
            } else {
                return;
            }
        }
    };
    componentDidMount() {
        document.addEventListener('keydown', this.onEscHandler, false);
        document.addEventListener('click', this.onOutsideClickHandler, false);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onEscHandler, false);
        document.removeEventListener('click', this.onOutsideClickHandler, false);
    }

    render() {
        const {
            disableStyles,
            placeholder,
            inShellbar,
            searchList,
            noSearchBtn,
            compact,
            className,
            inputProps,
            listProps,
            searchBtnProps,
            loadingIndicator,
            popoverStyle,
            popoverProps,
            state,
            onSearchAsync,
            onItemClick,
            ...rest
        } = this.props;

        return (
            <div {...rest} className={className}>
                <Popover
                    style={popoverStyle}
                    {...popoverProps}
                    body={this.state.isExpanded &&
                        (<Menu disableStyles={disableStyles}>
                            <Menu.List {...listProps}>
                                {this.state.filteredResult && this.state.filteredResult.length > 0 ? (
                                    this.state.filteredResult.map((item, index) => {
                                        return (
                                            <Menu.Item
                                                key={index}
                                                onClick={(e) => this.listItemClickHandler(e, item)}>
                                                {item.text}
                                            </Menu.Item>
                                        );
                                    })
                                ) : (
                                    <Menu.Item >No result</Menu.Item>
                                )}
                            </Menu.List>
                        </Menu>)
                    }
                    control={
                        <InputGroup
                            compact={compact}
                            disableStyles={disableStyles}
                            state={state}>
                            <FormInput
                                {...inputProps}
                                disableStyles={disableStyles}
                                onChange={this.onChangeHandler}
                                onClick={() => this.onClickHandler()}
                                onKeyPress={this.onKeyPressHandler}
                                placeholder={placeholder}
                                value={this.state.value} />

                            {!noSearchBtn && (
                                <InputGroup.Addon isButton>
                                    <Button {...searchBtnProps}
                                        disableStyles={disableStyles}
                                        glyph='search'
                                        loading={this.state.loading}
                                        onClick={() => this.onClickHandler()}
                                        option='light' >
                                        {this.state.loading && loadingIndicator}
                                    </Button>
                                </InputGroup.Addon>
                            )}
                        </InputGroup>
                    }
                    disableKeyPressHandler
                    disableStyles={disableStyles} />
            </div>
        );
    }
}

SearchInput.displayName = 'SearchInput';

SearchInput.propTypes = {
    className: PropTypes.string,
    compact: PropTypes.bool,
    disableStyles: PropTypes.bool,
    inputProps: PropTypes.object,
    inShellbar: PropTypes.bool,
    listProps: PropTypes.object,
    noSearchBtn: PropTypes.bool,
    placeholder: PropTypes.string,
    popoverProps: PropTypes.object,
    popoverStyle: PropTypes.object,
    searchBtnProps: PropTypes.object,
    loadingIndicator: PropTypes.object,
    searchList: PropTypes.arrayOf(
        PropTypes.object
    ),
    state: PropTypes.oneOf(FORM_STATES),
    value: PropTypes.string,
    onSearchAsync: PropTypes.func,
    onItemClick: PropTypes.func,
};

SearchInput.defaultProps = {
    popoverStyle: {
        width: '100%'
    },
    value: '',
};

SearchInput.propDescriptions = {
    noSearchBtn: 'Set to **true** to render without a search button.',
    popoverStyle: 'Styles applied to child Popover',
    searchBtnProps: 'Additional props to be spread to the search `<button>` element.',
    searchList: 'Collection of items to display in the dropdown list.',
    onSearchAsync: 'Function to return the search data for user input',
    onItemClick: 'Function to call on item click',
};

export default SearchInput;
