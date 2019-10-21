<template>


    <div class="">

        <PageHeader/>

        <!--<AssignGoods/>-->

        <section class="content container-fluid">

            <div class="grid-btn">
                <a class="btn btn-default" @click="add">新增</a>
                <a type="button" class="btn btn-default" @click="update">修改</a>
                <a class="btn btn-default " data-toggle="modal" data-target="#modal-warning" @click="del" >删除</a>
            </div>

            <table id="jqGrid"></table>
            <div id="jqGridPager"></div>
            <router-view ></router-view>
        </section>
    </div>



</template>

<script>
    import api from '../../api/background/products'
    import PageHeader from '@/components/PageHeader.vue'
    import { mapState, mapMutations } from "vuex";

    export default {
        name: "assignGoods",
        data() {
            return {
                page: 1,
                limit: 20,
                type: 1,
                goodsList: [],
                modal_title: "nih",
            }
        },
       components:{
           PageHeader,
       },
        computed:{
            ...mapState({  //比如'movies/hotMovies
                navTitle:  state => state.pageHeader.navTitle,

            })
        },


        mounted() {

            var data = "page=" + this.page + "&limit=" + this.limit + "&type=" + this.type;
            api.getTypeGoods(data).then(res => {

                this.goodsList = res.page.list;

                //加载表格数据
                this.jqtable()

            });


        },


        methods: {

            updataGoods: function(){
                console.log("zhixing updatGoods!!!!");

                var data = "page=" + this.page + "&limit=" + this.limit + "&type=" + this.type;
                api.getTypeGoods(data).then(res => {
                    console.log(res);
                    this.goodsList = res.page.list;
                    this.currPage = res.page.currPage;
                    this.pageSize= res.page.pageSize;
                    this.totalCount = res.page.totalCount;
                    this.totalPage = res.page.totalPage;

                    //加载表格数据
                    this.jqtable()

                })
            },

            // 初始化表格
            jqtable() {

                console.log("zhixing jqtable!!!");


                // 清空jqGrid表格数据
                // $("#jqGrid").jqGrid("clearGridData")

                // 初始化jqgrid
                // var _this = this

                $("#jqGrid").jqGrid('setLabel', '0', '序号', 'labelstyle');

                $("#jqGrid").jqGrid(
                    {
                        // url: 'http://localhost:8080/chainPro_war_exploded/sys/ckgoods/typeGoods?limit=10&&type=1&&page=0',
                        // data: [
                        //     {"goodsId": 1, "goodsName": "aa", "standardName": "pol"}
                        //     ],
                        data: this.goodsList,
                        datatype:  "local",
                        colModel: [
                            {label: 'goodsId', name: 'goodsId', width: 50, key: true, hidden: true},
                            {label: '商品名称', name: 'goodsName', width: 120},
                            {label: '规格', name: 'standardName', width: 80},
                            {label: '申请规格', name: 'applyStandardName', width: 80},
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
                        autowidth: true,
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
                        gridComplete: function () {
                            //隐藏grid底部滚动条
                            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
                        }
                    });
            },


            add: function () {
                this.$router.push('add_assignGoods')
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
                        modal_title: "确定要删除"+paramContent+"吗？",
                        goodsIds: goodsIds
                    }
                })

            },

            delFinished: function(){
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

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
