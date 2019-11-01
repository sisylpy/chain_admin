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

                            <div class="box-tools">

                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                        class="fa fa-minus"></i>
                                </button>
                            </div>

                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <form role="form">
                            <div class="box-body">

                                <div class="form-group">
                                    <label for="exampleInputEmail1">路线名称</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="路线名称"
                                           v-model="line.lineName">
                                </div>


                                <div class="form-group">
                                    <label for="exampleInputEmail1">送货店铺</label>

                                    <div class="">

                                        <div class="box-body">
                                            <!-- See dist/js/pages/dashboard.js to activate the todoList plugin -->

                                            <ul class="todo-list" id="handle_list">

                                                <li class="handle_li" v-for='(item, index) in selStoreArr'
                                                    :id="item.storeId">
                                                    <span class="handle">
                <i class="fa fa-ellipsis-v"></i>
                <i class="fa fa-ellipsis-v"></i>
                </span>

                                                    <span class="text">{{item.storeName}}</span>
                                                </li>

                                            </ul>
                                        </div>
                                        <!---->
                                        <!--<div class="box-footer clearfix no-border">-->
                                        <!--<a class="btn btn-default" @click="selectStore" data-toggle="modal" data-target="#modal-warning" >新增</a>-->
                                        <!--<a type="button" class="btn btn-default pull-right" @click="selectStore" data-toggle="modal" data-target="#modal-default"><i class="fa fa-plus"></i> 添加 店铺</a>-->
                                        <!--</div>-->

                                    </div>

                                </div>


                                <div class="form-group">
                                    <label for="exampleInputEmail1">店铺列表</label>

                                    <!-- checkbox -->
                                    <div class="form-group">
                                        <div class="checkbox" v-for="item in storeArr">
                                            <label>
                                                <input type="checkbox" :id="item.storeId"
                                                       @click="selectClick(item, $event)">
                                                {{item.storeName}}
                                            </label>
                                        </div>

                                    </div>
                                </div>


                                <div class="form-group">
                                    <div class="col-sm-2 control-label"></div>
                                    <input type="button" class="btn btn-primary" @click="save" value="确定"/>
                                    &nbsp;&nbsp;<input type="button" class="btn btn-warning" @click="back" value="返回"/>
                                </div>
                            </div>

                        </form>
                    </div>
                    <!-- /.box -->

                </div>
            </div>


        </section>


    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    // import api from '@/api/background/store'
    import apil from '@/api/background/line'

    export default {
        name: "Add_Line",
        data() {
            return {
                title: "新增送货路线",
                model_title: "店铺列表",
                storeArr: [],
                page: 1,
                limit: 20,
                selStoreArr: [],
                line: {
                    lineName: '',
                    storeEntityList: []
                },

            }
        },
        mounted() {

            // $('#handle_list2').sortable();

            var that = this;

            $("#handle_list").sortable({
                cursor: "move",
                // items :"li",                        //只是li可以拖动
                // opacity: 0.6,                       //拖动时，透明度为0.6
                // revert: true,
                // stop: function() {
                //记录sort后的id顺序数组
                // this.selStoreArr = $("#handle_list2").sortable('toArray');
                //拖拽后利用localStorage记录顺序
                // localStorage.arr = arr;
                // },//释放时，增加动画
                update: function () {
                    console.log("update");
                    var result = $(this).sortable('toArray')
                    var arr = [];
                    for (var i = 0; i < result.length; i++) {
                        var ids = result[i];
                        var store = {
                            storeId: ids,
                        }
                        arr.push(store)
                    }
                    that.line.storeEntityList = arr;

                    console.log(this);
                    console.log(that);


                }

            });


            $('#handle_list').disableSelection();

            this.getStores();

        },

        components: {
            PageHeader,
        },

        methods: {

            getStores: function () {
                console.log("store??");

                apil.queryLineStore().then(res => {
                    console.log(res.data);
                    this.storeArr = res.data;
                    //加载表格数据

                });

            },

            selectClick: function (item, e) {
                if (e.target.checked) {
                    this.selStoreArr.push(item)
                } else {
                    this.selStoreArr.splice(this.selStoreArr.findIndex(item => item.storeId === item.storeId), 1)
                }
                this.line.storeEntityList = this.selStoreArr;


            },


            save: function (event) {

                console.log(this.line);

                apil.save(JSON.stringify(this.line)).then(res => {
                    this.$router.go(-1)
                    this.$emit('submit-add');

                })

            },

            back: function (event) {
                $('#modal-warning').modal('hide')

                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>


</style>
