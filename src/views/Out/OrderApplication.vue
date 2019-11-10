<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <section>
            <div class="row">

                <div class="col-md-2">
                    <a class="btn btn-primary btn-block margin-bottom" @click="PrintRow()">打印</a>

                    <div class="box box-solid">

                        <div class="box-header with-border">
                            <h3 class="box-title">出货部门</h3>
                        </div>

                        <div class="box-body no-padding">
                            <ul class="nav nav-pills nav-stacked">
                                <!--<li class="active"><a>Inbox</a></li>-->
                                <li v-for="(item,index) in outDepList" v-bind:key="item.id" :id="item.outDepId"
                                    :class="isactive == index ? 'active' : '' "
                                    @click='onclick(index, item.depId, item.depName)'>

                                    <a>{{item.depName}}</a></li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>

                    <div class="box box-solid">

                        <div class="box-header with-border">
                            <h5 class="box-title">申请店铺</h5>
                        </div>
                        <div class="box-body no-padding">

                            <ul class="nav nav-pills nav-stacked">
                                <!--<li class="active"><a>Inbox</a></li>-->
                                <li v-for="(item, index) in orderStoreArr" :id="item.storeId"
                                    @click='onclick(index, item.depId, item.depName)'>

                                    <a>
                                        <label class="checkbox-inline"
                                               style="margin-right: 20px; font-size: 16px;">
                                            <input type="checkbox" :value="item.storeId" name="store"
                                                   v-model="item.storeId !== null"/>
                                            {{item.printLabel}}
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

                    <NewApplyTable :queryArr="queryArr"/>

                </div>

                <div style="display: none" id="test">

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
                orderStoreArr: [],
                orderFatherGoodsArr: [],
                queryArr: [],


            }
        },
        computed: {
            orders_depId: {
                get() {
                    return this.$store.state.orders.orders_depId
                },
                set(value) {
                    this.$store.commit('orders/SET_ORDERSDEPID', value)
                }
            }

        },
        watch: {
            orders_depId: function (newVal, oldVal) {
                this.orders_depId = this.$store.state.orders.orders_depId;
                this.getStoresWithStauts();
            },


        },

        mounted() {

            var type = 1;
            api.getOutDepList(type).then(res => {
                if (res) {
                    this.outDepList = res.data;
                    this.depName = res.data[0].depName;
                    this.$store.state.orders.orders_depId  = res.data[0].depId;
                }
            })

            this.getStoresWithStauts();

        },

        components: {
            PageHeader,
            NewApplyTable,

        },

        methods: {

            //点击出货部门
            onclick(index, depId, depName) {
                this.isactive = index;
                this.depName = depName;
                this.$store.dispatch('orders/set_ORDERSDEPID', depId)

            },



            //获取申请店铺列表
            getStoresWithStauts: function () {
                var status = 0;
                var data = "status=" + status + "&depId=" + this.orders_depId;
                apia.outDepQueryStores(data).then(res => {

                    if (res) {
                        this.orderStoreArr = res.data
                    }

                    $("input[type='checkbox']").prop("checked", true);
                })

            },



            getPrintArr: function (data) {
                this.printArr = data;

            },


            PrintRow: function () {
                var pageNumber = 1;

                var header = `<h2 class="header" style="text-align: center;">`+this.outDepName+`</h2>`
                $('#test').append(header);

                var applysArr = this.printArr;

                for (var i = 0; i < applysArr.length; i++) {

                    var oneGoods = `<div class="goods-applys" style="width: 100%;background: yellow; display: inline-block"></div>`
                    $('#test').append(oneGoods);

                    var goodsName = applysArr[i]['goodsName'];
                    var applyStandardName = applysArr[i]['applyStandardName'];
                    var h3 = `<h3 style="background: green; width: 100%">` + goodsName + `</h3>`

                    $('.goods-applys:eq(' + i + ')').append(h3);
                    var row = `<div class="goods-applys-row" style="background: red; width: 100%;display: inline-block;"></div>`
                    $('.goods-applys:eq(' + i + ')').append(row);


                    var applys = applysArr[i]['applys'];

                    for (var j = 0; j < applys.length; j++) {
                        var printLabel = applys[j]['storeEntity']['printLabel'];
                        var applyNumber = applys[j]['applyNumber'];
                        var oneApply = `<div class="one-goods-apply" style="display: inline-block; width: 30%;line-height: 30px;font-size: 20px;margin-bottom: 10px">` + printLabel + applyNumber + applyStandardName + `</div>`

                        $('.goods-applys-row:eq(' + i + ')').append(oneApply);

                        $('.one-goods-apply').css({
                            "color": "red",
                            "line-height": "45px",
                            "border-bottom": "1px solid #eee",
                            "background": "gray",
                        })


                    }


                }


                var test = $('#test').html();
                window.document.body.innerHTML = test
                window.print();

            },




        }
    }
</script>

<style scoped>
    /*.nav-stacked>li.active>a{*/
    /*border-left-color: lightgray*/
    /*}*/

</style>

