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
                    <DeliveryTable/>



                </div>


            </div>
        </section>
    </div>


</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '../../api/out/deliverOrder'
    import DeliveryTable from '@/components/Out/DeliveryOrder/DeliveryTable'

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

        mounted() {

            this.bus.$emit("loading", true)
            api.deliverOrderStores().then(res => {
                if (res) {
                    this.bus.$emit("loading", false)

                    this.storeArr = res.data;
                    this.storeId = res.data[0].storeId;
                    this.storeName = res.data[0].storeName;
                    this.$store.state.orders.in_storeId  = res.data[0].storeId;
                    this.$store.state.orders.in_storeName  = res.data[0].storeName;



                }
            })
        },

        components: {
            PageHeader,
            DeliveryTable,
        },
        methods: {

            //点击产品类别
            onclick(index, storeId, storeName) {
                console.log(index)
                this.isactive = index;
                this.storeId = storeId;
                this.storeName = storeName;
                this.$store.dispatch('orders/set_INSTOREID', storeId)

            },

        }
    }
</script>

<style scoped>
    /*.nav-stacked>li.active>a{*/
    /*border-left-color: lightgray*/
    /*}*/

</style>

