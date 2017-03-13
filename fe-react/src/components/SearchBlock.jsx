import React from 'react';
import { bindActionCreators } from 'redux';
import actions from '$redux/actions';
import { connect } from 'react-redux';
import { Input, Icon } from 'antd';
import './SearchBlock.less';

const mapStateToProps = ({ search }) => ({
    isFocus: search.isFocus,
    str: search.str
});
const mapDispatchToProps = (dispatch) => ({
    changeSearch: bindActionCreators(actions.onSearchChange, dispatch),
    onFocus: bindActionCreators(actions.onSearchFocus, dispatch),
    onBlur: bindActionCreators(actions.onSearchBlur, dispatch)
});

const SearchBlock = (props) => {
    const {
        isFocus,
        onFocus,
        onBlur,
        changeSearch
    } = props;
    return (
        <Input
            className='search'
            style={{
                transition: '.3s',
                width: isFocus ? 240 : 120
            }}
            size='large'
            placeholder='搜索...'
            onChange={(e) => {
                changeSearch(e.target.value);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            prefix={<Icon type='search' />}
        />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBlock);
