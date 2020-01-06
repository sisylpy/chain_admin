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
                            <h5>出库总金额：{{totalCost}} 元</h5>
                        </div>
                        <div class="col-md-4">
                            <h5>订货店铺：{{storeName}}</h5>
                        </div>
                        <div class="col-md-4">
                            <button @click="PrintBill">打印出货单</button>
                        </div>
                    </div>

                </div>

                <div class="box-body no-padding ">


                    <div id="deliveryOrderNew">
                        <table class="table table-striped">

                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>商品名称</th>
                                <th>申请</th>
                                <th>出库数量</th>
                                <th>单价</th>
                                <th>小计</th>
                            </tr>
                            </thead>

                            <tbody v-if="deliveryArr.length > 0">

                            <tr v-for="(item, index) in deliveryArr">
                                <td>{{index+1}}</td>
                                <td>{{item.goodsEntity.goodsName}}</td>
                                <td>{{item.applysEntity.applyNumber}}{{item.goodsEntity.applyStandardName}}</td>
                                <td>
                                    <input type="text" name="quantity"
                                           :value="item.quantity"
                                           :stockRecordId="item.stockRecordId"
                                           :index="index"
                                           disabled
                                    >{{item.goodsEntity.purStandardName}}
                                </td>
                                <td :style='item.discountPrice !== item.goodsEntity.price? "color: blue": "" '>
                                    <input type="text" name="price"
                                           :value="item.discountPrice"
                                           :stockRecordId="item.stockRecordId"
                                           :index="index"
                                           disabled></td>
                                <td class="cost" :instoreid="item.inStoreId" :stockRecordId="item.stockRecordId">
                                    {{item.subTotal}}
                                </td>

                            </tr>
                            </tbody>

                            <tbody v-else>
                            <tr style="min-height: 200px;">暂无数据</tr>

                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
            <div style="display: none" id="test"></div>


        </div>
    </div>


</template>

