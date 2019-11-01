<template>

    <div class="my_panel">

        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <div class="panel-title">
                    <h4 class="pull-left">日期：2019-10-20</h4>

                    <div class="pull-right margin-left">
                        <button class="btn btn-danger" @click="saveGoods">
                            保存
                        </button>
                    </div>

                    <div class="pull-right">
                        <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                供货商
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li><a href="#">供货商A</a></li>
                                <li><a href="#">供货商B</a></li>
                                <li><a href="#"></a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>


            <div class="panel-body no-padding">
                <div class="box-body table-responsive no-padding">

                    <div class="table-header row no-padding"  id="header">
                        <ul style="height: 100%; ">
                            <li class="table-header-content col-md-3">商品名称</li>
                            <li class="table-header-content col-md-2">入库数量</li>
                            <li class="table-header-content col-md-2">商品规格</li>
                            <li class="table-header-content col-md-2">单价</li>
                            <li class="table-header-content col-md-3">删除</li>
                        </ul>
                    </div>

                    <div class="table-body" id="body">

                        <!--商品表部分-->
                        <ul ></ul>

                    </div>
                </div>
            </div>






        </div>

    </div>


</template>

<script>
import api from '../../../api/In/InBill'

    export default {
        name: "NewBillPanel",
        props:['depId','depName'],


        mounted() {

            var indexGoods = 6;

            //初始化5条输入商品
            this.initFiveGoods();

            //给商品输入框初始化输入事件和选择搜索页面事件
            $('#body').on('keyup','.goodsName',function (e) {


                console.log("heihei")
                console.log(e.currentTarget.id)
                //获取当前输入框
                var input = $('#' + e.currentTarget.id)

                //如果不是"回车，向下"2个按键
                if(e.keyCode !== 40 && e.keyCode !== 13){

                    //1.1 删除原来查询结果
                    $('#query_result li').remove();

                    //1.2 获取输入内容
                    var value = e.currentTarget.value;
                    console.log(value)

                    //1.3 接口返回商品
                    api.queryGoodsWithPinyin(value).then(res => {
                        if(res) {

                            //1.0 获取商品数组
                            this.queryArr = res.data;

                            //1.1 删除原来查询结果
                            $('#query_result li').remove();

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

                            //1.3.3 添加搜索页面到根元素#app
                            $('#app').append(newdiv);

                            //1.3.4 计算搜索页面到定位
                            var $search_result = $('#search_result');
                            $($search_result).width(width+6);
                            $($search_result).css({position: "absolute"})
                            $($search_result).css("left",left );
                            $($search_result).css("top",top + height + 10);

                            //1.3.5 获取新搜索页面
                            var $query_result = $('#query_result');

                            //1.3.6 添加li到新搜索页面
                            for(var i = 0; i < this.queryArr.length; i++) {
                                var goods = this.queryArr[i];
                                if( i === 0) {
                                    //添加attr sel="select"
                                    $($query_result).append(`<li sel="select" class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px" id=`+goods.goodsId+` standard=`+goods.standardName+`>`+goods.goodsName+`</li>`)
                                }else {
                                    $($query_result).append(`<li class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px; " id=`+goods.goodsId+` standard=`+goods.standardName+`>`+goods.goodsName+`</li>`)

                                }
                            }


                            //1.3.7 给第一条数据添加背景色
                            var item = $('.query-item')[0];
                            $(item).css('background','#ddd');


                            // 2，点击搜索结果的商品
                            $('.query-item').on('click', function (e) {

                                var goodsName = $(this).text();
                                var goodsId = $(this).attr('id');
                                var standardName = $(this).attr('standard')

                                //选择点击商品到行内
                                selectGoods(goodsName, goodsId,standardName);

                            });
                        }
                    })
                }
                //如果点击enter或者向下键
                else {
                    // 如果是向下键
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
                            $('#query_result').children(":first").attr('sel','select').css('background','#ddd')
                        }else {
                            $(sel).next().css('background','#ddd').attr('sel','select');
                        }
                    }if (e.keyCode == 13) {

                        //如果点击enter键
                        var selEle = $('[sel="select"]');

                        var goodsName = $(selEle).text();
                        var goodsId = $(selEle).attr('id');
                        var standardName = $(selEle).attr('standard')

                        //选择商品到行
                        selectGoods(goodsName, goodsId, standardName);
                    }
                }

                //提取选择商品公共方法
                function selectGoods (goodsName,goodsId,standardName) {

                    $(input).val(goodsName);
                    $(input).parent().siblings().children('.quantity').focus();
                    $(input).parent().siblings().children('.standard').val(standardName)

                    $(input).attr('id', goodsId)
                    $('#search_result').remove();
                }
            })

            $('#body').on('keyup', '.quantity', function (e) {
                console.log(e.keyCode)
                //获取当前输入框
                var input = $('#' + e.currentTarget.id)
                if(e.keyCode == 13) {
                    $(input).parent().siblings().children('.price').focus();

                }


            })

            $('#body').on('keyup', '.price', function (e) {
                console.log(e.keyCode)
                //获取当前输入框
                var input = $('#' + e.currentTarget.id)
                if(e.keyCode == 13) {
                    $(input).parent().parent().parent().next().children().children().children('.goodsName').focus();
                }

            })

            $('#body').on('focus','.goodsName', function (e) {

                var body = $('#body ul');

                if($(this).hasClass('is-last')){
                    console.log("you")
                    $(this).removeClass('is-last')

                    var goods = ` <li>
                                <div class="row no-padding">
                                    <div class="body-item col-md-3">
                                        <input class="goodsName is-last"  style="width: 100%;"  id= `+indexGoods+`_goodsName />
                                    </div>
                                    <div class="body-item col-md-2">
                                        <input  class="quantity"  style="width: 100%" id= `+indexGoods+`_quantiry />
                                    </div>
                                    <div class="body-item col-md-2">
                                        <input class="standard" style="width: 100%" placeholder="商品规格" disabled/>
                                    </div>
                                    <div class="body-item col-md-2">
                                        <input class="price" style="width: 100%" id=`+indexGoods+`_price />
                                    </div>
                                    <div class="body-item col-md-3">
                                        <button style="width: 50%;" class="btn btn-sm btn-default" id="delete">X</button>
                                    </div>

                                </div>
                            </li>`
                    $(body).append(goods);

                }
                indexGoods= indexGoods+1;

            })

            $('#body').on('click', '#delete', function (e) {
                console.log($(this).parent().parent().parent('li'))
                $(this).parent().parent().parent('li').remove();

            })

        },

        components: {},

        data() {
            return {
                abc: "fff",
                type: "1",
                inputVal: "",
                inputIndex: '1',
                queryArr: [],
                bill:{

                },
                subBillArr: [],
                goodsTotal: 5
            }
        },
        methods: {

            initFiveGoods: function() {
                var body = $('#body ul');
                for(var i = 0; i < 5; i++) {
                    var indexGoods = i+1;
                    var goods = ` <li>
                                <div class="row no-padding">
                                    <div class="body-item col-md-3">
                                        <input class="goodsName"  style="width: 100%;"  id= `+indexGoods+`_goodsName />
                                    </div>
                                    <div class="body-item col-md-2">
                                        <input  class="quantity"  style="width: 100%" id= `+indexGoods+`_quantiry />
                                    </div>
                                    <div class="body-item col-md-2">
                                        <input class="standard" style="width: 100%" placeholder="商品规格" disabled/>
                                    </div>
                                    <div class="body-item col-md-2">
                                        <input class="price" style="width: 100%" id=`+indexGoods+`_price />
                                    </div>
                                    <div class="body-item col-md-3">
                                        <button style="width: 50%;" class="btn btn-sm btn-default" id="delete">X</button>
                                    </div>

                                </div>
                            </li>`
                    $(body).append(goods);
                }
                $(body).children().children(':last').children(':first').children('.goodsName').addClass('is-last')

            },





            next: function(){
                console.log("yeah")
                var inputting = $('.inputting')[0];
                console.log( $(inputting).parent().parent().parent().next())
                $(inputting).parent().parent().parent().next().children().children().children('.goodsName').focus();

            },
            myEnter: function (e) {
                console.log(e)
                console.log("myEnter")
            },
            saveGoods: function (e) {
                var liCount = $('#body').children().children().length;
                var $ul = $('#body').children().children()
                var subBills = [];


                for (var i =0; i < liCount; i ++){
                    var li = $($ul).children().eq(i);
                    var goodsName = $(li).find('.goodsName').val();
                    var goodsId = $(li).find('.goodsName').attr('id');
                    var goodsQuantity = $(li).find('.quantity').val();

                    console.log(goodsName)
                    if(goodsName.length > 0 && goodsQuantity.length > 0)  {
                        var subbill = {

                            sGoodsId: goodsId,
                            inQuantity: goodsQuantity
                        }
                        subBills.push(subbill)
                    }
                }

                console.log(subBills)
                console.log(this)

                this.subBillArr = subBills;
                this.bill = {
                    inDepId: this.depId,
                    inSupplierId: -1,
                    subBillEntities: subBills,

                }
                api.saveInBill(this.bill).then(res => {
                    if(res) {
                        console.log(res)
                    }
                })



            }

        }


    }

</script>



<style scoped>
    /*.content{*/
    /*background: #fff;*/
    /*}*/

    .panel-title {
        height: 40px;
    }

    .panel-heading {
        background: #fff;
    }

    .margin-left {
        margin-left: 50px;
    }

    /*表格部分*/

    .box-body {
        /*background: grey;*/
        font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    }

    .table-header {
        width: 100%;
        height: 100%;
        /*background: red;*/
    }

    .table-header ul {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ddd;
    }
    .table-header li {
        line-height: 40px;
        display: inline-block;
    }

    .table-body {
        min-height: 200px;
    }


    .table-body input {
        height: 30px;
    }
    #header>ul:after{
        content: "";
        display: block;
        clear: both;
    }
    #body>ul:after{
        content: "";
        display: block;
        clear: both;
    }
    #body ul li {
        display: block;
        border-bottom: 1px solid #ddd;
        padding-top: 8px;
        padding-bottom: 8px;

    }





</style>
