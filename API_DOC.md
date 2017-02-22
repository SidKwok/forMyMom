# All of apis

## Limits
* 添加，修改，删除，都用 post
* 查询用get
* 对于所有项目都不应该支持批量删除
* 标注later的表示先不实现
* 删除操作应该是不让用户看到，但是数据库中还是有的

## apis

### 用户操作

- `/auth/login` (登陆) POST
  - username (string, 用户名)
  - password (string, 密码)

- `/auth/logout` (登出) POST
  - none

### 库存操作

- `/api/create-shoe` (添加鞋子) POST
  - shoeid (string, 型号)
  - brand (string, 品牌)
  - color (string, 颜色)
  - sizes (object, 尺码)
    - s34-s34 (number)

- `/api/update-shoe` (更新鞋子) post
  - id (objectid)
  - sizes (object, 尺码)
    - s34-s34 (number)

- `/api/del-shoe` (删除鞋子，应该尽量避免) post
  - id (objectid, required)

- `/api/search-shoe` (根据条件查看鞋子，条件为空则显示全部, later) get
  - page (number, 页码)
  - pageCount (number, 每页容纳数)
  - sort (number, -1: 降序, 1: 升序)
  - shoeid (string, 型号)
  - brand (string, 品牌)
  - color (string, 颜色)

- `/api/show-all-shoes` (展示所有鞋子)

### 客户操作

- `/api/create-client` (新建客户) post
  - name (string, 姓名, required)
  - mobilephone (number, 移动电话)
  - telephone (number, 固定电话)
  - address (string, 地址)
  - note (string, 备注)

- `/api/update-client` (更新客户) post
  - name (string, 姓名)
  - mobilephone (number, 移动电话)
  - telephone (number, 固定电话)
  - address (string, 地址)
  - note (string, 备注)

- `/api/del-client` (删除客户，尽量避免) post
  - clientid (objectid)

- `/api/search-client` (查询客户, 条件为空则显示全部, later) get
  - name (string, 姓名, 不能修改这个)
  - mobilephone (number, 移动电话)
  - telephone (number, 固定电话)
  - address (string, 地址)

- `/api/show-all-clients` (展示所有用户) get

### 厂家操作 (与客户操作基本一致)

- `/api/create-vender` (新建厂家) post
  - name (string, 姓名, required)
  - mobilephone (number, 移动电话)
  - telephone (number, 固定电话)
  - address (string, 地址)
  - note (string, 备注)

- `/api/update-vender` (更新厂家) post
  - name (string, 姓名)
  - mobilephone (number, 移动电话)
  - telephone (number, 固定电话)
  - address (string, 地址)
  - note (string, 备注)

- `/api/del-vender` (删除厂家，尽量避免) post
  - venderid (objectid)

- `/api/search-vender` (查询厂家, 条件为空则显示全部, later) get
  - name (string, 姓名, 不能修改这个)
  - mobilephone (number, 移动电话)
  - telephone (number, 固定电话)
  - address (string, 地址)

- `/api/show-all-venders` (展示所有厂家) get

### 进货单操作

- `/api/create-purchase-order` (新建进货单) post
  - vender (objectid)
  - orderid (string, 进货单号, unique)
  - note (string, 备注)
  - items (object, 进货单项)
    - {id(shoe, objectid), s34-s34: {needed: number, sent: number}}

- `/api/update-purchase-order` (更新进货单，修改了sent的话库存会有变化) post
  - id (objectid)
  - note (string, 备注)
  - items (object, 进货单项)
    - {id(shoe, objectid), s34-s34: {needed: number, sent: sent}}

- `/api/del-purchase-order` (删除进货单，同时询问是否将库存的数据还原为该单进货之前) post
  - id (objectid)
  - isReset (boolean, 是否还原)

### 出货单操作

- `/api/create-delivery-order` (新建出货单) post
  - client (objectid)
  - isRetail (boolean, 是否零售)
  - orderid (string, 出货单号，unique)
  - note (string，备注)
  - items (object, 出货单项)
    - {id(shoe, objectid), unitprice: number, s34-s34: {notyet: number, delivered: number}}

- `/api/update-delivery-order` (更新出货单，可用于一般信息例如note的修改，修改notyet会影响出货单总额，修改delivered会影响应付总额，修改unitprice会影响所有的金额，出货、修改出货单的接口都是这个) post
  - id (objectid)
  - note (string，备注)
  - items (object)
   - {id(shoe, objectid), unitprice: number, s34-s34: {notyet: number, delivered: number}}

- `/api/pay-delivery-order` (支付出货单) post
  - id (object, 支付哪一张出货单)
  - reliedDelivery (Array, 用哪些有余额的出货单支付)
  - reliedReturns (Array, 用哪些退货单支付)
  - cash (number, 现金支付的数量)

- `/api/del-delivery-order` (删除出货单，later) post
  - id (object)