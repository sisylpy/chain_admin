<template>
    <div class="">

        <PageHeader/>

        <!--<AssignGoods/>-->

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-3">
                    <a class="btn btn-primary btn-block margin-bottom">添加产品类别</a>

                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <h3 class="box-title">产品类别</h3>

                            <div class="box-tools">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                        class="fa fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="box-body no-padding">
                            <ul class="nav nav-pills nav-stacked">
                                <!--<li class="active"><a>Inbox</a></li>-->
                                <li v-for="(item,index) in cateList" v-bind:key="item.id" :id="item.goodsId"
                                    :class="isactive == index ? 'active' : '' " @click='onclick(index, item.goodsId)'>

                                    <a>{{item.goodsName}}</a></li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /. box -->
                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <h3 class="box-title">Labels</h3>

                            <div class="box-tools">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                        class="fa fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="box-body no-padding">
                            <ul class="nav nav-pills nav-stacked">
                                <li><a href="#"><i class="fa fa-circle-o text-red"></i> Important</a></li>
                                <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> Promotions</a></li>
                                <li><a href="#"><i class="fa fa-circle-o text-light-blue"></i> Social</a></li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
                <div class="col-md-9">

                    <GoodsTable :fatherId="fatherId"/>

                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
        <!-- /.content -->
    </div>
</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/background.js'
    import GoodsTable from '@/components/background/goodsTable.vue'

    export default {
        name: "Products",
        data() {
            return {
                cateList: [],
                isactive: 0,
                fatherId: ""


            }
        },

        mounted() {

            api.getCateGoods().then(res => {
                if (res) {
                    this.cateList = res.data;
                    this.fatherId = res.data[0].goodsId
                }
            })
        },

        components: {
            PageHeader,
            GoodsTable,
        },
        methods: {

            //点击产品类别
            onclick(index, goodsId) {
                this.isactive = index;
                this.fatherId = goodsId;
            },


        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
