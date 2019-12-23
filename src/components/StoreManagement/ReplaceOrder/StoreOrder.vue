<template>

    <div>

        <div class="nav-tabs-custom no-border pull-left" style="width: 100%;">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#replaceOrder" data-toggle="tab">代下单</a></li>
                <li><a href="#storeOrder" data-toggle="tab">今日申请</a></li>
            </ul>
        </div>

        <div class="tab-content  no-border" style="float: left; width: 100%;">

            <div class="active tab-pane no-border" id="replaceOrder">

                <div class="row"
                     style="display: flex;flex-flow: row nowrap;">

                    <div class="form-group col-md-5" style="display: flex;flex-flow: column nowrap;">

                        <div class="first-line"
                             style="display: flex; flex-flow: row nowrap; align-items: center; justify-content: flex-start; padding-top: 5px; margin-bottom:5px; ">
                            <label style="margin-right: 5px; ">送货日期:</label>
                            <div class="input-group date">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control pull-right" id="datepicker" data-format="MM月dd日">
                            </div>
                            <!-- /.input group -->
                        </div>

                        <div class="second-line"
                             style="display: flex; flex-flow: row nowrap;align-items: center; justify-content: flex-start; padding-top: 5px; margin-bottom:5px; ">

                            <label style="margin-right: 5px;">订货来源:</label>
                            <div class="">
                                <label @click="changeMethods('img')">
                                    <input type="radio" name="r1" class="minimal" checked>
                                    图片订货
                                </label>
                                <label for="selectImg" class="btn btn-default" id="forAddImg"
                                       style="margin-left: 10px;">选择{{imgLen}}图片
                                    <input type="file" id="selectImg" class="upload" @change="addImg" ref="inputer"
                                           multiple
                                           accept="image/png,image/jpeg,image/gif,image/jpg" style="display: none"/>
                                </label>
                            </div>

                            <label style="margin-left: 10px;" @click="changeMethods('paste')">
                                <input type="radio" name="r1" class="minimal">
                                黏贴文字
                            </label>
                        </div>


                        <div class="">

                            <div class="p-3" id="imgs">

                                <div class=" d-inline-block p-4" style="float: left; margin-bottom: 20px;"
                                     v-for='(value, key) in imgs'
                                     :key="key" ref="dropbox" id="dropbox">
                                    <!--<h5 class="mt-0">{{ file.name }}</h5>-->
                                    <div class="delImg" @click="delImg(key)">
                                        <button>删除</button>
                                    </div>
                                    <div style="top: -20px;">
                                        <img :src="getObjectURL(value)" style="width:300px;height:380px;"/>
                                    </div>
                                </div>
                            </div>
                            <!--  " -->
                            <div class="paste" id="paste" style="display: none;">
                            <textarea name="words" cols="30" rows="15" placeholder="黏贴微信中的订货文字内容到这里"
                                      style="padding: 20px;"></textarea>
                            </div>

                        </div>

                    </div>


                    <div class="col-md-7">

                        <div style="display: flex; flex-flow: row nowrap;align-items: center; justify-content: flex-start;">
                            <label style="width: 80px;">选择店铺:</label>
                            <select class="form-control select2" id="replaceStore">
                                <option value=""></option>
                                <optgroup label="燕郊线">
                                    <option v-for="(item) in storeList" :value="item.storeId">{{item.storeName}}
                                    </option>
                                </optgroup>
                                <optgroup label="昌平线">
                                    <option value="5">订单查询</option>
                                    <option value="6">订单导入</option>
                                    <option value="7">订单删除</option>
                                    <option value="8">订单撤销</option>
                                </optgroup>
                            </select>
                        </div>


                        <div style="padding-top: 15px; ">
                                <div class="form-group" style="display: flex; flex-flow: row nowrap; align-items: center; justify-content:space-around; padding-left: 20px; padding-right: 20px;">
                                    <label>
                                        <input type="radio" name="r3" class="flat-red" checked>
                                        单列
                                    </label>
                                    <label>
                                        <input type="radio" name="r3" class="flat-red">
                                        双列
                                    </label>
                                    <label>
                                        <input type="radio" name="r3" class="flat-red">
                                        三列
                                    </label>
                                </div>



                        <div class="table-body " id="body"
                             style="display: none; border: 1px solid lightgray; border-radius: 2px; float: left;">
                            <!--商品表部分-->
                            <ul></ul>
                            <div class="" style="float: right; margin-right: 40px;">
                                <button class="btn btn-primary" @click="saveGoods">
                                    保存
                                </button>
                            </div>
                        </div>


                        </div>


                    </div>


                </div>




            </div>


            <div class="tab-pane no-border table-responsive mailbox-messages" id="storeOrder">


                <div class="mailbox-controls">

                    <div class="pull-right" v-if="currPage < totalPage">{{(currPage - 1) * limit + 1}}-{{limit *
                        currPage}}/{{totalCount}}
                        <div class="btn-group">

                            <button type="button" class="btn btn-default btn-sm" v-if="currPage > 1"
                                    @click="lastPageApplys" style="background: gray;"><i class="fa fa-chevron-left"
                                                                                         style="color:#fff;"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm" v-else><i
                                    class="fa fa-chevron-left"></i></button>

                            <button type="button" class="btn btn-default btn-sm" v-if="currPage < totalPage"
                                    @click="getNextStoreApplys" style="background: gray;"><i class="fa fa-chevron-right"
                                                                                             style="color:#fff;"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm" v-else><i
                                    class="fa fa-chevron-right"></i></button>

                        </div>
                        <!-- /.btn-group -->
                    </div>

                    <div class="pull-right" v-else-if="currPage >= totalPage && applyArr.length > 0">{{(currPage - 1) *
                        limit + 1}}-{{totalCount}}/{{totalCount}}
                        <div class="btn-group">

                            <button type="button" class="btn btn-default btn-sm" v-if="currPage > 1"
                                    @click="lastPageApplys" style="background: gray;"><i class="fa fa-chevron-left"
                                                                                         style="color:#fff;"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm" v-else>
                                <i class="fa fa-chevron-left"></i></button>

                            <button type="button" class="btn btn-default btn-sm" v-if="currPage < totalPage"
                                    @click="getNextStoreApplys" style="background: gray;"><i class="fa fa-chevron-right"
                                                                                             style="color:#fff;"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm" v-else><i
                                    class="fa fa-chevron-right"></i></button>
                        </div>
                        <!-- /.btn-group -->
                    </div>

                    <!-- /.pull-right -->
                </div>

                <div style="min-height: 400px;">
                    <table v-if="applyArr.length > 0" class="table table-hover  table-striped">
                        <tbody>
                        <tr v-for="(item, index) in  applyArr">
                            <!--<td style="width: 30px; "><input type="checkbox" v-if="item.applyStatus > 0" disabled>-->
                            <!--<input v-else type="checkbox"  v-on:click="selectApply(item.applyId)" >-->
                            <!--</td>-->
                            <td style="width: 30px;">{{(currPage - 1) * limit + index + 1}}</td>
                            <td style="width: 100px;">{{item.ckGoodsEntity.goodsName}}</td>
                            <td style="width: 80px;">{{item.applyNumber}} {{item.applyStandardname}}</td>
                            <td v-if="item.applyStatus === 0">新申请</td>
                            <td v-else-if="item.applyStatus === 1 ">出货中</td>
                            <td v-else-if="item.applyStatus ===2 ">出货完成</td>
                            <td v-if="item.applyStatus === 2">
                                出库数量：{{item.stockRecordEntity.quantity}}{{item.ckGoodsEntity.purStandardName}}
                            </td>
                            <td v-else>出库数量：暂无</td>
                            <td>{{(item.applyTime).slice(12)}}</td>
                            <td v-if="item.applyStatus === 0">
                                <button type="button" class="btn btn-default btn-sm" @click="delApply(item.applyId)"><i
                                        class="fa fa-trash-o"></i></button>
                            </td>
                            <td v-else>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    <div style="margin-left: 10px;" v-else>今天没有订货！</div>
                </div>

            </div>

        </div>
    </div>

    <!--<div class="col-md-2">-->
    <!--<div class="box box-primary">-->

    <!--<div class="box-header with-border">-->
    <!--<h3 class="box-title">店铺</h3>-->

    <!--<div class="box-tools">-->
    <!--<div class="btn-group">-->
    <!--<button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">-->
    <!--<i class="fa fa-wrench"></i></button>-->
    <!--<ul class="dropdown-menu" role="menu">-->
    <!--<li><a>新增</a></li>-->
    <!--<li><a href="#">修改</a></li>-->
    <!--<li><a href="#">删除</a></li>-->
    <!--&lt;!&ndash;<li class="divider"></li>&ndash;&gt;-->
    <!--&lt;!&ndash;<li><a href="#">Separated link</a></li>&ndash;&gt;-->
    <!--</ul>-->
    <!--</div>-->

    <!--<button type="button" class="btn btn-box-tool" data-widget="collapse"><i-->
    <!--class="fa fa-minus"></i>-->
    <!--</button>-->
    <!--</div>-->


    <!--</div>-->

    <!--<div class="box-body no-padding" style="max-height: 400px; overflow-y: auto;">-->
    <!--<ul class="nav nav-pills nav-stacked" >-->
    <!--&lt;!&ndash;<li class="active"><a>Inbox</a></li>&ndash;&gt;-->
    <!--<li v-for="(item,index) in storeList" v-bind:key="item.storeId" :id="item.storeId"-->
    <!--:class="isactive == index ? 'active' : '' "-->
    <!--@click='onclick(index, item.storeId,item.storeName)'>-->

    <!--<a>{{item.storeName}}</a></li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--&lt;!&ndash; /.box-body &ndash;&gt;-->
    <!--</div>-->


    <!--</div>-->


