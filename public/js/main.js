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

var updateShoeTmp;
var deleteShowTmp;
var updateClientTmp;
var deleteClientTmp;
var updateOrderTmp;
var deleteOrderTmp;

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
* 展示板块
*/
// 库存表格
function loadShoe () {
    $('#shoes_table tbody').children().detach();
    var dataset = [];
    var query = getQuery('Shoe', [['uid', uid]]);
    query.limit(100);
    var gap = 0;
    query.count().then(function(count) {
        while (gap < count) {
            query.skip(gap);
            query.find().then(function(results) {
                $.each(results, function(i, e) {
                    dataset.push([
                        e.get('brand'),
                        e.get('shoeid'),
                        e.get('color'),
                        e.get('s34'),
                        e.get('s35'),
                        e.get('s36'),
                        e.get('s37'),
                        e.get('s38'),
                        e.get('s39'),
                        e.get('s40'),
                        e.get('s41'),
                        e.get('s42'),
                        e.get('s43'),
                        e.get('s44'),
                        e.get('number'),
                        e.get('returns'),
                        e.get('exportation'),
                        '<span style="cursor:pointer" class="fui-new" id="updateDlg" data-toggle="modal" data-target="#myUpdateModal">   </span>'+
                        ' '+'<span style="cursor:pointer" class="fui-trash" id="deleteDlg" data-toggle="modal" data-target="#myDeleteModal"></span>'
                    ]);
                });
                if (dataset.length === count) {
                    $('#shoes_table').DataTable({
                        paging: false,
                        language:{
                          sSearch:     "",
                          zeroRecords: "没有这鞋子啦！",
                          infoEmpty:   "还没有鞋子啦！",
                          paginate: {
                            previous:  "",
                            next:      "",
                          }
                        },
                        pagingType: "full_numbers",
                        data: dataset,
                        columns: [
                            {title: '品牌'},
                            {title: '型号', sortable: false},
                            {title: '颜色', sortable: false},
                            {title: '34', sortable: false},
                            {title: '35', sortable: false},
                            {title: '36', sortable: false},
                            {title: '37', sortable: false},
                            {title: '38', sortable: false},
                            {title: '39', sortable: false},
                            {title: '40', sortable: false},
                            {title: '41', sortable: false},
                            {title: '42', sortable: false},
                            {title: '43', sortable: false},
                            {title: '44', sortable: false},
                            {title: '数量'},
                            {title: '退货量'},
                            {title: '出货量'},
                            {title: '操作', sortable: false},
                        ]
                    });

                    $("#shoes_table_filter input").attr("placeholder","search");
                    $("#shoes_table_filter input").addClass("input-lg");
                    $("#shoes_table_first").removeClass("disabled");
                }
            });
            gap += 100;
        }
    });
}

// 客户表格
function loadClient () {
    $('#clients_table tbody').children().detach();
    var dataset = [];
    var query = getQuery('Client', [['uid', uid]]);
    query.limit(100);
    var gap = 0;
    query.count().then(function(count) {
        while (gap < count) {
            query.skip(gap);
            query.find().then(function(results) {
                $.each(results, function(i, e) {
                    dataset.push([
                        e.get('name'),
                        e.get('telephone'),
                        e.get('mobilephone'),
                        e.get('address'),
                        '<span style="cursor:pointer" class="fui-new" id="updateClientDlg" data-toggle="modal" data-target="#myUpdateClientModal">   </span>'+
                        ' '+'<span style="cursor:pointer" class="fui-trash" id="deleteClientDlg" data-toggle="modal" data-target="#myDeleteClientModal"></span>'
                    ]);
                });

                if (dataset.length === count) {
                    $('#clients_table').DataTable({
                        paging: false,
                        language:{
                          sSearch:     "",
                          zeroRecords: "没有这客户啦！",
                          infoEmpty:   "还没有客户啦！",
                          paginate: {
                            previous:  "",
                            next:      "",
                          }
                        },
                        pagingType: "full_numbers",
                        data: dataset,
                        columns: [
                            {title: '客&nbsp户&nbsp名'},
                            {title: '固&nbsp定&nbsp电&nbsp话', sortable: false},
                            {title: '移&nbsp动&nbsp电&nbsp话', sortable: false},
                            {title: '地&nbsp址', sortable: false},
                            {title: '操&nbsp作', sortable: false},
                        ]
                    });

                    $("#clients_table_filter input").attr("placeholder","search");
                    $("#clients_table_filter input").addClass("input-lg");
                    $("#clients_table_first").removeClass("disabled");
                }
            });
            gap += 100;
        }
    });
}

