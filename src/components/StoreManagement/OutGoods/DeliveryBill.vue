<template>

    <div class="row">

        <div class="col-md-2">

            <div class="box box-primary">

                <div class="box-header with-border">
                    <h3 class="box-title">店铺</h3>
                </div>

                <div class="box-body no-padding">
                    <ul class="nav nav-pills nav-stacked">
                        <li v-for="(item,index) in storeArr" v-bind:key="item.storeId"
                            :id="item.storeId"
                            @click='onclick(index, item.storeId, item.storeName)'
                            :class="isactive == index ? 'active' : '' ">
                            <a>{{item.storeName}}</a></li>
                    </ul>
                </div>
                <!-- /.box-body -->
            </div>
        </div>

        <div class="col-md-10">
            <div class="box box-primary">

                <div class="box-header with-border">
                    <div class="row">
                        <div class="col-md-4">
                            <!--<h5>出货日期：{{date}}</h5>-->
                            <h5>出库总金额：{{totalCost}} 元</h5>
                        </div>
                        <div class="col-md-4">
                            <h5>订货店铺：{{storeName}}</h5>
                            <!--<h5>操作人：李沛谊</h5>-->
                        </div>
                        <div class="col-md-4">
                            <button @click="PrintBill">打印出货单</button>
                        </div>
                    </div>

                </div>

                <div class="box-body no-padding ">


                    <div id="deliveryOrderNew">
                        <table class="table table-striped">

                            <tbody>
                            <tr>
                                <th>序号</th>
                                <th>商品名称</th>
                                <th>申请</th>
                                <th>出库数量</th>
                                <th>单价</th>
                                <th>小计</th>
                            </tr>
                            <tr v-for="(item, index) in deliveryArr">
                                <td>{{index+1}}</td>
                                <td>{{item.goodsEntity.goodsName}}</td>
                                <td>{{item.applysEntity.applyNumber}}{{item.goodsEntity.applyStandardName}}</td>
                                <td>{{item.quantity}} {{item.goodsEntity.purStandardName}}</td>
                                <td :style='item.discountPrice !== item.goodsEntity.price? "color: blue": "" '>
                                    <input  class="stockId"  name="price" type="text"
                                            :value="item.discountPrice"
                                            :stockRecordId="item.stockRecordId"
                                            :instoreid = "item.inStoreId"
                                            disabled></td>
                           <!--row.quantity * row.discountPrice).toFixed(1)-->
                                <td class="cost">{{(item.quantity * item.discountPrice).toFixed(1)}}</td>

                            </tr>

                            </tbody>
                        </table>

                    </div>

                    <!--<table id="deliveryOrderNew"></table>-->
                    <!--<div id="deliveryOrderPager"></div>-->
                </div>

            </div>
            <div style="display: none" id="test"></div>



        </div>
    </div>


</template>