</template>

<script>

    import apiS from '../../../api/store/Store'
    import api from '../../../api/GoodsManagement/Products'
    import storage from 'good-storage'

    import apibs from '@/api/background/store'


    export default {
        name: "StoreOrderPanel",
        data() {
            return {
                applyArr: [],
                limit: 10,
                totalCount: '',
                currPage: 1,
                totalPage: '',
                delApplyIds: [],
                groupIndex: 1,
                delIndex: -1,
                storeList: [],
                isactive: 0,

                formData: new FormData(),
                imgs: {},
                imgLen: 0,
                replaceMethods: "img",
                replaceStoreId: '',
                replaceStoreName: '',
                showReplace: false,

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
            //
            // replaceStoreId: function(newVal, oldVal) {
            //     console.log("new?????")
            //     this.replaceStoreId = newVal;
            // },
            // replaceStoreName: function (newVal, oldVal) {
            //     this.replaceStoreName = newVal;
            // },


            storeId: function (newVal, oldVal) {
                this.storeId = newVal;
                if (this.storeType === "storeOrders") {
                    this.getStoreApplys();
                    this.addIndexGoods = 11;
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
            //选择店铺
            $('#replaceStore').on('change', function () {
                var storeName = $("#replaceStore").find("option:selected").text();
                var storeId = $("#replaceStore").val();
                console.log("moutned=====")
                console.log(this.replaceStoreId);
                $('#body').show();
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
            });


            //iCheck for checkbox and radio inputs
            $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
                checkboxClass: 'icheckbox_minimal-blue',
                radioClass: 'iradio_minimal-blue'
            });

            //Flat red color scheme for iCheck
            $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass   : 'iradio_flat-green'
            });


            var data = "page=1&limit=20";
            apibs.getStoreList(data).then(res => {
                if (res) {
                    this.storeList = res.page.list;
                    this.storeId = res.page.list[0].storeId;
                    this.storeName = res.page.list[0].storeName;
                    this.$store.state.store.storeId = res.page.list[0].storeId;
                    this.$store.state.store.storeName = res.page.list[0].storeName;
                    this.$store.state.store.storeType = 'storeOrders';
                }
            });


            this.getStoreApplys();

            this.getDate();

            var addIndexGoods = 11;

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

                var goodsId = $(input).parent().prev().children('.goodsName').attr('goodsid');
                if (goodsId) {
                    var applyNumber = e.currentTarget.value;
                    var goodsName = $(input).parent().prev().children('.goodsName').val();
                    var goodsId = $(input).parent().prev().children('.goodsName').attr("goodsid");
                    var fatherId = $(input).parent().prev().children('.goodsName').attr("fatherid");
                    var outDepId = $(input).parent().prev().children('.goodsName').attr("outdepid");
                    var applyStandardName = $(input).siblings('a').html();


                    if (e.keyCode === 13 && goodsName.length > 0) {
                        // $(input).parent().siblings().children('.price').focus();
                        $(input).parent().parent().parent().next().children().children().children('.goodsName').focus();

                    }

                } else {
                    $(input).parent().prev().children('.goodsName').focus();
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
                                    <div class="body-item col-md-1" style="text-align: center;">` + addIndexGoods + `</div>
                                    <div class="body-item col-md-5">
                                        <input class="goodsName is-last"  style="width: 100%;"  id= ` + addIndexGoods + `_goodsName  placeholder="商品名称"/>
                                    </div>
                                    <div class="body-item col-md-4">
                                        <input  type="number" class="quantity"  style="width: 80%" id= ` + addIndexGoods + `_quantiry  placeholder="申请数量"/>
                                        <a class="standard" style="width: 10%;color: gray;"></a>
                                    </div>
                                    <div class="body-item col-md-2">
                                        <button style="width: 50%;" class="btn btn-sm btn-default" id="delete">X</button>
                                    </div>
                                </div>
                            </li>`
                    $(body).append(goods);

                }
                addIndexGoods = addIndexGoods + 1;
            });

            $('#body').on('click', '#delete', function (e) {
                $(this).parent().parent().parent('li').remove();

                var ul = $('#body ul');

                var total = $(ul).children().length;
                console.log(total);
                for (var i = 0; i < total; i++) {
                    $(ul).children('li:eq(' + i + ')').children().eq(0).children().eq(0).html(i + 1)                //    ‘tr:nth-child(3)’
                }
            })


        },

        methods: {


            //选择订货来源导入图片还是黏贴
            changeMethods: function (e) {
                if (e == "img") {
                    $('#imgs').show();
                    $('#paste').hide();
                    this.replaceMethods = "img";

                } else if (e == "paste") {
                    $('#imgs').hide();
                    $('#paste').show();
                    this.replaceMethods = "paste";
                }
            },



            // 导入图片
            addImg(event) {
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                this.fil = inputDOM.files;
                let oldLen = this.imgLen;
                let len = this.fil.length + oldLen;
                if (len > 20) {
                    alert('最多可上传4张，您还可以上传' + (4 - oldLen) + '张');
                    return false;
                }
                for (let i = 0; i < this.fil.length; i++) {
                    let size = Math.floor(this.fil[i].size / 1024);
                    if (size > 5 * 1024 * 1024) {
                        alert('请选择5M以内的图片！');
                        return false
                    }
                    this.imgLen++;
                    this.$set(this.imgs, this.fil[i].name + '?' + new Date().getTime() + i, this.fil[i]);
                }
                console.log(len)

                // $('#forAddImg').html("选择了"+ len + "张图片");

            },

            getObjectURL(file) {
                var url = null;
                if (window.createObjectURL != undefined) { // basic
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            },

            delImg(key) {
                this.$delete(this.imgs, key);
                this.imgLen--;
                // this.$refs.inputer.value = "ddd"
                var length = this.imgs.length;
                $('#selectImg').val(length);
            },
            submit() {
                for (let key in this.imgs) {
                    let name = key.split('?')[0];
                    this.formData.append('multipartFiles', this.imgs[key], name);
                }
                this.$http.post('/opinion/feedback', this.formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(res => {
                    this.alertShow = true;
                });
            },


            delApply: function (id) {
                console.log(id);
                apiS.delateApplyById(id)
                    .then(res => {
                        if (res) {
                            this.getStoreApplys();
                        }
                    })
            },

            lastPageApplys: function () {
                this.currPage = this.currPage * 1 - 1;
                var data = "page=" + this.currPage + "&limit=" + this.limit + "&storeId=" + this.storeId;
                this.getApplysByData(data);
            },

            getNextStoreApplys: function () {
                this.currPage = this.currPage * 1 + 1;
                var data = "page=" + this.currPage + "&limit=" + this.limit + "&storeId=" + this.storeId;
                this.getApplysByData(data);
            },

            getStoreApplys: function () {
                var data = "page=" + this.currPage + "&limit=" + this.limit + "&storeId=" + this.storeId;
                this.getApplysByData(data);
            },

            getApplysByData: function (data) {
                apiS.getApplysByStoreId(data)
                    .then(res => {
                        if (res) {
                            console.log(res.data)
                            this.applyArr = res.data.list;
                            this.currPage = res.data.currPage;
                            this.totalCount = res.data.totalCount;
                            this.currPage = res.data.currPage;
                            this.totalPage = res.data.totalPage;
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

                    var replaceOrderLi = ` <li style="margin-top: 5px; margin-bottom: 5px;">
                                <div class="row no-padding">
                                    <div class="body-item col-md-1 col-sm-1 index" style="text-align: center;">` + indexGoods + `</div>
                                    <div class="body-item col-md-5 col-sm-5">
                                        <input class="goodsName"  style="width: 100%;"  id= ` + indexGoods + `_goodsName  placeholder="商品名称"/>
                                    </div>
                                    <div class="body-item col-md-4 col-sm-4">
                                        <input   type="number" class="quantity"  style="width: 80%;" id= ` + indexGoods + `_quantiry  placeholder="申请数量" />
                                        <a class="standard" style="width: 10%;color: gray;"></a>
                                    </div>
                                    <div class="body-item col-md-1 col-sm-1">
                                        <button style="width: 50%;" class="btn btn-sm btn-default" id="delete">X</button>
                                    </div>
                                </div>
                            </li>`
                    $(body).append(replaceOrderLi);
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
                console.log($('#body').children().children())

                var $ul = $('#body').children().children()
                var applys = [];

                console.log($("#datepicker").data("datepicker").getDate().toLocaleString())


                for (var i = 0; i < liCount; i++) {
                    var li = $($ul).children().eq(i);


                    console.log(li);
                    console.log(applys.length);

                    var goodsNameA = $(li).find('.goodsName').val();
                    var goodsQuantityA = $(li).find('.quantity').val();

                    if (goodsNameA && goodsQuantityA) {
                        console.log("bushi null")
                        var goodsId = $(li).find('.goodsName').attr('goodsid');
                        var fatherId = $(li).find('.goodsName').attr('fatherid');
                        var outDepId = $(li).find('.goodsName').attr('outdepid');
                        var applyStandard = $(li).find('.standard').html();
                        var apply = {
                            applyGoodsName: goodsNameA,
                            applyGoodsId: goodsId,
                            applyGoodsFatherId: fatherId,
                            outDepId: outDepId,
                            applyStoreId: this.storeId,
                            applyNumber: goodsQuantityA,
                            applyStandardName: applyStandard
                        };
                        applys.push(apply)
                    }
                }


                if (applys.length > 0) {
                    console.log(applys.length)
                    console.log("api oumeoumeouu ???????")
                    apiS.saveReplaceApplys(applys).then(res => {
                        if (res.code === 0) {
                            $('#body ul').children().remove();
                            this.initTenGoods();
                            this.addIndexGoods = 11;
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
        min-height: 350px;
        max-height: 400px;
        /*display: flex;*/
        /*flex-flow: column nowrap;*/
        overflow-y: auto;

        /*justify-content: flex-start;*/
        /*align-items: center;*/
        /*flex-wrap: wrap;*/
    }

    .paste {
        width: 100%;
        border: 0.25rem dashed #ddd;
        min-height: 350px;
        max-height: 400px;
        /*display: flex;*/
        /*flex-flow: column nowrap;*/
        overflow-y: auto;

    }

    #body {
        overflow-y: auto;
        max-height: 360px;
        padding-bottom: 50px;

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

</style>
