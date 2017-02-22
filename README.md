# Node.js Getting started
在 LeanCloud 云引擎上使用 Express 的 Node.js 实例项目。

## Goals
* [ ] 确定原型
* [ ] 数据表
* [ ] 框架
 - How to figure out `containers` and `components`

## Schemas

* Stock (库存)
 - shoeid (string, 型号)
 - brand (stirng, 品牌)
 - color (stirng, 颜色)
 - user (pointer, _User)
 - purchased (number, 进货量)
 - deliveried (number, 出货量)
 - returns (number, 退货量)
 - sizes (object, 尺码)
   - s34-s34 (number)

* Client (客户)
 - name (string)
 - mobilephone (number, 移动电话)
 - telephone (number, 固定电话)
 - address (string, 地址)
 - user (pointer, _User)

* PurchaseOrder (进货单)
 - user (pointer, _User)
 - orderid (string, 进货单编号)
 - vender (stirng, 厂家)
 - createdAt (生成时间)
 - items (relations, PurchaseItems)

* PurchaseItems (进货项)
 - shoeType (pointer, Stock)
 - sizes (object, 尺码)
   * s34-s44
     - needed (number, 需要的进货)
     - sent (number, 已到的进货)

* DeliveryOrder (进货单)
 - orderid (string, 进货单编号)
 - createdAt (生成时间)
 - user (pointer, _User)
 - client (pointer, Client)
 - items (relations, 出货单项)
 - count (number, 进货单总价值，由items的单价和数量决定)
 - paid (number, 已付金额)
 - notyetCount (number, 欠货价值，可用于还款)
 - used (boolean, 是否已经用于还款)
 - isSentAll (boolean, 是否已经全部发货)
 - reliedDelivery: (relations, DeliveryOrder, 用于归还此订单的金额的进货单)
 - reliedReturns (relations, ReturnsLog, 用于归还此订单的金额的退货记录)
 - isRetailed (boolean, 是否零售，如果是，则该订单的items长度应为1，且该订单的items只支持换)
 - 该进货单的欠货能否还此订单的欠款？

* DeliveryItems (进货单项)
 - shoeType (pointer, stock)
 - sizes (object, 尺码)
   * s34-s44
     - notyet (number, 未发货的数量)
     - delivered (number, 已发货的数量)
     - unitprice (number, 单价)

* ReturnsOrder (退货单)
 - user (pointer, _User)
 - client (pointer, Client)
 - items (relations, ReturnsItems)
 - createdAt
 - count (number, 该退货记录的价值, 由退货的单价和数量决定)
 - used (是否用来还款)

* ReturnsItems (退货单项)
 - shoeType (pointer, Stock)
 - sizes (object, 尺码)
   * s34-s44
     - pairs (number, 数量)
     - unitprice (number, 单价)

## 一键部署
[![Deploy to LeanEngine](http://ac-32vx10b9.clouddn.com/109bd02ee9f5875a.png)](https://leancloud.cn/1.1/engine/deploy-button)

## 本地运行

首先确认本机已经安装 [Node.js](http://nodejs.org/) 运行环境和 [LeanCloud 命令行工具](https://leancloud.cn/docs/leanengine_cli.html)，然后执行下列指令：

```
$ git clone https://github.com/leancloud/node-js-getting-started.git
$ cd node-js-getting-started
```

安装依赖：

```
npm install
```

登录并关联应用：

```
lean login
lean checkout
```

启动项目：

```
lean up
```

之后你就可以在 [localhost:3000](http://localhost:3000) 访问到你的应用了。

## 部署到 LeanEngine

部署到预备环境（若无预备环境则直接部署到生产环境）：
```
lean deploy
```

## 相关文档

* [云函数开发指南](https://leancloud.cn/docs/leanengine_cloudfunction_guide-node.html)
* [网站托管开发指南](https://leancloud.cn/docs/leanengine_webhosting_guide-node.html)
* [JavaScript 开发指南](https://leancloud.cn/docs/leanstorage_guide-js.html)
* [JavaScript SDK API](https://leancloud.github.io/javascript-sdk/docs/)
* [Node.js SDK API](https://github.com/leancloud/leanengine-node-sdk/blob/master/API.md)
* [命令行工具使用指南](https://leancloud.cn/docs/cloud_code_commandline.html)
* [云引擎常见问题和解答](https://leancloud.cn/docs/leanengine_faq.html)
