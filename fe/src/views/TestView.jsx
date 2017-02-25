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
            shoeId: '1106',
            brand: 'banasi',
            color: 'spark',
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
                    shoeObjectId: '58afcabeac502e006c9213a6',
                    sizes: {
                        s34: 1,
                        s35: 1,
                        s36: 1
                    }
                },
                {
                    shoeObjectId: '58afcadf5c497d0067797195',
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
                    shoeObjectId: '58afca3b128fe1006cb07ca4',
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
    showPurchaseOrderItems = () => {
        axios.get('/api/show-purchase-order-items', {
            params: { id: '58b04fa75c497d00677d801b' }
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
            orderId: '58b10e94128fe1006cc2f18d',
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
            orderObjectId: '58b17fca8ac24728d5419af1',
            changedItems: [
                // {
                //     itemId: '58b17fca1b69e60058a92155',
                //     sizes: {
                //         s34: 1,
                //         s35: 1,
                //         s36: 1
                //     }
                // },
                // {
                //     itemId: '58b17fca1b69e60058a92156',
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
                    itemId: '58b17fca1b69e60058a92157',
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
     * 删除
     */
    deletePurchaseOrder = () => {
        axios.get('/api/del-purchase-order', {
            params: { id: '58b1131f128fe1006cc33487' }
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
                    shoeObjectId: '58afcadf5c497d0067797195',
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
                    shoeObjectId: '58afcabeac502e006c9213a6',
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
                    shoeObjectId: '58afcaf1128fe1006cb088c2',
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
    showDeliveryOrderItems = () => {
        axios.get('/api/show-delivery-order-items', {
            params: { orderObjectId: '58b1222b8d6d810057e622d2' }
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
            orderObjectId: '58b1900eb123db0052c6b923',
            changedItems: [
                // {
                //     itemId: '58b1900eb123db0052c6b91f',
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
                //     itemId: '58b1900eb123db0052c6b920',
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
                    itemId: '58b1900eb123db0052c6b921',
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
                <Button onClick={this.deletePurchaseOrder}>Delete Purchase Order</Button>
                <Button onClick={this.createDeliveryOrder}>Create Delivery Order</Button>
                <Button onClick={this.showDeliveryOrderItems}>Show Delivery Order Items</Button>
                <Button onClick={this.updateDeliveryOrder}>Update Delivery Order</Button>
            </div>
        );
    }
}
