<template>

    <section>



    <div class="row">

        <div class="col-md-2">

            <div class="box box-primary">

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

        </div>

        <div class="col-md-10">

            <OutStockingTable />

        </div>


    </div>

    </section>
</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/background/outDep'

    import OutStockingTable from '@/components/StoreManagement/Orders/Table/OutStockingTable'

    export default {
        name: "EnterOutGoods",
        data() {
            return {
                outDepList: [],
                isactive: 0,
                page: 1,
                limit: 20,

                depName: "",

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

                if(newVal === "outStocking"){
                    console.log("outStocking la.....")
                    var type = 1;
                    api.getOutDepList(type).then(res => {
                        if (res) {
                            this.outDepList = res.data;
                            this.depName = res.data[0].depName;
                            this.depId = res.data[0].depId;

                        }
                    })
                }
            }

        },
        mounted() {

        },

        components: {
            PageHeader,
            OutStockingTable,

        },
        methods: {
            //点击出货部门
            onclick(index, depId, depName) {
                this.isactive = index;
                this.depName = depName;
                this.depId = depId;
                this.$store.dispatch('orders/set_OUTDEPID', depId)


            },
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
