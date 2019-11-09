<template>
    <!-- Main content -->
    <div class="">
        <PageHeader/>
        <section class="content">


            <div class="box box-primary">
                <!--<div class="grid-btn">-->
                <!--<a class="btn btn-default" @click="add">新增</a>-->
                <!--<button type="button"  class="btn btn-default" @click="">修改</button>-->
                <!--<button type="button" class="btn btn-default" @click="">删除</button>-->
                <!--</div>-->
                <div class="box-header with-border">
                    <h3 class="box-title">基本信息</h3>

                    <div class="box-tools pull-right">
                        <div class="btn-group">
                            <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-wrench"></i></button>
                            <ul class="dropdown-menu" role="menu">

                                <li><a @click="add">新增</a></li>
                                <li><a @click="">修改</a></li>
                                <li><a >删除</a></li>

                                <!--<li class="divider"></li>-->


                            </ul>
                        </div>


                        <!--<button type="button" class="btn btn-box-tool" data-widget="collapse"><i-->
                                <!--class="fa fa-minus"></i>-->
                        <!--</button>-->
                    </div>

                </div>
                <div class="box-body no-padding">
                    <table id="jqGrid"></table>
                    <div id="jqGridPager"></div>
                </div>

            </div>


        </section>
    </div>
    <!-- /.content -->
</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/background/store'

    export default {
        name: "Store",
        components: {
            PageHeader,
        },
        data() {
            return {
                page: 1,
                limit: 20,
                storeList: []
            }
        },
        created() {

            this.getJqtableData()
        },

        methods: {

            getJqtableData: function () {
                var data = "page=" + this.page + "&limit=" + this.limit;
                api.getStoreList(data).then(res => {
                    console.log(data);
                    console.log(res.page);


                    this.storeList = res.page.list;
                    //加载表格数据
                    this.jqtable()

                });
            },

            jqtable: function () {
                $("#jqGrid").jqGrid({
                    data: this.storeList,
                    datatype: "local",
                    colModel: [
                        {label: 'storeId', name: 'storeId', width: 50, key: true, hidden: true},
                        {label: '店铺名称', name: 'storeName', width: 120},
                        {label: '打印机名称', name: 'printLabel', width: 80},
                        {label: '对外名称', name: 'outLabel', width: 80},
                        {label: '手机号码', name: 'phone', width: 80},
                        {label: '城市', name: 'city', width: 50},
                        {label: '区域', name: 'district', width: 50},
                        {label: '详细地址', name: 'address', width: 120},

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
                        page: "page.currPage",
                        total: "page.totalPage",
                        records: "page.totalCount"
                    },
                    prmNames: {
                        page: "page",
                        rows: "limit",
                        order: "order"
                    },
                    // gridComplete: function () {
                    //     //隐藏grid底部滚动条
                    //     $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
                    // }
                });
            },
            add: function () {
                this.$router.push('addStore')
            }


        }
    }
</script>

<style>


</style>
