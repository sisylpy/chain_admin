<template>


    <div>

        <div class=" " style="min-height: 600px;">
            <div class=" with-border">
                <div class="row flex-row">
                    <!--<div class="col-md-3">-->

                        <!--<div class="form-group">-->
                            <!--<label>送货日期:</label>-->
                            <!--<div class="input-group date">-->
                                <!--<div class="input-group-addon">-->
                                    <!--<i class="fa fa-calendar"></i>-->
                                <!--</div>-->
                                <!--<input type="text" class="form-control pull-right" id="datepicker"-->
                                       <!--data-format="MM月dd日">-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="col-md-4">
                        <div class="form-group">

                            <label>订货店铺:</label>
                            <select class="form-control select2" id="replaceStore">
                                <option value=""></option>
                                <optgroup v-for="(line) in storeList" :label="line.lineName">
                                    <option v-for="(item) in line.storelist" :value="item.storeId">
                                        {{item.storeName}}-{{item.wxNickName}}
                                    </option>
                                </optgroup>
                            </select>
                            <i style="color: red;">{{warnStore}}</i>

                        </div>

                    </div>

                    <div class="col-md-4">
                        <!-- 单列，双列，三列-->
                        <label>订单显示:</label>
                        <div class="form-group">
                            <!--<label>订单显示:</label>-->
                            <div class="form-group"
                                 style="display: flex; flex-flow: row nowrap;  justify-content:flex-start;">

                                <label style="margin-right: 30px;">
                                    <input type="radio" name="r3" class="flat-red" value="one"
                                           v-model="showColumn">
                                    单列
                                </label>
                                <label style="margin-right: 30px;">
                                    <input type="radio" name="r3" class="flat-red" value="two"
                                           v-model="showColumn">
                                    双列
                                </label>
                                <label>
                                    <input type="radio" name="r3" class="flat-red" value="three"
                                           v-model="showColumn">
                                    三列
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-4">
                        <button class="btn-default btn-lg" @click="saveGoods">保存订单</button>
                    </div>

                </div>





            </div>


            <div class="box-body row" id="body" style="display: none;">

                <div class="col-md-4" style="display: flex;flex-flow: column nowrap;" id="one">

                    <div class="flex-row-applys" v-for="(item) in 9 "
                         style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;
                                            display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                        <div class="body-item"
                             style=" color: gray; text-align: center; margin-right: 2%; background: grey; width: 5px; height: 5px; border-radius: 50%">
                        </div>
                        <div class="body-item" style="width: 40%; display: flex; ">
                            <input class="goodsName" :id='+ item + "_one_goodsName"'
                                   placeholder=""
                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                        </div>
                        <div class="body-item"
                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                            <input type="number" class="quantity" :id='+ item + "_one_quantity"'
                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                            <a class="standard" style="color: gray;"></a>
                        </div>
                        <div class="body-item tools" style="width: 10%;">
                            <i class="fa fa-trash-o del"
                               style="width: 50%; display: none; color: red;"></i>
                        </div>
                    </div>
                    <div class="flex-row-applys"
                         style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                        <div class="body-item"
                             style="color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">
                            <!--20,-->
                        </div>
                        <div class="body-item" style="width: 40%; display: flex; ">
                            <input class="goodsName is-lastOne" id="10_one_goodsName"
                                   placeholder=""
                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                        </div>
                        <div class="body-item"
                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                            <input type="number" class="quantity" id="10_one_quantity"
                                   placeholder=""
                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                            <a class="standard" style="color: gray;"></a>
                        </div>
                        <div class="body-item tools" style="width: 10%;">
                            <i class="fa fa-trash-o del"
                               style="width: 50%; display: none; color: red;"></i>
                        </div>
                    </div>
                </div>

                <div class="col-md-4" style="display: flex;flex-flow: column nowrap;" id="two">

                    <div class="flex-row-applys" v-for="(item) in 9 "
                         style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;
                                            display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                        <div class="body-item"
                             style=" color: gray; text-align: center; margin-right: 2%; background: grey; width: 5px; height: 5px; border-radius: 50%">
                        </div>
                        <div class="body-item" style="width: 40%; display: flex; ">
                            <input class="goodsName" :id='+ item + "_two_goodsName"'
                                   placeholder=""
                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                        </div>
                        <div class="body-item"
                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                            <input type="number" class="quantity" :id='+ item + "_two_quantity"'
                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                            <a class="standard" style="color: gray;"></a>
                        </div>
                        <div class="body-item tools" style="width: 10%;">
                            <i class="fa fa-trash-o del"
                               style="width: 50%; display: none; color: red;"></i>
                        </div>
                    </div>
                    <div class="flex-row-applys"
                         style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                        <div class="body-item"
                             style="color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">
                            <!--20,-->
                        </div>
                        <div class="body-item" style="width: 40%; display: flex; ">
                            <input class="goodsName is-lastOne" id="10_two_goodsName"
                                   placeholder=""
                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                        </div>
                        <div class="body-item"
                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                            <input type="number" class="quantity" id="10_two_quantity"
                                   placeholder=""
                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                            <a class="standard" style="color: gray;"></a>
                        </div>
                        <div class="body-item tools" style="width: 10%;">
                            <i class="fa fa-trash-o del"
                               style="width: 50%; display: none; color: red;"></i>
                        </div>
                    </div>
                </div>

                <div class="col-md-4" style="display: flex;flex-flow: column nowrap; display: none;"
                     id="three">

                    <div class="flex-row-applys" v-for="(item) in 9 "
                         style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;
                                            display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                        <div class="body-item"
                             style=" color: gray; text-align: center; margin-right: 2%; background: grey; width: 5px; height: 5px; border-radius: 50%">
                        </div>
                        <div class="body-item" style="width: 40%; display: flex; ">
                            <input class="goodsName" :id='+ item + "_three_goodsName"'
                                   placeholder=""
                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                        </div>
                        <div class="body-item"
                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                            <input type="number" class="quantity" :id='+ item + "_three_quantity"'
                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                            <a class="standard" style="color: gray;"></a>
                        </div>
                        <div class="body-item tools" style="width: 10%;">
                            <i class="fa fa-trash-o del"
                               style="width: 50%; display: none; color: red;"></i>
                        </div>
                    </div>
                    <div class="flex-row-applys"
                         style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                        <div class="body-item"
                             style="color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">
                            <!--20,-->
                        </div>
                        <div class="body-item" style="width: 40%; display: flex; ">
                            <input class="goodsName is-lastOne" id="10_three_goodsName"
                                   placeholder=""
                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                        </div>
                        <div class="body-item"
                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                            <input type="number" class="quantity" id="10_three_quantity"
                                   placeholder=""
                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                            <a class="standard" style="color: gray;"></a>
                        </div>
                        <div class="body-item tools" style="width: 10%;">
                            <i class="fa fa-trash-o del"
                               style="width: 50%; display: none; color: red;"></i>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>


