<template>


    <div>
        <PageHeader/>



        <section>
            <div class="row">
                <div class="col-md-4">
                    <!-- general form elements -->
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">{{title}}</h3>
                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <form role="form">
                            <div class="box-body">

                                <div class="form-group">
                                    <label for="exampleInputEmail1">路线名称</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="路线名称">
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">出发地点</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1"
                                           placeholder="出发地点">
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail1">送货店铺</label>

                                    <div class="">

                                        <div class="box-body" id="handle_list">
                                            <!-- See dist/js/pages/dashboard.js to activate the todoList plugin -->

                                            <ul class="todo-list" id="handle_list2">

                                                <li class="handle_li" v-for='(item, index) in storeArr'>
                                                    <!-- drag handle -->
                                                    <span class="handle">
                                            <i class="fa fa-ellipsis-v"></i>
                                            <i class="fa fa-ellipsis-v"></i>
                                          </span>
                                                    <span class="text">{{item.storeName}}</span>
                                                </li>

                                            </ul>
                                        </div>


                                    </div>

                                </div>


                            </div>

                        </form>
                    </div>
                    <!-- /.box -->


                </div>



                <div class="col-md-8">

                    <div class="panel panel-default">
                        <!-- Default panel contents -->
                        <div class="panel-heading">请选择店铺</div>
                        <div class="panel-body">
                            <p></p>
                        </div>

                        <!-- Table -->
                        <table class="ui-jqgrid-htable ui-common-table table table-bordered">
                            <tr>
                                <!--<th>-->

                                <!--</th>-->
                                <th>序号</th>
                                <th>店铺名称</th>
                                <th>城市</th>
                                <th>区域</th>
                                <th>详细地址</th>
                                <th>送货路线</th>
                                <th></th>
                            </tr>
                            <tr :for="item.storeId" v-for="(item,index) in storeArr">
                                <td>{{index+1}}</td>
                                <td>{{item.storeName}}</td>
                                <td>{{item.city}}</td>
                                <td>{{item.district}}</td>
                                <td>{{item.address}}</td>
                                <td>{{item.}}</td>
                                <td><a class="btn  btn-default">选择</a></td>
                            </tr>

                        </table>

                    </div>



                </div>
            </div>


        </section>




    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/background/storeManagement'

    export default {
        name: "Add_Line",
        data() {
            return {
                title: "新增送货路线",
                ckGoods: {
                    fatherId: this.$route.params.lineId
                },

                fatherName: this.$route.params.fatherName,
                fatherId: this.$route.params.fatherId,
                selectedStatus: 1,

                storeArr: [],
                page: 1,
                limit: 20,

            }
        },
        mounted() {

            $('#handle_list2').sortable();
            $('#handle_list2').disableSelection();
            this.getLineData();

        },
        created: function () {

            this.goodsId = this.$route.params.goodsId

            if (this.goodsId != null) {
                this.title = "修改路线";
                this.getInfo(this.goodsId);
            }

        },
        components: {
            PageHeader,
        },

        methods: {

            getLineData: function () {
                var data = "page=" + this.page + "&limit=" + this.limit;
                api.getStoreList(data).then(res => {
                    console.log(data);
                    console.log(res.page);


                    this.storeArr = res.page.list;
                    //加载表格数据

                });
            },

            getInfo: function () {
                console.log("huoqu api???");

                console.log(this.goodsId);

                api.getGoodsInfo(this.goodsId).then(res => {
                    this.ckGoods = res.data;
                    console.log(res);

                    $('#goodsStatus option[value= "' + this.ckGoods.status + '"]').attr("selected", true);   //设置Select的Text值为jQuery的项选中
                    $('#goodsStatus option[value= "' + this.ckGoods.isWeight + '"]').attr("selected", true);   //设置Select的Text值为jQuery的项选中

                })
            },
            saveOrUpdate: function (event) {
                console.log("saveOrUpdate api ")

                if (this.ckGoods.goodsId) {

                    api.updateGoods(JSON.stringify(this.ckGoods)).then(res => {
                        $('#modal-warning').modal('hide')

                        this.$router.go(-1)
                        this.$emit('submit-add');

                    })
                } else {


                    api.saveGoods(JSON.stringify(this.ckGoods)).then(res => {
                        $('#modal-warning').modal('hide')

                        this.$router.go(-1)

                        this.$emit('submit-add');

                    })
                }

            },

            back: function (event) {
                $('#modal-warning').modal('hide')

                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