<script>
    import api from '@/api/goodsManagement/outGoods'


    export default {
        name: "deliveryBill",
        components: {},
        props: ['outType'],
        watch: {

            outType: function (newVal) {
                if (newVal == "deliveryBill") {
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
                date: "2020-01-03"
            }
        },
        mounted() {

            var that = this;
            $('#deliveryOrderNew').on('dblclick', 'input', function () {
                console.log("dblclick")
                $(this).removeAttr("disabled");
                $(this).focus();
            });

            $('#deliveryOrderNew').on('keyup', 'input', function (e) {

                if (e.keyCode == 13) {
                    // var newPrice = $(this).val();
                    var index = $(this).attr('index');
                    var newPrice = $('input[name=price]').eq(index).val();
                    var newQuantity = $('input[name=quantity]').eq(index).val();
                    var stockRecordId = $('input[name=price]').eq(index).attr('stockrecordid');
                    var subTotal = Number(newPrice).toFixed(1) * Number(newQuantity).toFixed(1)
                    var data = {
                        stockRecordId: stockRecordId,
                        discountPrice: newPrice,
                        isDiscount: 1,
                        quantity: newQuantity,
                        subTotal: subTotal.toFixed(1)
                    }
                    api.updatePrice(data).then(res => {
                        if (res.code == 0) {
                            that.getDeliveryData();
                            $(this).blur();
                            $(this).attr("disabled")
                        }
                    })
                }
            });


            $('body').on('click', '#sucPrint', function () {
                var costTds = $('.cost');
                var stockRecords = [];
                var total = 0;
                var inStoreId = "";
                for (var i = 0; i < costTds.length; i++) {
                    var td = costTds[i];

                    var subtotal = $(td).html();
                    total = (Number(total) + Number(subtotal)).toFixed(1);
                    inStoreId = $(td).attr('instoreid');
                    var stockRecord = {
                        stockRecordId: $(td).attr('stockrecordid'),
                    };
                    stockRecords.push(stockRecord);
                }
                var bill = {
                    ckStockRecordEntities: stockRecords,
                    inStoreId: inStoreId,
                    total: total
                };
                // $.ajax({
                //     type: "POST",
                //     url: "http://localhost:8080/chainPro_war_exploded/sys/ckstockbill/deliveryPrintSuccess/",
                //     data: JSON.stringify(bill),
                //     dataType: 'json',
                //     success: function (data) {
                //         if (data.code == 0) {
                //             window.location.reload();
                //         }
                //     }
                // })
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

                    var header = `<div class="header" style="position:relative; width: 100%;">
                        <div style="float: left; width: 100%; background: #f0ad4e; font-size: 30px;">` + this.storeName + `</div>
                            <div style="float: left; width: 100%;" >
                            <div style="float: left; width: 50%; margin-left: 25%;background: yellow;text-align: center;">`+this.storeName + this.date + ` 出库单</div>
                            <div style="float:left; background: green; margin-right: 50px;">第1页 共1页</div>
                            </div>
                          </div>`;
                    $('#page1').append(header);


                    var left = `<div class="left" style="float: left; background: pink;width: 33%;"></div>`
                    $('.applyBody:eq(0)').append(left);

                    var middle = `<div class="middle" style="float: left; background: greenyellow;width: 33%;"></div>`
                    $('.applyBody:eq(0)').append(middle);

                    var right = `<div class="right" style="float: left;width: 33%;  background: yellow; "></div>`
                    $('.applyBody:eq(0)').append(right);

                    for (var j = 0; j < arr.length; j++) {

                        if (j < totalGoods / 2) {
                            var oneItem = `<div class="oneItem" style="background: red; display: flex; flex-flow: row nowrap;"></div>`
                            $('.left:eq(0)').append(oneItem);

                            var quantity = `<div>` + arr[j]['quantity'] + `</div>`
                            var discountPrice = `<div>` + arr[j]['discountPrice'] + `</div>`
                            var goodsName = `<div>` + arr[j]['goodsEntity']['goodsName'] + `</div>`
                            var subTotal = `<div>` + arr[j]['subTotal'] + `</div>`

                            $('.oneItem:eq(' + j + ')').append(goodsName);
                            $('.oneItem:eq(' + j + ')').append(discountPrice);
                            $('.oneItem:eq(' + j + ')').append(quantity);
                            $('.oneItem:eq(' + j + ')').append(subTotal);
                        } else {

                            var oneItem = `<div class="oneItem" style=" display: flex; flex-flow: row nowrap;"></div>`
                            $('.right:eq(0)').append(oneItem);

                            var quantity = `<div>` + arr[j]['quantity'] + `</div>`
                            var discountPrice = `<div>` + arr[j]['discountPrice'] + `</div>`
                            var goodsName = `<div>` + arr[j]['goodsEntity']['goodsName'] + `</div>`
                            var subTotal = `<div style="flex-grow: 1;">` + arr[j]['subTotal'] + `</div>`

                            $('.oneItem:eq(' + j + ')').append(goodsName);
                            $('.oneItem:eq(' + j + ')').append(discountPrice);
                            $('.oneItem:eq(' + j + ')').append(quantity);
                            $('.oneItem:eq(' + j + ')').append(subTotal);


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


                        var left = `<div class="left" style="float: left; background: pink;width: 33%; "></div>`
                        $('.applyBody:eq(' + newi + ')').append(left);
                        var middle = `<div class="middle" style="float: left; background: greenyellow;width: 33%; "></div>`
                        $('.applyBody:eq(0)').append(middle);
                        var right = `<div class="right" style="float: left;width: 33%;  background: yellow;"></div>`
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

                // var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head><body >";
                var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>" +
                    "<style media=\"print\">" +
                    "    @page {" +
                    "      size: auto;  /* auto is the initial value */\n" +
                    "      margin: 0mm; /* this affects the margin in the printer settings */\n" +
                    "    }" +
                    "</style>" +
                    "</head><body >";
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


                var ch = `<div style="z-index: 9999; width:100%; height:100%;
 background: gray;position: fixed; left:0; top:0;">
                            <button id="sucPrint">打印成功2</button>
                            <button id="noPrint">打印失败2</button>
                            </div>`
                $('body').append(ch)
            },


            getStore: function () {
                this.bus.$emit('loading', true);
                api.deliveryStore().then(res => {
                    if (res.data) {
                        this.bus.$emit('loading', false);
                        this.storeArr = res.data;
                        this.storeId = res.data[0].storeId;
                        this.storeName = res.data[0].storeName;

                        //加载表格数据
                        this.getDeliveryData()
                    } else {
                        this.bus.$emit('loading', false);

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
                this.getDeliveryData()

            },


        }


    }

</script>

<style scoped>


</style>