// 订单表格
function loadOrder () {
    $('#order_table tbody').children().detach();
    var dataset = [];
    var query = getQuery('Order', [['uid', uid]]);
    query.limit(1000);
    var gap = 0;
    query.count().then(function(count) {
        while (gap < count) {
            query.skip(gap);
            query.find().then(function(results) {
                $.each(results, function(i, e) {
                    dataset.push([
                        e.get('no'),
                        e.get('date'),
                        e.get('name'),
                        e.get('brand'),
                        e.get('shoeid'),
                        e.get('color'),
                        e.get('s34'),
                        e.get('s35'),
                        e.get('s36'),
                        e.get('s37'),
                        e.get('s38'),
                        e.get('s39'),
                        e.get('s40'),
                        e.get('s41'),
                        e.get('s42'),
                        e.get('s43'),
                        e.get('s44'),
                        e.get('number'),
                        e.get('state'),
                        '<span style="cursor:pointer" class="fui-new" id="updateOrderDlg" data-toggle="modal" data-target="#myUpdateOrderModal">   </span>'+
                        ' '+'<span style="cursor:pointer" class="fui-trash" id="deleteOrderDlg" data-toggle="modal" data-target="#myDeleteOrderModal"></span>'
                    ]);
                });
                if (dataset.length === count) {
                    $('#order_table').DataTable({
                        paging: false,
                        language:{
                          sSearch:     "",
                          zeroRecords: "没有这订单啦！",
                          infoEmpty:   "还没有订单啦！",
                          paginate: {
                            previous:  "",
                            next:      "",
                          }
                        },
                        pagingType: "full_numbers",
                        data: dataset,
                        columns: [
                            {title: '订&nbsp单&nbsp号'},
                            {title: '日&nbsp期'},
                            {title: '客&nbsp户'},
                            {title: '品&nbsp牌'},
                            {title: '型&nbsp号', sortable: false},
                            {title: '颜&nbsp色', sortable: false},
                            {title: '34', sortable: false},
                            {title: '35', sortable: false},
                            {title: '36', sortable: false},
                            {title: '37', sortable: false},
                            {title: '38', sortable: false},
                            {title: '39', sortable: false},
                            {title: '40', sortable: false},
                            {title: '41', sortable: false},
                            {title: '42', sortable: false},
                            {title: '43', sortable: false},
                            {title: '44', sortable: false},
                            {title: '数&nbsp量'},
                            {title: '状&nbsp&nbsp&nbsp态', sortable: false},
                            {title: '操&nbsp&nbsp作', sortable: false},
                        ]
                    });

                    $("#order_table_filter input").attr("placeholder","search");
                    $("#order_table_filter input").addClass("input-lg");
                    $("#order_table_first").removeClass("disabled");
                }
            });
            gap += 1000;
        }
    });
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

        var query = getQuery('Shoe', [['uid', uid], ['brand', brand], ['shoeid', shoeid], ['color', color]]);
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

        var query = getQuery('Shoe', [['uid', uid], ['brand', brand], ['shoeid', shoeid], ['color', color]]);
        query.count().then(function(result) {
            if (result) {
                $("#fails").text("添加信息失败！已存在该鞋子").slideToggle('slow');
                $("#fails").delay(3000).slideToggle('slow');
            } else {
                var shoeObject = new ShoeObject();
                $.each(params, function(k, v) {
                    shoeObject.set(k, v);
                });
                return shoeObject.save();
            }
        })
        .then(function(shoeObject) {
            var row = [
                shoeObject.get('brand'),
                shoeObject.get('shoeid'),
                shoeObject.get('color'),
                shoeObject.get('s34'),
                shoeObject.get('s35'),
                shoeObject.get('s36'),
                shoeObject.get('s37'),
                shoeObject.get('s38'),
                shoeObject.get('s39'),
                shoeObject.get('s40'),
                shoeObject.get('s41'),
                shoeObject.get('s42'),
                shoeObject.get('s43'),
                shoeObject.get('s44'),
                shoeObject.get('number'),
                shoeObject.get('returns'),
                shoeObject.get('exportation'),
                '<span style="cursor:pointer" class="fui-new" id="updateDlg" data-toggle="modal" data-target="#myUpdateModal">   </span>'+
                ' '+'<span style="cursor:pointer" class="fui-trash" id="deleteDlg" data-toggle="modal" data-target="#myDeleteModal"></span>'
            ];
            $('#shoes_table').DataTable().row.add(row).draw(false);
            getCount();
            $("#works").text("添加信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
        })
        .catch(function() {
            $("#fails").text("后台处理失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
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
    $("#returns").on('click',function(){
        var brand = $("#r_brand").val(), shoeid = $("#r_id").val(), color = $("#r_color").val(), s34 = $("#r_s34").val(),
        s35 = $("#r_s35").val(), s36 = $("#r_s36").val(), s37 = $("#r_s37").val(), s38 = $("#r_s38").val(),
        s39 = $("#r_s39").val(), s40 = $("#r_s40").val(), s41 = $("#r_s41").val(), s42 = $("#r_s42").val(),
        s43 = $("#r_s43").val(), s44 = $("#r_s44").val();
        var returns = Number(s34)+Number(s35)+Number(s36)+
            Number(s37)+Number(s38)+Number(s39)+
            Number(s40)+Number(s41)+Number(s42)+
            Number(s43)+Number(s44);

        var query = getQuery('Shoe', [['uid', uid], ['brand', brand], ['shoeid', shoeid], ['color', color]]);
        query.find().then(function(result) {
            var shoe = AV.Object.createWithoutData('Shoe', result[0].id);
            var params = {
                s34: (parseInt(result[0].get('s34')) + parseInt(s34)).toString(),
                s35: (parseInt(result[0].get('s35')) + parseInt(s35)).toString(),
                s36: (parseInt(result[0].get('s36')) + parseInt(s36)).toString(),
                s37: (parseInt(result[0].get('s37')) + parseInt(s37)).toString(),
                s38: (parseInt(result[0].get('s38')) + parseInt(s38)).toString(),
                s39: (parseInt(result[0].get('s39')) + parseInt(s39)).toString(),
                s40: (parseInt(result[0].get('s40')) + parseInt(s40)).toString(),
                s41: (parseInt(result[0].get('s41')) + parseInt(s41)).toString(),
                s42: (parseInt(result[0].get('s42')) + parseInt(s42)).toString(),
                s43: (parseInt(result[0].get('s43')) + parseInt(s43)).toString(),
                s44: (parseInt(result[0].get('s44')) + parseInt(s44)).toString(),
                number: (parseInt(result[0].get('number')) + returns).toString(),
                returns: (parseInt(result[0].get('returns')) + returns).toString(),
            };
            $.each(params, function(k, v) {
                shoe.set(k, v);
            });
            return shoe.save();
        })
        .then(function() {
            getCount();
            $("#works").text("退货成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
        })
        .catch(function () {
            $("#fails").text("退货失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
        });
    });

    // 进货
    $("#i_color").blur(function(){
        var params = {
            brand: $("#i_brand").val(),
            shoeid: $("#i_id").val(),
            color: $("#i_color").val()
        };

        var query = getQuery('Shoe', [['brand', params.brand], ['shoeid', params.shoeid], ['color', params.color]]);
        query.count().then(function(result) {
            if (result) {
                $("#import_info").text("");
                $("#input_i_brand").removeClass("has-error");
                $("#input_i_brand").addClass("has-success");
                $("#input_i_id").removeClass("has-error");
                $("#input_i_id").addClass("has-success");
                $("#input_i_color").removeClass("has-error");
                $("#input_i_color").addClass("has-success");
            } else {
                $("#import_info").text("不存在该鞋子信息，请先添加");
                $("#input_i_brand").removeClass("has-success");
                $("#input_i_brand").addClass("has-error");
                $("#input_i_id").removeClass("has-success");
                $("#input_i_id").addClass("has-error");
                $("#input_i_color").removeClass("has-success");
                $("#input_i_color").addClass("has-error");
            }
        }, function(error) {
            $("#import_info").text("后台错误");
        });
    });

    $("#imports").on('click',function(){
      var brand = $("#i_brand").val(),shoeid = $("#i_id").val(),color = $("#i_color").val(),s34 = $("#i_s34").val(),
      s35 = $("#i_s35").val(),s36 = $("#i_s36").val(),s37 = $("#i_s37").val(),s38 = $("#i_s38").val(),
      s39 = $("#i_s39").val(),s40 = $("#i_s40").val(),s41 = $("#i_s41").val(),s42 = $("#i_s42").val(),
      s43 = $("#i_s43").val(),s44 = $("#i_s44").val();
      var importation = Number(s34)+Number(s35)+Number(s36)+
          Number(s37)+Number(s38)+Number(s39)+
          Number(s40)+Number(s41)+Number(s42)+
          Number(s43)+Number(s44);

          var query = getQuery('Shoe', [['uid', uid], ['brand', brand], ['shoeid', shoeid], ['color', color]]);
          query.find().then(function(result) {
              var shoe = AV.Object.createWithoutData('Shoe', result[0].id);
              var params = {
                  s34: (parseInt(result[0].get('s34')) + parseInt(s34)).toString(),
                  s35: (parseInt(result[0].get('s35')) + parseInt(s35)).toString(),
                  s36: (parseInt(result[0].get('s36')) + parseInt(s36)).toString(),
                  s37: (parseInt(result[0].get('s37')) + parseInt(s37)).toString(),
                  s38: (parseInt(result[0].get('s38')) + parseInt(s38)).toString(),
                  s39: (parseInt(result[0].get('s39')) + parseInt(s39)).toString(),
                  s40: (parseInt(result[0].get('s40')) + parseInt(s40)).toString(),
                  s41: (parseInt(result[0].get('s41')) + parseInt(s41)).toString(),
                  s42: (parseInt(result[0].get('s42')) + parseInt(s42)).toString(),
                  s43: (parseInt(result[0].get('s43')) + parseInt(s43)).toString(),
                  s44: (parseInt(result[0].get('s44')) + parseInt(s44)).toString(),
                  number: (parseInt(result[0].get('number')) + importation).toString(),
              };
              $.each(params, function(k, v) {
                  shoe.set(k, v);
              });
              return shoe.save();
          })
          .then(function() {
              getCount();
              $("#works").text("进货成功！").slideToggle('slow');
              $("#works").delay(3000).slideToggle('slow');
          })
          .catch(function() {
              $("#fails").text("进货失败！").slideToggle('slow');
              $("#fails").delay(3000).slideToggle('slow');
          });
    });

    // 出货
    $("#e_color").blur(function(){
        var params = {
            brand: $("#e_brand").val(),
            shoeid: $("#e_id").val(),
            color: $("#e_color").val()
        };

        var query = getQuery('Shoe', [['brand', params.brand], ['shoeid', params.shoeid], ['color', params.color]]);
        query.count().then(function(result) {
            if (result) {
                $("#export_info").text("");
                $("#input_e_brand").removeClass("has-error");
                $("#input_e_brand").addClass("has-success");
                $("#input_e_id").removeClass("has-error");
                $("#input_e_id").addClass("has-success");
                $("#input_e_color").removeClass("has-error");
                $("#input_e_color").addClass("has-success");
            } else {
                $("#export_info").text("不存在该鞋子信息，请先添加");
                $("#input_e_brand").removeClass("has-success");
                $("#input_e_brand").addClass("has-error");
                $("#input_e_id").removeClass("has-success");
                $("#input_e_id").addClass("has-error");
                $("#input_e_color").removeClass("has-success");
                $("#input_e_color").addClass("has-error");
            }
        }, function(error) {
            $("#export_info").text("后台错误");
        });
    });

    $("#export").bind('click',function(){
      var brand = $("#e_brand").val(),shoeid = $("#e_id").val(),color = $("#e_color").val(),s34 = $("#e_s34").val(),
      s35 = $("#e_s35").val(),s36 = $("#e_s36").val(),s37 = $("#e_s37").val(),s38 = $("#e_s38").val(),
      s39 = $("#e_s39").val(),s40 = $("#e_s40").val(),s41 = $("#e_s41").val(),s42 = $("#e_s42").val(),
      s43 = $("#e_s43").val(),s44 = $("#e_s44").val();
      var exportation = Number(s34)+Number(s35)+Number(s36)+
          Number(s37)+Number(s38)+Number(s39)+
          Number(s40)+Number(s41)+Number(s42)+
          Number(s43)+Number(s44);

          var query = getQuery('Shoe', [['uid', uid], ['brand', brand], ['shoeid', shoeid], ['color', color]]);
          query.find().then(function(result) {
              var shoe = AV.Object.createWithoutData('Shoe', result[0].id);
              var params = {
                  s34: (parseInt(result[0].get('s34')) - parseInt(s34)).toString(),
                  s35: (parseInt(result[0].get('s35')) - parseInt(s35)).toString(),
                  s36: (parseInt(result[0].get('s36')) - parseInt(s36)).toString(),
                  s37: (parseInt(result[0].get('s37')) - parseInt(s37)).toString(),
                  s38: (parseInt(result[0].get('s38')) - parseInt(s38)).toString(),
                  s39: (parseInt(result[0].get('s39')) - parseInt(s39)).toString(),
                  s40: (parseInt(result[0].get('s40')) - parseInt(s40)).toString(),
                  s41: (parseInt(result[0].get('s41')) - parseInt(s41)).toString(),
                  s42: (parseInt(result[0].get('s42')) - parseInt(s42)).toString(),
                  s43: (parseInt(result[0].get('s43')) - parseInt(s43)).toString(),
                  s44: (parseInt(result[0].get('s44')) - parseInt(s44)).toString(),
                  number: (parseInt(result[0].get('number')) - exportation).toString(),
                  exportation: (parseInt(result[0].get('exportation')) + exportation).toString(),
              };
              $.each(params, function(k, v) {
                  shoe.set(k, v);
              });
              return shoe.save();
          })
          .then(function() {
              getCount();
              $("#works").text("出货成功！").slideToggle('slow');
              $("#works").delay(3000).slideToggle('slow');
          })
          .catch(function() {
              $("#fails").text("出货失败！").slideToggle('slow');
              $("#fails").delay(3000).slideToggle('slow');
          });
      });

    // 更新鞋子
    $(document).on('click','#updateDlg',function(){
        var array = [];
        updateShoeTmp =  $(this).parents("tr").find('td');
        updateShoeTmp.each(function(i){
          array[i]=$(this).text();
        });
        $("#u_brand").attr("placeholder",array[0]);
        $("#u_id").attr("placeholder",array[1]);
        $("#u_color").attr("placeholder",array[2]);
        $("#u_s34").attr("placeholder",array[3]).val("");
        $("#u_s35").attr("placeholder",array[4]).val("");
        $("#u_s36").attr("placeholder",array[5]).val("");
        $("#u_s37").attr("placeholder",array[6]).val("");
        $("#u_s38").attr("placeholder",array[7]).val("");
        $("#u_s39").attr("placeholder",array[8]).val("");
        $("#u_s40").attr("placeholder",array[9]).val("");
        $("#u_s41").attr("placeholder",array[10]).val("");
        $("#u_s42").attr("placeholder",array[11]).val("");
        $("#u_s43").attr("placeholder",array[12]).val("");
        $("#u_s44").attr("placeholder",array[13]).val("");
        $("#u_returns").attr("placeholder",array[15]).val("");
        $("#u_exportation").attr("placeholder",array[16]).val("");
    });

    $("#update").on('click',function(){
        var brand = $("#u_brand").attr('placeholder'),shoeid = $("#u_id").attr('placeholder'),color = $("#u_color").attr('placeholder'),
        s34 = $("#u_s34").val(),s35 = $("#u_s35").val(),s36 = $("#u_s36").val(),s37 = $("#u_s37").val(),s38 = $("#u_s38").val(),
        s39 = $("#u_s39").val(),s40 = $("#u_s40").val(),s41 = $("#u_s41").val(),s42 = $("#u_s42").val(),
        s43 = $("#u_s43").val(),s44 = $("#u_s44").val(),returns = $("#u_returns").val(),exportation = $("#u_exportation").val();
        var number = Number(s34) + Number(s35) + Number(s36) +
                     Number(s37) + Number(s38) + Number(s39) +
                     Number(s40) + Number(s41) + Number(s42) +
                     Number(s43) + Number(s44);
        var params = {
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
        };
        var query = getQuery('Shoe', [['uid', uid], ['brand', brand], ['shoeid', shoeid], ['color', color]]);
        query.find().then(function(result) {
            var shoe = AV.Object.createWithoutData('Shoe', result[0].id);
            $.each(params, function(k, v) {
                shoe.set(k, v);
            });
            return shoe.save();
        })
        .then(function(result) {
            $(updateShoeTmp[3]).text(result.get('s34'));
            $(updateShoeTmp[4]).text(result.get('s35'));
            $(updateShoeTmp[5]).text(result.get('s36'));
            $(updateShoeTmp[6]).text(result.get('s37'));
            $(updateShoeTmp[7]).text(result.get('s38'));
            $(updateShoeTmp[8]).text(result.get('s39'));
            $(updateShoeTmp[9]).text(result.get('s40'));
            $(updateShoeTmp[10]).text(result.get('s41'));
            $(updateShoeTmp[11]).text(result.get('s42'));
            $(updateShoeTmp[12]).text(result.get('s43'));
            $(updateShoeTmp[13]).text(result.get('s44'));
            $(updateShoeTmp[14]).text(result.get('number'));
            $(updateShoeTmp[15]).text(result.get('returns'));
            $(updateShoeTmp[16]).text(result.get('exportation'));

            getCount();
            $("#works").text("更新信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
        })
        .catch(function() {
            $("#fails").text("更新信息失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
        });
    });

    // 删除鞋子
    $(document).on('click','#deleteDlg',function(){
        deleteShoeTmp = $(this).parents("tr");
        $('#myDeleteModal').attr('data-brand', $(deleteShoeTmp.find('td')[0]).text())
        $('#myDeleteModal').attr('data-shoeid', $(deleteShoeTmp.find('td')[1]).text())
        $('#myDeleteModal').attr('data-color', $(deleteShoeTmp.find('td')[2]).text())
    });

    $(document).on('click','#delete',function() {
        var brand = $('#myDeleteModal').attr('data-brand'),
            shoeid = $('#myDeleteModal').attr('data-shoeid'),
            color = $('#myDeleteModal').attr('data-color');
        var query = getQuery('Shoe', [['uid', uid], ['brand', brand], ['shoeid', shoeid], ['color', color]]);
        query.find().then(function(result) {
            var shoe = AV.Object.createWithoutData('Shoe', result[0].id);
            return shoe.destroy();
        })
        .then(function() {
            getCount();
            $(deleteShoeTmp).detach();
            $("#works").text("删除信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
        })
        .catch(function() {
            $("#fails").text("删除信息失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
        });
    })

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
                return clientObject.save();
            }
        })
        .then(function(clientObject) {
            var row = [
                clientObject.get('name'),
                clientObject.get('telephone'),
                clientObject.get('mobilephone'),
                clientObject.get('address'),
                '<span style="cursor:pointer" class="fui-new" id="updateClientDlg" data-toggle="modal" data-target="#myUpdateClientModal">   </span>'+
                ' '+'<span style="cursor:pointer" class="fui-trash" id="deleteClientDlg" data-toggle="modal" data-target="#myDeleteClientModal"></span>'
            ];
            $('#clients_table').DataTable().row.add(row).draw(false);
            $("#works").text("添加客户信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
        })
        .catch(function() {
            $("#fails").text("添加客户信息失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
        });
    });

    // 更新用户
    $(document).on('click','#updateClientDlg',function(){
      var array = [];
      updateClientTmp =  $(this).parents("tr").find('td');
      updateClientTmp.each(function(i){
        array[i]=$(this).text();
      });
      $("#uc_name").attr("placeholder",array[0]);
      $("#uc_telephone").attr("placeholder",array[1]).val("");
      $("#uc_mobilephone").attr("placeholder",array[2]).val("");
      $("#uc_address").attr("placeholder",array[3]).val("");
    });

    $("#update_client").on('click',function() {
        var params = {
            uid: uid,
            name: $("#uc_name").attr("placeholder"),
            telephone: $("#uc_telephone").val(),
            mobilephone: $("#uc_mobilephone").val(),
            address: $("#uc_address").val()
        };

        var query = getQuery('Client', [['uid', uid], ['name', params.name]]);
        query.find().then(function(result) {
            var client = AV.Object.createWithoutData('Client', result[0].id);
            $.each(params, function(k, v) {
                client.set(k, v);
            });
            return client.save();
        })
        .then(function(result) {
            $(updateClientTmp[1]).text(result.get('telephone'));
            $(updateClientTmp[2]).text(result.get('mobilephone'));
            $(updateClientTmp[3]).text(result.get('address'));
            $("#works").text("更新客户信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
        })
        .catch(function() {
            $("#fails").text("更新客户信息失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
        });
    });

    // 删除用户
    $(document).on('click','#deleteClientDlg',function(){
        deleteClientTmp = $(this).parents("tr");
        $('#myDeleteClientModal').attr('data-name', $(deleteClientTmp.find('td')[0]).text())
    });

    $(document).on('click','#delete_client',function() {
        var name = $('#myDeleteClientModal').attr('data-name');
        var query = getQuery('Client', [['uid', uid], ['name', name]]);
        query.find().then(function(result) {
            var client = AV.Object.createWithoutData('Client', result[0].id);
            return client.destroy();
        })
        .then(function() {
            $(deleteClientTmp).detach();
            $("#works").text("删除客户信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
        })
        .catch(function() {
            $("#fails").text("删除客户信息失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
        });
    });
}

/**
* 订单板块
*
*/
function orderEvent () {
    // 添加订单
    $("#order_no").blur(function(){
         var no = $("#order_no").val();
         if (!no) {
             $("#add_order_no").addClass("has-error");
             $("#add_order_info").text("订单号不能为空");
         } else {
             var query = getQuery('Order', [['uid', uid], ['no', no]]);
             query.count().then(function(result) {
                 if (result) {
                     $("#add_order_info").text("已存在该订单号，请注意");
                     $("#add_order_no").removeClass("has-success");
                     $("#add_order_no").addClass("has-error");
                 } else {
                     $("#add_order_info").text("");
                     $("#add_order_no").removeClass("has-error");
                     $("#add_order_no").addClass("has-success");
                 }
             });
         }
    });

    $("#order_name").blur(function(){
        var name = $("#order_name").val();
        if (!name) {
            $("#add_order_name").addClass("has-error");
            $("#add_order_info").text("客户姓名不能为空");
        } else {
            var query = getQuery('Client', [['uid', uid], ['name', name]]);
            query.count().then(function(result) {
                if (result) {
                    $("#add_order_info").text("");
                    $("#add_order_name").removeClass("has-error");
                    $("#add_order_name").addClass("has-success");
                } else {
                    $("#add_order_info").text("不存在该客户，建议先添加该用户");
                    $("#add_order_name").removeClass("has-success");
                    $("#add_order_name").addClass("has-error");
                }
            });
        }
    });

    // 添加一行
    $("#add_order_row").on('click',function(){
      var txt = "<tr><th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th>"+
      "<th><input class='input-sm form-control'></th></tr>";
      $("#add_order_table").append(txt);
    });

    // 确认添加
    $("#add_order").on('click',function(){
        var total = $('#add_order_table tr').length;
        var array = [];
        $('#add_order_table input').each(function(){
          array.push($(this).val());
        });

        var no = $("#order_no").val();
        var name = $("#order_name").val();
        var order_array = [];
        for(var i=0; i<total*14; i=i+14) {
          var p = {};
          p.uid = uid;
          p.brand = array[i];
          p.shoeid = array[i+1];
          p.color = array[i+2];
          p.s34 = array[i+3];
          p.s35 = array[i+4];
          p.s36 = array[i+5];
          p.s37 = array[i+6];
          p.s38 = array[i+7];
          p.s39 = array[i+8];
          p.s40 = array[i+9];
          p.s41 = array[i+10];
          p.s42 = array[i+11];
          p.s43 = array[i+12];
          p.s44 = array[i+13];
          p.number = (parseInt(array[i+3]) + parseInt(array[i+4]) + parseInt(array[i+5]) +
                      parseInt(array[i+6]) + parseInt(array[i+7]) +parseInt(array[i+8]) +
                      parseInt(array[i+9]) + parseInt(array[i+10]) + parseInt(array[i+11]) +
                      parseInt(array[i+12]) + parseInt(array[i+13])).toString();
          p.no = no;
          p.name = name;
          p.state = '未发货';
          var date = new Date();
          p.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          order_array.push(p);
        }
        var rows = [];
        $.each(order_array, function(i, e) {
            var orderObject = new OrderObject();
            $.each(e, function(k, v) {
                orderObject.set(k, v);
            });
            orderObject.save().then(function(order) {
                rows.push([
                    order.get('no'),
                    order.get('date'),
                    order.get('name'),
                    order.get('brand'),
                    order.get('shoeid'),
                    order.get('color'),
                    order.get('s34'),
                    order.get('s35'),
                    order.get('s36'),
                    order.get('s37'),
                    order.get('s38'),
                    order.get('s39'),
                    order.get('s40'),
                    order.get('s41'),
                    order.get('s42'),
                    order.get('s43'),
                    order.get('s44'),
                    order.get('number'),
                    order.get('state'),
                    '<span style="cursor:pointer" class="fui-new" id="updateOrderDlg" data-toggle="modal" data-target="#myUpdateOrderModal">   </span>'+
                    ' '+'<span style="cursor:pointer" class="fui-trash" id="deleteOrderDlg" data-toggle="modal" data-target="#myDeleteOrderModal"></span>'
                ]);

                if (rows.length === order_array.length) {
                    $.each(rows, function(i, row) {
                        $('#order_table').DataTable().row.add(row).draw(false);
                    });
                    $("#add_order_table").children("tr").remove();
                    $("#order_works").text("添加订单成功！").slideToggle('slow');
                    $("#order_works").delay(3000).slideToggle('slow');
                }

            }, function(error) {
                $("#order_fails").text("添加订单失败！").slideToggle('slow');
                $("#order_fails").delay(3000).slideToggle('slow');
            });
        });
    });

    // 删除所有行
    $("#clear_order_row").on('click',function(){
      $("#add_order_table").children("tr").remove();
    });

    //修改订单
    $(document).on('click','#updateOrderDlg',function(event){
      var array = [];
      updateOrderTmp =  $(this).parents("tr").find('td');
      updateOrderTmp.each(function(i){
        array[i]=$(this).text();
      });
      $("#uo_state").attr("placeholder",array[18]);
      $("#uo_no").attr("placeholder",array[0]);
      $("#uo_name").attr("placeholder",array[2]);
      $("#uo_brand").attr("placeholder",array[3]);
      $("#uo_id").attr("placeholder",array[4]);
      $("#uo_color").attr("placeholder",array[5]);
      $("#uo_s34").attr("placeholder",array[6]).val("");
      $("#uo_s35").attr("placeholder",array[7]).val("");
      $("#uo_s36").attr("placeholder",array[8]).val("");
      $("#uo_s37").attr("placeholder",array[9]).val("");
      $("#uo_s38").attr("placeholder",array[10]).val("");
      $("#uo_s39").attr("placeholder",array[11]).val("");
      $("#uo_s40").attr("placeholder",array[12]).val("");
      $("#uo_s41").attr("placeholder",array[13]).val("");
      $("#uo_s42").attr("placeholder",array[14]).val("");
      $("#uo_s43").attr("placeholder",array[15]).val("");
      $("#uo_s44").attr("placeholder",array[16]).val("");
    });

    $("#update_order").on('click',function(){
        var brand = $("#uo_brand").attr("placeholder"),shoeid = $("#uo_id").attr("placeholder"),
        color = $("#uo_color").attr("placeholder"),s34 = $("#uo_s34").val(),
        s35 = $("#uo_s35").val(),s36 = $("#uo_s36").val(),s37 = $("#uo_s37").val(),
        s38 = $("#uo_s38").val(),s39 = $("#uo_s39").val(),s40 = $("#uo_s40").val(),
        s41 = $("#uo_s41").val(),s42 = $("#uo_s42").val(),s43 = $("#uo_s43").val(),
        s44 = $("#uo_s44").val(),name = $("#uo_name").attr("placeholder"),
        no = $("#uo_no").attr("placeholder"),state = $("#uo_state").attr("placeholder"),
        number = Number(s34)+Number(s35)+
            Number(s36)+Number(s37)+Number(s38)+
            Number(s39)+Number(s40)+Number(s41)+
            Number(s42)+Number(s43)+Number(s44);

        if (state === '未发货') {
            var params = {
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
                number: number.toString(),
            };
            var query = getQuery('Order', [
                ['uid', uid],
                ['name', name],
                ['no', no],
                ['brand', brand],
                ['shoeid', shoeid],
                ['color', color]
            ]);
            query.find().then(function(result) {
                var order = AV.Object.createWithoutData('Order', result[0].id);
                $.each(params, function(k, v) {
                    order.set(k, v);
                });
                return order.save();
            })
            .then(function(result) {
                $(updateOrderTmp[6]).text(result.get('s34'));
                $(updateOrderTmp[7]).text(result.get('s35'));
                $(updateOrderTmp[8]).text(result.get('s36'));
                $(updateOrderTmp[9]).text(result.get('s37'));
                $(updateOrderTmp[10]).text(result.get('s38'));
                $(updateOrderTmp[11]).text(result.get('s39'));
                $(updateOrderTmp[12]).text(result.get('s40'));
                $(updateOrderTmp[13]).text(result.get('s41'));
                $(updateOrderTmp[14]).text(result.get('s42'));
                $(updateOrderTmp[15]).text(result.get('s43'));
                $(updateOrderTmp[16]).text(result.get('s44'));
                $(updateOrderTmp[17]).text(result.get('number'));

                $("#works").text("修改订单成功！").slideToggle('slow');
                $("#works").delay(3000).slideToggle('slow');
            })
            .catch(function(){
                $("#fails").text("修改订单失败！").slideToggle('slow');
                $("#fails").delay(3000).slideToggle('slow');
            });

        } else {
            $("#fails").text("无法修改已经发货的订单！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
        }

    });

    // 删除订单
    $(document).on('click','#deleteOrderDlg',function(){
        deleteOrderTmp = $(this).parents("tr");
        $('#myDeleteOrderModal').attr('data-no', $(deleteOrderTmp.find('td')[0]).text());
        $('#myDeleteOrderModal').attr('data-name', $(deleteOrderTmp.find('td')[2]).text());
        $('#myDeleteOrderModal').attr('data-brand', $(deleteOrderTmp.find('td')[3]).text());
        $('#myDeleteOrderModal').attr('data-shoeid', $(deleteOrderTmp.find('td')[4]).text());
        $('#myDeleteOrderModal').attr('data-color', $(deleteOrderTmp.find('td')[5]).text());
        $('#myDeleteOrderModal').attr('data-state', $(deleteOrderTmp.find('td')[18]).text());
    });

    $(document).on('click','#delete_order',function(){
        var no = $('#myDeleteOrderModal').attr('data-no'),
            name = $('#myDeleteOrderModal').attr('data-name'),
            brand = $('#myDeleteOrderModal').attr('data-brand'),
            shoeid = $('#myDeleteOrderModal').attr('data-shoeid'),
            color = $('#myDeleteOrderModal').attr('data-color'),
            state = $('#myDeleteOrderModal').attr('data-state');
        var query = getQuery('Order', [
            ['uid', uid],
            ['name', name],
            ['no', no],
            ['brand', brand],
            ['shoeid', shoeid],
            ['color', color]
        ]);

        if (state === '未发货') {
            query.find().then(function(result) {
                var order = AV.Object.createWithoutData('Order', result[0].id);
                return order.destroy();
            })
            .then(function() {
                $(deleteOrderTmp).detach();
                $("#works").text("删除订单信息成功！").slideToggle('slow');
                $("#works").delay(3000).slideToggle('slow');
            })
            .catch(function(){
                $("#fails").text("删除订单信息失败！").slideToggle('slow');
                $("#fails").delay(3000).slideToggle('slow');
            });
        } else {
            $("#fails").text("无法删除已经发货的订单！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
        }
    });

    // 确认订单
    $("#confirm_order").on('click',function(){
      var no = $("#co_no").val();
      var query = getQuery('Order', [['uid', uid], ['no', no]]);
      var pkgs = [];
      query.find().then(function(results) {
          if (results[0].get('state') === '未发货') {
              $.each(results, function(i, e) {
                  var shoeQuery = getQuery('Shoe', [
                      ['uid', uid],
                      ['brand', e.get('brand')],
                      ['shoeid', e.get('shoeid')],
                      ['color', e.get('color')]
                  ]);
                  shoeQuery.find().then(function(shoe) {
                      if (shoe.length) {
                          pkgs.push([
                              1, // 0:没有鞋子, 1:有鞋子
                              {
                                  no: no,
                                  uid: uid,
                                  brand: e.get('brand'),
                                  shoeid: e.get('shoeid'),
                                  color: e.get('color'),
                              },
                              {
                                  s34: (parseInt(shoe[0].get('s34')) - parseInt(e.get('s34'))).toString(),
                                  s35: (parseInt(shoe[0].get('s35')) - parseInt(e.get('s35'))).toString(),
                                  s36: (parseInt(shoe[0].get('s36')) - parseInt(e.get('s36'))).toString(),
                                  s37: (parseInt(shoe[0].get('s37')) - parseInt(e.get('s37'))).toString(),
                                  s38: (parseInt(shoe[0].get('s38')) - parseInt(e.get('s38'))).toString(),
                                  s39: (parseInt(shoe[0].get('s39')) - parseInt(e.get('s39'))).toString(),
                                  s40: (parseInt(shoe[0].get('s40')) - parseInt(e.get('s40'))).toString(),
                                  s41: (parseInt(shoe[0].get('s41')) - parseInt(e.get('s41'))).toString(),
                                  s42: (parseInt(shoe[0].get('s42')) - parseInt(e.get('s42'))).toString(),
                                  s43: (parseInt(shoe[0].get('s43')) - parseInt(e.get('s43'))).toString(),
                                  s44: (parseInt(shoe[0].get('s44')) - parseInt(e.get('s44'))).toString(),
                                  number: (parseInt(shoe[0].get('number')) - parseInt(e.get('number'))).toString(),
                                  exportation: e.get('number')
                              }
                          ]);
                      } else {
                          pkgs.push([0,
                          {
                              no: no,
                              uid: uid,
                              brand: e.get('brand'),
                              shoeid: e.get('shoeid'),
                              color: e.get('color'),
                          }
                          , {}]);
                      }
                      if (pkgs.length === results.length) {
                          var error = {
                              status: 1,
                              existError: '',
                              enoughError: ''
                          };
                          var realPkgs = [];
                          $.each(pkgs, function(i, pkg) {
                              if (!pkg[0]) {
                                  error.status = 0;
                                  error.existError = "确认订单失败！请检查 " + pkg[1].brand + ' ' + pkg[1].shoeid + ' ' + pkg[1].color + " 是否存在";
                              } else {
                                  var status = 1;
                                  $.each(pkg[2], function(k, v) {
                                      if (parseInt(v) < 0) {
                                          status = 0;
                                      }
                                  });
                                  if (!status) {
                                      error.status = 0;
                                      error.enoughError = "确认订单失败！请检查" + pkg[1].brand + ' ' + pkg[1].shoeid + ' ' + pkg[1].color + "的库存是否足够";
                                  } else {
                                      realPkgs.push(pkg);
                                  }
                              }
                          });

                          var shoe = [];
                          var order = [];
                          if (error.status) {
                              $.each(realPkgs, function(i, realPkg) {
                                  var confirmShoeQuery = getQuery('Shoe', [
                                      ['uid', uid],
                                      ['brand', realPkg[1].brand],
                                      ['shoeid', realPkg[1].shoeid],
                                      ['color', realPkg[1].color]
                                  ]);
                                  var confirmOrderQuery = getQuery('Order', [
                                      ['uid', uid],
                                      ['no', realPkg[1].no],
                                      ['brand', realPkg[1].brand],
                                      ['shoeid', realPkg[1].shoeid],
                                      ['color', realPkg[1].color]
                                  ]);

                                  confirmShoeQuery.find().then(function(result) {
                                      shoe[i] = AV.Object.createWithoutData('Shoe', result[0].id);
                                      $.each(realPkg[2], function(k, v) {
                                          shoe[i].set(k, v);
                                      });
                                      shoe[i].save();
                                  });
                                  confirmOrderQuery.find().then(function(result) {
                                      console.log(result[0].id);
                                      order[i] = AV.Object.createWithoutData('Order', result[0].id);
                                      order[i].set('state', '已发货');
                                      order[i].save();
                                  })
                                  if (i + 1 === pkgs.length) {
                                      getCount();
                                      $("#co_order_works").text("确认订单成功！").slideToggle('slow');
                                      $("#co_order_works").delay(3000).slideToggle('slow');
                                  }
                              });
                          } else {
                              var info = error.existError ? error.existError : error.enoughError;
                              $("#co_order_fails").text(info).slideToggle('slow');
                              $("#co_order_fails").delay(3000).slideToggle('slow');
                          }
                      }
                  });
              });
          } else {
              $("#co_order_fails").text("已经确认过该订单！").slideToggle('slow');
              $("#co_order_fails").delay(3000).slideToggle('slow');
          }
      });
  });
}

/**
* 输出表格
*/
function exportTable () {
    $("#export_shoeTable").on('click',function(){
      var filename = $("#est_input").val();
      $("#shoes_table").table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: filename,
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
      });
    });

    $("#export_clientTable").on('click',function(){
      var filename = $("#ect_input").val();
      $("#clients_table").table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: filename,
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
      });
    });

    $("#export_orderTable").on('click',function(){
      var filename = $("#eot_input").val();
      $("#order_table").table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: filename,
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
      });
    });
}

/**
* 各类总数
*/
function getCount () {
    var query = getQuery('Shoe', [['uid', uid]]);
    query.limit(1000);
    var counts = 0,
        returns = 0,
        exportations = 0;
    query.find().then(function(results) {
        $.each(results, function(i, e) {
            counts += parseInt(e.get('number'));
            returns += parseInt(e.get('returns'));
            exportations += parseInt(e.get('exportation'));
        });
        $("#number_count").text(counts);
        $("#returns_count").text(returns);
        $("#export_count").text(exportations);
    });
}

loadShoe();
loadClient();
loadOrder();
clientEvent();
shoeEvent();
orderEvent();
exportTable();
getCount();
