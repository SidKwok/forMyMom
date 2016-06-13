
var uid = $("#uid").text();

$(document).ready(get_count());

$.extend( true, $.fn.dataTable.defaults, {
    "info": false,
    "infoFiltered": false
} );

// shoe table
var table;
$(document).ready(function() {
      table = $('#shoes_table').DataTable( {
      'processing': true,
      "paging":   false,
      "info":     false,
      "deferRender": true,
      "language":{
        "sSearch":     "",
        "zeroRecords": "没有这鞋子啦！",
        "infoEmpty":   "还没有鞋子啦！",
        "paginate": {
          "previous":  "",
          "next":      "",
        }
      },
      "pagingType": "full_numbers",
      // "ajax": "/show",
      "ajax": {
        type: "POST",
        url: "/show/",
        dataType: "json",
        data: {uid:uid}
      },
      "columns": [
        { "data": "brand"},
        { "data": "id", "sortable": false},
        { "data": "color", "sortable": false},
        { "data": "s34", "sortable": false},
        { "data": "s35", "sortable": false},
        { "data": "s36", "sortable": false},
        { "data": "s37", "sortable": false},
        { "data": "s38", "sortable": false},
        { "data": "s39", "sortable": false},
        { "data": "s40", "sortable": false},
        { "data": "s41", "sortable": false},
        { "data": "s42", "sortable": false},
        { "data": "s43", "sortable": false},
        { "data": "s44", "sortable": false},
        { "data": "number"},
        { "data": "returns"},
        { "data": "exportation"},
        { render: function(){
          return '<span style="cursor:pointer" class="fui-new" id="updateDlg" data-toggle="modal" data-target="#myUpdateModal">   </span>'+
          ' '+'<span style="cursor:pointer" class="fui-trash" id="deleteDlg" data-toggle="modal" data-target="#myDeleteModal"></span>';
        }, "sortable": false}
      ]
    });

    $("#shoes_table_filter input").attr("placeholder","search");
    $("#shoes_table_filter input").addClass("input-lg");
    $("#shoes_table_first").removeClass("disabled");
});

//client table
var c_table;
$(document).ready(function() {
      c_table = $('#clients_table').DataTable( {
      'processing': true,
      "paging":   false,
      "info":     false,
      "deferRender": true,
      "language":{
        "sSearch":     "",
        "zeroRecords": "没有这客户啦！",
        "infoEmpty":   "还没有客户啦！",
        "paginate": {
          "previous":  "",
          "next":      "",
        }
      },
      "pagingType": "full_numbers",
      "ajax": {
        type: "POST",
        url: "/show_client/",
        dataType: "json",
        data: {uid:uid}
      },
      "columns": [
        { "data": "name"},
        { "data": "telephone", "sortable": false},
        { "data": "mobilephone", "sortable": false},
        { "data": "address", "sortable": false},
        { render: function(){
          return '<span style="cursor:pointer" class="fui-new" id="updateClientDlg" data-toggle="modal" data-target="#myUpdateClientModal">   </span>'+
          ' '+'<span style="cursor:pointer" class="fui-trash" id="deleteClientDlg" data-toggle="modal" data-target="#myDeleteClientModal"></span>';
        }, "sortable": false}
      ]
    });

    $("#clients_table_filter input").attr("placeholder","search");
    $("#clients_table_filter input").addClass("input-lg");
    $("#clients_table_first").removeClass("disabled");
});

