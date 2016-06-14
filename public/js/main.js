/**
* @file 主要的js文件
* @author Sid
*
*/

/**
* 绑定应用
*/
var APP_ID = 'qhkXeU7Q1EA3Nyr27ruDqYdf-gzGzoHsz';
var APP_KEY = 'nAiDCK62B8tA3zaBwE7zJNqM';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var uid = $("#uid").text();
var ClientObject = AV.Object.extend('Client');
var OrderObject = AV.Object.extend('Order');
var ShoeObject = AV.Object.extend('Shoe');

$.extend( true, $.fn.dataTable.defaults, {
    "info": false,
    "infoFiltered": false
} );

/**
* 获取搜索结果
*
* @param {String} schema 待查询的表格
* @param {Array} conArr 条件数组 [['uid', 'mingyou'], ['client': 'wang']]
* @return {AV.query} query 返回搜查结果
*/
function getQuery (schema, conArr) {
    var queryArr = [];
    var tmp = '';
    $.each(conArr, function(i, e) {
        queryArr[i] = new AV.Query(schema);
        queryArr[i].equalTo(e[0], e[1]);
    });
    return AV.Query.and.apply(null, queryArr);
}

/**
* 获取鞋子各项属性的总数
*/
function getCount () {

}

/**
* 库存板块
*
*/
function shoeEvent () {
    // 添加鞋子
    $("#a_color").blur(function(){
        var brand = $("#a_brand").val();
        var shoeid = $("#a_id").val();
        var color = $("#a_color").val();

        var query = getQuery('Shoe', [['brand', brand], ['shoeid', shoeid], ['color', color]]);
        query.count().then(function(result) {
            if (result) {
                $("#add_info").text("已存在该鞋子");
                $("#new_a_brand").removeClass("has-success");
                $("#new_a_brand").addClass("has-error");
                $("#new_a_id").removeClass("has-success");
                $("#new_a_id").addClass("has-error");
                $("#new_a_color").removeClass("has-success");
                $("#new_a_color").addClass("has-error");
            } else {
                $("#add_info").text("");
                $("#new_a_brand").removeClass("has-error");
                $("#new_a_brand").addClass("has-success");
                $("#new_a_id").removeClass("has-error");
                $("#new_a_id").addClass("has-success");
                $("#new_a_color").removeClass("has-error");
                $("#new_a_color").addClass("has-success");
            }
        }, function(error) {
            $("#fails").text("后台处理失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
        });
    });

    $("#add").on('click',function(){
        var brand = $("#a_brand").val(),shoeid = $("#a_id").val(),color = $("#a_color").val(),s34 = $("#a_s34").val(),
        s35 = $("#a_s35").val(),s36 = $("#a_s36").val(),s37 = $("#a_s37").val(),s38 = $("#a_s38").val(),
        s39 = $("#a_s39").val(),s40 = $("#a_s40").val(),s41 = $("#a_s41").val(),s42 = $("#a_s42").val(),
        s43 = $("#a_s43").val(),s44 = $("#a_s44").val();
        var number = Number(s34) + Number(s35) + Number(s36) +
                     Number(s37) + Number(s38) + Number(s39) +
                     Number(s40) + Number(s41) + Number(s42) +
                     Number(s43) + Number(s44);
        var returns = 0, exportation = 0;

        var params = {
            uid: uid,
            brand: brand,
            shoeid: shoeid,
            color: color,
            s34: s34,
            s35: s35,
            s36: s36,
            s37: s37,
            s38: s38,
            s39: s39,
            s40: s40,
            s41: s41,
            s42: s42,
            s43: s43,
            s44: s44,
            number: String(number),
            returns: String(returns),
            exportation: String(exportation),
        };

        var query = getQuery('Shoe', [['brand', brand], ['shoeid', shoeid], ['color', color]]);
        query.count().then(function(result) {
            if (result) {
                $("#fails").text("添加信息失败！已存在该鞋子").slideToggle('slow');
                $("#fails").delay(3000).slideToggle('slow');
            } else {
                var shoeObject = new ShoeObject();
                $.each(params, function(k, v) {
                    shoeObject.set(k, v);
                });
                shoeObject.save().then(function(shoeObject) {
                    getCount();
                    $("#works").text("添加信息成功！").slideToggle('slow');
                    $("#works").delay(3000).slideToggle('slow');
                }, function(error) {
                    $("#fails").text("后台处理失败！").slideToggle('slow');
                    $("#fails").delay(3000).slideToggle('slow');
                });
            }
        });
    });

    // 退货
    $("#r_color").blur(function(){
        var params = {
            brand: $("#r_brand").val(),
            shoeid: $("#r_id").val(),
            color: $("#r_color").val()
        };

        var query = getQuery('Shoe', [['brand', params.brand], ['shoeid', params.shoeid], ['color', params.color]]);
        query.count().then(function(result) {
            if (result) {
                $("#return_info").text("");
                $("#input_r_brand").removeClass("has-error");
                $("#input_r_brand").addClass("has-success");
                $("#input_r_id").removeClass("has-error");
                $("#input_r_id").addClass("has-success");
                $("#input_r_color").removeClass("has-error");
                $("#input_r_color").addClass("has-success");
            } else {
                $("#return_info").text("不存在该鞋子信息，请先添加");
                $("#input_r_brand").removeClass("has-success");
                $("#input_r_brand").addClass("has-error");
                $("#input_r_id").removeClass("has-success");
                $("#input_r_id").addClass("has-error");
                $("#input_r_color").removeClass("has-success");
                $("#input_r_color").addClass("has-error");
            }
        }, function(error) {
            $("#return_info").text("后台错误");
        });

    });
}

/**
* 客人板块
*
*/
function clientEvent() {
    // 添加用户
    $("#ac_name").blur(function(){
      var name = $("#ac_name").val();
      if (!name){
        $("#new_client_name").addClass("has-error");
        $("#add_client_info").text("客户姓名不能为空");
      } else {
          var query = getQuery('Client', [['uid', uid], ['name', name]]);
          query.count().then(function(result) {
              if (result) {
                  $("#add_client_info").text("已存在该客户");
                  $("#new_client_name").removeClass("has-success");
                  $("#new_client_name").addClass("has-error");
              } else {
                  $("#add_client_info").text("");
                  $("#new_client_name").removeClass("has-error");
                  $("#new_client_name").addClass("has-success");
              }
          }, function(error) {
              $("#fails").text("后台处理失败！").slideToggle('slow');
              $("#fails").delay(3000).slideToggle('slow');
          });
      }
    });

    $("#add_client").on('click',function() {
        var params = {
            uid: uid,
            name: $("#ac_name").val(),
            telephone: $("#ac_telephone").val(),
            mobilephone: $("#ac_mobilephone").val(),
            address: $("#ac_address").val(),
        };
        var query = getQuery('Client', [['uid', params.uid], ['name', params.name]]);
        query.count().then(function(result) {
            if (result) {
                $("#fails").text("添加客户信息失败！错误原因：已存在该用户").slideToggle('slow');
                $("#fails").delay(3000).slideToggle('slow');
            } else {
                var clientObject = new ClientObject();
                $.each(params, function(k, v) {
                    clientObject.set(k, v);
                });
                clientObject.save().then(function(clientObject) {
                    $("#works").text("添加客户信息成功！").slideToggle('slow');
                    $("#works").delay(3000).slideToggle('slow');
                }, function(error) {
                    $("#fails").text("后台处理失败！").slideToggle('slow');
                    $("#fails").delay(3000).slideToggle('slow');
                });
            }
        });
    });
}

clientEvent();
shoeEvent();
