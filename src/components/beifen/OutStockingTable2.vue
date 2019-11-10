<template>

    <section class="content container-fluid no-padding" id="outStockTable">
        <div class="no-padding no-border">
            <table id="jqGrid_outStocking"></table>
            <!--<div id="jqGridPager_outStocking"></div>-->
        </div>

    </section>


</template>

<script>
    import apia from '@/api/out/orderApplication'

    export default {
        name: "OutStockingTable",

        data() {
            return {
                page: 1,
                limit: 21,
                outStockingArr: [],
                status:1
            }
        },
        computed: {
            orders_depId: {
                get () {
                    return this.$store.state.orders.orders_depId
                },
                set (value) {
                    // this.$store.commit('set_ORDERSDEPID', value)
                }
            },
            applyType: {
                get () {
                    return this.$store.state.orders.applyType
                },
                set (value) {
                    // this.$store.commit('orders/set_APPLYTYPE', value)
                }
            }

        },

        watch: {

            orders_depId: function (newVal, oldVal) {
                this.orders_depId = this.$store.state.orders.orders_depId;
                // if(this.applyType === "outStocking"){
                //     this.getJqtableData();
                //
                // }
            },
            applyType: function (newVal, oldVal) {
                this.applyType = this.$store.state.orders.applyType;
                this.getJqtableData();
            },


        },
        mounted() {


            $('#outStockTable').on('keyup', '.outQuantity', function (e) {
                //获取当前输入框
                // if( $(this).parents('tr').next().length > 0){
                    console.log(e.keyCode)

                    if(e.keyCode == 13) {
                        if($(this).parent().next().children().length > 0){
                            $(this).parent().next().children('.outQuantity').focus();

                        }else{
                            $(this).parents('tr').next().find('.store-apply').children(":first").children("input").focus();

                        }

                    }
                    if(e.keyCode == 40) {
                        if($(this).parent().next().children().length > 0){
                            $(this).parent().next().children('.outQuantity').focus();

                        }else{
                            $(this).parents('tr').next().find('.store-apply').children(":first").children("input").focus();

                        }
                    }

                // }


            })
        },

        methods: {

            saveOutQutantity() {
              console.log("fuzujianrangwosavele!")

                var outQuantityArr = [];
                var $applyIds = $('.apply-id');
                for(var i = 0; i < $applyIds.length; i++) {
                    var quantity = $('.outQuantity:eq('+i+')').val();

                    if(quantity.length > 0){
                        var outQuantity = {
                            stApplyId:  $('.apply-id:eq('+i+')').attr("id"),
                            quantity: quantity,
                            outDepId: this.orders_depId,
                            stGoodsId: $('.goods-id:eq('+i+')').attr("goodsid"),
                            inStoreId: $('.store-id:eq('+i+')').attr("instoreid"),
                            discountPrice: $('.price:eq('+i+')').attr("price"),
                        }
                        outQuantityArr.push(outQuantity);
                    }

                }
                console.log(outQuantityArr)
                this.bus.$emit('loading', true);


                apia.saveOutQuantity(outQuantityArr).then(res => {
                    if(res) {
                        this.bus.$emit('loading', false);
                        this.getJqtableData();
                    }

                })


            },

            //获取表格数据
            getJqtableData: function () {


                var data = "page=" + this.page + "&limit=" + this.limit
                    + "&status=" + "1" + "&depId=" + this.orders_depId;
                this.bus.$emit('loading', true);
                apia.outDepQueryApplys(data).then(res => {
                    console.log("outstocking res")
                    this.bus.$emit('loading', false);

                    this.outStockingArr = res.page.list;

                    //加载表格数据
                    this.jqtable()



                });

            },



            // 初始化表格
            jqtable() {

                console.log("outStocking-------jqtable?????")

                // 清空jqGrid表格数据
                $("#jqGrid_outStocking").jqGrid("clearGridData")

                // 初始化jqgrid
                // var _this = this

                //更新数据
                $("#jqGrid_outStocking").jqGrid('setGridParam', {
                    datatype: 'local',
                    data: this.outStockingArr,//newData是符合格式要求的重新加载的数据
                    page: this.currPage//哪一页的值
                }).trigger("reloadGrid");

                $("#jqGrid_outStocking").jqGrid('setLabel', '0', '序号', 'labelstyle');

                $("#jqGrid_outStocking").jqGrid(
                    {
                        data: this.outStockingArr,
                        datatype: "local",
                        colModel: [
                            {label: 'goodsId', name: 'goodsId', width: 50, key: true, hidden: true},
                            {label: '产品名称', name: 'goodsName', width: 120},
                            {
                                label: '申请', name: 'applys', width: 320, formatter: function (value, options, row) {
                                    var html = '<div class="store-apply" style="display: flex; flex-flow: column wrap;">';

                                    for (var i = 0; i < row.applys.length; i++) {

                                        html += '<label class="one-apply" style="display: flex;flex-flow: row wrap; margin-right: 10px; ' +
                                            ' margin-bottom: 0; font-weight: 400; ">';
                                        html += '<input id='+row.applys[i].applyId+' type="hidden" class="apply-id">'
                                        html += '<input inStoreId='+row.applys[i].applyStoreId+' type="hidden" class="store-id">'
                                        html += '<input goodsId='+row.goodsId+' type="hidden" class="goods-id">'
                                        html += '<input price='+row.price+' type="hidden" class="price">'
                                        html += '<div style="line-height: 30px; margin-right: 5px">' + row.applys[i].storeEntity.printLabel + ":" + '</div>'
                                        html += '<div style="line-height: 30px; margin-right: 15px;">' + row.applys[i].applyNumber + row.applyStandardName + '</div>'
                                        html += '<input type="text" class="outQuantity" style="font-size: 18px; margin-left: 10px; width: 160px; border: none; border-bottom: 1px solid #ddd">'
                                        html += '<div style="line-height: 30px">' + row.purStandardName + '</div>'

                                        html += '</label>'

                                    }

                                    html += '</div>'
                                    return name = html;
                                }
                            },

                        ],


                        viewrecords: true,
                        height: true,
                        rowNum: 10,
                        rowList: [10, 30, 50],
                        rownumbers: true,
                        rownumWidth: 25,
                        shrinkToFit: false,
                        autowidth: true,
                        autoScroll: true,
                        multiselect: false,
                        pager: "#jqGridPager_outStocking",
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
                            console.log("onSelectRow=======select input for goodsid le yi ge e!!!!!")

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
                        //     $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "scroll"});
                        // }
                    }).trigger('reloadGrid');

            },

            //初始化表格全选
            selectAllGrid: function () {
                for (var i = 0; i < this.applyArr.length; i++) {
                    var id = this.applyArr[i].goodsId;
                    $("#jqGrid").jqGrid('setSelection', id);
                }
            },


        }


    }

</script>

<style scoped>


</style>
