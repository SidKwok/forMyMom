import React, { Component } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import './TestView.less';

export default class TestView extends Component {
    /**
     * 登陆
     * @param username {string} 用户名
     * @param password {string} 密码
     */
    logIn = () => {
        axios.post('/auth/login', {
            username: 'test',
            password: '12345678'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 登出
     */
    logOut = () => {
        axios.post(
            '/auth/logout'
        )
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 添加鞋子
     * @param shoeId {string} 型号
     * @param brand {string} 品牌
     * @param color {string} 颜色
     * @param sizes {object} 尺码
     */
    createShoe = () => {
        axios.post('/api/create-shoe', {
            shoeId: '1102',
            brand: 'adidas',
            color: 'red',
            sizes: {
                s34: 2,
                s35: 2,
                s36: 2,
                s37: 2,
                s38: 2,
                s39: 2,
                s40: 2,
                s41: 2,
                s42: 2,
                s43: 2,
                s44: 2
            }
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 更新鞋子
     * @param stockObjectId {string} objectId
     * @param size {object} 尺码
     */
    updateShoe = () => {
        axios.post('/api/update-shoe', {
            stockObjectId: '58ad764a8fd9c50067036510',
            sizes: {
                s34: 9,
                s35: 8
            }
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 删除鞋子
     * @param stockObjectId {string}
     */
    delShoe = () => {
        axios.post('/api/del-shoe', {
            stockObjectId: '58ad764a8fd9c50067036510'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 展示鞋子
     *
     */
    showShoes = () => {
        axios.get('/api/show-shoes')
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    /**
     * 新建客户
     */
    createClient = () => {
        axios.post('/api/create-client', {
            name: '孙小姐',
            mobilephone: '18204405111',
            telephone: '85247111',
            address: '厚街',
            note: 'wtfwtf'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 更新用户
     */
    updateClient = () => {
        axios.post('/api/update-client', {
            clientObjectId: '58ad8b54570c35006bd10e30',
            address: '茶山',
            mobilephone: '13580707233',
            telephone: '85245077',
            note: ''
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 删除用户
     */
    delClient = () => {
        axios.post('/api/del-client', {
            clientObjectId: '58ad8b3e2f301e006be6160a'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 展示客户
     *
     */
    showClients = () => {
        axios.get('/api/show-clients')
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    /**
     * 新建厂家
     */
    createVender = () => {
        axios.post('/api/create-vender', {
            name: '阿迪达斯',
            mobilephone: '18202724405',
            telephone: '85245077',
            address: '北京',
            note: 'wtf'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 更新厂家
     */
    updateVender = () => {
        axios.post('/api/update-vender', {
            venderObjectId: '58ad90d5b123db00672fc72b',
            address: '天津',
            mobilephone: '13580707233',
            telephone: '85245077',
            note: ''
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 删除厂家
     */
    delVender = () => {
        axios.post('/api/del-vender', {
            venderObjectId: '58ad90d5b123db00672fc72b'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 展示厂家
     *
     */
    showVenders = () => {
        axios.get('/api/show-venders')
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    /**
     * 新建进货单
     */
    createPurchaseOrder = () => {
        axios.post('/api/create-purchase-order', {
            venderObjectId: '58ad917e2f301e006be64e14',
            orderId: '0002',
            note: 'yyo',
            items: [
                {
                    shoeObjectId: '58ae51b6ac502e0069bd9830',
                    s34: 1,
                    s35: 1,
                    s36: 1,
                    s37: 1,
                    s38: 1,
                    s39: 1,
                    s40: 1,
                    s41: 1,
                    s42: 1,
                    s43: 1,
                    s44: 1
                },
                {
                    shoeObjectId: '58ad8aba5c497d005f7d24da',
                    s34: 1,
                    s35: 1,
                    s36: 1,
                    s37: 1,
                    s38: 1,
                    s39: 1,
                    s40: 1,
                    s41: 1,
                    s42: 1,
                    s43: 1,
                    s44: 1
                }
            ]
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 展示所有进货单
     */
    showPurchaseOrders = () => {
        axios.get('/api/show-purchase-orders')
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    /**
     * 展示进货单详情
     */
    showPurchaseOrderItems = () => {
        axios.get('/api/show-purchase-order-items', {
            params: { id: '58ae5741ac502e006c88fe95' }
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 更新进货单备注
     */
    updatePurchaseNote = () => {
        axios.post('/api/update-purchase-note', {
            orderId: '58ae5741ac502e006c88fe95',
            note: 'yahahahahaha'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 更新进货单详情
     */
    updatePurchaseOrder = () => {
        axios.post('/api/update-purchase-order', {
            orderId: '58ae5741ac502e006c88fe95'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
            <div className='test-view'>
                <Button onClick={this.logIn}>Log In</Button>
                <Button onClick={this.logOut}>Log Out</Button>
                <Button onClick={this.createShoe}>Create Shoe</Button>
                <Button onClick={this.updateShoe}>Update Shoe</Button>
                <Button onClick={this.delShoe}>Delete Shoe</Button>
                <Button onClick={this.showShoes}>Show Shoes</Button>
                <Button onClick={this.createClient}>Create Client</Button>
                <Button onClick={this.updateClient}>Update Client</Button>
                <Button onClick={this.delClient}>Delete Client</Button>
                <Button onClick={this.showClients}>Show Clients</Button>
                <Button onClick={this.createVender}>Create Vender</Button>
                <Button onClick={this.updateVender}>Update Vender</Button>
                <Button onClick={this.delVender}>Delete Vender</Button>
                <Button onClick={this.showVenders}>Show Venders</Button>
                <Button onClick={this.createPurchaseOrder}>Create Purchase Order</Button>
                <Button onClick={this.showPurchaseOrders}>Show Purchase Orders</Button>
                <Button onClick={this.showPurchaseOrderItems}>Show Purchase Order Items</Button>
                <Button onClick={this.updatePurchaseNote}>Update Purchase Note</Button>
                <Button onClick={this.updatePurchaseOrder}>Update Purchase Order</Button>
            </div>
        );
    }
}
