<template>

    <section class="content container-fluid no-padding" id="jqbody">

        <div class="no-padding no-border">
            <table id="jqGrid"></table>
            <div id="jqGridPager"></div>
        </div>

    </section>


</template>

<script>
    import api from '../../../api/background/goods'
    import addGoods from '@/components/Background/Goods/AddGoods.vue'
    import apia from '@/api/out/orderApplication'

    export default {
        name: "OutDepApplyTable",
        props: ['depId', 'status'],
        components: {},


        watch: {
            depId: function (newVal, oldVal) {
                this.getJqtableData(newVal)

            },

        },
        data() {
            return {
                page: 1,
                limit: 20,
                applyArr: [],
                printArr: [],
            }
        },


        methods: {


            //获取表格数据
            getJqtableData: function () {

                var data = "page=" + this.page + "&limit=" + this.limit
                    + "&status=" + this.status + "&depId=" + this.depId;
                apia.outDepQueryApplys(data).then(res => {

                    this.applyArr = res.page.list;
                    this.printArr = res.page.list;
                    console.log(res.page.list)
                    console.log("kankandataa shang")



                    //加载表格数据
                    this.jqtable()
                    this.selectAllGrid();
                    this.changePrintArr();
                    this.$emit("printArr",this.printArr)  // 触发自己的自定义事件，让父亲的方法执行

                });

            },

            changePrintArr: function () {

                $("#jqGrid .cbox").on('change', function (e) {
                    console.log("who???")
                    var ids = $("#jqGrid").jqGrid('getGridParam', 'selarrrow');

                    var id = $(this).parent().parent().attr('id');
                    console.log(ids);
                    console.log(id);
                    if (ids.indexOf(id)) {
                        console.log("you ")
                    } else {
                        console.log("meiyou")
                    }
                })
            },


            // 初始化表格
            jqtable() {

                console.log("jqtable?????")

                // 清空jqGrid表格数据
                $("#jqGrid").jqGrid("clearGridData")

                // 初始化jqgrid
                var _this = this

                //更新数据
                $("#jqGrid").jqGrid('setGridParam', {
                    datatype: 'local',
                    data: this.applyArr,//newData是符合格式要求的重新加载的数据
                    page: this.currPage//哪一页的值
                }).trigger("reloadGrid");

                $("#jqGrid").jqGrid('setLabel', '0', '序号', 'labelstyle');

                $("#jqGrid").jqGrid(
                    {
                        data: _this.applyArr,
                        datatype: "local",
                        colModel: [
                            {label: 'goodsId', name: 'goodsId', width: 50, key: true, hidden: true},
                            {label: '产品名称', name: 'goodsName', width: 120},
                            {
                                label: '申请', name: 'applys', width: 320, formatter: function (value, options, row) {
                                    var html = '<div style="display: flex; flex-flow: row wrap;">';

                                    for (var i = 0; i < row.applys.length; i++) {

                                        html += '<label class="one-apply" style="display: flex;flex-flow: row wrap; margin-right: 10px; ' +
                                            ' margin-bottom: 0; font-weight: 400; ">';
                                        // html += '<input checked  style="height: 26px; margin-right: 3px" type="checkbox">'
                                        html += '<div style="line-height: 30px; margin-right: 2px">' + row.applys[i].storeEntity.printLabel + ":" + '</div>'
                                        html += '<div style="line-height: 30px">' + row.applys[i].applyNumber + row.applyStandardName + '</div>'
                                        html += '</label>'

                                    }
                                    html += '</div>'
                                    return name = html;
                                }
                            },
                            {
                                label: '申请总数',
                                name: 'totalNumber',
                                width: 80,
                                formatter: function (value, options, row) {
                                    return name = row.totalNumber + row.applyStandardName
                                }
                            },
                            {
                                label: '库存',
                                name: 'stockApplyStandard',
                                width: 80,
                                formatter: function (value, options, row) {
                                    return name = row.stockApplyStandard + row.applyStandardName
                                }
                            },

                            {
                                label: '库存情况',
                                name: 'status',
                                width: 110,
                                formatter: function (value, options, rowData) {
                                    if (value === 1) {
                                        return "<span class='label label-success'> 库存充足</span>";
                                    } else if (value === 2) {
                                        return "<span class='label label-danger'> 库存不足</span>";
                                    } else {
                                        return "<span class='label label-warning'> 已加入采购计划</span>";
                                    }
                                }
                            }
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
                        multiselect: true,
                        pager: "#jqGridPager",
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
                    });

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
