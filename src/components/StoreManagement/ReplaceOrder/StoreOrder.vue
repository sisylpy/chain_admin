<template>

    <div class="box box-primary">

        <div class="box-header">
                    <h4 class="box-title">{{storeName}}</h4>
            <div class="box-tools pull-right">
                <div class="nav-tabs-justified no-border">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#storeOrder" data-toggle="tab">今日申请</a></li>
                        <li><a href="#replaceOrder" data-toggle="tab">代下单</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="box-body tab-content no-padding" >

            <div class="active tab-pane  table-responsive mailbox-messages no-border" id="storeOrder">
                <div class="mailbox-controls">
                    <!-- Check all button -->
                    <button type="button" class="btn btn-default btn-sm checkbox-toggle"><i class="fa fa-square-o"></i>
                    </button>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash-o"></i></button>
                        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-reply"></i></button>
                        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-share"></i></button>
                    </div>
                    <!-- /.btn-group -->
                    <button type="button" class="btn btn-default btn-sm"><i class="fa fa-refresh"></i></button>
                    <div class="pull-right">
                        1-50/200
                        <div class="btn-group">
                            <button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button>
                            <button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-right"></i></button>
                        </div>
                        <!-- /.btn-group -->
                    </div>
                    <!-- /.pull-right -->
                </div>

                <table class="table table-hover  table-striped">
                    <tbody>
                    <tr v-for="(item, index) in  applyArr">
                        <td style="width: 30px; "><input type="checkbox"></td>

                        <td style="width: 30px;">{{index + 1}}</td>
                        <td style="width: 100px;">{{item.ckGoodsEntity.goodsName}}</td>
                        <td style="width: 80px;">{{item.applyNumber}} {{item.applyStandardname}}</td>
                        <td v-if="item.applyStatus === 0">新申请</td>
                        <td v-else-if="item.applyStatus === 1 ">出货中</td>
                        <td v-else-if="item.applyStatus ===2 ">出货完成</td>
                        <td v-if="item.applyStatus > 0">{{}}</td>
                        <td v-if="item.applyStatus > 0">{{}}</td>
                        <td v-if="item.applyStatus > 0">{{}}</td>
                    </tr>

                    </tbody>
                </table>

            </div>

            <div class="tab-pane no-border" id="replaceOrder">
                <div class="box-body table-responsive no-padding">

                    <div class="table-header row no-padding" id="header">
                        <ul style="height: 100%; ">
                            <li class="table-header-content col-md-1">序号</li>
                            <li class="table-header-content col-md-3">商品名称</li>
                            <li class="table-header-content col-md-2">申请数量</li>
                            <li class="table-header-content col-md-2">删除</li>
                        </ul>
                    </div>

                    <div class="table-body" id="body">

                        <!--商品表部分-->
                        <ul></ul>
                        <button class="btn btn-danger" @click="saveGoods">
                            保存
                        </button>
                    </div>

                </div>


            </div>

        </div>







    </div>


</template>

