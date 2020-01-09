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
            <div style="display: none" id="testDelivery"></div>


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
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/chainPro_war_exploded/sys/ckstockbill/deliveryPrintSuccess/",
                    data: JSON.stringify(bill),
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
                var totalGoods = 36;
                var totalPriPage = Math.ceil(arrLen / totalGoods);
                console.log(totalPriPage)
                console.log("kankan totalPage!!!!")

                if (totalPriPage <= 1) {


                    var applyBody = `<div id="page1" class="applyBody" style="position: relative; width: 100%; background: gainsboro;"></div>`
                    $('#testDelivery').append(applyBody);

                    var header = `<div class="header" style="width: 100%;float:left;">
                        <div style="width: 94%; background: #f0ad4e; font-size: 26px; float:left;">` + this.storeName + `</div>

                            <div style=" width: 94%;line-height: 36px;  float:left; font-size: 14px; " >
                            <div style="width: 20%; float: left; margin-left: 5%; background: green;">总金额：`+this.totalCost+`元</div>

                            <div style="float: left; width: 50%; background: yellow;text-align: center;">`+this.storeName + this.date + ` 出库单</div>

                            <div style="float: left; background: green; margin-right: 50px;">第1页 共1页</div>
                            </div>
                          </div>`;
                    $('#page1').append(header);

                    var content =  `<div class="content_bill" style="width: 100%;float: left; "></div>`

                    $('#page1').append(content);

                    var left = `<div class="left_bill" style="float: left; background: pink;width: 33%;"></div>`
                    $('.content_bill:eq(0)').append(left);

                    var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; background: yellow; line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 35%; border-right: 1px solid gray; border-left: 1px solid gray;">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                    $('.left_bill:eq(0)').append(oneTitle);



                    var middle = `<div class="middle_bill" style="float: left; background: greenyellow;width: 33%;"></div>`
                    $('.content_bill:eq(0)').append(middle);

                    var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; background: yellow; line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 35%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                    $('.middle_bill:eq(0)').append(oneTitle);


                    var right = `<div class="right_bill" style="float: left;width: 33%;  background: #a6e1ec; "></div>`
                    $('.content_bill:eq(0)').append(right);

                    var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; background: yellow; line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box;float:left; width: 35%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box;float:left; width: 20%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box;float:left; width: 20%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box;float:left; width: 25%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                    $('.right_bill:eq(0)').append(oneTitle);




                    for (var j = 0; j < arr.length; j++) {

                        if (j < totalGoods / 3) {


                            var oneItem = `<div class="oneItem" style="background: red;float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; text-align: center;font-size: 11px;"></div>`
                            $('.left_bill:eq(0)').append(oneItem);

                            var goodsName =     `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray;border-left: 1px solid gray; " >` + arr[j]['goodsEntity']['goodsName'] + `</div>`
                            var quantity =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['quantity'] + `</div>`
                            var discountPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['discountPrice'] + `</div>`
                            var subTotal =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['subTotal'] + `</div>`;

                            $('.oneItem:eq(' + j + ')').append(goodsName);
                            $('.oneItem:eq(' + j + ')').append(quantity);
                            $('.oneItem:eq(' + j + ')').append(discountPrice);
                            $('.oneItem:eq(' + j + ')').append(subTotal);

                        } else if( totalGoods / 3 <= j && j < totalGoods /3 * 2){

                            var oneItem = `<div class="oneItem" style="background: rebeccapurple;float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; text-align: center;font-size: 11px;"></div>`
                            $('.middle_bill:eq(0)').append(oneItem);

                            var goodsName =     `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray; " >` + arr[j]['goodsEntity']['goodsName'] + `</div>`
                            var quantity =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['quantity'] + `</div>`
                            var discountPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['discountPrice'] + `</div>`
                            var subTotal =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['subTotal'] + `</div>`;

                            $('.oneItem:eq(' + j + ')').append(goodsName);
                            $('.oneItem:eq(' + j + ')').append(quantity);
                            $('.oneItem:eq(' + j + ')').append(discountPrice);
                            $('.oneItem:eq(' + j + ')').append(subTotal);

                        } else {

                            var oneItem = `<div class="oneItem" style="background: deeppink;float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; text-align: center;font-size: 11px;"></div>`
                            $('.right_bill:eq(0)').append(oneItem);

                            var goodsName =     `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray; " >` + arr[j]['goodsEntity']['goodsName'] + `</div>`
                            var quantity =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['quantity'] + `</div>`
                            var discountPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['discountPrice'] + `</div>`
                            var subTotal =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['subTotal'] + `</div>`;

                            $('.oneItem:eq(' + j + ')').append(goodsName);
                            $('.oneItem:eq(' + j + ')').append(quantity);
                            $('.oneItem:eq(' + j + ')').append(discountPrice);
                            $('.oneItem:eq(' + j + ')').append(subTotal);


                        }
                    }

                } else {

                    for (var i = 1; i <= totalPriPage; i++) {
                        console.log("dayu 36 ge le;")
                        var newi = i - 1

                        // var applyBody = `<div id="page` + i+ `></div>`;
                        var applyBody = `<div id=page`+i+` class="applyBody" ></div>`
                        $('#testDelivery').append(applyBody);


                        var header = `<div class="header" style="width: 100%;float:left;">
                        <div style="width: 94%; background: #f0ad4e; font-size: 26px; float:left;">` + this.storeName + `</div>

                            <div style=" width: 94%;line-height: 36px;  float:left; font-size: 14px; " >
                            <div style="width: 20%; float: left; margin-left: 5%; background: green;">总金额：`+this.totalCost+`元</div>

                            <div style="float: left; width: 50%; background: yellow;text-align: center;">`+this.storeName + this.date + ` 出库单</div>

                            <div style="float: left; background: green; margin-right: 50px;">第`+ i +`页  共`+totalPriPage+`页</div>
                            </div>
                          </div>`;
                        $('#'+"page"+i).append(header);

                        var content =  `<div class="content_bill" style="width: 100%;float: left; "></div>`

                        $('#page'+i).append(content);

                        var left = `<div class="left_bill" style="float: left; background: pink;width: 33%;"></div>`
                        $('.content_bill:eq('+ newi+')').append(left);

                        var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; background: yellow; line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 35%; border-right: 1px solid gray; border-left: 1px solid gray;">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                        $('.left_bill:eq('+ newi +')').append(oneTitle);

                        var middle = `<div class="middle_bill" style="float: left; background: greenyellow;width: 33%;"></div>`
                        $('.content_bill:eq('+ newi +')').append(middle);

                        var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; background: yellow; line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 35%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                        $('.middle_bill:eq('+ newi +')').append(oneTitle);


                        var right = `<div class="right_bill" style="float: left;width: 33%;  background: #a6e1ec; "></div>`
                        $('.content_bill:eq('+ newi +')').append(right);

                        var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; background: yellow; line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box;float:left; width: 35%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box;float:left; width: 20%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box;float:left; width: 20%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box;float:left; width: 25%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                        $('.right_bill:eq(' + newi +')').append(oneTitle);


                        for (var j = i * totalGoods - totalGoods; j < i * totalGoods; j++) {

                            if (j < arrLen) {

                                if (j < (i - 1) * totalGoods + totalGoods / 3 ){

                                    var oneItem = `<div class="oneItem" style="background: red;float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; text-align: center;font-size: 11px;"></div>`
                                    $('.left_bill:eq('+ newi +')').append(oneItem);

                                    var goodsName =     `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray;border-left: 1px solid gray; " >` + arr[j]['goodsEntity']['goodsName'] + `</div>`
                                    var quantity =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['quantity'] + `</div>`
                                    var discountPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['discountPrice'] + `</div>`
                                    var subTotal =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['subTotal'] + `</div>`;

                                    $('.oneItem:eq(' + j + ')').append(goodsName);
                                    $('.oneItem:eq(' + j + ')').append(quantity);
                                    $('.oneItem:eq(' + j + ')').append(discountPrice);
                                    $('.oneItem:eq(' + j + ')').append(subTotal);


                                } else if(j >= (i - 1) * totalGoods + totalGoods / 3 &&  j < ((i - 1) * totalGoods + totalGoods / 3) * 2){

                                    var oneItem = `<div class="oneItem" style="background: rebeccapurple;float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; text-align: center;font-size: 11px;"></div>`
                                    $('.middle_bill:eq('+ newi +')').append(oneItem);

                                    var goodsName =     `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray; " >` + arr[j]['goodsEntity']['goodsName'] + `</div>`
                                    var quantity =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['quantity'] + `</div>`
                                    var discountPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['discountPrice'] + `</div>`
                                    var subTotal =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['subTotal'] + `</div>`;

                                    $('.oneItem:eq(' + j + ')').append(goodsName);
                                    $('.oneItem:eq(' + j + ')').append(quantity);
                                    $('.oneItem:eq(' + j + ')').append(discountPrice);
                                    $('.oneItem:eq(' + j + ')').append(subTotal);

                                } else {

                                    var oneItem = `<div class="oneItem" style="background: deeppink;float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; text-align: center;font-size: 11px;"></div>`
                                    $('.right_bill:eq('+ newi +')').append(oneItem);

                                    var goodsName =     `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray; " >` + arr[j]['goodsEntity']['goodsName'] + `</div>`
                                    var quantity =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['quantity'] + `</div>`
                                    var discountPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['discountPrice'] + `</div>`
                                    var subTotal =      `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['subTotal'] + `</div>`;

                                    $('.oneItem:eq(' + j + ')').append(goodsName);
                                    $('.oneItem:eq(' + j + ')').append(quantity);
                                    $('.oneItem:eq(' + j + ')').append(discountPrice);
                                    $('.oneItem:eq(' + j + ')').append(subTotal);

                                }

                            }


                        }
                    }
                    var fenye = `<div style="page-break-after:always"></div>`

                    $('#page1').append(fenye);
                }

                // var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head><body >";
                var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>" +
                    "<style media=\"print\">" +
                    "    @page {" +
                    "      size: auto;  /* auto is the initial value */\n" +
                    "      margin: 0mm; /* this affects the margin in the printer settings */\n" +
                    "    }" +
                    "</style>" +
                    "</head><body style='margin: 0;margin-top: 20px; padding-left: 3%; padding-left: 3%'>";
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
