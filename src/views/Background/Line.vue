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



                            <LinesPanel/>


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
    import apis from '@/api/background/store'
    import LinesPanel from '@/components/Background/Line/LinesPanel'

    export default {
        name: "Line",
        components: {
            PageHeader,
            LinesPanel,
        },

        mounted() {
            $('.todo-list').sortable();
            $('.todo-list').disableSelection();
            // this.getLineData();
            // this.getStoreData();

        },

        data() {
            return {
                page: 1,
                limit: 20,
                lineArr: [],
                // title: "燕郊线",
                storeArr:[]
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
