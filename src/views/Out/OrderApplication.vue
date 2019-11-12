<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <section>
            <div class="row">

                <div class="col-md-2">
                    <a class="btn btn-primary btn-block margin-bottom" @click="PrintRow">打印拣货单</a>

                    <div class="box box-solid">

                        <div class="box-header with-border">
                            <h3 class="box-title">出货部门</h3>
                            <div class="box-tools">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse">
                                    <i class="fa fa-minus"></i>
                                </button>

                            </div>
                        </div>

                        <div class="box-body no-padding">
                            <ul class="nav nav-pills nav-stacked">
                                <!--<li class="active"><a>Inbox</a></li>-->
                                <li v-for="(item,index) in outDepList" v-bind:key="item.id" :id="item.outDepId"
                                    :class="isactive == index ? 'active' : '' "
                                    @click='onclick(index, item.depId, item.depName)'>
                                    <a >{{item.depName}}</a>
                                </li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>

                    <div class="box box-solid">

                        <div class="box-header with-border">

                            <div class="radio">
                                <label>
                                    <input type="radio" v-model="sortType"  value="store">
                                    店铺
                                </label>
                            </div>
                            <div class="radio">
                                <label>
                                    <input type="radio" v-model="sortType" value="goods">
                                    商品大类
                                </label>
                            </div>


                        </div>
                        <div class="box-body no-padding">

                            <ul class="nav nav-pills nav-stacked">
                                <!--<li class="active"><a>Inbox</a></li>-->
                                <li v-for="(item, index) in queryArr">
                                    <a>
                                        <label v-if="sortType === 'store'" class="checkbox-inline"
                                               style="margin-right: 20px; font-size: 16px;">
                                            <input type="checkbox" :value="item.storeId" name="store"
                                                   v-model="queryIds"/>
                                            {{item.printLabel}}
                                        </label>
                                        <label v-else class="checkbox-inline"
                                               style="margin-right: 20px; font-size: 16px;">
                                            <input type="checkbox" :value="item.goodsId" name="goods"
                                                   v-model="queryIds"/>
                                            {{item.goodsName}}
                                        </label>
                                    </a></li>
                            </ul>

                            <div>

                                <!--</div>-->
                            </div>
                        </div>

                        <!--<div class="btn-row">-->

                    </div>

                </div>

                <div class="col-md-10">

                    <NewApplyTable :depId="depId" :depName="depName"
                                   :queryIds="queryIds" :sortType="sortType" ref="applyTable"/>

                </div>



            </div>
        </section>
    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '../../api/background/outDep'
    import apia from '@/api/out/orderApplication'

    import NewApplyTable from '@/components/Out/OrderApplication/NewApplyTable'

    export default {
        name: "OrderApplication",

        data() {
            return {
                printArr: [],
                outDepList: [],
                isactive: 0,
                page: 1,
                limit: 20,

                depName: "",
                depId: "",
                applyType: "",
                orderFatherGoodsArr: [],
                queryArr: [],
                sortType: 'store',
                queryIds:[],


            }
        },

        watch: {
            depId: function (newVal, oldVal) {
                this.depId = newVal;
                this.getSortsWithSortType();
            },
            sortType: function (newVal, oldVal) {
                this.sortType = newVal;
                this.getSortsWithSortType();
            }

        },

        mounted() {

            this.getOurDepList();
            this.getSortsWithSortType();


        },

        components: {
            PageHeader,
            NewApplyTable,

        },

        methods: {



            // 根据出货部门sortType获取分店或者商品大类数据
            getSortsWithSortType: function () {
                var status = 0;
                var data = "status=" + status + "&depId=" + this.depId + "&sortType=" + this.sortType;
                apia.outDepQuerySorts(data).then(res => {
                    if (res) {
                        this.queryArr = res.data

                        if(this.sortType == 'store'){
                            for (var i = 0; i< this.queryArr.length; i++) {
                                this.queryIds.push(this.queryArr[i].storeId)
                            }
                        }else  if(this.sortType == 'goods'){
                            this.queryIds = [];
                            for (var i = 0; i< this.queryArr.length; i++) {
                                this.queryIds.push(this.queryArr[i].goodsId)
                            }
                        }

                    }

                    $("input[type='checkbox']").prop("checked", true);
                })

            },

            getOurDepList() {
                var type = 1;
                api.getOutDepList(type).then(res => {
                    if (res) {
                        this.outDepList = res.data;
                        this.depName = res.data[0].depName;
                        this.depId = res.data[0].depId;
                    }
                })
            },


            //点击出货部门
            onclick(index, depId, depName) {
                this.isactive = index;
                this.depName = depName;
                this.depId = depId;

            },

            PrintRow(){
                console.log("fulimian")
                this.$refs.applyTable.PrintRow();
            }

        }
    }
</script>

<style scoped>
    /*.nav-stacked>li.active>a{*/
    /*border-left-color: lightgray*/
    /*}*/

</style>

