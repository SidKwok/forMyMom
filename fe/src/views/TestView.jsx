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
            color: 'white',
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
            stockObjectId: '58b1068c570c35006921cbaf',
            sizes: {
                s42: 9,
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
            stockObjectId: '58b1068c570c35006921cbaf'
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
            name: 'mingen',
            mobilephone: '5201314',
            telephone: '1314520',
            address: '浙江',
            note: 'love'
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
            clientObjectId: '58b0fbdd5c497d006780897f',
            address: '虎门',
            mobilephone: '13580707233',
            telephone: '85245077',
            note: 'love sid'
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
            clientObjectId: '58b0fbdd5c497d006780897f'
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
            name: '巴纳斯',
            mobilephone: '110',
            telephone: '120',
            address: '浙江',
            note: 'heyhey'
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
            venderObjectId: '58b100a28fd9c50063d1297e',
            address: '新疆',
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
            venderObjectId: '58b100a28fd9c50063d1297e'
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
            venderObjectId: '58ad90d5b123db00672fc72b',
            orderId: '0007',
            note: 'yyohoho',
            isRetail: false,
            items: [
                {
                    shoeObjectId: '58b78c20a22b9d005ecda087',
                    sizes: {
                        s34: 1,
                        s35: 1,
                        s36: 1
                    }
                },
                {
                    shoeObjectId: '58b78c0d128fe1007e3a06a9',
                    sizes: {
                        s37: 1,
                        s38: 1,
                        s39: 1,
                        s40: 1,
                        s41: 1,
                        s42: 1,
                        s43: 1
                    }
                },
                {
                    shoeObjectId: '58b78be3ac502e006bc59739',
                    sizes: {
                        s37: 2,
                        s38: 2,
                        s39: 2,
                        s40: 2,
                        s41: 2
                    }
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
    showPurchaseItems = () => {
        axios.get('/api/show-purchase-items', {
            params: { orderObjectId: '58b788b88d6d810065264291' }
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
            orderObjectId: '58b10e94128fe1006cc2f18d',
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
        axios.post('/api/purchase-to-stock', {
            orderObjectId: '58b78c5d1b69e6006b051195',
            changedItems: [
                // {
                //     itemId: '58b78c5d1b69e6006b051198',
                //     sizes: {
                //         s34: 1,
                //         s35: 1,
                //         s36: 1
                //     }
                // },
                // {
                //     itemId: '58b78c5d1b69e6006b051199',
                //     sizes: {
                //         s37: 1,
                //         s38: 1,
                //         s39: 1,
                //         s40: 1,
                //         s41: 1,
                //         s42: 1,
                //         s43: 1
                //     }
                // },
                {
                    itemId: '58b78c5d1b69e6006b05119a',
                    sizes: {
                        s37: 1,
                        s38: 1,
                        s39: 1,
                        s40: 1,
                        s41: 1
                    }
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
     * 删除出货单
     */
    deletePurchaseOrder = () => {
        axios.get('/api/del-purchase-order', {
            params: { orderObjectId: '58b1131f128fe1006cc33487' }
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 新建出货单
     */
    createDeliveryOrder = () => {
        axios.post('/api/create-delivery-order', {
            clientObjectId: '58afb0c3b123db0052baa4d3',
            orderId: '0001',
            note: 'yyohoho',
            items: [
                {
                    shoeObjectId: '58b78be3ac502e006bc59739',
                    unitPrice: 30,
                    sizes: {
                        s39: 1,
                        s40: 1,
                        s41: 1,
                        s42: 1,
                        s43: 1,
                        s44: 1
                    }
                },
                {
                    shoeObjectId: '58b78c0d128fe1007e3a06a9',
                    unitPrice: 40,
                    sizes: {
                        s36: 1,
                        s37: 1,
                        s38: 1,
                        s39: 1,
                        s40: 1,
                        s41: 1
                    }
                },
                {
                    shoeObjectId: '58b78c20a22b9d005ecda087',
                    unitPrice: 50,
                    sizes: {
                        s39: 2,
                        s40: 2,
                        s41: 2,
                        s42: 2
                    }
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
     * 展示出货单详情
     */
    showDeliveryItems = () => {
        axios.get('/api/show-delivery-items', {
            params: { orderObjectId: '58b792272f301e006c4f43c8' }
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 更新出货单详情
     */
    updateDeliveryOrder = () => {
        axios.post('/api/stock-to-delivery', {
            orderObjectId: '58b792272f301e006c4f43c8',
            changedItems: [
                // {
                //     itemId: '58b79227ac502e006cfd3da9',
                //     sizes: {
                //         s39: 1,
                //         s40: 1,
                //         s41: 1,
                //         s42: 1,
                //         s43: 1,
                //         s44: 1
                //     }
                // },
                // {
                //     itemId: '58b79227ac502e006cfd3daa',
                //     sizes: {
                //         s36: 1,
                //         s37: 1,
                //         s38: 1,
                //         s39: 1,
                //         s40: 1,
                //         s41: 1
                //     }
                // },
                {
                    itemId: '58b79227ac502e006cfd3dab',
                    sizes: {
                        s39: 1,
                        s40: 1,
                        s41: 1,
                        s42: 1
                    }
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
     * 删除进货单
     */
    deleteDeliveryOrder = () => {
        axios.get('/api/del-delivery-order', {
            params: { orderObjectId: '58b25190570c3500696ba9f8' }
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
    updateDeliveryNote = () => {
        axios.post('/api/update-delivery-note', {
            orderObjectId: '58b1900eb123db0052c6b923',
            note: 'this is delivery note'
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 新建退货单
     */
    createReturnsOrder = () => {
        axios.post('/api/create-returns-order', {
            clientObjectId: '',
            note: 'returns order',
            items: [
                {
                    shoeObjectId: '58b78c20a22b9d005ecda087',
                    unitPrice: 20,
                    sizes: {
                        s34: 1,
                        s35: 1,
                        s36: 1,
                        s37: 1
                    }
                },
                {
                    shoeObjectId: '58b78c0d128fe1007e3a06a9',
                    unitPrice: 30,
                    sizes: {
                        s38: 1,
                        s39: 1,
                        s40: 1,
                        s41: 1
                    }
                },
                {
                    shoeObjectId: '58b78be3ac502e006bc59739',
                    unitPrice: 40,
                    sizes: {
                        s41: 1,
                        s42: 1,
                        s43: 1,
                        s44: 1
                    }
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
     * 完成退货单
     */
    doneReturnsOrder = () => {
        axios.get('/api/done-returns-order', {
            params: { orderObjectId: '58b795038ac24766f55fde9c' }
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 删除退货单
     */
    deleteReturnsOrder = () => {
        axios.get('/api/del-returns-order', {
            params: { orderObjectId: '58b795038ac24766f55fde9c' }
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 展示退货单详情
     */
    showReturnsItems = () => {
        axios.get('/api/show-returns-items', {
            params: { orderObjectId: '58b795038ac24766f55fde9c' }
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    /**
     * 修改退货单
     */
    updateReturnsOrder = () => {
        axios.post('/api/update-returns-order', {
            orderObjectId: '58b7b267ac502e006cfe2dc1',
            note: 'yay',
            changedItems: [
                {
                    itemId: '58b7b2688fd9c55539eeb024',
                    unitPrice: 30,
                    sizes: {
                        s41: 1,
                        s42: 1,
                        s43: 1,
                        s44: 1
                    }
                },
                {
                    itemId: '58b7b2688fd9c55539eeb023',
                    unitPrice: 20,
                    sizes: {
                        s38: 2,
                        s39: 2,
                        s40: 2,
                        s41: 2
                    }
                },
                {
                    itemId: '58b7b2688fd9c55539eeb022',
                    unitPrice: 10,
                    sizes: {}
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
    render() {
        return (
            <div className='test-view'>
                <Button onClick={this.logIn}>Log In</Button>
                <Button onClick={this.logOut}>Log Out</Button>
                <br />
                <Button onClick={this.createShoe}>Create Shoe</Button>
                <Button onClick={this.updateShoe}>Update Shoe</Button>
                <Button onClick={this.delShoe}>Delete Shoe</Button>
                <Button onClick={this.showShoes}>Show Shoes</Button>
                <br />
                <Button onClick={this.createClient}>Create Client</Button>
                <Button onClick={this.updateClient}>Update Client</Button>
                <Button onClick={this.delClient}>Delete Client</Button>
                <Button onClick={this.showClients}>Show Clients</Button>
                <br />
                <Button onClick={this.createVender}>Create Vender</Button>
                <Button onClick={this.updateVender}>Update Vender</Button>
                <Button onClick={this.delVender}>Delete Vender</Button>
                <Button onClick={this.showVenders}>Show Venders</Button>
                <br />
                <Button onClick={this.createPurchaseOrder}>Create Purchase Order</Button>
                <Button onClick={this.showPurchaseOrders}>Show Purchase Orders</Button>
                <Button onClick={this.showPurchaseItems}>Show Purchase Items</Button>
                <Button onClick={this.updatePurchaseNote}>Update Purchase Note</Button>
                <Button onClick={this.updatePurchaseOrder}>Update Purchase Order</Button>
                <Button onClick={this.deletePurchaseOrder}>Delete Purchase Order</Button>
                <br />
                <Button onClick={this.createDeliveryOrder}>Create Delivery Order</Button>
                <Button onClick={this.showDeliveryItems}>Show Delivery Items</Button>
                <Button onClick={this.updateDeliveryOrder}>Update Delivery Order</Button>
                <Button onClick={this.deleteDeliveryOrder}>Delete Delivery Order</Button>
                <Button onClick={this.updateDeliveryNote}>Update Delivery Note</Button>
                <br />
                <Button onClick={this.createReturnsOrder}>Create Returns Order</Button>
                <Button onClick={this.doneReturnsOrder}>Done Returns Order</Button>
                <Button onClick={this.deleteReturnsOrder}>delete Returns Order</Button>
                <Button onClick={this.showReturnsItems}>show Returns Items</Button>
                <Button onClick={this.updateReturnsOrder}>update Returns Order</Button>
            </div>
        );
    }
}