</template>

<script>

    import apito from '@/api/goodsManagement/todayOrder'
    import api from '@/api/goodsManagement/inventory'


    export default {
        name: "ReplaceOrder",
        data() {
            return {
                formData: new FormData(),
                imgs: {},
                imgLen: 0,
                replaceStoreId: '',
                replaceStoreName: '',
                showReplace: false,
                showColumn: "",
                warnStore: "",
                applyStoreArr: [],

                storeList: [],


            }

        },
        props: ['orderType'],

        watch: {
            orderType: function (newVal) {
                if (newVal == "replace") {
                    this.getAllOutDep();
                }
            }


        },

        mounted() {


            $('input[type=radio][name=r1]').on('ifChecked', function (obj) {
                if ($(this).val() == "img") {
                    console.log("shi img");
                    $('#selectImg').removeAttr("disabled");
                }
                if ($(this).val() == "paste") {
                    console.log("shi paste");
                    $('#selectImg').attr("disabled", "disabled");
                    $('#forAddImg').css("color", "gray");

                }

            })


            //选择店铺
            $('#replaceStore').on('change', function () {

                $('#body').show();
                $('input[type=radio].flat-red').eq(1).iCheck('check');

            });


            //初始化select选择框
            $('.select2').select2({
                language: 'zh-CN',
                width: '100%',
                placeholder: '请选择店铺'
            })

            //Date picker
            $('#datepicker').datepicker({
                autoclose: true,
                title: '默认第二天送货',
                todayBtn: "linked",
                todayHighlight: true,

            })


            //iCheck for checkbox and radio inputs
            $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                checkboxClass: 'icheckbox_minimal-blue',
                radioClass: 'iradio_minimal-blue'
            });

            //Flat red color scheme for iCheck
            $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
            //改变单列，双列，三列radio
            $('input[type=radio].flat-red').on('ifChanged', function (obj) {
                console.log($(this).val());   // 获取该复选框的value值
                console.log(obj.currentTarget.checked)   // 获取该复选框当前状态是否选中
                console.log('您更改了复选框的状态');
                var which = $(this).val();
                console.log(which);
                if (which == "one") {

                    $('#two').hide();
                    $('#three').hide();
                }
                if (which == "two") {
                    $('#two').show();
                    $('#three').hide();
                }
                if (which == "three") {
                    $('#two').show();
                    $('#three').show();

                }

            });


            //给商品输入框初始化输入事件和选择搜索页面事件
            $('#body').on('keyup', '.goodsName', function (e) {

                //获取当前输入框
                var input = $('#' + e.currentTarget.id)

                //如果不是"回车，向下"2个按键
                if (e.keyCode !== 40 && e.keyCode !== 13) {

                    //1.1 删除原来查询结果
                    $('#search_result').remove();

                    //1.2 获取输入内容
                    var value = e.currentTarget.value;
                    console.log(value)

                    //1.3 接口返回商品
                    var reg = /^[a-zA-Z]+$/;

                    if (value.length === 0) {
                        $('#search_result').remove();

                    }

                    if (value.length > 0 && reg.test(value)) {


                        api.queryGoodsWithPinyin(value).then(res => {
                            console.log(res)
                            if (res) {

                                //1.0 获取商品数组
                                this.queryArr = res.data;

                                if (this.queryArr.length > 0) {

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

                                        if (i === 0) {
                                            //添加attr sel="select"
                                            $($query_result).append(`<li sel="select" class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px" ` + attr + `>` + goods.goodsName + `</li>`)
                                        } else {
                                            $($query_result).append(`<li class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px; " ` + attr + `>` + goods.goodsName + `</li>`)
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
                    } else {
                        // $(input).val("请输入商品的名称的拼音");

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

                        if (selIndex === xxx) {
                            $('#query_result').children(":first").attr('sel', 'select').css('background', '#ddd')
                        } else {
                            $(sel).next().css('background', '#ddd').attr('sel', 'select');
                        }
                    }
                    if (e.keyCode === 13) {
                        console.log("enterenter!!!!!")
                        console.log($(input).attr('goodsid'))

                        //如果点击enter键
                        var selEle = $('[sel="select"]');

                        var goodsName = $(selEle).text();
                        var goodsId = $(selEle).attr('goodsid');
                        var fatherId = $(selEle).attr('fatherid');
                        var outDepId = $(selEle).attr('outdepid');
                        var standardName = $(selEle).attr('standard');

                        //选择商品到行
                        selectGoods(goodsName, goodsId, standardName, fatherId, outDepId);
                    }
                }

                //提取选择商品公共方法
                function selectGoods(goodsName, goodsId, standardName, fatherId, outDepId) {

                    $(input).val(goodsName);
                    $(input).attr("goodsid", goodsId);
                    $(input).attr("fatherid", fatherId);
                    $(input).attr("outdepid", outDepId);

                    var val = $('input[type=radio].flat-red');
                    if (goodsId) {
                        $(input).parent().siblings().children('.quantity').focus();
                        $(input).parent().siblings().children('.quantity').siblings().html(standardName);
                    }

                    $('#search_result').remove();
                }
            });

            $('#body').on('keyup', '.quantity', function (e) {

                //获取当前输入框
                var input = $('#' + e.currentTarget.id);
                var val = $(input).val();

                var goodsId = $(input).parent().prev().children('.goodsName').attr('goodsid');
                if (goodsId && val) {
                    var goodsName = $(input).parent().prev().children('.goodsName').val();
                    if (e.keyCode === 13 && goodsName.length > 0) {
                        $(input).parent().parent().next().children().children('.goodsName').focus();
                        // $(input).parent().parent().next().next().children().children('.goodsName').focus();

                    }
                }

            });

            $('#body').on('focus', '.goodsName', function (e) {

                var inputGoodsName = $('#' + e.currentTarget.id)

                var strs = new Array();
                strs = e.currentTarget.id.split("_");
                var index = strs[0] * 1 + 1;
                var what = "_" + strs[1];


                if ($(this).hasClass('is-lastOne')) {

                    $(this).removeClass('is-lastOne')

                    var goods = ` <div class="flex-row-applys"
                                     style="padding-top: 5px; padding-bottom: 5px;  font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                    <div class="body-item"
                                         style="width: 5%; color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">

                                    </div>
                                    <div class="body-item" style="width: 40%; display: flex; ">
                                        <input class="goodsName is-lastOne"  id="` + index + what + `_goodsName" placeholder="商品名称"
                                               style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                    </div>
                                    <div class="body-item"
                                         style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;float: left;">
                                        <input type="number" class="quantity" id="` + index + what + `_quantity"'
                                               placeholder="数量"
                                               style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        <a class="standard" style="color: gray;"></a>
                                    </div>
                                    <div class="body-item tools" style="width: 10%;">
                                        <i class="fa fa-trash-o del" style="width: 50%;  display: none; color: red;"></i>
                                    </div>
                                </div>`
                    $(inputGoodsName).parent().parent().parent().append(goods);

                }
            });

            $('#body').on('click', '.del', function (e) {
                $(this).parent().parent('.flex-row-applys').remove();


                var applys = $('#applys_body');

                var total = $(applys).children().length;
                console.log(total);
                for (var i = 0; i < total; i++) {
                    $(applys).children('.flex-row-applys:eq(' + i + ')').children().eq(0).html(i + 1)                //    ‘tr:nth-child(3)’
                }
                console.log(total)
                var lastIndex = total - 1;
                var hasLast = $(applys).children('.flex-row-applys:eq(' + lastIndex + ')').children().find('.goodsName').hasClass("is-lastOne");
                console.log(hasLast)
                if (!hasLast) {
                    $(applys).children('.flex-row-applys:eq(' + lastIndex + ')').children().find('.goodsName').addClass("is-lastOne");
                }
            });

            //删除图标显示和隐藏
            $('#body').on('mouseover', '.flex-row-applys', function (e) {
                var goodsName = $(e.currentTarget).children().find('.goodsName').val();
                if (goodsName) {
                    $(e.currentTarget).children().find('.del').show();
                }
            })
            $('#body').on('mouseleave', '.flex-row-applys', function (e) {
                $(e.currentTarget).children().find('.del').hide();
            })

            this.getAllOutDep();


        },

        methods: {


            getAllOutDep: function () {
                console.log("new getAlloutdep")
                this.bus.$emit('loading', true);

                //获取所有店铺列表
                apito.getStoreListAllWithLine().then(res => {
                    if (res) {
                        this.bus.$emit('loading', false);

                        console.log(res)
                        this.storeList = res.data;
                    }
                });
            },


            //代订货保存申请
            saveGoods: function () {

                var md4 = $('#body').children().length;
                var applysArr = [];

                // if ($("#datepicker").data("datepicker").getDate()) {
                //     console.log($("#datepicker").data("datepicker").getDate().toLocaleString())
                //
                // }

                var storeId = $('#replaceStore').val();
                if (storeId) {

                    for (var i = 0; i < md4; i++) {

                        var applysRow = $('#body').children().eq(i);
                        var applysChildren = $(applysRow).children().length;

                        for (var j = 0; j < applysChildren; j++) {
                            var item = $(applysRow).children().eq(j);

                            var goodsNameA = $(item).find('.goodsName').val();
                            var goodsQuantityA = $(item).find('.quantity').val();

                            if (goodsNameA && goodsQuantityA) {
                                console.log("bushi null")
                                var goodsId = $(item).find('.goodsName').attr('goodsid');
                                var fatherId = $(item).find('.goodsName').attr('fatherid');
                                var outDepId = $(item).find('.goodsName').attr('outdepid');
                                var applyStandard = $(item).find('.standard').html();
                                var apply = {
                                    applyGoodsName: goodsNameA,
                                    applyGoodsId: goodsId,
                                    applyGoodsFatherId: fatherId,
                                    outDepId: outDepId,
                                    applyStoreId: storeId,
                                    applyNumber: goodsQuantityA,
                                    applyStandardName: applyStandard
                                };
                                applysArr.push(apply)
                            }
                        }
                    }

                } else {
                    this.warnStore = "请选择店铺"
                }


                if (applysArr.length > 0) {
                    this.bus.$emit('loading', true);

                    apito.saveTomorrowApplys(applysArr).then(res => {
                        if (res.code === 0) {
                            this.bus.$emit('loading', false);

                            console.log("save success;")

                            let NewPage = '_empty' + '?time=' + new Date().getTime()/500;
                            this.$router.push(NewPage);
                            this.$router.go(-1);
                            // window.location.reload()

                        }
                    })
                }


            }
        }


    }

</script>

<style scoped>

    .p-3 {
        width: 100%;
        border: 0.25rem dashed #ddd;
        /*min-height: 500px;*/
        /*max-height: 550px;*/

    }

    .p-4 {
        width: 100%;
        /*border: 0.25rem dashed #ededed;*/
        /*min-height: 400px;*/
        /*max-height: 450px;*/
        overflow-y: auto;
        display: flex;
        flex-flow: column nowrap;
        background: #282828;
        align-items: center;
        /*justify-content: center;*/

    }

    .paste {
        width: 100%;
        border: 0.25rem dashed #ddd;
        min-height: 350px;
        max-height: 400px;
        overflow-y: auto;

    }

    .applys-part {
        overflow-y: auto;
        /*max-height: 400px;*/
        padding-bottom: 50px;
        border: 1px solid lightgray;
        border-radius: 2px;
        padding-top: 10px;
        display: flex;;
        flex-flow: row wrap;
        justify-content: flex-start;
        padding-left: 10px;
        padding-right: 10px;

    }

    #body {
        /*overflow-y: auto;*/
        /*max-height: 360px;*/
        /*padding-bottom: 50px;*/

    }

    .nav-tabs-custom {
        margin-bottom: 0;
    }

    .paste textarea {
        margin: 0 auto;
        /*border: 1px solid red;*/
        width: 100%;

    }

    #replaceUl .active {
        display: block;;
    }

    .margin-right {
        margin-right: 20px;
    }

    .felx-row-2 {
        display: flex;
        flex-flow: row nowrap;
        padding-left: 5px;
        padding-right: 5px;
        justify-content: center;
    }


</style>
