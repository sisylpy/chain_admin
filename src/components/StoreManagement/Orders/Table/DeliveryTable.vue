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

                <div class="box-header with-border no-padding">
                    <div class="row">
                        <div class="col-md-4">
                            <h5>出货日期：{{date}}</h5>
                            <h5>出库总金额：{{totalCost}} 元</h5>
                        </div>
                        <div class="col-md-4">
                            <h5>订货店铺：{{storeName}}</h5>
                            <h5>操作人：李沛谊</h5>
                        </div>
                        <div class="col-md-4">
                            <button @click="PrintBill">打印出货单</button>
                        </div>
                    </div>

                </div>

                <div class="box-body no-padding ">
                    <table id="deliveryOrderNew"></table>
                    <div id="deliveryOrderPager"></div>
                </div>

            </div>
            <div style="display: none" id="test"></div>


        </div>
    </div>


</template>

<script>
    import api from '@/api/out/deliverOrder'
    import apis from '@/api/store/Store'


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

            // that.getJqtableData();

            $('#deliveryOrderNew').on('dblclick', 'input[name=price]', function () {
                console.log("dblclick")
                $(this).removeAttr("disabled");
                $(this).focus();
            });

            $('#deliveryOrderNew').on('keyup', 'input[name=price]', function (e) {

                if (e.keyCode == 13) {

                    var newPrice = $(this).val();


                    var stockRecordId = $(this).attr('stockRecordId');

                    var data = {
                        stockRecordId: stockRecordId,
                        discountPrice: newPrice,
                        isDiscount: 1,
                    }
                    api.updatePrice(data).then(res => {
                        if (res.code == 0) {
                            that.getJqtableData();
                        }
                    })
                }
            });


            //chormes 浏览器不起作用！
            //打印前监听方法
            window.onbeforeprint = function () {
                console.log("hahahh")
            }
            //打印后监听方法
            window.addEventListener("afterprint", function (event) {

                var $applys = $('body').children().find('.one-goods-apply');
                var printMax = $('body').children('h2').attr('printmax');
                console.log($('body').children('h2').attr('printmax'))
                console.log(printMax);

                var ids = [];
                for (var i = 0; i < $applys.length; i++) {
                    var id = $($applys[i]).attr('id');
                    ids.push(id)
                }

                var applyArr = [];
                for (var i = 0; i < ids.length; i++) {

                    var apply = {
                        applyId: ids[i],
                        pageNumber: parseInt(printMax) + 1
                    };
                    applyArr.push(apply);
                }


                $('body').on('click', '#successPrint', function () {
                    console.log("success!!")
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/chainPro_war_exploded/sys/ckapplys/applysPrintSuccess/",
                        data: JSON.stringify(applyArr),
                        dataType: 'json',
                        success: function (data) {

                            if (data.code == 0) {
                                window.location.reload();
                                that.getPrintMax();
                            }
                        }
                    })
                });

                //取消打印
                $('body').on('click', '#cancelPrint', function () {
                    window.location.reload();
                });
            });


        },


        methods: {


            PrintBill: function () {

                var header = `<div class="header" style="display: flex; flex-flow: row nowrap; align-items: flex-start;" >
<div style="margin-right: 10px;">店铺:`+this.storeName+`</div> <div>日期:`+this.date+`</div>
</div>`
                $('#test').append(header);
                var applyBody = `<div id="applyBody" >AAA</div>`
                $('#test').append(applyBody);


                var deliveryArr = this.deliveryArr;

                for (var i = 0; i < deliveryArr.length; i++) {
                    var discountPrice = c;
                    var quantityD = applysArr[i]['goodsEntity']['goodsName'];
                    var oneGoods = `<div class="item" style="width: 50%;display: flex; flex-flow: row nowrap;"></div>`

                     var quantity = `<div>`+ deliveryArr[i]['quantity'] + `</div>`
                    var discountPrice = `<div>`+ deliveryArr[i]['discountPrice'] + `</div>`
                    var quantityD = `<div>`+ quantity + `</div>`

                    $('#applyBody').append(oneGoods);


                    var h3 = `<h3 style=" width: 100%">` + goodsName + `:  ` + totalNumber + applyStandardName + `</h3>`

                    $('.goods-applys:eq(' + i + ')').append(h3);
                    var row = `<div class="goods-applys-row" style=" width: 100%;display: inline-block;"></div>`
                    $('.goods-applys:eq(' + i + ')').append(row);


                }
                var test = $('#test').html();
                window.document.body.innerHTML = test
                window.print();
                var ch = `<div style="width: 100%; height: 100%; background: gray;position: fixed; left:0; top:0;">
                            <button id="successPrint">打印成功</button>
                            <button id="cancelPrint">打印失败</button>
                            </div>`
                $('body').append(ch)
            },


            getTotal() {

                var total = 0.0;
                var aaa = $('#deliveryOrderNew').children().find('.cost');

                for (var i = 0; i < aaa.length; i++) {
                    var cost = $('.cost:eq(' + i + ')').html();
                    total += Number(cost);
                    total = Math.round(total * Math.pow(10, 1)) / Math.pow(10, 1)

                    console.log(cost, total)
                    this.totalCost = total;
                    this.date = new Date().toLocaleDateString();

                }

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
                        this.getJqtableData()
                    }
                });
            },


            //获取表格数据
            getJqtableData: function () {
                var data = "page=" + this.page + "&limit=" + this.limit
                    + "&status=0&storeId=" + this.storeId;
                this.bus.$emit('loading', true);

                api.getDeliveryBill(data).then(res => {
                    console.log(res)
                    if (res) {
                        console.log(res)
                        this.bus.$emit('loading', false);
                        this.deliveryArr = res.page.list;

                        //加载表格数据
                        this.jqtable()
                        this.getTotal();
                    }
                });

            },

            // 初始化表格
            jqtable() {

                // 清空jqGrid表格数据
                $("#deliveryOrderNew").jqGrid("clearGridData")

                // 初始化jqgrid
                var _this = this

                //更新数据
                $("#deliveryOrderNew").jqGrid('setGridParam', {
                    datatype: 'local',
                    data: this.deliveryArr,//newData是符合格式要求的重新加载的数据
                    page: this.currPage//哪一页的值
                }).trigger("reloadGrid");

                $("#deliveryOrderNew").jqGrid('setLabel', '0', '序号', 'labelstyle');

                $("#deliveryOrderNew").jqGrid(
                    {
                        data: _this.deliveryArr,
                        datatype: "local",
                        colModel: [
                            {label: 'stockRecordId', name: 'stockRecordId', width: 50, key: true, hidden: true},
                            {
                                label: '商品名称',
                                name: 'goodsName',
                                width: 100,
                                formatter: function (value, options, row) {
                                    return name = row.goodsEntity.goodsName
                                }
                            },
                            {
                                label: '申请', name: 'number', width: 150, formatter: function (value, options, row) {
                                    return name = row.applysEntity.applyNumber + row.goodsEntity.applyStandardName
                                }
                            },

                            {
                                label: '出库数量', name: 'quantity', width: 150, formatter: function (value, options, row) {
                                    return name = row.quantity + row.goodsEntity.purStandardName
                                }
                            },
                            {
                                label: '单价', name: 'price', width: 250, formatter: function (value, options, row) {
                                    var priceVal = "";
                                    var colorVal = "";
                                    if (row.discountPrice !== row.goodsEntity.price) {
                                        priceVal = row.discountPrice;
                                        colorVal = "#2322e9";

                                    } else {
                                        priceVal = row.discountPrice;
                                        colorVal = "#000";
                                    }
                                    var input = `<input type="text"  stockRecordId=` + row.stockRecordId + ` quantity=` + row.quantity + `  style="color: ` + colorVal + `;" name="price" disabled value=` + priceVal + `> /` + row.goodsEntity.purStandardName + ``
                                    return name = input

                                }
                            },

                            {
                                label: '出库成本', name: 'cost', width: 150, formatter: function (value, options, row) {

                                    var cost = (row.quantity * row.discountPrice).toFixed(1);
                                    var costDiv = `<div class="cost">` + cost + `</div>`
                                    return name = costDiv
                                }
                            },


                        ],


                        viewrecords: true,
                        height: 430,
                        rowNum: 10,
                        rowList: [10, 30, 50],
                        rownumbers: true,
                        rownumWidth: 25,
                        shrinkToFit: false,
                        autowidth: true,
                        autoScroll: true,
                        multiselect: false,
                        pager: "#deliveryOrderPager",
                        jsonReader: {
                            root: "page.list",
                            page: this.currPage,
                            total: this.totalCount,
                            records: this.totalPage,
                        },
                        prmNames: {
                            page: "page",
                            rows: "limit",
                            order: "order"
                        },
                        onSelectRow: function (e) {
                            //     i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                            //     cm = $myGrid.jqGrid('getGridParam', 'colModel');
                            // return (cm[i].name === 'cb');
                        },
                        beforeSelectRow: function (rowid, e) {

                            var $myGrid = $(this),
                                i = $.jgrid.getCellIndex($(e.target).closest('td')[0]),
                                cm = $myGrid.jqGrid('getGridParam', 'colModel');
                            return (cm[i].name === 'cb');
                        },

                        // gridComplete: function () {
                        //     //隐藏grid底部滚动条
                        //     $("#jqGrid_newApply").closest(".ui-jqgrid-bdiv").css({"overflow-x": "scroll"});
                        // }
                    }).trigger('reloadGrid');

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
