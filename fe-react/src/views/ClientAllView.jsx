import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '$redux/actions';

import { Table } from 'antd';
const { Column } = Table;

const mapStateToProps = ({ clients, search }) => ({
    clients: Object.values(clients).filter(({ name, note }) => {
        return name.includes(search.str) || note.includes(search.str);
    })
});

const mapDispatchToProps = (dispatch) => ({
    fetchClients: bindActionCreators(actions.fetchClients, dispatch)
});

class ClientAllView extends Component {
    render() {
        const { clients, fetchClients } = this.props;
        return (
            <div>
                <button onClick={fetchClients}>fetch clients</button>
                <Table dataSource={clients}>
                    <Column title='姓名' dataIndex='name' key='name' />
                    <Column title='地址' dataIndex='address' key='address' />
                    <Column title='移动电话' dataIndex='mobilephone' key='mobilephone' />
                    <Column title='固定电话' dataIndex='telephone' key='telephone' />
                    <Column title='备注' dataIndex='note' key='note' />
                </Table>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientAllView);
