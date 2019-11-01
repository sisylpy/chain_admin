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
                    <h3 class="box-title">员工信息</h3>

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
    import api from '@/api/background/ckUser'

    export default {
        name: "CkUser",
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
                api.getCkUserList(data).then(res => {
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
                        { label: 'ckUserId', name: 'ckUserId', width: 50, key: true, hidden: true },
                        { label: '用户名', name: 'ckUserName', width: 80 },
                        { label: '角色', name:'aaa',  width: 140,formatter: function(value, options, row){
                            var inner = ""
                            for(var i = 0; i < row.roleEntities.length; i++) {
                                var a = row.roleEntities[i].roleName;
                                inner += a;
                                if(i < row.roleEntities.length-1 ){
                                    inner +=  '，';
                                }
                            }
                            return name = inner;
                            } },
                        { label: '所属部门', name: 'ckStoreDepEntity.depName', width: 80 },
                        { label: '状态', name: 'userStatus', width: 80 },
                        { label: '创建时间', name: 'uCreateTime', width: 80 }
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
                    gridComplete: function () {
                        //隐藏grid底部滚动条
                        $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
                    }
                });
            },
            add: function () {
                this.$router.push('addUser')
            }



        }
    }
</script>

<style>


</style>
