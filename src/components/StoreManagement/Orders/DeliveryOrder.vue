<template>

            <div class="row">

                <div class="col-md-2">

                    <div class="box box-primary">

                        <div class="box-header with-border">
                            <h3 class="box-title">店铺</h3>
                        </div>

                        <div class="box-body no-padding">
                            <ul class="nav nav-pills nav-stacked">
                                <li v-for="(item,index) in storeArr" v-bind:key="item.storeId"
                                    :id="item.storeId"
                                    @click='onclick(index, item.storeId, item.storeName)'
                                    :class="isactive == index ? 'active' : '' " >
                                    <a>{{item.storeName}}</a></li>
                            </ul>
                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>

                <div class="col-md-10">
                    <DeliveryTable :storeId="storeId" :storeName="storeName"/>
                </div>
            </div>



</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/out/deliverOrder'
    import DeliveryTable from '@/components/StoreManagement/Orders/Table/DeliveryTable'

    export default {
        name: "DeliveryOrder",

        data() {
            return {
                storeArr: [],
                isactive: 0,
                storeId: "",
                storeName: "",
                page: 1,
                limit: 20,
                type: 1,

            }
        },
        computed: {

            applyType: {
                get() {
                    return this.$store.state.orders.applyType
                },
                set(value) {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                },

            },
        },
        watch:{

            applyType: function (newVal, oldVal) {

                if(newVal === "deliveryOrder"){
                    console.log("deliveryOrder la.....")
                   this.getDeliveryOrders();
                }
            }

        },

        mounted() {


        },

        components: {
            PageHeader,
            DeliveryTable,
        },
        methods: {
            getDeliveryOrders(){
                this.bus.$emit("loading", true);

                api.deliverOrderStores().then(res => {
                    if (res) {

                        this.bus.$emit("loading", false);

                        this.storeArr = res.data;
                        this.storeId = res.data[0].storeId;
                        this.storeName = res.data[0].storeName;

                    }
                })
            },

            //点击
            onclick(index, storeId, storeName) {
                console.log(index)
                this.isactive = index;
                this.storeId = storeId;
                this.storeName = storeName;

            },

        }
    }
</script>

<style scoped>
    /*.nav-stacked>li.active>a{*/
    /*border-left-color: lightgray*/
    /*}*/

</style>

