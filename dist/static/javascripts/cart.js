function init() {
    var arr = [];
     
    getData();
    //  postData(); 这个函数不能放在这里因为$.ajax 是一个异步函数, 所以渲染数据加载会后执行
}
 
 
 
function getData() {
    $.ajax({
        method : "get",
        url : "/user/cart/ajax"
    }).done(function(data) {
 
        for(var i = 0 ; i < data.message.length; i++) {
            var html = `
                <div class="goodsMessage">
                <span>${data.message[i].productName}</span>
                <span class="price">${data.message[i].salePrice}</span>
                <span class="checkNumber"><i>-</i><b>${data.message[i].productNumber}</b><i>+</i></span>
                <span class="calculate">${data.message[i].salePrice}</span>
                <span>删除</span>
                </div>
            `;
            $("form").append(html);
        }
        bindEvent();
        postData();
    });
}
 
 
function bindEvent() {
 
    function totalEvent() {
        var calculate = $(".calculate");
        var totalPrice = 0;
       
            for(var i = 0 ; i < calculate.length; i++) {
                totalPrice = parseInt($(calculate[i]).text().split("￥")[1]) + totalPrice;
            }
     
            $(".goods-price-total div span").text("￥" + totalPrice);
    }
 
    totalEvent(); 
         
    var goodsMessage = $("form div");
 
    for(var i = 0 ; i < goodsMessage.length; i++) {
 
        (function(i) {
            $(goodsMessage[i]).find('.checkNumber i').eq(1).on('click', function() {
 
                var number = parseInt($(goodsMessage[i]).find(".checkNumber b").text());
                number = number + 1;
                var price = parseInt($(goodsMessage[i]).find("span").eq(1).text().split("￥")[1]);
                var total = number*price;
 
                $(goodsMessage[i]).find(".checkNumber b").text(number);
                // 添加增加后的数量
 
                $(goodsMessage[i]).find(".calculate").text("￥" + total);
                // 添加这个商品的小计
 
                totalEvent();
                // 重新加载这个小计之和渲染出数据
            })
 
            $(goodsMessage[i]).find('.checkNumber i').eq(0).on('click', function() {
 
                var number = parseInt($(goodsMessage[i]).find(".checkNumber b").text());
                if (number > 0) {
                    number = number - 1;
                    var price = parseInt($(goodsMessage[i]).find("span").eq(1).text().split("￥")[1]);
                    var total = number*price;
 
                    $(goodsMessage[i]).find(".checkNumber b").text(number); 
                    // 添加减少后的数量
 
                    $(goodsMessage[i]).find(".calculate").text("￥" + total);
                    // 添加这个商品的小计
 
                    totalEvent();
                    // 重新加载这个小计之和渲染出数据
                }
            })
 
            $(goodsMessage[i]).find('span').eq(4).on('click', function() {
                $(goodsMessage[i]).remove();    // 把这个商品从购物车中删除 
                 
                totalEvent();    // 再次重新渲染
            })
 
        })(i)
    }   
    }
 
    function postData() {
 
        var arrData = [];
 
        function Shop(productName, salePrice, productNumber) {
            this.productName = productName;
            this.salePrice = salePrice;
            this.productNumber = productNumber;
        }
 
        var goodsMessage = $(".goodsMessage");
 
        $(".button").on('click', function() {
 
            for(var i = 0; i < goodsMessage.length; i++) {
                 
                var message1 = $(goodsMessage[i]).find('span').eq(0).text();
                var message2 = $(goodsMessage[i]).find('span').eq(1).text();
                var message3 = $(goodsMessage[i]).find('span b').text();
                 
                var shop = new Shop(message1, message2, message3);
 
                arrData[i] = shop;
            }
 
             
            console.log(arrData);
            $.ajax({
                method: "POST",
                url: "/user/cart/postdata",
                dataType: "json", 
                traditional:true,
                data: { message: JSON.stringify(arrData) }
            })
        })
         
    }
 
 
init();