// order table
var o_table;
$(document).ready(function() {
      o_table = $('#order_table').DataTable( {
      'processing': true,
      "paging":   false,
      "info":     false,
      "deferRender": true,
      "language":{
        "sSearch":     "",
        "lengthMenu":  "每页显示 _MENU_ 条记录",
        "zeroRecords": "没有这订单啦！",
        "infoEmpty":   "还没有订单啦！",
        "paginate": {
          "previous":  "",
          "next":      "",
        }
      },
      "pagingType": "full_numbers",
      "ajax": {
        type: "POST",
        url: "/show_order/",
        dataType: "json",
        data: {uid:uid}
      },
      "columns": [
        { "data": "no"},
        { "data": "date"},
        { "data": "name"},
        { "data": "brand"},
        { "data": "id", "sortable": false},
        { "data": "color", "sortable": false},
        { "data": "s34", "sortable": false},
        { "data": "s35", "sortable": false},
        { "data": "s36", "sortable": false},
        { "data": "s37", "sortable": false},
        { "data": "s38", "sortable": false},
        { "data": "s39", "sortable": false},
        { "data": "s40", "sortable": false},
        { "data": "s41", "sortable": false},
        { "data": "s42", "sortable": false},
        { "data": "s43", "sortable": false},
        { "data": "s44", "sortable": false},
        { "data": "number"},
        { "data": "state", "sortable": false},
        { render: function(){
          return '<span style="cursor:pointer" class="fui-new" id="updateOrderDlg" data-toggle="modal" data-target="#myUpdateOrderModal">   </span>'+
          ' '+'<span style="cursor:pointer" class="fui-trash" id="deleteOrderDlg" data-toggle="modal" data-target="#myDeleteOrderModal"></span>';
        }, "sortable": false}
      ]
    });

    $("#order_table_filter input").attr("placeholder","search");
    $("#order_table_filter input").addClass("input-lg");
    // $("#shoes_table_length").remove();
    $("#order_table_first").removeClass("disabled");
});

// 用来测试
$("#test").click(function(){
  $.ajax({
    type: "POST",
    url: "/get_count/",
    data: {uid:uid},
    dataType: "json",
    success: function(data){

    },
    error: function(){
      console.log("it is wrong back door!");
    }
  });
});

