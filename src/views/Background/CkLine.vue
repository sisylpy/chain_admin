<template>

    <div class="">
        <PageHeader/>

            <div class="row">
                <div class="col-md-12">

                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">送货路线列表</h3>

                            <div class="box-tools">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                                        <i class="fa fa-wrench"></i></button>
                                    <ul class="dropdown-menu" role="menu">


                                        <li><a @click="addLine">添加</a></li>
                                        <li><a href="#">修改</a></li>
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
                        <div class="box-body no-padding">


                        <div class="col-md-4" v-for="(item, index) in lineArr">
                    <!--<div class="col-md-4">-->

                    <!-- general form elements -->
                    <div class="box box-solid">

                        <div class="box-header with-border">
                            <i class="ion ion-clipboard"></i>

                            <h3 class="box-title">{{item.lineName}}</h3>


                            <div class="box-tools">

                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                        class="fa fa-minus"></i>
                                </button>
                            </div>

                        </div>
                        <!-- /.box-header -->

                        <div class="box-body" >

                            <ul class="todo-list" style="display: none">

                                <li class="handle_li" v-for='(item2, index) in item.storeEntityList'>
                                    <!-- drag handle -->
                                    <span class="handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
                </span>
                                    <span class="text">{{item2.storeName}}</span>
                                </li>

                            </ul>

                            <table class="table">
                                <tbody>
                                <tr :for="item.storeId" v-for="(item3,index) in item.storeEntityList">
                                    <td>第{{index+1}}个送达</td>
                                    <td>{{item3.storeName}}</td>
                                    <td>{{item3.address}}</td>
                                    <!--<td><a class="btn  btn-default">选择</a></td>-->
                                </tr>
                                </tbody>


                            </table>


                        </div>


                    </div>
                    <!-- /.box -->

                </div>
                        </div>

                </div>
                </div>

            </div>


        <!-- /.box-body -->

    <!--</section>-->
    </div>

</template>


<script>

    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/background/line'
    import apis from '@/api/background/store'

    export default {
        name: "CkLine",
        components: {
            PageHeader,
        },

        mounted() {
            $('.todo-list').sortable();
            $('.todo-list').disableSelection();
            this.getLineData();
            // this.getStoreData();

        },

        data() {
            return {
                page: 1,
                limit: 20,
                lineArr: [],
                // title: "燕郊线",
                // storeArr:[]
            }

        },

        methods: {

            getStoreData: function () {
                var data = "page=" + this.page + "&limit=" + this.limit;
                apis.getStoreList(data).then(res => {
                    console.log(res);

                    this.storeArr = res.page.list;
                });
            },

            getLineData: function () {
                var data = "page=" + this.page + "&limit=" + this.limit;
                api.getLineList(data).then(res => {
                    console.log(res);

                    this.lineArr = res.page.list;
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
