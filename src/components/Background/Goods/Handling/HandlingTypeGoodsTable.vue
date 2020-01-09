<template>

    <!--<section class="content container-fluid">-->
    <section class="content container-fluid box box-primary" id="jqbody">

        <div class="box-header with-border">
            <h3 class="box-title">{{tableName}}</h3>

            <div class="box-tools pull-right">
                <div class="btn-group">
                    <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-wrench"></i></button>
                    <ul class="dropdown-menu" role="menu">

                        <li><a @click="add">新增</a></li>
                        <li><a @click="updateHandling">修改</a></li>
                        <li><a @click="del">删除</a></li>
                        <li class="divider"></li>
                        <li><a  v-if='goodsList.length > 0'  :click="delOne">删除列表</a></li>

                        <!--<li class="divider"></li>-->

                    </ul>
                </div>


                <!--<button type="button" class="btn btn-box-tool" data-widget="collapse"><i-->
                        <!--class="fa fa-minus"></i>-->
                <!--</button>-->
            </div>

        </div>
        <div class="box-body no-padding">
            <table id="handlingTable"></table>
            <div id="handlingPager"></div>
        </div>

        <!--<div class="grid-btn">-->
            <!--<a class="btn btn-default" @click="add" data-toggle="modal" data-target="#modal-warning" >新增</a>-->
            <!--<a type="button" class="btn btn-default" @click="update" data-toggle="modal" data-target="#modal-warning">修改</a>-->
            <!--<a class="btn btn-default " data-toggle="modal" data-target="#modal-warning" @click="del">删除</a>-->

        <!--</div>-->

        <!--<table id="jqGrid"></table>-->
        <!--<div id="jqGridPager"></div>-->

        <AddGoods :fatherName="fatherName" :fatherId="fatherId" :goodsType="goodsType"  :addGoods="addGoods" @submit-add="appendToList"/>

    </section>


</template>

<script>
    import api from '../../../../api/background/goods'
    import AddGoods from '@/components/Background/Goods/Handling/AddGoodsHandling.vue'

    export default {
        name: "StockTypeGoodsTable",
        props:['fatherId','fatherName','goodsType'],
        components:{
            AddGoods,
        },

        watch: {
            fatherId: function(newVal,oldVal){
                this.fatherId = newVal
                this.getJqtableData(newVal)

            },
            fatherName: function (newVal, oldVal) {
                this.tableName= newVal;

            },
            goodsType: function (newVal, oldVal) {
                this.tableName= newVal;
                if(newVal == "handling"){
                    this.getJqtableData(this.fatherId)

                }

            },

        },
        data() {
            return {
                page: 1,
                limit: 100,
                goodsList: [],
                tableName: "没有数据，请刷新页面",
                addGoods: 0

            }
        },

        mounted() {
            // 动态设置背景图的高度为浏览器可视区域高度

            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            // this.clientHeight.height = `${document.documentElement.clientHeight}px`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            // const that = this;
            // window.onresize = function temp() {
            //     that.clientHeight = `${document.documentElement.clientHeight}px`;
            // }

            $(window).resize(function(){
                $("#jqGrid").setGridWidth($('#jqbody').width());
            });
        },

        methods: {

            delOne:function(){
                api.deleteOne(this.fatherId).then(res => {
                    if(res.code == 0){

                    }
                })
            },


            appendToList: function() {
                this.getJqtableData(this.fatherId)
            },

            //获取表格数据
            getJqtableData: function(newVal){
                console.log("laigengxinshujua!!!!")
                var data = "page=" + this.page + "&limit=" + this.limit + "&fatherId=" + newVal;
                api.getCateGoodsList(data).then(res => {
                    console.log(data);
                    console.log("sisy");
                    console.log(res.page.list);

                    this.goodsList = res.page.list;
                    //加载表格数据
                    this.jqtable()
                });

            },


            // 初始化表格
            jqtable() {

                console.log("jqtable?????")

                // 清空jqGrid表格数据
                $("#handlingTable").jqGrid("clearGridData")

               // 初始化jqgrid
                var _this = this

                //更新数据
                $("#handlingTable").jqGrid('setGridParam',{
                    datatype:'local',
                    data:this.goodsList,//newData是符合格式要求的重新加载的数据
                    page:this.currPage//哪一页的值
                }).trigger("reloadGrid");

                $("#handlingTable").jqGrid('setLabel', '0', '序号', 'labelstyle');

                $("#handlingTable").jqGrid(
                    {
                        data: _this.goodsList,
                        datatype: "local",
                        colModel: [
                            {label: 'goodsId', name: 'goodsId', width: 50, key: true, hidden: true},
                            {label: '产品名称', name: 'goodsName', width: 120},
                            {label: '采购规格', name: 'purStandardName', width: 80},
                            {label: '申请规格', name: 'applyStandardName', width: 80},
                            {label: '出货部门', name: 'outDepEntity.depName', width: 80},
                            {label: '采购部门', name: 'purDepEntity.depName', width: 80},
                            {label: '零售价格', name: 'price', width: 80},
                            {label: '拼音', name: 'pinyin', width: 120},
                            {label: '简拼', name: 'headPinyin', width: 80},

                            {label: '采购规格库存', name: 'stockPurStandard', width: 110,
                                formatter: function (value, options, rowData) {
                                    return name = rowData.stockPurStandard + rowData.purStandardName
                                }},
                            {label: '申请规格库存', name: 'stockApplyStandard', width: 110,
                                formatter: function (value, options, rowData) {
                                    return name = rowData.stockApplyStandard + rowData.applyStandardName
                                }},


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
                        pager: "#handlingPager",
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
                $('#modal_handling').show();

            },

            updateHandling: function (event) {
                console.log("fa;sljf;dkljas;flkjads;lfjkd;lasjd;lkas")
                var goodsId = this.getSelectedRow();
                this.addGoods = 1;
                if (goodsId == null) {
                    return;
                }


                $('#modal_handling').show();
                $('#modal_handling').attr('goodsid', goodsId);
            },


            del: function (event) {
                var goodsIds = this.getSelectedRows();
                if (goodsIds == null) {
                    return;
                }

                api.deleteGoods(goodsIds).then(res => {
                    if(res) {
                        this.appendToList();
                        // this.$router.go(-1)
                        // $('#modal-warning').modal('hide')

                    }
                })

            },

            delFinished: function () {
                console.log("delFinish");
                this.jqtable()

            },

            //选择一条记录
            getSelectedRow: function () {
                var grid = $("#handlingTable");
                var rowKey = grid.getGridParam("selrow");
                if (!rowKey) {
                    console.log("请选择一条记录handling");
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




            //选择多条记录
            getSelectedRows: function () {
                var grid = $("#handlingTable");
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

                var grid = $("#handlingTable");
                var contents = [];

                for (var i = 0; i < ids.length; i++) {
                    var paramContent = grid.jqGrid('getRowData', ids[i])[param];
                    contents.push(paramContent);
                }
                return contents;
            },

            // getSelectRowParm: function (param) {
            //     var grid = $("#jqGrid");
            //     var paramContent = grid.jqGrid('getRowData', grid.getGridParam("selarrrow")[0]).param;
            //
            //     return paramContent;
            // },



        }


    }

</script>

<style scoped >
    /*.content{*/
        /*background: #fff;*/
    /*}*/

</style>
