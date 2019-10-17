<template>
    <!-- Main content -->
    <section class="content">

        <PageHeader/>

        <div id="rrapp">
            <div class="grid-btn">
                <a class="btn btn-default" href="">新增</a>
                <button type="button"  class="btn btn-default" @click="">修改</button>
                <button type="button" class="btn btn-default" @click="">删除</button>
            </div>
            <table id="jqGrid"></table>
            <div id="jqGridPager"></div>
        </div>


    </section>
    <!-- /.content -->
</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/background/storeManagement'

    export default {
        name: "StoreList",
        components:{
            PageHeader,
        },
        data() {
            return {
                page: 1,
                limit: 20,
                storeList: []
            }
        },
        created(){

            this.getJqtableData()
        },

        methods: {

            getJqtableData: function() {
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
                        { label: 'storeId', name: 'storeId', width: 50, key: true, hidden: true},
                        { label: '店铺名称', name: 'storeName', width: 120 },
                        { label: '打印机名称', name: 'printLabel', width: 80 },
                        { label: '对外名称', name: 'outLabel', width: 80 },
                        { label: '手机号码', name: 'phone', width: 80 },
                        { label: '城市', name: 'city', width: 50 },
                        { label: '区域', name: 'district', width: 50 },
                        { label: '详细地址', name: 'address', width: 120 },

                    ],
                    viewrecords: true,
                    height: 400,
                    rowNum: 10,
                    rowList : [10,30,50],
                    rownumbers: true,
                    rownumWidth: 25,
                    autowidth:true,
                    multiselect: true,
                    pager: "#jqGridPager",
                    jsonReader : {
                        root: "page.list",
                        page: "page.currPage",
                        total: "page.totalPage",
                        records: "page.totalCount"
                    },
                    prmNames : {
                        page:"page",
                        rows:"limit",
                        order: "order"
                    },
                    gridComplete:function(){
                        //隐藏grid底部滚动条
                        $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
                    }
                });
            }



        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
