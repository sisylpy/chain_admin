<template>

    <!--<section class="content container-fluid">-->
    <section class="content container-fluid box box-primary">
        <div class="">
            <h3>{{tableName}}</h3>
        </div>

        <div class="grid-btn">
            <a class="btn btn-default" @click="add" data-toggle="modal" data-target="#modal-warning" >新增</a>
            <a type="button" class="btn btn-default" @click="update">修改</a>
            <a class="btn btn-default " data-toggle="modal" data-target="#modal-warning" @click="del">删除</a>

        </div>

        <table id="jqGrid"></table>
        <div id="jqGridPager"></div>

        <router-view @submit-add="appendToList"></router-view>

    </section>


</template>

<script>
    import api from '../../api/purchase'
    import addGoods from '@/components/Background/Add_Goods.vue'

    export default {
        name: "GoodsTable",
        props:['fatherId','fatherName'],
        components:{
          addGoods,
        },

        watch: {
            fatherId: function(newVal,oldVal){
                this.getJqtableData(newVal)

            },
            fatherName: function (newVal, oldVal) {
                this.tableName= newVal
            }
        },
        data() {
            return {
                page: 1,
                limit: 20,
                goodsList: [],
                modal_title: "nih",
                tableName: "没有数据，请刷新页面"
            }
        },



        methods: {

            appendToList: function() {
                console.log("ok");
                this.getJqtableData(this.fatherId)

            },

            //获取表格数据
            getJqtableData: function(newVal){
                var data = "page=" + this.page + "&limit=" + this.limit + "&fatherId=" + newVal;
                api.getCateGoodsList(data).then(res => {
                    console.log(data);

                    this.goodsList = res.page.list;
                    //加载表格数据
                    this.jqtable()

                });

            },


            // 初始化表格
            jqtable() {


                // 清空jqGrid表格数据
                $("#jqGrid").jqGrid("clearGridData")

               // 初始化jqgrid
                var _this = this

                //更新数据
                $("#jqGrid").jqGrid('setGridParam',{
                    datatype:'local',
                    data:this.goodsList,//newData是符合格式要求的重新加载的数据
                    page:this.currPage//哪一页的值
                }).trigger("reloadGrid");

                $("#jqGrid").jqGrid('setLabel', '0', '序号', 'labelstyle');

                $("#jqGrid").jqGrid(
                    {
                        data: _this.goodsList,
                        datatype: "local",
                        colModel: [
                            {label: 'goodsId', name: 'goodsId', width: 50, key: true, hidden: true},
                            {label: '商品名称', name: 'goodsName', width: 120},
                            {label: '规格', name: 'standardName', width: 80},
                            {label: '申请规格', name: 'applyStandardName', width: 80},
                            {label: '采购组', name: 'purGroupId', width: 100},
                            {label: '报警重量', name: 'alarmWeight', width: 80},
                            {
                                label: '是否称重',
                                name: 'isWeight',
                                width: 80,
                                formatter: function (value, options, rowData) {
                                    if (value === 1) {
                                        return '称重';
                                    } else {
                                        return '不称重';
                                    }
                                }
                            },
                            {
                                label: '商品状态',
                                name: 'status',
                                width: 80,
                                formatter: function (value, options, rowData) {
                                    if (value === 1) {
                                        return '售卖中';
                                    } else if (value === 2) {
                                        return '断货';
                                    } else {
                                        return '停止销售'
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
                        shrinkToFit:false,
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
                        // gridComplete: function () {
                        //     //隐藏grid底部滚动条
                        //     $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "scroll"});
                        // }
                    });

            },


            add: function () {
                // this.$router.push('/products/addGoods')
                console.log("add!!!!");
                console.log(this.fatherName);

                this.$router.push({
                    name: '/products/addGoods',
                    params: {
                        fatherName: this.fatherName ,
                        fatherId: this.fatherId,
                    }
                })
            },

            update: function (event) {
                var goodsId = this.getSelectedRow();
                if (goodsId == null) {
                    return;
                }
                this.$router.push('add_assignGoods/' + goodsId)
            },


            del: function (event) {
                var goodsIds = this.getSelectedRows();
                if (goodsIds == null) {
                    return;
                }

                var paramContent = this.getSelectedRowsContents("goodsName");

                this.$router.push({
                    name: '/op_assignGoods/madal_warning',
                    params: {
                        modal_title: "确定要删除" + paramContent + "吗？",
                        goodsIds: goodsIds
                    }
                })

            },

            delFinished: function () {
                console.log("delFinish");

                this.jqtable()

            },

            //选择一条记录
            getSelectedRow: function () {
                var grid = $("#jqGrid");
                var rowKey = grid.getGridParam("selrow");
                if (!rowKey) {
                    console.log("请选择一条记录a");
                    return;
                }

                var selectedIDs = grid.getGridParam("selarrrow");

                if (selectedIDs.length > 1) {

                    console.log("只能选择一条记录b");
                    return;
                }
                // var celldata = $("jqgridtableid").jqGrid('getCell',id,colnum);
                return selectedIDs[0];
            },

            getSelectRowParm: function (param) {
                var grid = $("#jqGrid");
                var paramContent = grid.jqGrid('getRowData', grid.getGridParam("selarrrow")[0]).param;

                return paramContent;
            },


            //选择多条记录
            getSelectedRows: function () {
                var grid = $("#jqGrid");
                var rowKey = grid.getGridParam("selrow");
                if (!rowKey) {
                    alert("请选择一条记录");
                    return;
                }
                return grid.getGridParam("selarrrow");
            },

            //选中多条数据内容
            getSelectedRowsContents: function (param) {

                var ids = this.getSelectedRows();

                var grid = $("#jqGrid");
                var contents = [];

                for (var i = 0; i < ids.length; i++) {
                    var paramContent = grid.jqGrid('getRowData', ids[i])[param];
                    contents.push(paramContent);
                }
                return contents;
            }

        }


    }

</script>

<style scoped >
    /*.content{*/
        /*background: #fff;*/
    /*}*/

</style>
