<template>
    <div class="box box-solid no-padding">
        <div class="box-header">

        </div>

        <div class="box-body">

            <div class="col-md-2 category">
                <!--<a @click="importGoods" class="btn btn-primary btn-block margin-bottom">导入</a>-->
                <!--<a @click="downloadGoods" class="btn btn-primary btn-block margin-bottom">导出</a>-->

                <!--<a class="btn btn-primary btn-block margin-bottom" @click="addCate">添加产品类别</a>-->

                <div class="box box-primary">


                    <div class="box-header with-border">

                        <h3 class="box-title">大类</h3>

                        <div class="box-tools">
                            <div class="btn-group">
                                <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-wrench"></i></button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a  @click="addCate">新增</a></li>
                                    <li><a href="#">修改</a></li>
                                    <li><a href="#">删除</a></li>
                                    <li class="divider"></li>
                                    <li><a @click="importGoods">导入</a></li>
                                    <li><a @click="downloadGoods" >导出</a></li>
                                </ul>
                            </div>

                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                    class="fa fa-minus"></i>
                            </button>
                        </div>

                    </div>

                    <div class="box-body no-padding">
                        <ul class="nav nav-pills nav-stacked" id="products">
                            <!--<li class="active"><a>Inbox</a></li>-->
                            <li v-for="(item,index) in goodsArr" v-bind:key="item.id" :id="item.goodsId"
                                :type="item.type"
                                :class="isactive == index ? 'active' : '' " @click='onclickProducts(index, item.goodsId,item.goodsName)'>
                                <a>{{item.goodsName}}</a></li>
                        </ul>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
            <!-- /.col -->
            <div class="col-md-10">
                <HandlingTypeGoodsTable :fatherId="fatherId" :fatherName="fatherName" :goodsType="goodsType"/>
            </div>

        </div>

    </div>


</template>

<script>
    import HandlingTypeGoodsTable from '@/components/Background/Goods/Handling/HandlingTypeGoodsTable.vue'
    import api from '../../../../api/background/goods'
    import importGoods from '@/components/Background/Goods/ImportGoods.vue'

    export default {
        name: "HandlingTypeGoodsPanel",
        props:['goodsType'],


        components: {
            HandlingTypeGoodsTable,
            importGoods
        },
        data() {
            return{
                goodsArr: [],
                // rawArr: [],
                isactive: 0,
                fatherId: "",
                fatherName: "",
                page: 1,
                limit: 20,
                type: "1",
            }
        },
        watch: {
            goodsType: function(newVal){
                console.log("watch....")
                if(newVal == "handling"){
                    this.getCateGoods(newVal)

                }
            },
        },

        mounted() {

        },
        methods: {

            getCateGoods: function(){

                api.getCateGoods(this.type).then(res => {
                    if (res) {
                        console.log(res)
                        this.fatherId = res.data[0].goodsId;
                        this.goodsArr = res.data;
                        this.fatherName = res.data[0].goodsName;
                    }
                })
            },

            //点击产品类别
            onclickProducts(index, goodsId, goodsName) {
                this.isactive = index;
                this.fatherId = goodsId;
                this.fatherName = goodsName;

            },


            addCate: function () {
                this.$router.push({ name: 'addCategory', params: { type: "1", typeName: "加工商品" }})
            },

            importGoods: function () {
                this.$router.push('/importGoods')
            },

            downloadGoods: function () {
                window.open("http://localhost:8080/chainPro_war_exploded/sys/ckgoods/downloadExcel")
            }


        }
    }
</script>

<style scoped >

    .category{
        padding-left: 0;
    }
</style>
