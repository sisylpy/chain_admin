search: function (e) {

    console.log("search!!")
    console.log(e)

    //录入行第一个input框
    var input = $('#'+e.srcElement.id);


    //1，如果输入的是字母，则查询商品
    if( e.keyCode > 60 && e.keyCode < 90){

        //1.1 删除原来查询结果
        $('#queryResult li').remove();

        //1.2 获取输入内容
        var value = input.val();

        //1.3 借口返回商品
        api.queryGoodsWithPinyin(value).then(res => {
            if(res) {

                this.queryArr = res.data;

                //1.3.1 获取当前光标位置
                var top = input.offset().top;
                var left = input.offset().left;
                var width = input.width();
                var height = input.height();

                //1.3.2 添加绝对定位的div
                var newdiv = ` <div class="search_result with-border" style="background: #fff; border: 1px solid #ddd" id="search_result">
                                <ul id="query_result" style="    padding-inline-start: 0;
">
                                </ul>
                            </div>`

                $('#app').append(newdiv);
                var $search_result = $('#search_result');
                $($search_result).width(width+4);
                $($search_result).css({position: "absolute"})
                $($search_result).css("left",left );
                $($search_result).css("top",top + height + 10);

                var $query_result = $('#query_result');


                //添加li到div
                for(var i = 0; i < this.queryArr.length; i++) {
                    var goods = this.queryArr[i];
                    if( i === 0) {
                        //添加attr sel="select"
                        $($query_result).append(`<li sel="select" class="query-item" style="list-style: none;" id=`+goods.goodsId+` standard=`+goods.standardName+`>`+goods.goodsName+`</li>`)
                    }else {
                        $($query_result).append(`<li class="query-item" style="list-style: none;" id=`+goods.goodsId+` standard=`+goods.standardName+`>`+goods.goodsName+`</li>`)

                    }
                }


                var item = $('.query-item')[0];
                $(item).css('background','#ddd');


                //点击搜索结果的商品
                $('.query-item').on('click', function (e) {

                    var goodsName = $(this).text();
                    var goodsId = $(this).attr('id');
                    var standardName = $(this).attr('standard')

                    //选择点击商品到行内
                    selectGoods(goodsName, goodsId,standardName);

                })
            }
        })

    }else {
        //如果点击向下到键
        if(e.keyCode == 40) {

            //移除第一个商品到背景色
            var sel = $('[sel="select"]');
            $(sel).css('background','none').removeAttr('sel');

            //如果背景色是最后一个商品，则从第一个商品开始
            var selIndex = $(sel).index();
            var xxx = $('#query_result').children("li").length - 1;
            console.log(selIndex);
            console.log(xxx)

            if(selIndex === xxx ){
                $('#query_result').children(":first").attr('sel','select').css('background','gray')
            }else {
                $(sel).next().css('background','gray').attr('sel','select');
            }
        }if (e.keyCode == 13) {
            // console.log(e.keyCode)

            //如果点击enter键
            var selEle = $('[sel="select"]');

            var goodsName = $(selEle).text();
            var goodsId = $(selEle).attr('id');
            var standardName = $(selEle).attr('standard')

            //选择商品到行
            selectGoods(goodsName,goodsId, standardName);





        }




    }




}
