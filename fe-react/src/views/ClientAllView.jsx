import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '$redux/actions';

import AddClientModal from 'components/AddClientModal';

import { Table, Row, Col, Card } from 'antd';
const { Column } = Table;

const mapStateToProps = ({ clients, search }) => ({
    clients: Object.values(clients).filter(({ name, note }) => {
        return name.includes(search.str) || note.includes(search.str);
    })
});

const mapDispatchToProps = (dispatch) => ({
    fetchClients: bindActionCreators(actions.fetchClients, dispatch),
    addClient: bindActionCreators(actions.addClient, dispatch)
});

class ClientAllView extends Component {
    state = {
        showModal: false,
        loading: false
    }
    onClick = (record, e) => {
        console.log(record, e);
    }
    showAddClientModal = () => {
        this.setState({ showModal: true });
    }
    closeAddClientModal = () => {
        this.setState({ showModal: false });
    }
    test = () => {
        console.log(this.refs['modal']);
        // this.setState({ loading: true });
    }
    componentDidMount() {
        this.props.fetchClients();
    }
    render() {
        const { clients } = this.props;
        const { showModal, loading } = this.state;
        return (
            <Row gutter={24}>
                <Col span={8}>
                    <Card>
                        <button onClick={this.showAddClientModal}>add client</button>
                    </Card>
                </Col>
                <Col span={16}>
                    <Table dataSource={clients} rowKey='objectId'>
                        <Column title='姓名' dataIndex='name' key='name' />
                        <Column title='地址' dataIndex='address' key='address' />
                        <Column title='移动电话' dataIndex='mobilephone' key='mobilephone' />
                        <Column title='固定电话' dataIndex='telephone' key='telephone' />
                        <Column title='备注' dataIndex='note' key='note' onCellClick={this.onClick} />
                    </Table>
                </Col>
                <AddClientModal
                    ref='modal'
                    visible={showModal}
                    confirmLoading={loading}
                    onCancel={this.closeAddClientModal}
                    onOk={this.test}
                    clients={clients.map(({ name }) => name)}
                />
            </Row>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientAllView);
