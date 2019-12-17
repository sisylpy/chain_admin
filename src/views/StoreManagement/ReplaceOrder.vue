<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <section>
            <div class="row">

                <div class="col-md-2">

                    <div class="box box-primary">

                        <div class="box-header with-border">
                            <h3 class="box-title">店铺</h3>
                        </div>

                        <div class="box-body no-padding" style="max-height: 400px; overflow-y: auto;">
                            <ul class="nav nav-pills nav-stacked" >
                                <!--<li class="active"><a>Inbox</a></li>-->
                                <li v-for="(item,index) in storeList" v-bind:key="item.storeId" :id="item.storeId"
                                    :class="isactive == index ? 'active' : '' "
                                    @click='onclick(index, item.storeId,item.storeName)'>

                                    <a>{{item.storeName}}</a></li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>

                </div>

                <div class="col-md-10">

<StoreOrder/>
                </div>


            </div>
        </section>
    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '../../api/background/store'
    import StoreOrder from '@/components/StoreManagement/ReplaceOrder/StoreOrder'


    export default {
        name: "ReplaceOrder",

        data() {
            return {
                storeList: [],
                isactive: 0,
                page: 1,
                limit: 20,
                type: 1,
                storeName: "",

                inputVal: "",
                inputIndex: '1',
                queryArr: [],
                bill: {},
                subBillArr: [],
                goodsTotal: 5,
                showDate: "",

            }
        },

        mounted() {
            var data = "page=" + this.page + "&limit=" + this.limit;
            api.getStoreList(data).then(res => {
                if (res) {
                    this.storeList = res.page.list;
                    this.storeId = res.page.list[0].storeId;
                    this.storeName = res.page.list[0].storeName;
                    this.$store.state.store.storeId = res.page.list[0].storeId;
                    this.$store.state.store.storeName = res.page.list[0].storeName;
                    this.$store.state.store.storeType = 'storeOrders';
                }
            })
        },

        components: {
            PageHeader,
            StoreOrder

        },
        methods: {

            //点击产品类别
            onclick(index, storeId, storeName) {
                this.isactive = index;
                this.storeId = storeId;
                this.storeName = storeName;
                this.$store.state.store.storeId = storeId;
                this.$store.state.store.storeName = storeName;
            },


            //点击出货部门的三大业务
            changeStoreType: function (data) {
                if (data === "storeOrders") {
                    this.$store.dispatch('store/set_storeTYPE', data)
                } else if (data === "products") {
                    this.$store.dispatch('store/set_storeTYPE', data)
                }
                else if (data === "turnover") {
                    this.$store.dispatch('store/set_storeTYPE', data)

                } else if (data === "stock") {
                    this.$store.dispatch('store/set_storeTYPE', data)
                }

            },

        }
    }
</script>

<style scoped>
    /*.nav-stacked>li.active>a{*/
    /*border-left-color: lightgray*/
    /*}*/

</style>

