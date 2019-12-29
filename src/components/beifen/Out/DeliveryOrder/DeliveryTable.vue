<template>


    <div class="box box-primary">

        <div class="box-header with-border">
            <div class="row">
                <div  class="col-md-4">
                    <h5>出货日期：2019/11/11</h5>
                    <h5>出库总金额：{{totalCost}} 元</h5>
                </div>
                <div  class="col-md-4">
                    <h5>订货店铺：{{inStoreName}}</h5>
                    <h5>操作人：李沛谊</h5>
                </div>
                <div  class="col-md-4">
                    <h5>送货路线：燕郊线</h5>
                    <h5>司机：</h5>
                </div>
            </div>

        </div>

        <div class="box-body no-padding ">
            <table id="deliveryOrder"></table>
            <div id="deliveryOrderPager"></div>
        </div>

    </div>




</template>

<script>
    import api from '@/api/store/outGoods'


    export default {
        name: "DeliveryTable",
        components: {},
        data() {
            return {
                page: 1,
                limit: 20,
                deliveryArr: [],
                totalCost: ""
            }
        },

        computed: {
            inStoreId: {
                get () {
                    return this.$store.state.orders.in_storeId
                },
                set (value) {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                }
            },
            inStoreName: {
                get () {
                    return this.$store.state.orders.in_storeName
                },
                set (value) {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                }
            },

        },
        watch: {

            inStoreId: function (newVal, oldVal) {
                this.inStoreId = this.$store.state.orders.in_storeId;
                this.getJqtableData();
            },

            inStoreName: function (newVal, oldVal) {
                this.inStoreName = this.$store.state.orders.in_storeName;
            },

        },

        mounted() {

            var that = this;

            that.getJqtableData();






            $('#deliveryOrder').on('dblclick', 'input[name=price]', function () {
                console.log("dblclick")
                $(this).removeAttr("disabled");
                $(this).focus();
            });

            $('#deliveryOrder').on('keyup', 'input[name=price]', function (e) {

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


        },





        methods: {

            getTotal() {

                var total = 0.0;
                var aaa =$('#deliveryOrder').children().find('.cost');

                for(var i = 0; i < aaa.length; i++) {
                    var cost = $('.cost:eq('+ i +')').html();
                    total += Number(cost);

                    console.log(cost, total)
                    this.totalCost = total;

                }

            },



            //获取表格数据
            getJqtableData: function () { var data = "page=" + this.page + "&limit=" + this.limit
                + "&status=" + "0" + "&storeId=" + this.inStoreId;
                this.bus.$emit('loading', true);

                api.storeDeliverOrder(data).then(res => {
                    if (res) {
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
                $("#deliveryOrder").jqGrid("clearGridData")

                // 初始化jqgrid
                var _this = this

                //更新数据
                $("#deliveryOrder").jqGrid('setGridParam', {
                    datatype: 'local',
                    data: this.deliveryArr,//newData是符合格式要求的重新加载的数据
                    page: this.currPage//哪一页的值
                }).trigger("reloadGrid");

                $("#deliveryOrder").jqGrid('setLabel', '0', '序号', 'labelstyle');

                $("#deliveryOrder").jqGrid(
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

                            { label: '出库数量', name: 'quantity', width: 150, formatter: function (value, options, row) {
                                    return name = row.quantity + row.goodsEntity.purStandardName
                                }},
                            {label: '单价', name: 'price', width: 250, formatter: function (value, options, row) {
                                var priceVal = "";
                                var colorVal = "";
                                if(row.discountPrice !== row.goodsEntity.price){
                                    priceVal = row.discountPrice;
                                    colorVal = "#2322e9";

                                }else {
                                    priceVal = row.discountPrice;
                                    colorVal = "#000";
                                }
                                   var  input = `<input type="text"  stockRecordId=`+row.stockRecordId+` quantity=`+row.quantity+`  style="color: `+colorVal+`;" name="price" disabled value=` + priceVal + `> /` + row.goodsEntity.purStandardName + ``
                                    return name = input

                                }},

                            { label: '出库成本', name: 'cost', width: 150, formatter: function (value, options, row) {

                                var cost = (row.quantity * row.discountPrice).toFixed(1);
                                var costDiv = `<div class="cost">`+cost+`</div>`
                                    return name = costDiv
                                }},


                        ],


                        viewrecords: true,
                        height: 400,
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








        }


    }

</script>

<style scoped>


</style>
