<template>

    <div>
        <PageHeader/>

        <div class="grid-btn">
            <a class="btn btn-default" @click="addLine">新增</a>
            <button type="button" class="btn btn-default" @click="">修改</button>
            <button type="button" class="btn btn-default" @click="">删除</button>
        </div>

        <section>
            <div class="row">
                <div class="col-md-4">
                    <!-- general form elements -->
                    <div class="box box-primary">

                        <div class="box-header">
                            <i class="ion ion-clipboard"></i>

                            <h3 class="box-title">{{title}}</h3>


                            <div class="box-tools">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                                        <i class="fa fa-wrench"></i></button>
                                    <ul class="dropdown-menu" role="menu">

                                        <li><a href="#">修改线路名称</a></li>
                                        <li><a href="#">排序排序</a></li>
                                        <li><a href="#">删除</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">Separated link</a></li>
                                    </ul>
                                </div>



                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                        class="fa fa-minus"></i>
                                </button>
                            </div>

                        </div>
                        <!-- /.box-header -->

                        <div class="box-body">

                            <!--<ul class="todo-list" id="handle_list2">-->

                                <!--<li class="handle_li" v-for='(item, index) in storeArr'>-->
                                    <!--&lt;!&ndash; drag handle &ndash;&gt;-->
                                    <!--<span class="handle">-->
                <!--<i class="fa fa-ellipsis-v"></i>-->
                <!--<i class="fa fa-ellipsis-v"></i>-->
                <!--</span>-->
                                    <!--<span class="text">{{item.storeName}}</span>-->
                                <!--</li>-->

                            <!--</ul>-->

                            <table class="table table-hover">
                                <tbody>
                                <!--<tr>-->
                                    <!--<th>-->

                                    <!--</th>-->
                                    <!--<th>序号</th>-->
                                    <!--<th>店铺名称</th>-->
                                    <!--<th>详细地址</th>-->
                                    <!--<th></th>-->
                                <!--</tr>-->
                                <tr :for="item.storeId" v-for="(item,index) in storeArr">
                                    <td>第{{index+1}}个送达</td>
                                    <td>{{item.storeName}}</td>
                                    <td>{{item.address}}</td>
                                    <!--<td><a class="btn  btn-default">选择</a></td>-->
                                </tr>
                                </tbody>


                            </table>


                        </div>


                    </div>
                    <!-- /.box -->

                </div>

            </div>


        </section>






        <!-- /.box-body -->

    </div>
</template>


<script>

    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/background/lineMananger'
    import apis from '@/api/background/storeManagement'

    export default {
        name: "CkLine",
        components: {
            PageHeader,
        },

        mounted() {
            $('#handle_list2').sortable();
            $('#handle_list2').disableSelection();
            this.getLineData();

        },

        data() {
            return {
                page: 1,
                limit: 20,
                lineArr: [],
                title: "燕郊线",
                storeArr:[]
            }

        },

        methods: {

            getLineData: function () {
                var data = "page=" + this.page + "&limit=" + this.limit;
                apis.getStoreList(data).then(res => {
                    this.storeArr = res.page.list;
                });
            },

            /**
             *日期：2019/10/17
             *作者：lpy
             *状态：
             *功能：添加新路线
            */
            addLine: function () {
                this.$router.push('/addLine')

            }

        },
    }

</script>


<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
