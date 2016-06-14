(function(){
  var url;
  var city;
  (function(){
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.onload = function(){
        city = remote_ip_info.city;
        url = "http://wthrcdn.etouch.cn/weather_mini?city=" + city;
        head.removeChild(script);
        remote_ip_info = null;
      };
    script.src= 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=';
    head.appendChild(script);
    })();

    var Util = {
      addHandler: function(element, type, handler){
        if(element.addEventListener){
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
          element.attachEvent("on" + type, handler);
        } else {
          element["on" + type] = handler;
        }
      },
      createEW: function(){
        var ewdiv = document.createElement("div");
        ewdiv.id = "ew";
        var indiv = document.createElement("div");
        indiv.innerHTML = "EW";
        ewdiv.appendChild(indiv);
        document.body.appendChild(ewdiv);

        var div = document.createElement("div");
        div.id = "ew-info";
        var img = document.createElement("div");
        img.id = "ew-img";
        var p = document.createElement("p");
        var h1 = document.createElement("h1");
        div.appendChild(img);
        div.appendChild(h1);
        div.appendChild(p);
        document.body.appendChild(div);

        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.innerHTML = "#ew{" +
                          "display: table;" +
                          "background: #3eaca8;" +
                          "width:60px;height:60px;" +
                          "box-shadow: 0 0 10px #ccc;" +
                          "-webkit-border-radius: 120px;" +
                          "-moz-border-radius: 120px;" +
                          "border-radius: 160px;" +
                          "bottom:10px;left:10px;" +
                          "position: fixed;" +
                          "text-decoration: none;" +
                          "color: #E5EEC1;" +
                          "text-align: center;" +
                          "cursor: pointer;" +
                          "transition:1s;" +
                          "}" +
                          "#ew div{" +
                          "width:36px;height:18px;" +
                          "display: table-cell;" +
                          "vertical-align: middle;" +
                          "}" +
                          "#ew:hover{" +
                          "background: #547a82;" +
                          "transition:1s;" +
                          "}" +
                          "#ew-info{" +
                          "background: #2C2A36;" +
                          "box-shadow: 0 0 10px #ccc;" +
                          "height:240px;width:240px;" +
                          "-webkit-border-radius: 2px;" +
                          "-moz-border-radius: 2px;" +
                          "bottom:10px;left:80px;" +
                          "position: fixed;" +
                          "border-radius: 8px;" +
                          "padding: 5px;" +
                          "color: #E5EEC1;" +
                          "}" +
                          "#ew-info h1{" +
                          "font-size: 56px;" +
                          "font-weight: 300;" +
                          "margin-bottom: 0px;" +
                          "position: absolute;" +
                          "left: 15px;" +
                          "bottom:50px;" +
                          "}" +
                          "#ew-info p{" +
                          "font-size: 24px;" +
                          "position: absolute;" +
                          "bottom: 0;" +
                          "left: 20px;" +
                          "margin-top: 0px;" +
                          "}" +
                          "#ew-img{" +
                          "width:130px;height: 130px;" +
                          "background-image: url('/img/icon.gif');" +
                          "background-size: 580%;" +
                          "background-repeat: no-repeat;" +
                          "background-position: 13% 33%;" +
                          "float: right;" +
                          "right: 15px;" +
                          "position: absolute;" +
                          "}";
        head.appendChild(style);
        var ew = document.getElementById('ew');
        var ewinfo = document.getElementById('ew-info');
        ewinfo.style.display = "none";
        var that = this;
        this.addHandler(ew, "click", function(){
          if(ewinfo.style.display == "none"){
            var xhr = new XMLHttpRequest();
            var tempdata;
            xhr.onreadystatechange = function(){
              if(xhr.readyState == 4){
                if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304){
                  tempdata = JSON.parse(xhr.responseText).data;
                  var type = tempdata.forecast[0].type;
                  var ewimg = document.getElementById("ew-img");
                  switch (type) {
                    case "晴":
                      ewimg.style.backgroundPosition = "13% 33%";
                      break;
                    case "多云":
                    case "阴":
                      ewimg.style.backgroundPosition = "39% 73%";
                      break;
                    case "小雨":
                    case "阵雨":
                      ewimg.style.backgroundPosition = "38% 33%";
                      break;
                    case "雷雨":
                      ewimg.style.backgroundPosition = "60% 33%";
                      break;
                    case "大风":
                      ewimg.style.backgroundPosition = "13% 73%";
                      break;
                    case "大雾":
                      ewimg.style.backgroundPosition = "60% 73%";
                      break;
                    case "有雪":
                      ewimg.style.backgroundPosition = "84% 73%";
                      break;
                    default:
                      ewimg.style.backgroundPosition = "13% 33%";
                  }
                  ewinfo.childNodes[1].innerHTML = tempdata.wendu + "&#176";
                  ewinfo.childNodes[2].innerHTML = city;
                }
              }
            };
            xhr.open('get', url, true);
            xhr.send(null);
            ewinfo.style.display = "block";
          } else if (ewinfo.style.display == "block") {
            ewinfo.style.display = "none";
          }
        });

      }
    };

    Util.createEW();
})();
