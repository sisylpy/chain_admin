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


                <div class="row">

                    <div class="col-sm-4">

                        <div class="flex-row">
                            <label style="margin-right: 5px; ">送货日期:</label>
                            <div class="input-group date">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control pull-right" id="datepicker" data-format="MM月dd日">
                            </div>
                        </div>

                        <div class="second-line"
                             style="display: flex; flex-flow: column nowrap; margin-top: 10px;">

                            <div class="flex-row">
                                <label style="margin-right: 5px;">订货来源:</label>
                                <div class="">
                                    <label @click="changeMethods('img')">
                                        <input type="radio" name="r1" class="minimal" value="img" checked>
                                        图片订货
                                    </label>
                                    <label for="selectImg" class="btn btn-default" id="forAddImg"
                                           style="margin-left: 10px;">选择{{imgLen}}图片
                                        <input type="file" id="selectImg" class="upload" @change="addImg" ref="inputer"
                                               multiple
                                               accept="image/png,image/jpeg,image/gif,image/jpg" style="display: none"/>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label style="visibility: hidden; margin-right: 5px;">订货来源:</label>
                                <label @click="changeMethods('paste')">
                                    <input type="radio" name="r1" class="minimal" value="paste">
                                    黏贴文字
                                </label>
                            </div>


                        </div>


                    </div>

                </div>


                <div class="row">
                    <label class="col-md-12">订货内容:</label>

                </div>

                <div class="row p-3" id="imgs">

                    <div class="col-md-4">

                        <label>图片:</label>
                        <div class="p-4">

                            <div  style="margin-bottom: 20px; padding: 10px;"
                                 v-for='(value, key) in imgs'
                                 :key="key" ref="dropbox" id="dropbox">
                                <!--<h5 class="mt-0">{{ file.name }}</h5>-->


                                <div class="p-5" style="border: 0.15rem dashed #000; padding: 5px;
                                                display: flex; flex-flow: column nowrap; justify-content: center; align-items: center;">
                                    <img :src="getObjectURL(value)" style="width:100%;height:400px; "/>
                                    <!--<div class="delImg" style="margin-top: 5px;">-->
                                        <button class="btn-success btn-sm" @click="delImg(key)" style="width: 60%;margin-top: 5px;">订货完成</button>
                                    <!--</div>-->
                                </div>
                            </div>
                        </div>
                        <!--  " -->
                        <div class="paste" id="paste" style="display: none;">
                            <textarea name="words" cols="30" rows="15" placeholder="黏贴微信中的订货文字内容到这里"
                                      style="padding: 20px;"></textarea>
                        </div>
                    </div>
                    <div class="col-md-8" >

                        <div style="width: 45%; float: left;">

                            <label style="margin-right: 5px; width: 80px;">订货店铺:</label>
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


                        <!--<div class="" style="width: 45%; float: right;">-->
                            <!--<button class="btn btn-primary btn-sm" @click="saveGoods">-->
                                <!--保存-->
                            <!--</button>-->
                        <!--</div>-->

                        <div class="table-body " id="body"
                             style="display: none; float: left;">

                            <!-- 单列，双列，三列-->
                            <div class="form-group"
                                 style="display: flex; flex-flow: row nowrap; align-items: center; justify-content:space-around; padding-left: 20px; padding-right: 20px;">
                                <label @click="changeShowColumn('one')">
                                    <input type="radio" name="r3" class="flat-red" value="one" v-model="showColumn">
                                    单列
                                </label>
                                <label @click="changeShowColumn('two')">
                                    <input type="radio" name="r3" class="flat-red" value="two" v-model="showColumn">
                                    双列
                                </label>
                                <label @click="changeShowColumn('three')">
                                    <input type="radio" name="r3" class="flat-red" value="three" v-model="showColumn">
                                    三列
                                </label>
                            </div>

                            <!-- 2列申请部分-->

                            <label style="margin-right: 5px; ">填写申请:</label>

                            <div class="applys-part" id="applys_body">
                                <div class="one-column" style="width: 50%; ">
                                    <div class="flex-row-applys" v-for="(item) in 9 "
                                         style="padding-top: 5px; padding-bottom: 5px; width: 100%; position: relative;float: left; font-size: 14px;
                                            display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                        <div class="body-item"
                                             style=" color: gray; text-align: center; margin-right: 2%; background: grey; width: 5px; height: 5px; border-radius: 50%">

                                            <!--{{item}},-->
                                        </div>
                                        <div class="body-item" style="width: 40%; display: flex; ">
                                            <input class="goodsName" :id='+ item + "_one_goodsName"' placeholder="商品名称"
                                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        </div>
                                        <div class="body-item"
                                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                                            <input type="number" class="quantity" :id='+ item + "_one_quantity"'
                                                   placeholder="数量"
                                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                            <a class="standard" style="color: gray;"></a>
                                        </div>
                                        <div class="body-item tools" style="width: 10%;">
                                            <i class="fa fa-trash-o del"
                                               style="width: 50%; display: none;  color: red;"></i>
                                        </div>
                                    </div>
                                    <div class="flex-row-applys"
                                         style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                        <div class="body-item"
                                             style="width: 5%; color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">
                                            <!--20,-->
                                        </div>
                                        <div class="body-item" style="width: 40%; display: flex; ">
                                            <input class="goodsName is-lastOne" id="10_one_goodsName" placeholder="商品名称"
                                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        </div>
                                        <div class="body-item"
                                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                                            <input type="number" class="quantity" id="10_one_quantity"
                                                   placeholder="数量"
                                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                            <a class="standard" style="color: gray;"></a>
                                        </div>
                                        <div class="body-item tools" style="width: 10%;">
                                            <i class="fa fa-trash-o del" style="width: 50%; display: none; color: red;"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="one-column" style="width: 50%;" >
                                    <div class="flex-row-applys" v-for="(item) in [11,12,13,14,15,16,17,18,19] "
                                         style="padding-top: 5px; padding-bottom: 5px;  position: relative;float: left; font-size: 14px;
                                            display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                        <div class="body-item"
                                             style=" color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">
                                            <!--{{ item}},-->
                                        </div>
                                        <div class="body-item" style="width: 40%; display: flex; ">
                                            <input class="goodsName" :id='+ item + "_two_goodsName"' placeholder="商品名称"
                                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        </div>
                                        <div class="body-item"
                                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                                            <input type="number" class="quantity" :id='+ item + "_two_quantity"'
                                                   placeholder="数量"
                                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                            <a class="standard" style="color: gray;"></a>
                                        </div>
                                        <div class="body-item tools" style="width: 10%;">
                                            <i class="fa fa-trash-o del"
                                               style="width: 50%; display: none;  color: red;"></i>
                                        </div>
                                    </div>
                                    <div class="flex-row-applys"
                                         style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                        <div class="body-item"
                                             style="color: gray; text-align: center; margin-right: 2%; background: grey; width: 5px; height: 5px; border-radius: 50%">

                                        </div>
                                        <div class="body-item" style="width: 40%; display: flex; ">
                                            <input class="goodsName is-lastOne" id="20_two_goodsName" placeholder="商品名称"
                                                   style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        </div>
                                        <div class="body-item"
                                             style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                                            <input type="number" class="quantity" id="20_two_quantity"
                                                   placeholder="数量"
                                                   style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                            <a class="standard" style="color: gray;"></a>
                                        </div>
                                        <div class="body-item tools" style="width: 10%;">
                                            <i class="fa fa-trash-o del" style="width: 50%; display: none; color: red;"></i>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                <!--"-->
                <div class="row" style="padding-bottom: 30px; margin: 10px 20px 30px 20px;">


                </div>


            </div>

            <div class="tab-pane no-border table-responsive mailbox-messages" id="storeOrder">


                <div class="mailbox-controls">

                    <div class="pull-right" v-if="currPage < totalPage">{{(currPage - 1) * limit + 1}}-{{limit *
                        currPage}}/{{totalCount}}
                        <div class="btn-group">

                            <button type="button" class="btn btn-default btn-sm" v-if="currPage > 1"
                                    @click="lastPageApplys" style="background: gray;"><i
                                    class="fa fa-chevron-left"
                                    style="color:#fff;"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm" v-else><i
                                    class="fa fa-chevron-left"></i></button>

                            <button type="button" class="btn btn-default btn-sm" v-if="currPage < totalPage"
                                    @click="getNextStoreApplys" style="background: gray;"><i
                                    class="fa fa-chevron-right"
                                    style="color:#fff;"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm" v-else><i
                                    class="fa fa-chevron-right"></i></button>

                        </div>
                        <!-- /.btn-group -->
                    </div>

                    <div class="pull-right" v-else-if="currPage >= totalPage && applyArr.length > 0">{{(currPage
                        -
                        1) *
                        limit + 1}}-{{totalCount}}/{{totalCount}}
                        <div class="btn-group">

                            <button type="button" class="btn btn-default btn-sm" v-if="currPage > 1"
                                    @click="lastPageApplys" style="background: gray;"><i
                                    class="fa fa-chevron-left"
                                    style="color:#fff;"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm" v-else>
                                <i class="fa fa-chevron-left"></i></button>

                            <button type="button" class="btn btn-default btn-sm" v-if="currPage < totalPage"
                                    @click="getNextStoreApplys" style="background: gray;"><i
                                    class="fa fa-chevron-right"
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
                        <tr v-for="(item, index) in  applyArr" v-bind:key="item.applyId">
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
                                <button type="button" class="btn btn-default btn-sm"
                                        @click="delApply(item.applyId)"><i
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
                // replaceMethods: "img",
                replaceStoreId: '',
                replaceStoreName: '',
                showReplace: false,
                showColumn: "two",
                // applysNumber: 20,

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
            showColumn: function (newVal, oldVal) {
                console.log(newVal)
                this.showColumn = newVal;
                this.changeShowColumn();
            },

            storeId: function (newVal, oldVal) {
                this.storeId = newVal;
                if (this.storeType === "storeOrders") {
                    this.getStoreApplys();
                    // this.addIndexGoods = 11;
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


            $('input[type=radio].flat-red').on('ifChanged', function (obj) {
                console.log($(this).val());   // 获取该复选框的value值
                console.log(obj.currentTarget.checked)   // 获取该复选框当前状态是否选中
                console.log('您更改了复选框的状态');

                if ($(this).val() == "one") {
                    // changeShowColumn("one");
                    $('#body').children().remove();

                    var data = 10;
                    var percent = 90;
                    for (var i = 1; i <= data; i++) {
                        if (i === data) {
                            var div = `<div class="flex-row-applys"
                                     style="padding-top: 5px; padding-bottom: 5px; width: ` + percent + `%;  font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                    <div class="body-item"
                                         style="width: 5%; color: gray; text-align: center; margin-right: 2%;">
                                        ` + i + `,
                                    </div>
                                    <div class="body-item" style="width: 40%; display: flex; ">
                                        <input class="goodsName is-lastOne"  id="` + i + `_goodsName" placeholder="商品名称"
                                               style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                    </div>
                                    <div class="body-item"
                                         style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;float: left;">
                                        <input type="number" class="quantity" id="` + i + `_quantity"'
                                               placeholder="数量"
                                               style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        <a class="standard" style="color: gray;"></a>
                                    </div>
                                    <div class="body-item tools" style="width: 10%;">
                                        <i class="fa fa-trash-o del"style="width: 50%; display: none; color: red; "></i>
                                    </div>
                                </div>
`
                            $('#body').append(div);
                        } else {
                            div = `<div class="flex-row-applys"
                                     style="padding-top: 5px; padding-bottom: 5px; width: ` + percent + `%;  font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                    <div class="body-item"
                                         style="width: 5%; color: gray; text-align: center; margin-right: 2%;">
                                        ` + i + `,
                                    </div>
                                    <div class="body-item" style="width: 40%; display: flex; ">
                                        <input class="goodsName" id="` + i + `_goodsName" placeholder="商品名称"
                                               style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                    </div>
                                    <div class="body-item"
                                         style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;float: left;">
                                        <input type="number" class="quantity" id="` + i + `_quantity"'
                                               placeholder="数量"
                                               style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        <a class="standard" style="color: gray;"></a>
                                    </div>
                                    <div class="body-item tools" style="width: 10%;">
                                        <i class="fa fa-trash-o del" style="width: 50%; display: none; color: red;"></i>
                                    </div>
                                </div>
`
                            $('#body').append(div);
                        }
                    }

                } else if ($(this).val() == "two") {
                    $('#body').children().remove();

                    var data = 20;
                    var percent = 50;
                    for (var i = 1; i <= data; i++) {
                        if (i === data) {
                            console.log("=======")
                            console.log(i)
                            var div = `<div class="flex-row-applys"
                                     style="padding-top: 5px; padding-bottom: 5px; width: ` + percent + `%;  font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                    <div class="body-item"
                                         style="width: 5%; color: gray; text-align: center; margin-right: 2%;">
                                        ` + i + `,
                                    </div>
                                    <div class="body-item" style="width: 40%; display: flex; ">
                                        <input class="goodsName is-lastOne"  id="` + i + `_goodsName" placeholder="商品名称"
                                               style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                    </div>
                                    <div class="body-item"
                                         style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;float: left;">
                                        <input type="number" class="quantity" id="` + i + `_quantity"'
                                               placeholder="数量"
                                               style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        <a class="standard" style="color: gray;"></a>
                                    </div>
                                    <div class="body-item tools" style="width: 10%;">
                                        <i class="fa fa-trash-o del"style="width: 50%; display: none; color: red; "></i>
                                    </div>
                                </div>
`
                            $('#body').append(div);
                        } else {
                            console.log(i)
                            div = `<div class="flex-row-applys"
                                     style="padding-top: 5px; padding-bottom: 5px; width: ` + percent + `%;  font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                    <div class="body-item"
                                         style="width: 5%; color: gray; text-align: center; margin-right: 2%;">
                                        ` + i + `,
                                    </div>
                                    <div class="body-item" style="width: 40%; display: flex; ">
                                        <input class="goodsName" id="` + i + `_goodsName" placeholder="商品名称"
                                               style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                    </div>
                                    <div class="body-item"
                                         style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;float: left;">
                                        <input type="number" class="quantity" id="` + i + `_quantity"'
                                               placeholder="数量"
                                               style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        <a class="standard" style="color: gray;"></a>
                                    </div>
                                    <div class="body-item tools" style="width: 10%;">
                                        <i class="fa fa-trash-o del" style="width: 50%; display: none; color: red; "></i>
                                    </div>
                                </div>
`
                            $('#body').append(div);
                        }
                    }
                } else {
                    $('#body').children().remove();

                    var data = 30;
                    var percent = 33.3;
                    for (var i = 1; i <= data; i++) {
                        if (i === data) {
                            console.log("=======")
                            console.log(i)
                            var div = `<div class="flex-row-applys"
                                     style="padding-top: 5px; padding-bottom: 5px; width: ` + percent + `%;  font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                    <div class="body-item"
                                         style="width: 5%; color: gray; text-align: center; margin-right: 2%;">
                                        ` + i + `,
                                    </div>
                                    <div class="body-item" style="width: 40%; display: flex; ">
                                        <input class="goodsName is-lastOne"  id="` + i + `_goodsName" placeholder="商品名称"
                                               style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                    </div>
                                    <div class="body-item"
                                         style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;float: left;">
                                        <input type="number" class="quantity" id="` + i + `_quantity"'
                                               placeholder="数量"
                                               style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        <a class="standard" style="color: gray;"></a>
                                    </div>
                                    <div class="body-item tools" style="width: 10%;">
                                        <i class="fa fa-trash-o del"style="width: 50%; display:none; color: red;"></i>
                                    </div>
                                </div>
`
                            $('#body').append(div);
                        } else {
                            console.log(i)
                            div = `<div class="flex-row-applys"
                                     style="padding-top: 5px; padding-bottom: 5px; width: ` + percent + `%;  font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                    <div class="body-item"
                                         style="width: 5%; color: gray; text-align: center; margin-right: 2%;">
                                        ` + i + `,
                                    </div>
                                    <div class="body-item" style="width: 40%; display: flex; ">
                                        <input class="goodsName" id="` + i + `_goodsName" placeholder="商品名称"
                                               style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                    </div>
                                    <div class="body-item"
                                         style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;float: left;">
                                        <input type="number" class="quantity" id="` + i + `_quantity"'
                                               placeholder="数量"
                                               style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                                        <a class="standard" style="color: gray;"></a>
                                    </div>
                                    <div class="body-item tools" style="width: 10%;">
                                        <i class="fa fa-trash-o del" style="width: 50%; display:none; color: red;"></i>
                                    </div>
                                </div>
`
                            $('#body').append(div);
                        }

                    }
                }
            })

            //Flat red color scheme for iCheck
            $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
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

                var goodsId = $(input).parent().prev().children('.goodsName').attr('goodsid');
                if (goodsId) {
                    var goodsName = $(input).parent().prev().children('.goodsName').val();
                    if (e.keyCode === 13 && goodsName.length > 0) {
                        $(input).parent().parent().next().children().children('.goodsName').focus();
                         // $(input).parent().parent().next().next().children().children('.goodsName').focus();

                    }

                } else {
                    $(input).parent().prev().children('.goodsName').focus();
                }


            });

            $('#body').on('focus', '.goodsName', function (e) {

                var inputGoodsName = $('#' + e.currentTarget.id)

                var strs = new Array();
                strs = e.currentTarget.id.split("_");
                var index = strs[0] * 1 + 1;
                var what = "_"+strs[1];


                if ($(this).hasClass('is-lastOne')) {

                    $(this).removeClass('is-lastOne')

                    var goods = ` <div class="flex-row-applys"
                                     style="padding-top: 5px; padding-bottom: 5px;  font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                                    <div class="body-item"
                                         style="width: 5%; color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">

                                    </div>
                                    <div class="body-item" style="width: 40%; display: flex; ">
                                        <input class="goodsName is-lastOne"  id="` +  index + what+ `_goodsName" placeholder="商品名称"
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
                    $(inputGoodsName).parent().parent().append(goods);

                }
            });

            $('#body').on('click', '.del', function (e) {
                $(this).parent().parent('.flex-row-applys').remove();


                var applys = $('#body');

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

            $('#body').on('mouseover', '.flex-row-applys', function (e) {
                // var input = $('#' + e.currentTarget.id);
                // console.log($(e.target))

                var goodsName = $(e.currentTarget).children().find('.goodsName').val();
                console.log(goodsName);
                if (goodsName) {
                    $(e.currentTarget).children().find('.del').show();

                }

            })

            $('#body').on('mouseleave', '.flex-row-applys', function (e) {

                $(e.currentTarget).children().find('.del').hide();
            })


        },

        methods: {


            //选择显示申请列数
            changeShowColumn: function (e) {
                console.log(e)

                if (e == "one") {
                    $('#body').children().remove();

                    this.initDiv(1);
                    this.showColumn =  "one";


                } else if (e == "two") {
                    $('#body').children().remove();
                    this.initDiv(2);
                    this.showColumn =  "two";


                } else {
                    $('#body').children().remove();

                    this.initDiv(3);
                    this.showColumn =  "three";


                }


            },

            initDiv: function (showColumn) {

                var applybody = $('#body');

                var onecolumn = "";
                for (var i = 0; i < showColumn; i++) {
                    if(showColumn == 1) {
                         onecolumn = `<div class="one-column" style="width: 90%; "> </div>`;
                    }else if (showColumn == 2){
                         onecolumn = `<div class="one-column" style="width: 50%; "> </div>`;

                    }else if (showColumn == 3) {
                         onecolumn = `<div class="one-column" style="width: 30%; "> </div>`;

                    }

                    $(applybody).append(onecolumn);


                    for(var j = 0; j < 9; j++){



                    }



//                     if (i === data) {
//                         var div = `<div class="flex-row-applys"
//                                      style="padding-top: 5px; padding-bottom: 5px;  font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
//                                     <div class="body-item"
//                                          style="width: 5%; color: gray; text-align: center; margin-right: 2%;">
//                                         ` + i + `,
//                                     </div>
//                                     <div class="body-item" style="width: 40%; display: flex; ">
//                                         <input class="goodsName is-lastOne"  id="` + i + `_goodsName" placeholder="商品名称"
//                                                style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
//                                     </div>
//                                     <div class="body-item"
//                                          style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;float: left;">
//                                         <input type="number" class="quantity" id="` + i + `_quantity"'
//                                                placeholder="数量"
//                                                style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
//                                         <a class="standard" style="color: gray;"></a>
//                                     </div>
//                                     <div class="body-item tools" style="width: 10%;">
//                                         <i class="fa fa-trash-o del"style="width: 50%; display: none; color: red;"></i>
//                                     </div>
//                                 </div>
// `
//                         $('#body').append(div);
//                     } else {
//                         div = `<div class="flex-row-applys"
//                                      style="padding-top: 5px; padding-bottom: 5px; font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
//                                     <div class="body-item"
//                                          style="width: 5%; color: gray; text-align: center; margin-right: 2%;">
//
//                                     </div>
//                                     <div class="body-item" style="width: 40%; display: flex; ">
//                                         <input class="goodsName" id="` + i + `_goodsName" placeholder="商品名称"
//                                                style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
//                                     </div>
//                                     <div class="body-item"
//                                          style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;float: left;">
//                                         <input type="number" class="quantity" id="` + i + `_quantity"'
//                                                placeholder="数量"
//                                                style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
//                                         <a class="standard" style="color: gray;"></a>
//                                     </div>
//                                     <div class="body-item tools" style="width: 10%;">
//                                         <i class="fa fa-trash-o del" style="width: 50%;display: none; color: red;"></i>
//                                     </div>
//                                 </div>
// `
//                         $('#body').append(div);
//                     }
                }


            },

            //选择订货来源导入图片还是黏贴
            changeMethods: function (e) {
                console.log(e)
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
                    alert('最多可上传4张，您还可以上传' + (20 - oldLen) + '张');
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


            // getDate: function () {
            //     var weekDayArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]//星期映射数组
            //     var myDate = new Date()
            //     var milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24; //当i为0代表当前日期，为1时可以得到明天的日期，以此类推
            //     var newMyDate = new Date(milliseconds);
            //     var weekDay = newMyDate.getDay(); //获取当前星期X(0-6,0代表星期天)
            //     var year = newMyDate.getFullYear();//获取当前年
            //     var month = newMyDate.getMonth() + 1;//获取当前月
            //     var day = newMyDate.getDate();//获取当前日
            //     this.showDate = year + '/' + month + '/' + day + weekDayArr[weekDay];
            // },


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
                            // this.addIndexGoods = 11;
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
        min-height: 500px;
        max-height: 550px;

    }

    .p-4 {
        width: 100%;
        /*border: 0.25rem dashed #ededed;*/
        min-height: 400px;
        max-height: 450px;
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
        max-height: 400px;
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

    .flex-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        /*padding-left: 5px;*/
        /*padding-right: 5px;*/
    }

    .flex-row-applys {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
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
