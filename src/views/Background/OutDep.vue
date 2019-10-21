<template>
    <div class="">

        <PageHeader/>

        <div class="row">
            <div class="col-md-2">


                <div class="box  box-primary">

                    <div class="box-header with-border">
                        <h3 class="box-title">部门</h3>

                        <div class="box-tools">
                            <div class="btn-group">
                                <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-wrench"></i></button>
                                <ul class="dropdown-menu" role="menu">


                                    <li><a @click="add">新增</a></li>
                                    <li><a href="#">修改</a></li>
                                    <li><a href="#">删除</a></li>
                                    <!--<li class="divider"></li>-->
                                    <!--<li><a href="#">Separated link</a></li>-->
                                </ul>
                            </div>

                        </div>

                    </div>

                    <div class="box-body no-padding">
                        <ul class="nav nav-pills nav-stacked">
                            <!--<li class="active"><a>Inbox</a></li>-->
                            <li v-for="(item,index) in outDepList" v-bind:key="item.id" :id="item.outDepId"
                                :class="isactive == index ? 'active' : '' "
                                @click='onclick(index, item.outDepId,item.outDepName)'>

                                <a>{{item.outDepName}}</a></li>
                        </ul>
                    </div>
                    <!-- /.box-body -->
                </div>

            </div>
            <!-- /.col -->
            <!--<div class="col-md-10">-->

            <!--<GoodsTable :fatherId="fatherId" :fatherName="fatherName" :type="type"/>-->

            <!--</div>-->

            <div class="col-md-10">

                <div class="box  box-primary">

                    <div class="box-header with-border">
                        <h3 class="box-title">库房</h3>
                    </div>

                    <div class="box-body">


                        <div class="nav-tabs-justified">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#activity" data-toggle="tab">员工</a></li>
                                <li><a href="#outGoods" data-toggle="tab">出货商品</a></li>
                                <!--<li><a href="#settings" data-toggle="tab">Settings</a></li>-->
                            </ul>
                            <div class="tab-content">

                                <div class="active tab-pane" id="activity">

                                    <div class="box-body no-padding">
                                        <ul class="users-list">
                                            <li>
                                                <img src="../../assets/user1.jpg" alt="User Image">
                                                <a class="users-list-name" href="#">Alexander Pierce</a>
                                                <span class="users-list-date">Today</span>
                                            </li>
                                            <li>
                                                <img src="../../assets/user1.jpg" alt="User Image">
                                                <a class="users-list-name" href="#">Norman</a>
                                                <span class="users-list-date">Yesterday</span>
                                            </li>
                                            <li>
                                                <img src="../../assets/user3.jpg" alt="User Image">
                                                <a class="users-list-name" href="#">Jane</a>
                                                <span class="users-list-date">12 Jan</span>
                                            </li>
                                            <li>
                                                <img src="../../assets/user4.jpg" alt="User Image">
                                                <a class="users-list-name" href="#">John</a>
                                                <span class="users-list-date">12 Jan</span>
                                            </li>
                                            <li>
                                                <img src="../../assets/user5.jpg" alt="User Image">
                                                <a class="users-list-name" href="#">Alexander</a>
                                                <span class="users-list-date">13 Jan</span>
                                            </li>
                                            <li>
                                                <img src="../../assets/user6.jpg" alt="User Image">
                                                <a class="users-list-name" href="#">Sarah</a>
                                                <span class="users-list-date">14 Jan</span>
                                            </li>
                                            <li>
                                                <img src="../../assets/user6.jpg" alt="User Image">
                                                <a class="users-list-name" href="#">Sarah</a>
                                                <span class="users-list-date">14 Jan</span>
                                            </li>


                                        </ul>
                                        <!-- /.users-list -->
                                    </div>

                                </div>
                                <!-- /.tab-pane -->



                                <div class="tab-pane" id="outGoods">

                                    <div class="row">

                                        <div class="col-md-4 col-sm-6 col-xs-12">
                                            <div class="box box-solid">

                                                <div class="box-body no-padding">
                                                    <div class="info-box">

                                                <span class="info-box-icon bg-green"><i
                                                        class="ion ion-ios-gear-outline"></i></span>

                                                        <div class="info-box-content">
                                                            <span class="info-box-number">猪肉</span>

                                                            <span class="info-box-text">21种商品</span>
                                                        </div>
                                                        <!-- /.info-box-content -->
                                                    </div>

                                                </div>
                                                <div class="box-footer no-padding">
                                                    <ul class="nav nav-pills nav-stacked">
                                                        <li><a href="#">天丰利<span class="pull-right ">21种商品<i
                                                                class="fa fa-angle-right"></i></span></a></li>
                                                        <li><a href="#">鲜汇 <span class="pull-right ">21种商品<i
                                                                class="fa fa-angle-right"></i></span></a></li>
                                                        <li><a href="#">美林湾华联 <span class="pull-right ">21种商品<i
                                                                class="fa fa-angle-right"></i></span></a></li>
                                                    </ul>
                                                </div>


                                            </div>
                                        </div>

                                        <div class="col-md-4 col-sm-6 col-xs-12">
                                            <div class="box box-solid">
                                                <div class="box-body no-padding">
                                                    <div class="info-box">

                                                <span class="info-box-icon bg-aqua"><i
                                                        class="ion ion-ios-gear-outline"></i></span>

                                                        <div class="info-box-content">
                                                            <span class="info-box-number">牛肉</span>

                                                            <span class="info-box-text">45种商品</span>
                                                        </div>
                                                        <!-- /.info-box-content -->
                                                    </div>

                                                </div>
                                                <div class="box-footer no-padding">
                                                    <ul class="nav nav-pills nav-stacked">
                                                        <li><a href="#">天丰利<span class="pull-right ">45种商品<i
                                                                class="fa fa-angle-right"></i></span></a></li>
                                                        <li><a href="#">鲜汇 <span class="pull-right ">40种商品<i
                                                                class="fa fa-angle-right"></i></span></a></li>
                                                        <li><a href="#">美林湾华联美林湾华联美林湾华联 1  <span class="pull-right ">45种商品<i
                                                                class="fa fa-angle-right"></i></span></a></li>
                                                    </ul>
                                                </div>


                                            </div>
                                        </div>

                                        <div class="col-md-4 col-sm-6 col-xs-12">
                                            <div class="box box-solid">
                                                <div class="box-body no-padding">
                                                    <div class="info-box">

                                                <span class="info-box-icon info-box-icon bg-red"><i
                                                        class="ion ion-ios-gear-outline"></i></span>

                                                        <div class="info-box-content">
                                                            <span class="info-box-number">肠类</span>

                                                            <span class="info-box-text">52种商品</span>
                                                        </div>
                                                        <!-- /.info-box-content -->
                                                    </div>

                                                </div>
                                                <div class="box-footer no-padding">
                                                    <ul class="nav nav-pills nav-stacked">
                                                        <li><a href="#">天丰利<span class="pull-right">52种商品<i
                                                                class="fa fa-angle-right"></i></span></a></li>
                                                        <li><a href="#">鲜汇 <span class="pull-right ">52种商品<i
                                                                class="fa fa-angle-right"></i></span></a></li>
                                                        <li><a href="#">美林湾华联 <span class="pull-right ">52种商品<i
                                                                class="fa fa-angle-right"></i></span></a></li>
                                                    </ul>
                                                </div>


                                            </div>
                                        </div>

                                        <!-- /.info-box -->

                                    </div>


                                </div>

                            </div>
                            <!-- /.tab-pane -->


                        </div>


                    </div>

                </div>




                <!-- /.tab-content -->
            </div>
            <!-- /.nav-tabs-custom -->
        </div>


        <!-- /.col -->
    </div>
    <!-- /.row -->
    <!--</section>-->
    <!-- /.content -->
    <!--</div>-->

</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '../../api/background/outDep'
    import GoodsTable from '@/components/Background/Products/GoodsTable.vue'

    export default {
        name: "OutDep",
        data() {
            return {
                outDepList: [],
                isactive: 0,
                fatherId: "",
                fatherName: "",
                page: 1,
                limit: 20,
                type: 1,


            }
        },

        mounted() {

            api.getOutDepList().then(res => {
                if (res) {
                    console.log(res);

                    this.outDepList = res.data;
                    this.outDepId = res.data[0].outDepId;
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

            add: function () {
                this.$router.push('/addOutDep')
            },

            getGoodsType: function (e) {
                console.log(e);
                this.type = e;

                var data = "page=" + this.page + "&limit=" + this.limit + "&type=" + e + "&fatherId=" + this.fatherId;
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