<script>

    import apiS from '../../../api/store/Store'
    import api from '../../../api/GoodsManagement/Products'

    export default {
        name: "StoreOrderPanel",
        data() {
            return {
                applyArr: [],
                page: 1,
                limit: 20,
            }
        },
        computed: {
            storeId: {
                get() {
                    return this.$store.state.store.storeId
                },
                set() {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                }
            },
            storeName: {
                get() {
                    return this.$store.state.store.storeName
                },
                set() {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                },

            },
            storeType: {
                get() {
                    return this.$store.state.store.storeType
                },
                set() {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                },
            },

        },

        watch: {
            storeId: function (newVal, oldVal) {
                this.storeId = newVal;
                if (this.storeType === "storeOrders") {
                    this.getStoreApplys();
                }
            },

            storeName: function (newVal, oldVal) {
                this.storeName = newVal;
            },
            storeType: function (newVal, oldVal) {
                if (newVal === "storeOrders") {

                }
            },


        },

        mounted() {

            $('.mailbox-messages input[type="checkbox"]').iCheck({
                checkboxClass: 'icheckbox_flat-blue',
                radioClass: 'iradio_flat-blue'
            });

            //Enable check and uncheck all functionality
            $(".checkbox-toggle").click(function () {
                var clicks = $(this).data('clicks');
                if (clicks) {
                    //Uncheck all checkboxes
                    $(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
                    $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
                } else {
                    //Check all checkboxes
                    $(".mailbox-messages input[type='checkbox']").iCheck("check");
                    $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
                }
                $(this).data("clicks", !clicks);
            });

            this.getStoreApplys();


            this.getDate();

            var indexGoods = 11;

            //初始化5条输入商品
            this.initTenGoods();

            //给商品输入框初始化输入事件和选择搜索页面事件
            $('#body').on('keyup', '.goodsName', function (e) {

                //获取当前输入框
                var input = $('#' + e.currentTarget.id)

                //如果不是"回车，向下"2个按键
                if (e.keyCode !== 40 && e.keyCode !== 13) {

                    //1.1 删除原来查询结果
                    $('#query_result li').remove();


                    //1.2 获取输入内容
                    var value = e.currentTarget.value;
                    console.log(value)

                    //1.3 接口返回商品
                    var reg = /^[a-zA-Z]+$/;

                    if(value.length === 0) {
                        $('#search_result').remove();
                    }

                    if(value.length > 0 && reg.test(value)) {
                        api.queryGoodsWithPinyin(value).then(res => {
                            console.log(res)
                            if (res) {

                                //1.0 获取商品数组
                                this.queryArr = res.data;

                                if(this.queryArr.length > 0) {

                                    //1.1 删除原来查询结果
                                    $('#query_result li').remove();

                                    //1.3.1 获取当前光标位置
                                    var top = input.offset().top;
                                    var left = input.offset().left;
                                    var width = input.width();
                                    var height = input.height();

                                    //1.3.2 添加绝对定位的div
                                    var newdiv = ` <div class="search_result with-border" style="background: #fff; border: 1px solid #ddd" id="search_result">
                                <ul id="query_result" style="padding-inline-start: 0;
">
                                </ul>
                            </div>`

                                    //1.3.3 添加搜索页面到根元素#app
                                    $('#app').append(newdiv);

                                    //1.3.4 计算搜索页面到定位
                                    var $search_result = $('#search_result');
                                    $($search_result).width(width + 6);
                                    $($search_result).css({position: "absolute"})
                                    $($search_result).css("left", left);
                                    $($search_result).css("top", top + height + 10);

                                    //1.3.5 获取新搜索页面
                                    var $query_result = $('#query_result');
                                    //1.3.6 添加li到新搜索页面
                                    for (var i = 0; i < this.queryArr.length; i++) {
                                        var goods = this.queryArr[i];
                                        var attr = `goodsId=` + goods.goodsId + ` fatherId=` + goods.fatherId + `   outDepId=` + goods.outDepId + `   standard=` + goods.applyStandardName;
                                        // if (i === 0) {
                                        //     //添加attr sel="select"
                                        //     $($query_result).append(`<li sel="select" class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px" id=` + goods.goodsId + ` standard=` + goods.purStandardName + `>` + goods.goodsName + `</li>`)
                                        // } else {
                                        //     $($query_result).append(`<li class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px; " id=` + goods.goodsId + ` standard=` + goods.purStandardName + `>` + goods.goodsName + `</li>`)
                                        // }

                                        console.log(goods);
                                        console.log("--------")

                                        if (i === 0) {
                                            //添加attr sel="select"
                                            $($query_result).append(`<li sel="select" class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px" `+ attr +`>` + goods.goodsName + `</li>`)
                                        } else {
                                            $($query_result).append(`<li class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px; " `+ attr + `>` + goods.goodsName + `</li>`)
                                        }
                                    }


                                    //1.3.7 给第一条数据添加背景色
                                    var item = $('.query-item')[0];
                                    $(item).css('background', '#ddd');


                                    // 2，点击搜索结果的商品
                                    $('.query-item').on('click', function (e) {

                                        var goodsName = $(this).text();
                                        var goodsId = $(this).attr('goodsid');
                                        var standardName = $(this).attr('standard');
                                        var fatherId = $(this).attr('fatherId');
                                        var outDepId = $(this).attr('outDepId');
                                        console.log(goodsId);
                                        console.log("hai?????")

                                        //选择点击商品到行内
                                        selectGoods(goodsName, goodsId, standardName, fatherId, outDepId);

                                    });


                                }

                            }
                        })
                    }else {
                        this.warn = "请输入商品的名称的拼音"
                    }


                }
                //如果点击enter或者向下键
                else {
                    // 如果是向下键
                    if (e.keyCode === 40) {

                        //移除第一个商品到背景色
                        var sel = $('[sel="select"]');
                        $(sel).css('background', 'none').removeAttr('sel');

                        //如果背景色是最后一个商品，则从第一个商品开始
                        var selIndex = $(sel).index();
                        var xxx = $('#query_result').children("li").length - 1;
                        console.log(selIndex);
                        console.log(xxx)

                        if (selIndex === xxx) {
                            $('#query_result').children(":first").attr('sel', 'select').css('background', '#ddd')
                        } else {
                            $(sel).next().css('background', '#ddd').attr('sel', 'select');
                        }
                    }
                    if (e.keyCode === 13) {

                        //如果点击enter键
                        var selEle = $('[sel="select"]');

                        var goodsName = $(selEle).text();
                        var goodsId = $(selEle).attr('goodsid');
                        var fatherId = $(selEle).attr('fatherid');
                        var outDepId = $(selEle).attr('outdepid');

                        var standardName = $(selEle).attr('standard')
                        console.log(goodsId);
                        console.log("code === 13");

                        //选择商品到行
                        selectGoods(goodsName, goodsId, standardName, fatherId, outDepId);
                    }
                }

                //提取选择商品公共方法
                function selectGoods(goodsName, goodsId, standardName, fatherId, outDepId) {

                    $(input).val(goodsName);
                    $(input).parent().siblings().children('.quantity').focus();
                    $(input).parent().siblings().children('.quantity').siblings().html(standardName);
                    $(input).attr("goodsid", goodsId);

                    $(input).attr("fatherid", fatherId);
                    $(input).attr("outdepid", outDepId);

                    $('#search_result').remove();
                }
            })

            $('#body').on('keyup', '.quantity', function (e) {
                console.log(e.keyCode)
                //获取当前输入框
                var input = $('#' + e.currentTarget.id)
                if (e.keyCode === 13) {
                    // $(input).parent().siblings().children('.price').focus();
                    $(input).parent().parent().parent().next().children().children().children('.goodsName').focus();

                }
            });

            $('#body').on('keyup', '.price', function (e) {
                console.log(e.keyCode)
                //获取当前输入框
                var input = $('#' + e.currentTarget.id)
                if (e.keyCode === 13) {
                    $(input).parent().parent().parent().next().children().children().children('.goodsName').focus();
                }
            });

            $('#body').on('focus', '.goodsName', function (e) {

                var body = $('#body ul');

                if ($(this).hasClass('is-last')) {

                    $(this).removeClass('is-last')

                    var goods = ` <li>
                                <div class="row no-padding">
                                    <div class="body-item col-md-1" style="text-align: center;">`+ indexGoods +`</div>
                                    <div class="body-item col-md-3">
                                        <input class="goodsName is-last"  style="width: 100%;"  id= ` + indexGoods + `_goodsName />
                                    </div>
                                    <div class="body-item col-md-2">
                                        <input  class="quantity"  style="width: 100%" id= ` + indexGoods + `_quantiry />
                                    </div>
                                    <div class="body-item col-md-2">
                                        <input class="standard" style="width: 100%" disabled/>
                                    </div>

                                    <div class="body-item col-md-2">
                                        <button style="width: 50%;" class="btn btn-sm btn-default" id="delete">X</button>
                                    </div>
                                </div>
                            </li>`
                    $(body).append(goods);

                }
                indexGoods = indexGoods + 1;
            });

            $('#body').on('click', '#delete', function (e) {
                $(this).parent().parent().parent('li').remove();

                var ul = $('#body ul');

                var total =  $(ul).children().length;
                console.log(total);
                for(var i = 0; i < total; i++){
                    console.log()
                    $(ul).children('li:eq('+i+')').children().eq(0).children().eq(0).html(i+1)                //    ‘tr:nth-child(3)’
                }
            })


        },

        methods: {



            getStoreApplys: function () {
                console.log(this.storeId)

                apiS.getApplysByStoreId(this.storeId)
                    .then(res => {
                        if (res) {
                            this.applyArr = res.data
                        }
                    })
            },



            getDate: function () {
                var weekDayArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]//星期映射数组
                var myDate = new Date()
                var milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24; //当i为0代表当前日期，为1时可以得到明天的日期，以此类推
                var newMyDate = new Date(milliseconds);
                var weekDay = newMyDate.getDay(); //获取当前星期X(0-6,0代表星期天)
                var year = newMyDate.getFullYear();//获取当前年
                var month = newMyDate.getMonth() + 1;//获取当前月
                var day = newMyDate.getDate();//获取当前日
                this.showDate = year + '/' + month + '/' + day + weekDayArr[weekDay];
            },

            initTenGoods: function () {
                var body = $('#body ul');
                for (var i = 0; i < 10; i++) {
                    var indexGoods = i + 1;

                    var goods = ` <li style="margin-top: 5px; margin-bottom: 5px;">
                                <div class="row no-padding">
                                    <div class="body-item col-md-1 index" style="text-align: center;">`+indexGoods+`</div>
                                    <div class="body-item col-md-3">
                                        <input class="goodsName"  style="width: 100%;"  id= ` + indexGoods + `_goodsName />
                                    </div>
                                    <div class="body-item col-md-2">
                                        <input  class="quantity"  style="width: 80%;" id= ` + indexGoods + `_quantiry />
                                        <a class="standard" style="width: 10%;color: gray;"></a>
                                    </div>
                                    <!--<div class="body-item col-md-2">-->
                                        <!--<input style="width: 100%" disabled/>-->
                                    <!--</div>-->

                                    <div class="body-item col-md-2">
                                        <button style="width: 50%;" class="btn btn-sm btn-default" id="delete">X</button>
                                    </div>
                                </div>
                            </li>`
                    $(body).append(goods);
                }
                $(body).children().children(':last').children(':nth-child(2)').children('.goodsName').addClass('is-last')

            },


            next: function () {
                var inputting = $('.inputting')[0];
                $(inputting).parent().parent().parent().next().children().find('.goodsName').focus();
            },

            myEnter: function (e) {
                console.log(e)
                console.log("myEnter");
            },




            saveGoods: function (e) {
                var liCount = $('#body').children().children().length;
                var $ul = $('#body').children().children()
                var applys = [];


                for (var i = 0; i < liCount; i++) {
                    var li = $($ul).children().eq(i);
                    var goodsName = $(li).find('.goodsName').val();

                    var goodsQuantity = $(li).find('.quantity').val();

                    if (goodsName.length > 0 && goodsQuantity.length > 0) {
                        var goodsId = $(li).find('.goodsName').attr('goodsid');
                        var fatherId = $(li).find('.goodsName').attr('fatherid');
                        var outDepId = $(li).find('.goodsName').attr('outdepid');

                        var applyStandard = $(li).find('.standard').val();
                        console.log("goodsQuantity!!!!!")

                        var apply = {
                            applyGoodsName: goodsName,
                            applyGoodsId: goodsId,
                            applyStandardName: applyStandard,
                            applyGoodsFatherId: fatherId,
                            outDepId:outDepId,
                            applyStoreId: this.storeId,
                            applyNumber: goodsQuantity,
                            applyStandard: applyStandard
                        };
                        applys.push(apply)
                    }
                }

                apiS.saveReplaceApplys(applys).then(res => {
                    if (res.code === 0) {
                        $('#body ul').children().remove();

                        this.initTenGoods();
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


</style>
