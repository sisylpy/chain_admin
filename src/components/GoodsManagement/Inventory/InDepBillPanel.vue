<template>
    <div class="">


        <section>
            <div class="content">
                <div class="row">

                    <div class="col-md-6" v-for="(item, billIndex) in arr">

                        <div class="box">
                            <div class="box-header  with-border row flex-row">
                                <div class="col-md-4">日期:{{item.inDatetime}}</div>
                                <div class="col-md-4">供应商:{{item.ckSupplierEntity.supplierName}}</div>
                                <div class="col-md-4">总金额:{{item.billSum}}元</div>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body  no-padding with-border">
                                <table class="table with-border">
                                    <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>商品</th>
                                        <th>采购数量</th>
                                        <th>单价</th>
                                        <th>小计</th>
                                    </tr>
                                    </thead>
                                    <tbody>


                                    <tr v-for="(sub, index) in item.subBillEntities">
                                        <td>{{index + 1}}</td>
                                        <td>{{sub.ckGoodsEntity.goodsName}}</td>
                                        <td>{{sub.inQuantity}}{{sub.ckGoodsEntity.purStandardName}}</td>
                                        <td>{{sub.unitPrice}}</td>
                                        <td>{{sub.inSubTotal}} 元</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.box-body -->

                            <div class="box-footer flex-arround" >
                                <button class="inStockBtn btn-warning btn-sm" :id="item.inBillId" style="margin-right: 20px;">入库</button>
                                <button class="printBtn btn-primary btn-sm" :id="billIndex" >打印</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </section>

        <!-- 打印机内容载体-->
        <div style="display: none ; padding-left: 30px; padding-right: 30px;" id="billView"></div>
    </div>


</template>

<script>
    import api from '../../../api/goodsManagement/inventory'


    export default {
        name: "InDepBillPanel",
        components: {},
        data() {
            return {
                arr: []
            }
        },


        mounted() {
            var that = this;

            this.getInDepBills();

            $('body').on('click', '.inStockBtn', function (e) {
                console.log("update")
                console.log(e)
                var index = e.currentTarget.id;
                if(index) {
                    var bill = {
                        inBillId: index,
                        inUserId: 1
                    }
                    api.inDepBillReceive(bill).then(res => {
                        if(res.code == 0) {
                            that.getInDepBills();
                        }
                    })
                }

            });


            $('body').on('click', '.printBtn', function (e) {
                var index = e.currentTarget.id
                if(index) {
                    var header = `<h3 class="header" id="title" style="text-align: center;">入库单</h3>`
                    $('#billView').append(header);


                    var billArr = that.arr[index];


                    var inDatetime = billArr['inDatetime'];
                    var supplierName = billArr['ckSupplierEntity']['supplierName'];
                    var billSum = billArr['billSum'];
                    var dateV =          `<div style="float:left; width:25%; text-align: center; ">日期: `+ inDatetime+`</div>`
                    var supplierNameV =  `<div style="float:left; width:25%; text-align: center; ">供应商: `+ supplierName+`</div>`
                    var billSumV =       `<div style="float:left; width:25%; text-align: center; ">总计金额: `+ billSum+`元</div>`
                    var personV =       `<div style="float:left; width:25%; ">收货人:</div>`
                    var h3 = `<div style="width: 100%; line-height: 40px;font-weight: 500; float: left;">`
                        + dateV  + supplierNameV + billSumV + personV + `</div>`

                    $('#billView').append(h3);

                    var title = `<div style="width: 100%;float: left; line-height: 30px; border-top: 1px solid gray;border-bottom: 1px solid gray;
                                text-align: center; font-size: 18px;
">
                            <div style="word-break:keep-all;box-sizing: border-box;width: 30%; float: left; border-right: 1px solid gray;border-left: 1px solid gray;">商品</div>
                            <div style="word-break:keep-all;box-sizing: border-box;width: 20%; float: left; border-right: 1px solid gray;">数量</div>
                            <div style="word-break:keep-all;box-sizing: border-box;width: 30%; float: left; border-right: 1px solid gray;">单价</div>
                            <div style="word-break:keep-all;box-sizing: border-box;width: 20%; float: left; border-right: 1px solid gray;">小计</div>

                            </div>`

                    $('#billView').append(title);

                    var applys = billArr['subBillEntities'];


                    for (var j = 0; j < applys.length; j++) {
                        var goodsName = applys[j]['ckGoodsEntity']['goodsName'];
                        var inQuantity = applys[j]['inQuantity'];
                        var unitPrice = applys[j]['unitPrice'];
                        var inSubTotal = applys[j]['inSubTotal'];
                        var standard = applys[j]['ckGoodsEntity']['purStandardName'];

                        var goodsNameV =  `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 30%;  border-right: 1px solid gray; border-left: 1px solid gray;" >` + goodsName +`</div>`
                        var inQuantityV = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%;  border-right: 1px solid gray;">` + inQuantity + `</div>`;
                        var unitPriceV =  `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 30%;  border-right: 1px solid gray;">` + unitPrice +`元/`+standard+`</div>`
                        var inSubTotalV = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%;  border-right: 1px solid gray;">` + inSubTotal +`</div>`
                        var oneApply =    `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 100%; line-height: 30px; font-size: 14px; border-bottom: 1px solid gray; text-align: center;">`
                            + goodsNameV + inQuantityV +  unitPriceV + inSubTotalV+ `</div>`


                        $('#billView').append(oneApply);

                        $('.one-goods-apply').css({
                            "color": "red",
                            "line-height": "45px",
                            "border-bottom": "1px solid #eee",
                            "background": "gray",
                        })
                    }



                    var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>" +
                        "<style media=\"print\">" +
                        "    @page {" +
                        "      size: auto;  /* auto is the initial value */\n" +
                        "      margin: 0mm; /* this affects the margin in the printer settings */\n" +
                        "    }" +
                        "</style>" +
                        "</head><body style='margin: 0;margin-top: 20px; padding-left: 3%; padding-left: 3%'>";
                    // var str = document.getElementById('#testParpare').innerHTML;
                    var str =$('#billView').html();

                    printStr = printStr + str + "</body></html>";


                    var pwin = window.open("Print.htm", "print"); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需要
                    pwin.document.write(printStr);
                    pwin.document.close();     //这句很重要，没有就无法实现
                    pwin.print();






                    window.location.reload();




                }



            })


        },

        methods: {




            getInDepBills: function () {
                this.bus.$emit('loading', true);
                api.queryInDepBills(-1).then(res => {
                    console.log(res.data)
                    if (res.data) {
                        console.log(res.data);
                        this.arr = res.data;
                        this.bus.$emit('loading', false);
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .content {
        padding-left: 0;
    }
    .flex-arround{
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;

    }

</style>

