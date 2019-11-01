<template>

    <div class="my_panel">

        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <div class="new-order-part">

                    <div class="line-part " v-for="(item, index) in applyArr.lines">

                        <div class="btn-group" style="margin-bottom: 5px; ">

                            <a class="btn btn-default" v-for="(store, index) in  item.stores">
                                <label class="checkbox-inline" :id="store.storeId">
                                    <input type="checkbox" :value="store.storeId" name="store"
                                           v-model="store.storeId !== null"/>
                                    {{store.printLabel}}
                                </label>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div class="panel-body no-padding">
                <div class="box-body table-responsive no-padding">

                    <div class="table-header row no-padding" id="header">
                        <ul style="height: 100%; ">
                            <li class="table-header-content col-md-2">商品名称</li>
                            <li class="table-header-content col-md-6">分店申请</li>
                            <li class="table-header-content col-md-2">申请总数</li>
                            <li class="table-header-content col-md-1">库存</li>
                            <li class="table-header-content col-md-1">状态</li>
                        </ul>
                    </div>

                    <div class="table-body" id="body">

                        <!--商品表部分-->
                        <ul>
                            <li v-for="(item, index) in applyArr.applys" class="line-content">
                                <div class="whole-line">

                                    <input type="checkbox" class="checkbox">
                                    <div class="part-one col-md-2"> {{item.goodsName}}</div>

                                    <div class="part-two col-md-6" >
                                        <label v-for="(apply, index) in item.applys" class="aaa">
                                            <div class="one-apply">
                                                <input type="checkbox" :id="apply.applyId">
                                                <ul class="applys">
                                                    <li>{{apply.storeEntity.printLabel}}</li>
                                                    <li>{{apply.applyNumber}}</li>
                                                    <li>{{apply.ckGoodsEntity.applyStandardName}}</li>
                                                </ul>
                                            </div>
                                        </label>
                                    </div>
                                    <div class="part-three col-md-2">{{item.totalAmount}}{{item.applyStandardName}}</div>
                                    <div class="part-three col-md-1"> {{item.totalAmount}}{{item.applyStandardName}}</div>
                                    <div class="part-four col-md-1"> {{item.goodsName}}</div>
                                </div>

                            </li>
                        </ul>

                    </div>


                </div>
            </div>


        </div>


    </div>


</template>

<script>
    import api from '@/api/background/line'
    import apia from '@/api/out/orderApplication'


    export default {
        name: "NewOrderPanel",
        props: ['depId', 'depName'],

        mounted() {
            // this.getLineData();
            // this.initStore();
            this.getApplysWithStatus(this.depId);
            // this.liLineHover();

        },
        watch: {
            depId: function (newVal, oldVal) {
                this.getApplysWithStatus(newVal);
                this.showStoreArr = []

                // this.getLineData();
                // $("input[type='checkbox']").prop("checked",true);

                // this.initStore();

            },
        },

        data() {
            return {
                page: 1,
                limit: 20,
                applyArr: [],
                lineArr:[],
                showLineArr: [],
                showStoreArr: [],


            }
        },
        methods: {
            liLineHover: function () {

                $('#body').on('mouseover','.li-line', function () {
                    $(this).addClass('hover').siblings().removeClass('hover')
                })


            },
            getApplysWithStatus(depId) {
                var status = 0;
                var data = "status=" + status + "&depId=" + depId;
                console.log(data)

                console.log("?????")
                apia.outDepQueryApplys(data).then(res => {
                    if (res) {
                        console.log(res)
                        this.applyArr = res.data


                    }
                    $("input[type='checkbox']").prop("checked", true);


                })

            },
            getLineData: function () {
                var data = "page=" + this.page + "&limit=" + this.limit;
                api.getLineList(data).then(res => {
                    console.log(res);

                    this.lineArr = res.page.list;
                    $("input[type='checkbox']").prop("checked", true);

                });
            },
            initStore: function () {
                $("input[type='checkbox']").prop("checked", true);
            },


        }


    }

</script>


<style scoped>


    .line-content {
        /*background: yellow;*/
    }
    .whole-line{
        display: flex;
        flex-flow: row nowrap;
        /*background: red;*/

        border-bottom: 1px solid #ddd;
    }
    .part-two{
        display: flex;
        flex-flow: row nowrap;
    }
    .applys{
        display: flex;
        flex-flow: row nowrap;
    }
    .part-two{
        display: flex;
        flex-flow: row wrap;
    }
.aaa{


}
    .one-apply{
        display: flex;
        flex-flow: row wrap;
    }


</style>
