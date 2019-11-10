<template>

    <section class="content container-fluid no-padding" id="outStockTable">
        <div class="">


            <table>
                <tbody>
                <tr>
                    <th style="width:50px;">序号</th>
                    <th>出货数量</th>
                </tr>

                <tr v-for="(item, index) in outStockingArr">
                    <td style="">{{index + 1}}</td>
                    <td>
                        <div >
                            <h4>{{item.goodsName}}</h4>
                            <div class="store-apply row" style="padding: 0;">
                                <div v-for="(outApply, index) in item.applys" class="one-apply col-md-4"
                                     style="display: flex; flex-flow: row wrap; padding: 0">
                                    <input type="hidden" :id="outApply.applyId">
                                    <input type="hidden" :inStoreId="outApply.applyStoreId">
                                    <input type="hidden" :goodsId="item.goodsId">
                                    <input type="hidden" :price="item.price" class="price">
                                    <div style="line-height: 30px;padding: 5px">
                                        {{outApply.storeEntity.printLabel}}{{outApply.applyNumber}}{{item.applyStandardName}}
                                    </div>
                                    <input type="text" class="outQuantity"
                                           style="width:50% ;font-size: 18px;margin-left: 10px;border:none; border-bottom:1px solid #ddd">
                                </div>
                            </div>
                        </div>
                    </td>

                </tr>


                </tbody>
            </table>


            <!--<table id="jqGrid_outStocking"></table>-->
            <!--<div id="jqGridPager_outStocking"></div>-->
        </div>

    </section>


</template>

<script>
    import apia from '@/api/out/orderApplication'

    export default {
        name: "OutStockingTable",
        props: ['depId'],

        data() {
            return {
                page: 1,
                limit: 21,
                outStockingArr: [],
                status: 1,


            }
        },


        watch: {

            depId: function (newVal, oldVal) {
                this.depId = newVal
                this.getJqtableData();
            },


        },
        mounted() {

            // this.getJqtableData();


            $('#outStockTable').on('keyup', '.outQuantity', function (e) {
                //获取当前输入框
                // if( $(this).parents('tr').next().length > 0){
                console.log(e.keyCode)

                if (e.keyCode == 13) {
                    if ($(this).parent().next().children().length > 0) {
                        $(this).parent().next().children('.outQuantity').focus();

                    } else {
                        $(this).parents('tr').next().find('.store-apply').children(":first").children("input").focus();

                    }

                }
                if (e.keyCode == 40) {
                    if ($(this).parent().next().children().length > 0) {
                        $(this).parent().next().children('.outQuantity').focus();

                    } else {
                        $(this).parents('tr').next().find('.store-apply').children(":first").children("input").focus();

                    }
                }
            });


            //width


        },

        methods: {

            computeTableWidth() {

                var fatherWidth = $('#enterOutGoods').width();
                $('#jqGrid_outStocking').width();


                console.log("-----")
                console.log(fatherWidth)
                // console.log(this.widthScale)
                // console.log($('#jqGrid_outStocking').width())
                // console.log("=========>>>>>>>>>>")
                // console.log(this.widthScale)
                //
                // var  nnn = fatherWidth * this.widthScale
                // console.log("<<<<>>>>>>>>");
                // console.log(nnn)
                // $('#jqGrid_outStocking').width(nnn);


            },

            saveOutQutantity() {
                console.log("fuzujianrangwosavele!")

                var outQuantityArr = [];
                var $applyIds = $('.apply-id');
                for (var i = 0; i < $applyIds.length; i++) {
                    var quantity = $('.outQuantity:eq(' + i + ')').val();

                    if (quantity.length > 0) {
                        var outQuantity = {
                            stApplyId: $('.apply-id:eq(' + i + ')').attr("id"),
                            quantity: quantity,
                            outDepId: this.orders_depId,
                            stGoodsId: $('.goods-id:eq(' + i + ')').attr("goodsid"),
                            inStoreId: $('.store-id:eq(' + i + ')').attr("instoreid"),
                            discountPrice: $('.price:eq(' + i + ')').attr("price"),
                        }
                        outQuantityArr.push(outQuantity);
                    }

                }
                console.log(outQuantityArr)
                this.bus.$emit('loading', true);


                apia.saveOutQuantity(outQuantityArr).then(res => {
                    if (res) {
                        this.bus.$emit('loading', false);
                        this.getJqtableData();
                    }

                })


            },

            //获取表格数据
            getJqtableData: function () {


                var data = "page=" + this.page + "&limit=" + this.limit
                    + "&status=" + "1" + "&depId=" + this.depId;
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
                            // {label: '产品名称', name: 'goodsName', width: 120},
                            {
                                label: '申请', name: 'applys', width: 800, formatter: function (value, options, row) {
                                    var html = '<h4>' + row.goodsName + '</h4>'

                                    html += '<div class="store-apply  row" style="padding: 0;">';

                                    for (var i = 0; i < row.applys.length; i++) {

                                        html += '<label class="one-apply col-md-4" style="display: flex;flex-flow: row nowrap; font-size: 14px; font-weight: 400; padding: 0; ">';
                                        html += '<input id=' + row.applys[i].applyId + ' type="hidden" class="apply-id">'
                                        html += '<input inStoreId=' + row.applys[i].applyStoreId + ' type="hidden" class="store-id">'
                                        html += '<input goodsId=' + row.goodsId + ' type="hidden" class="goods-id">'
                                        html += '<input price=' + row.price + ' type="hidden" class="price">'
                                        html += '<div style="line-height: 30px; margin-right: 5px">' + row.applys[i].storeEntity.printLabel + ":" + '</div>'
                                        html += '<div style="line-height: 30px; margin-right: 15px;">' + row.applys[i].applyNumber + row.applyStandardName + '</div>'
                                        html += '<input type="text" class="outQuantity" style="font-size: 18px; margin-left: 10px; width: 100px; border: none; border-bottom: 1px solid #ddd">'
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
                        shrinkToFit: true,
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
