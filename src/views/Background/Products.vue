<template>
    <div class="">

        <PageHeader/>

        <!--<AssignGoods/>-->

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-md-3">
                    <a class="btn btn-primary btn-block margin-bottom" @click="addCate">添加产品类别</a>

                    <div class="box box-solid">
                        <div class="box-header with-border">
                            <h3 class="box-title">产品类别</h3>

                            <div class="box-tools">

                                <div class="btn-group">
                                    <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                                        <i class="fa fa-wrench"></i></button>
                                    <ul class="dropdown-menu" role="menu">


                                        <li><a href="#">修改名称</a></li>
                                        <li><a href="#">排序</a></li>
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
                            <ul class="nav nav-pills nav-stacked">
                                <!--<li class="active"><a>Inbox</a></li>-->
                                <li v-for="(item,index) in cateList" v-bind:key="item.id" :id="item.goodsId"
                                    :class="isactive == index ? 'active' : '' " @click='onclick(index, item.goodsId,item.goodsName)'>

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
                                <li><a @click="getGoodsType(1)"><i class="fa fa-circle-o text-light-blue"></i>正常销售</a></li>
                                <li><a @click="getGoodsType(2)"><i class="fa fa-circle-o text-yellow"></i>断货</a></li>
                                <li><a @click="getGoodsType(3)"><i class="fa fa-circle-o text-red"></i>停止销售</a></li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
                <div class="col-md-9">

                    <GoodsTable :fatherId="fatherId" :fatherName="fatherName" :type="type"/>
                    <!--<router-viewer/>-->

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
    import api from '../../api/background/productsManager'
    import GoodsTable from '@/components/Background/GoodsTable.vue'

    export default {
        name: "Products",
        data() {
            return {
                cateList: [],
                isactive: 0,
                fatherId: "",
                fatherName: "",
                page: 1,
                limit: 20,
                type: 1,



            }
        },

        mounted() {

            api.getCateGoods().then(res => {
                if (res) {
                    this.cateList = res.data;
                    this.fatherId = res.data[0].goodsId;
                    console.log(res.data[0].goodsName);

                    this.fatherName = res.data[0].goodsName;
                }
            })
        },

        components: {
            PageHeader,
            GoodsTable,
        },
        methods: {

            //点击产品类别
            onclick(index, goodsId, goodsName) {
                this.isactive = index;
                this.fatherId = goodsId;
                this.fatherName = goodsName;
            },

            addCate: function () {
                this.$router.push('/add_Category')
            },

            getGoodsType: function (e) {
                console.log(e);
                this.type = e;

                var data = "page=" + this.page + "&limit=" + this.limit + "&type=" + e+ "&fatherId="+ this.fatherId;
                api.getTypeGoods(data).then(res => {

                    this.goodsList = res.page.list;
                    console.log(res.page);


                    //加载表格数据
                    // this.jqtable()

                });

            }


        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
