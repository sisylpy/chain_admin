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
                                @click='onclick(index, item.depId,item.depName)'>

                                <a>{{item.depName}}</a></li>
                        </ul>
                    </div>
                    <!-- /.box-body -->
                </div>

            </div>
            <!-- /.col -->


            <div class="col-md-10">

                <div class="box  box-primary">

                    <div class="box-header with-border">
                        <h3 class="box-title">库房</h3>
                    </div>

                    <div class="box-body">


                        <div class="nav-tabs-justified">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#staff" data-toggle="tab">员工</a></li>
                                <li><a href="#outGoods" data-toggle="tab">出货商品</a></li>
                                <!--<li><a href="#settings" data-toggle="tab">Settings</a></li>-->
                            </ul>

                            <div class="tab-content">

                                <div class="active tab-pane" id="staff">

                                    <StaffPanel/>

                                </div>
                                <!-- /.tab-pane -->


                                <div class="tab-pane" id="outGoods">


                                    <OutGoodsPanel/>


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
    import api from '../../api/background/ckDep'
    import StaffPanel from '@/components/Background/CkDep/StaffPanel'
    import OutGoodsPanel from '@/components/Background/CkDep/OutGoodsPanel'


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
            var type = 1;

            api.getOutDepList(type).then(res => {
                if (res) {
                    console.log(res);

                    this.outDepList = res.data;
                    this.outDepId = res.data[0].depId;
                    console.log(res.data[0].goodsName);

                    this.fatherName = res.data[0].goodsName;
                }
            })
        },

        components: {
            PageHeader,
            StaffPanel,
            OutGoodsPanel,
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