<script>
    import api from '@/api/store/outGoods'


    export default {
        name: "DeliveryTable",
        components: {},
        props: ['outType'],
        watch: {

            outType: function (newVal) {
                if (newVal == "deliveryOrder") {
                    this.isactive = 0;
                    this.getStore();


                }
            }


        },
        data() {
            return {
                page: 1,
                limit: 40,
                isactive: 0,
                deliveryArr: [],
                totalCost: "",
                storeArr: [],
                storeName: "",
                storeId: -1,
                date: ""
            }
        },


        mounted() {

            var that = this;

            $('#deliveryOrderNew').on('dblclick', 'input[name=price]', function () {
                console.log("dblclick")
                $(this).removeAttr("disabled");
                $(this).focus();
            });

            $('#deliveryOrderNew').on('keyup', 'input[name=price]', function (e) {

                if (e.keyCode == 13) {

                    var newPrice = $(this).val();

                    var stockRecordId = $(this).attr('stockrecordid');

                    var data = {
                        stockRecordId: stockRecordId,
                        discountPrice: newPrice,
                        isDiscount: 1,
                    }
                    api.updatePrice(data).then(res => {
                        if (res.code == 0) {
                            that.getJqtableData();
                            $(this).blur();
                            $(this).attr("disabled")
                        }
                    })
                }
            });


            $('body').on('click', '#sucPrint', function () {
                        console.log("success!sucPrintsucPrint!")
                var stockIds = $('.stockId');
                        var stockRecords = [];
                    console.log(stockIds.length);
                    console.log("stockIds.length up")
                for(var i= 0; i < stockIds.length; i++) {
                    var stock = stockIds[i];
                    var stockRecord = {
                        stockRecordId : $(stock).attr('stockrecordid'),
                        subTotal: $(stock).parent().next().html(),
                        inStoreId: $(stock).attr('instoreid')
                    }

                    stockRecords.push(stockRecord);

                }
                console.log(stockRecords)

                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/chainPro_war_exploded/sys/ckstockrecord/deliveryPrintSuccess/",
                    data: JSON.stringify(stockRecords),
                    dataType: 'json',
                    success: function (data) {

                        if (data.code == 0) {
                            window.location.reload();
                        }
                    }
                })
            });

            //取消打印
            $('body').on('click', '#noPrint', function () {
                console.log("nonono")
                window.location.reload();
            });




        },


        methods: {


            PrintBill: function () {

                var arr = this.deliveryArr;
                var arrLen = this.deliveryArr.length;
                var totalGoods = 20;
                var totalPriPage = Math.ceil(arrLen / totalGoods);
                console.log(totalPriPage)
                console.log("kankan totalPage!!!!")

                if (totalPriPage <= 1) {

                    var applyBody = `<div id="page1" class="applyBody" style="position: relative;"></div>`
                    $('#test').append(applyBody);

                    var header = `<div class="header" style="display: flex; flex-flow: row nowrap; align-items: flex-start;" >
<div style="margin-right: 30px;">店铺:` + this.storeName + `</div> <div style="margin-right: 30px;">日期:` + this.date + `</div>
<div>第1页 共1页</div> </div>`;
                    $('#page1').append(header);


                    var left = `<div class="left" style="float: left; background: pink;width: 50%; "></div>`
                    $('.applyBody:eq(0)').append(left);

                    var right = `<div class="right" style="float: left;width: 50%;  background: yellow;"></div>`
                    $('.applyBody:eq(0)').append(right);

                    for (var j = 0; j < arr.length; j++) {

                        if (j < totalGoods / 2) {
                            var oneItem = `<div class="oneItem" style="background: red; display: flex; flex-flow: row nowrap;"></div>`
                            $('.left:eq(0)').append(oneItem);

                            var quantity = `<div>` + arr[j]['quantity'] + `</div>`
                            var discountPrice = `<div>` + arr[j]['discountPrice'] + `</div>`
                            var goodsName = `<div>` + arr[j]['goodsEntity']['goodsName'] + `</div>`

                            $('.oneItem:eq(' + j + ')').append(goodsName);
                            $('.oneItem:eq(' + j + ')').append(discountPrice);
                            $('.oneItem:eq(' + j + ')').append(quantity);
                        } else {


                            var oneItem = `<div class="oneItem" style=" display: flex; flex-flow: row nowrap;"></div>`
                            $('.right:eq(0)').append(oneItem);

                            var quantity = `<div>` + arr[j]['quantity'] + `</div>`
                            var discountPrice = `<div>` + arr[j]['discountPrice'] + `</div>`
                            var goodsName = `<div>` + arr[j]['goodsEntity']['goodsName'] + `</div>`

                            $('.oneItem:eq(' + j + ')').append(goodsName);
                            $('.oneItem:eq(' + j + ')').append(discountPrice);
                            $('.oneItem:eq(' + j + ')').append(quantity);

                        }
                    }

                } else {

                    for (var i = 1; i <= totalPriPage; i++) {
                        console.log("dayu 20 ge le;")
                        var newi = i - 1

                        var applyBody = `<div id="page` + i + `"style="position: relative; "><div  class="applyBody"  style="page-break-after:always"></div></div>`
                        $('#test').append(applyBody);

                        var header = `<div class="header" style="display: flex; flex-flow: row nowrap; align-items: flex-start;" >
<div style="margin-right: 30px;">店铺:` + this.storeName + `</div> <div style="margin-right: 30px;">日期:` + this.date + `</div>
<div>第` + i + `页 共` + totalPriPage + `页</div> </div>`;
                        $('.applyBody:eq(' + newi + ')').append(header);


                        var left = `<div class="left" style="float: left; background: pink;width: 50%; "></div>`
                        $('.applyBody:eq(' + newi + ')').append(left);

                        var right = `<div class="right" style="float: left;width: 50%;  background: yellow;"></div>`
                        $('.applyBody:eq(' + newi + ')').append(right);

                        for (var j = i * totalGoods - totalGoods; j < i * totalGoods; j++) {

                            if (j < arrLen) {

                                console.log("----->>>>>")
                                console.log(j)
                                console.log("=====>>>>>")

                                if (j < (i - 1) * totalGoods + totalGoods / 2) {
                                    var oneItem = `<div class="oneItem" style="background: red; display: flex; flex-flow: row nowrap;"></div>`
                                    $('.left:eq(' + newi + ')').append(oneItem);

                                    var quantity = `<div>` + arr[j]['quantity'] + `</div>`
                                    var discountPrice = `<div>` + arr[j]['discountPrice'] + `</div>`
                                    var goodsName = `<div>` + arr[j]['goodsEntity']['goodsName'] + `</div>`

                                    $('.oneItem:eq(' + j + ')').append(goodsName);
                                    $('.oneItem:eq(' + j + ')').append(discountPrice);
                                    $('.oneItem:eq(' + j + ')').append(quantity);
                                } else {

                                    var oneItem = `<div class="oneItem" style=" display: flex; flex-flow: row nowrap;"></div>`
                                    $('.right:eq(' + newi + ')').append(oneItem);

                                    var quantity = `<div>` + arr[j]['quantity'] + `</div>`
                                    var discountPrice = `<div>` + arr[j]['discountPrice'] + `</div>`
                                    var goodsName = `<div>` + arr[j]['goodsEntity']['goodsName'] + `</div>`

                                    $('.oneItem:eq(' + j + ')').append(goodsName);
                                    $('.oneItem:eq(' + j + ')').append(discountPrice);
                                    $('.oneItem:eq(' + j + ')').append(quantity);

                                }


                            }


                        }


                    }
                }

                var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head><body >";
                var content = "";
                for (var m = 0; m < totalPriPage; m++) {
                    var newm = m + 1;
                    var str = document.getElementById('page' + newm + '').innerHTML;

                    content = content + str;
                }


                printStr = printStr + content + "</body></html>";
                var pwin = window.open("Print.htm", "print"); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需要
                pwin.document.write(printStr);
                pwin.document.close();     //这句很重要，没有就无法实现
                pwin.print();


                // var test = $('#test').html();
                // window.document.body.innerHTML = test
                // window.document.write(window.document.body.innerHTML);
                // window.document.close();
                // window.print();


                var ch = `<div style="z-index: 9999; width:100%; height:100%;  background:gray;position: absolute; margin-right:20px; margin-top:100px;">
                            <button id="sucPrint">打印成功</button>
                            <button id="noPrint">打印失败</button>
                            </div>`
                $('body').append(ch)
            },



            getStore: function () {
                this.bus.$emit('loading', true);
                api.deliveryStore().then(res => {
                    if (res) {
                        console.log(res)
                        this.bus.$emit('loading', false);
                        this.storeArr = res.data;
                        this.storeId = res.data[0].storeId;
                        this.storeName = res.data[0].storeName;

                        //加载表格数据
                        this.getDeliveryData()
                    }
                });
            },


            //获取表格数据
            getDeliveryData: function () {

                this.bus.$emit('loading', true);

                api.getDeliveryBill(this.storeId).then(res => {
                    console.log(res)
                    if (res) {
                        console.log(res)
                        this.bus.$emit('loading', false);
                        this.deliveryArr = res.data.stockList;
                        this.totalCost = res.data.total;

                    }
                });





            },

            onclick: function (index, storeId, storeName) {
                this.isactive = index;
                this.storeId = storeId;
                this.storeName = storeName;
                this.getJqtableData()
            },


        }


    }

</script>

<style scoped>


</style>