//更新鞋子
$(document).on('click','#updateDlg',function(){
  var array = new Array(18);
  $(this).parents("tr").find('td').each(function(i){
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
  var brand = $("#u_brand").attr("placeholder"),id = $("#u_id").attr("placeholder"),color = $("#u_color").attr("placeholder"),
  s34 = $("#u_s34").val(),s35 = $("#u_s35").val(),s36 = $("#u_s36").val(),s37 = $("#u_s37").val(),s38 = $("#u_s38").val(),
  s39 = $("#u_s39").val(),s40 = $("#u_s40").val(),s41 = $("#u_s41").val(),s42 = $("#u_s42").val(),s43 = $("#u_s43").val(),
  s44 = $("#u_s44").val(),returns = $("#u_returns").val(),exportation = $("#u_exportation").val();
  var number = Number(s34)+Number(s35)+Number(s36)+
      Number(s37)+Number(s38)+Number(s39)+
      Number(s40)+Number(s41)+Number(s42)+
      Number(s43)+Number(s44);

  $.ajax({
      type: "POST",
      url: "/update/",
      data: {brand:brand, id:id, color:color, number:number, returns:returns,exportation:exportation,uid:uid,
        s34:s34, s35:s35, s36:s36, s37:s37, s38:s38, s39:s39, s40:s40, s41:s41, s42:s42, s43:s43, s44:s44},
      dataType: "json",
      success: function(data){
        if(data.state === "success"){
          table.ajax.reload();
          get_count();
          $("#works").text("更新信息成功！").slideToggle('slow');
          $("#works").delay(3000).slideToggle('slow');
        }
        else{
          $("#fails").text("更新信息失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
        }
      },
      error: function(data){
        $("#fails").text("后台处理失败！").slideToggle('slow');
        $("#fails").delay(3000).slideToggle('slow');
        console.log("it is wrong back door!");
      }
    });
});

//删除鞋子
var delArray = new Array(18);
$(document).on('click','#deleteDlg',function(){
  $(this).parents("tr").find('td').each(function(i){
    delArray[i]=$(this).text();
  });
});

$(document).on('click','#delete',function(){
  $.ajax({
      type: "POST",
      url: "/delete/",
      data: {brand:delArray[0],id:delArray[1],color:delArray[2],uid:uid},
        dataType: "json",
        success: function(data){
          if(data.state === "success"){
            table.ajax.reload();
            get_count();
            $("#works").text("删除信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
          }
          else{
            $("#fails").text("删除信息失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
          }
        },
        error: function(data){
          $("#fails").text("后台处理失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
          console.log("it is wrong back door!");

        }
      });
});

//添加鞋子
$("#a_color").blur(function(){
  var brand = $("#a_brand").val();
  var id = $("#a_id").val();
  var color = $("#a_color").val();
  $.ajax({
    type: "POST",
    url: "/check_storehouse/",
    data: {brand:brand, id:id, color:color, uid:uid},
    dataType: "json",
    success: function(data){
      if(data.state !== "has"){
        $("#add_info").text("");
        $("#new_a_brand").removeClass("has-error");
        $("#new_a_brand").addClass("has-success");
        $("#new_a_id").removeClass("has-error");
        $("#new_a_id").addClass("has-success");
        $("#new_a_color").removeClass("has-error");
        $("#new_a_color").addClass("has-success");
      }
      else{
        $("#add_info").text("已存在该鞋子");
        $("#new_a_brand").removeClass("has-success");
        $("#new_a_brand").addClass("has-error");
        $("#new_a_id").removeClass("has-success");
        $("#new_a_id").addClass("has-error");
        $("#new_a_color").removeClass("has-success");
        $("#new_a_color").addClass("has-error");
      }
    },
    error: function(){
      $("#fails").text("后台处理失败！").slideToggle('slow');
      $("#fails").delay(3000).slideToggle('slow');
      console.log("it is wrong back door!");
    }
  });
});

$("#add").bind('click',function(){
  var brand = $("#a_brand").val(),id = $("#a_id").val(),color = $("#a_color").val(),s34 = $("#a_s34").val(),
  s35 = $("#a_s35").val(),s36 = $("#a_s36").val(),s37 = $("#a_s37").val(),s38 = $("#a_s38").val(),
  s39 = $("#a_s39").val(),s40 = $("#a_s40").val(),s41 = $("#a_s41").val(),s42 = $("#a_s42").val(),
  s43 = $("#a_s43").val(),s44 = $("#a_s44").val();
  var number = Number(s34)+Number(s35)+Number(s36)+
      Number(s37)+Number(s38)+Number(s39)+
      Number(s40)+Number(s41)+Number(s42)+
      Number(s43)+Number(s44);
  var returns = 0, exportation = 0;

  $.ajax({
      type: "POST",
      url: "/add/",
      data: {brand:brand, id:id, color:color, number:number, returns:returns,exportation:exportation,uid:uid,
        s34:s34, s35:s35, s36:s36, s37:s37, s38:s38, s39:s39, s40:s40, s41:s41, s42:s42, s43:s43, s44:s44},
        dataType: "json",
        success: function(data){
          if(data.state === "success"){
            table.ajax.reload();
            get_count();
            $("#works").text("添加信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
          }
          else{
            $("#fails").text("添加信息失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
          }
        },
        error: function(data){
          $("#fails").text("后台处理失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
          console.log("it is wrong back door!");
        }
      });
});

//退货
$("#r_color").blur(function(){
  var brand = $("#r_brand").val(), id = $("#r_id").val(), color = $("#r_color").val();
  $.ajax({
    type: "POST",
    url: "/check_storehouse/",
    data: {brand:brand, id:id, color:color, uid:uid},
    dataType: "json",
    success: function(data){
      if(data.state !== "has"){
        $("#return_info").text("不存在该鞋子信息，请先添加");
        $("#input_r_brand").removeClass("has-success");
        $("#input_r_brand").addClass("has-error");
        $("#input_r_id").removeClass("has-success");
        $("#input_r_id").addClass("has-error");
        $("#input_r_color").removeClass("has-success");
        $("#input_r_color").addClass("has-error");
      }
      else{
        $("#return_info").text("");
        $("#input_r_brand").removeClass("has-error");
        $("#input_r_brand").addClass("has-success");
        $("#input_r_id").removeClass("has-error");
        $("#input_r_id").addClass("has-success");
        $("#input_r_color").removeClass("has-error");
        $("#input_r_color").addClass("has-success");
      }
    },
    error: function(){
      $("#fails").text("后台处理失败！").slideToggle('slow');
      $("#fails").delay(3000).slideToggle('slow');
      console.log("it is wrong back door!");
    }
  });
});

$("#returns").bind('click',function(){
  var brand = $("#r_brand").val(), id = $("#r_id").val(), color = $("#r_color").val(), s34 = $("#r_s34").val(),
  s35 = $("#r_s35").val(), s36 = $("#r_s36").val(), s37 = $("#r_s37").val(), s38 = $("#r_s38").val(),
  s39 = $("#r_s39").val(), s40 = $("#r_s40").val(), s41 = $("#r_s41").val(), s42 = $("#r_s42").val(),
  s43 = $("#r_s43").val(), s44 = $("#r_s44").val();
  var returns = Number(s34)+Number(s35)+Number(s36)+
      Number(s37)+Number(s38)+Number(s39)+
      Number(s40)+Number(s41)+Number(s42)+
      Number(s43)+Number(s44);

  $.ajax({
      type: "POST",
      url: "/returns/",
      data: {brand:brand, id:id, color:color, returns:returns,uid:uid,
      s34:s34, s35:s35, s36:s36, s37:s37, s38:s38, s39:s39, s40:s40, s41:s41, s42:s42, s43:s43, s44:s44},
        dataType: "json",
        success: function(data){
          if(data.state === "success"){
            table.ajax.reload();
            get_count();
            $("#works").text("退货成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
          }
          else{
            $("#fails").text("退货失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
          }
        },
        error: function(data){
          $("#fails").text("后台处理失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
          console.log("it is wrong back door!");
        }
    });
});

//出货
$("#e_color").blur(function(){
  var brand = $("#e_brand").val(); id = $("#e_id").val(); color = $("#e_color").val();
  $.ajax({
    type: "POST",
    url: "/check_storehouse/",
    data: {brand:brand, id:id, color:color, uid:uid},
    dataType: "json",
    success: function(data){
      if(data.state !== "has"){
        $("#export_info").text("不存在该鞋子信息，请先添加");
        $("#input_e_brand").removeClass("has-success");
        $("#input_e_brand").addClass("has-error");
        $("#input_e_id").removeClass("has-success");
        $("#input_e_id").addClass("has-error");
        $("#input_e_color").removeClass("has-success");
        $("#input_e_color").addClass("has-error");
      }
      else{
        $("#return_info").text("");
        $("#input_e_brand").removeClass("has-error");
        $("#input_e_brand").addClass("has-success");
        $("#input_e_id").removeClass("has-error");
        $("#input_e_id").addClass("has-success");
        $("#input_e_color").removeClass("has-error");
        $("#input_e_color").addClass("has-success");
      }
    },
    error: function(){
      $("#fails").text("后台处理失败！").slideToggle('slow');
      $("#fails").delay(3000).slideToggle('slow');
      console.log("it is wrong back door!");
    }
  });
});

$("#export").bind('click',function(){
  var brand = $("#e_brand").val(),id = $("#e_id").val(),color = $("#e_color").val(),s34 = $("#e_s34").val(),
  s35 = $("#e_s35").val(),s36 = $("#e_s36").val(),s37 = $("#e_s37").val(),s38 = $("#e_s38").val(),
  s39 = $("#e_s39").val(),s40 = $("#e_s40").val(),s41 = $("#e_s41").val(),s42 = $("#e_s42").val(),
  s43 = $("#e_s43").val(),s44 = $("#e_s44").val();
  var exportation = Number(s34)+Number(s35)+Number(s36)+
      Number(s37)+Number(s38)+Number(s39)+
      Number(s40)+Number(s41)+Number(s42)+
      Number(s43)+Number(s44);

  $.ajax({
      type: "POST",
      url: "/export/",
      data: {brand:brand, id:id, color:color, exportation:exportation, uid:uid,
      s34:s34, s35:s35, s36:s36, s37:s37, s38:s38, s39:s39, s40:s40, s41:s41, s42:s42, s43:s43, s44:s44},
        dataType: "json",
        success: function(data){
          if(data.state === "success"){
            table.ajax.reload();
            get_count();
            $("#works").text("出货成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
          }
          else{
            $("#fails").text("出货失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
          }
        },
        error: function(data){
          $("#fails").text("后台处理失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
          console.log("it is wrong back door!");
        }
    });
});

//进货
$("#i_color").blur(function(){
  var brand = $("#i_brand").val(), id = $("#i_id").val(), color = $("#i_color").val();
  $.ajax({
    type: "POST",
    url: "/check_storehouse/",
    data: {brand:brand, id:id, color:color, uid:uid},
    dataType: "json",
    success: function(data){
      if(data.state !== "has"){
        $("#import_info").text("不存在该鞋子信息，请先添加");
        $("#input_i_brand").removeClass("has-success");
        $("#input_i_brand").addClass("has-error");
        $("#input_i_id").removeClass("has-success");
        $("#input_i_id").addClass("has-error");
        $("#input_i_color").removeClass("has-success");
        $("#input_i_color").addClass("has-error");
      }
      else{
        $("#import_info").text("");
        $("#input_i_brand").removeClass("has-error");
        $("#input_i_brand").addClass("has-success");
        $("#input_i_id").removeClass("has-error");
        $("#input_i_id").addClass("has-success");
        $("#input_i_color").removeClass("has-error");
        $("#input_i_color").addClass("has-success");
      }
    },
    error: function(){
      $("#fails").text("后台处理失败！").slideToggle('slow');
      $("#fails").delay(3000).slideToggle('slow');
      console.log("it is wrong back door!");
    }
  });
});

$("#imports").bind('click',function(){
  var brand = $("#i_brand").val(),id = $("#i_id").val(),color = $("#i_color").val(),s34 = $("#i_s34").val(),
  s35 = $("#i_s35").val(),s36 = $("#i_s36").val(),s37 = $("#i_s37").val(),s38 = $("#i_s38").val(),
  s39 = $("#i_s39").val(),s40 = $("#i_s40").val(),s41 = $("#i_s41").val(),s42 = $("#i_s42").val(),
  s43 = $("#i_s43").val(),s44 = $("#i_s44").val();
  var importation = Number(s34)+Number(s35)+Number(s36)+
      Number(s37)+Number(s38)+Number(s39)+
      Number(s40)+Number(s41)+Number(s42)+
      Number(s43)+Number(s44);

  $.ajax({
      type: "POST",
      url: "/imports/",
      data: {brand:brand, id:id, color:color, importation:importation, uid:uid,
      s34:s34, s35:s35, s36:s36, s37:s37, s38:s38, s39:s39, s40:s40, s41:s41, s42:s42, s43:s43, s44:s44},
      dataType: "json",
      success: function(data){
        if(data.state === "success"){
          table.ajax.reload();
          get_count();
          $("#works").text("进货成功！").slideToggle('slow');
          $("#works").delay(3000).slideToggle('slow');
        }
        else{
          $("#fails").text("进货失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
        }
      },
      error: function(data){
        $("#fails").text("后台处理失败！").slideToggle('slow');
        $("#fails").delay(3000).slideToggle('slow');
        console.log("it is wrong back door!");
      }
    });
  });

//添加用户
$("#ac_name").blur(function(){
  var name = $("#ac_name").val();
  if (name === ""){
    $("#new_client_name").addClass("has-error");
    $("#add_client_info").text("客户姓名不能为空");
    return;
  }
  $.ajax({
    type: "POST",
    url: "/check_client/",
    data: {name:name,uid:uid},
    dataType: "json",
    success: function(data){
      if(data.state !== "has"){
        $("#add_client_info").text("");
        $("#new_client_name").removeClass("has-error");
        $("#new_client_name").addClass("has-success");
      }
      else{
        $("#add_client_info").text("已存在该客户");
        $("#new_client_name").removeClass("has-success");
        $("#new_client_name").addClass("has-error");
      }
    },
    error: function(){
      console.log("it is wrong back door!");
    }
  });
});

$("#add_client").bind('click',function(){
  var name = $("#ac_name").val();
  var telephone = $("#ac_telephone").val();
  var mobilephone = $("#ac_mobilephone").val();
  var address = $("#ac_address").val();
  $.ajax({
      type: "POST",
      url: "/add_client/",
      data: {name:name, telephone:telephone, mobilephone:mobilephone, address:address, uid:uid},
      dataType: "json",
      success: function(data){
        c_table.ajax.reload();
        if(data.state === "success"){
          $("#works").text("添加客户信息成功！").slideToggle('slow');
          $("#works").delay(3000).slideToggle('slow');
        }
        else{
          $("#fails").text("添加客户信息失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
        }
      },
      error: function(data){
        $("#fails").text("后台处理！").slideToggle('slow');
        $("#fails").delay(3000).slideToggle('slow');
        console.log("it is wrong back door!");
      }
    });
  });

// 更新用户
$(document).on('click','#updateClientDlg',function(){
  var array = new Array(4);
  $(this).parents("tr").find('td').each(function(i){
    array[i]=$(this).text();
  });
  $("#uc_name").attr("placeholder",array[0]);
  $("#uc_telephone").attr("placeholder",array[1]).val("");
  $("#uc_mobilephone").attr("placeholder",array[2]).val("");
  $("#uc_address").attr("placeholder",array[3]).val("");
});

$("#update_client").on('click',function(){
  var name = $("#uc_name").attr("placeholder");
  var telephone = $("#uc_telephone").val();
  var mobilephone = $("#uc_mobilephone").val();
  var address = $("#uc_address").val();

  $.ajax({
      type: "POST",
      url: "/update_client/",
      data: {name:name, telephone:telephone, mobilephone:mobilephone, address:address, uid:uid},
      dataType: "json",
      success: function(data){
        if(data.state === "success"){
          c_table.ajax.reload();
          $("#works").text("更新客户信息成功！").slideToggle('slow');
          $("#works").delay(3000).slideToggle('slow');
        }
        else{
          $("#fails").text("更新客户信息失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
        }
      },
      error: function(data){
        $("#fails").text("后台处理失败！").slideToggle('slow');
        $("#fails").delay(3000).slideToggle('slow');
        console.log("it is wrong back door!");
      }
    });
});

//删除用户
var delClientArray = new Array(4);
$(document).on('click','#deleteClientDlg',function(){
  $(this).parents("tr").find('td').each(function(i){
    delClientArray[i]=$(this).text();
  });
});

$(document).on('click','#delete_client',function(){
  $.ajax({
      type: "POST",
      url: "/delete_client/",
      data: {name:delClientArray[0], uid:uid},
        dataType: "json",
        success: function(data){
          if(data.state === "success"){
            c_table.ajax.reload();
            $("#works").text("删除客户信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
          }
          else{
            $("#fails").text("删除客户信息失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
          }
        },
        error: function(data){
          $("#fails").text("后台处理失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
          console.log("it is wrong back door!");

        }
      });
});

//添加订单
$("#order_name").blur(function(){
  var name = $("#order_name").val();
  if (name === ""){
    $("#add_order_name").addClass("has-error");
    $("#add_order_info").text("客户姓名不能为空");
    return;
  }
  $.ajax({
    type: "POST",
    url: "/check_client/",
    data: {name:name,uid:uid},
    dataType: "json",
    success: function(data){
      if(data.state === "has"){
        $("#add_order_info").text("");
        $("#add_order_name").removeClass("has-error");
        $("#add_order_name").addClass("has-success");
      }
      else{
        $("#add_order_info").text("不存在该客户，建议先添加该用户");
        $("#add_order_name").removeClass("has-success");
        $("#add_order_name").addClass("has-error");
      }
    },
    error: function(){
      console.log("it is wrong back door!");
    }
  });
});

$("#order_no").blur(function(){
  var no = $("#order_no").val();
  if (no === ""){
    $("#add_order_no").addClass("has-error");
    $("#add_order_info").text("订单号不能为空");
    return;
  }
  $.ajax({
    type: "POST",
    url: "/check_order_no/",
    data: {no:no,uid:uid},
    dataType: "json",
    success: function(data){
      if(data.state === "has"){
        $("#add_order_info").text("已存在该订单号，请注意");
        $("#add_order_no").removeClass("has-success");
        $("#add_order_no").addClass("has-error");
      }
      else{
        $("#add_order_info").text("");
        $("#add_order_no").removeClass("has-error");
        $("#add_order_no").addClass("has-success");
      }
    },
    error: function(){
      console.log("it is wrong back door!");
    }
  });
});

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

$("#add_order").on('click',function(){
  var total = $('#add_order_table tr').length;
  var array = [];
  $('#add_order_table input').each(function(){
    array.push($(this).val());
  });

  var no = $("#order_no").val();
  var name = $("#order_name").val();
  var order_array = [];
  for(var i=0;i<total*14;i=i+14){
    var p = {};
    p.uid = uid;
    p.brand = array[i];
    p.id = array[i+1];
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
    p.number = parseInt(array[i+3]) + parseInt(array[i+4]) + parseInt(array[i+5]) +
                parseInt(array[i+6]) + parseInt(array[i+7]) +parseInt(array[i+8]) +
                parseInt(array[i+9]) + parseInt(array[i+10]) + parseInt(array[i+11]) +
                parseInt(array[i+12]) + parseInt(array[i+13]);
    p.no = no;
    p.name = name;
    order_array.push(p);
  }
  // alert(p.brand + " " + p.id);
  // alert(order_array[0].brand);
  // alert(order_array[1].brand);

  $.ajax({
    type: "POST",
    url: "/add_order/",
    data: {order_array: order_array,total:total},
    dataType: "json",
    success: function(data){
      if(data.state === "success"){
        o_table.ajax.reload();
        table.ajax.reload();
        $("#order_works").text("添加订单成功！").slideToggle('slow');
        $("#order_works").delay(3000).slideToggle('slow');
      }
      else if(data.state === "fail"){
        $("#order_fails").text("添加订单失败！").slideToggle('slow');
        $("#order_fails").delay(3000).slideToggle('slow');
      }
      else{
        $("#order_fails").text("无法添加已存在的订单!").slideToggle('slow');
        $("#order_fails").delay(3000).slideToggle('slow');
      }
    },
    error: function(data){
      $("#order_fails").text("后台处理失败！").slideToggle('slow');
      $("#order_fails").delay(3000).slideToggle('slow');
      console.log("it is wrong back door!");
    }
  });
  $("#add_order_table").children("tr").remove();
});

$("clear_order_row").on('click',function(){
  $("#add_order_table").children("tr").remove();
});

//确认订单
$("#confirm_order").on('click',function(){
  var no = $("#co_no").val();
  var info;
  $.ajax({
    type: "POST",
    url: "/confirm_order/",
    data:{no:no,uid:uid},
    dataType: "json",
    success: function(data){
      if(data.state === "success"){
        o_table.ajax.reload();
        table.ajax.reload();
        get_count();
        $("#co_order_works").text("确认订单成功！").slideToggle('slow');
        $("#co_order_works").delay(3000).slideToggle('slow');
      }
      else if (data.state === "fail1") {
        info = "确认订单失败！请检查" + data.error + " 是否存在";
        $("#co_order_fails").text(info).slideToggle('slow');
        $("#co_order_fails").delay(3000).slideToggle('slow');
      }
      else if (data.state === "fail2") {
        info = "确认订单失败！请检查" + data.error + "的库存是否足够";
        $("#co_order_fails").text("确认订单失败！请检查订单信息与仓库似乎否相符！").slideToggle('slow');
        $("#co_order_fails").delay(3000).slideToggle('slow');
      }
      else if(data.state === "has"){
        $("#co_order_fails").text("已经确认过该订单！").slideToggle('slow');
        $("#co_order_fails").delay(3000).slideToggle('slow');
      }
    },
    error: function(data){
      $("#co_order_fails").text("后台处理失败！").slideToggle('slow');
      $("#co_order_fails").delay(3000).slideToggle('slow');
      console.log("it is wrong back door!");
    }
  });
});

//修改订单
$(document).on('click','#updateOrderDlg',function(){
  var array = new Array(20);
  $(this).parents("tr").find('td').each(function(i){
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
  var brand = $("#uo_brand").attr("placeholder"),id = $("#uo_id").attr("placeholder"),
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

  $.ajax({
      type: "POST",
      url: "/update_order/",
      data: {brand:brand, id:id, color:color, number:number, no:no,name:name,uid:uid,state:state,
        s34:s34, s35:s35, s36:s36, s37:s37, s38:s38, s39:s39, s40:s40, s41:s41, s42:s42, s43:s43, s44:s44},
      dataType: "json",
      success: function(data){
        if(data.state === "success"){
          table.ajax.reload();
          $("#works").text("修改订单成功！").slideToggle('slow');
          $("#works").delay(3000).slideToggle('slow');
        }
        else if (data.state === "fail"){
          $("#fails").text("修改订单失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
        }
        else{
          $("#fails").text("无法修改已经发货的订单！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
        }
      },
      error: function(data){
        $("#fails").text("后台处理失败！").slideToggle('slow');
        $("#fails").delay(3000).slideToggle('slow');
        console.log("it is wrong back door!");
      }
    });
});

//删除订单
var delOrderArray = new Array(18);
$(document).on('click','#deleteOrderDlg',function(){
  $(this).parents("tr").find('td').each(function(i){
    delOrderArray[i]=$(this).text();
  });
});

$(document).on('click','#delete_order',function(){
  $.ajax({
      type: "POST",
      url: "/delete_order/",
      data: {no:delOrderArray[0],name:delOrderArray[2],brand:delOrderArray[3],
            id:delOrderArray[4],color:delOrderArray[5],state:delOrderArray[18],uid:uid},
        dataType: "json",
        success: function(data){
          if(data.state === "success"){
            o_table.ajax.reload();
            $("#works").text("删除订单信息成功！").slideToggle('slow');
            $("#works").delay(3000).slideToggle('slow');
          }
          else if(data.state === "fail"){
            $("#fails").text("删除订单信息失败！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
          }
          else{
            $("#fails").text("无法删除已经发货的订单！").slideToggle('slow');
            $("#fails").delay(3000).slideToggle('slow');
          }
        },
        error: function(data){
          $("#fails").text("后台处理失败！").slideToggle('slow');
          $("#fails").delay(3000).slideToggle('slow');
          console.log("it is wrong back door!");
        }
      });
});

//输出表格
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

//feedback
ChatraID = '72tq2uiPFcGwkLwZs';
(function(d, w, c) {
    var n = d.getElementsByTagName('script')[0],
        s = d.createElement('script');
    w[c] = w[c] || function() {
        (w[c].q = w[c].q || []).push(arguments);
    };
    s.async = true;
    s.src = (d.location.protocol === 'https:' ? 'https:': 'http:') + '//call.chatra.io/chatra.js';
    n.parentNode.insertBefore(s, n);
})(document, window, 'Chatra');

//各类总数
function get_count(){
  $.ajax({
    type: "POST",
    url: "/get_count/",
    data: {uid:uid},
    dataType: "json",
    success: function(data){
      $("#number_count").text(data.number);
      $("#returns_count").text(data.returns);
      $("#export_count").text(data.exportation);
    },
    error: function(){
      console.log("it is wrong back door!");
    }
  });
}
