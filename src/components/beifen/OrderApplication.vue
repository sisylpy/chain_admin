<template>

    <section>


        <NewApplyTable/>


        <!--<div class="row">-->



            <!--<div class="col-md-2">-->

                <!--<div class="box box-primary">-->

                    <!--<div class="box-header with-border">-->
                        <!--<h3 class="box-title">出货部门</h3>-->
                    <!--</div>-->

                    <!--<div class="box-body no-padding">-->
                        <!--<ul class="nav nav-pills nav-stacked">-->
                            <!--&lt;!&ndash;<li class="active"><a>Inbox</a></li>&ndash;&gt;-->
                            <!--<li v-for="(item,index) in outDepList" v-bind:key="item.id" :id="item.outDepId"-->
                                <!--:class="isactive == index ? 'active' : '' "-->
                                <!--@click='onclick(index, item.depId, item.depName)'>-->

                                <!--<a>{{item.depName}}</a></li>-->
                        <!--</ul>-->
                    <!--</div>-->
                    <!--&lt;!&ndash; /.box-body &ndash;&gt;-->
                <!--</div>-->

            <!--</div>-->
            <!--&lt;!&ndash; 。/左侧店铺和商品&ndash;&gt;-->


            <!--&lt;!&ndash; 右侧列表&ndash;&gt;-->
            <!--<div class="col-md-10">-->



            <!--</div>-->

        <!--</div>-->

    </section>

</template>

<script>
    import api from '../../api/background/outDep'

    import NewApplyTable from '@/components/StoreManagement/Orders/Table/NewApplyTable'

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


            }
        },
        computed: {
            outDepId: {
                get() {
                    return this.$store.state.orders.outDepId
                },
                set() {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                },
            },

            applyType: {
                get() {
                    return this.$store.state.orders.applyType
                },
                set(value) {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                },

            },
        },
        watch: {

            applyType: function (newVal, oldVal) {

                if (newVal === "orderApplicaton") {
                    this.getOutDepList();
                }
            },


        },


        mounted() {

            this.getOutDepList();
        },

        components: {
            NewApplyTable,

        },

        methods: {

            getOutDepList() {
                var type = 1;
                api.getOutDepList(type).then(res => {
                    if (res) {
                        this.outDepList = res.data;
                        this.depName = res.data[0].depName;
                        this.depId = res.data[0].depId;
                        this.$store.state.orders.outDepId = res.data[0].depId;
                        this.$store.state.orders.applyType = 'orderApplicaton';
                    }
                })
            },


            //点击出货部门
            onclick(index, depId, depName) {
                this.isactive = index;
                this.depName = depName;
                this.depId = depId;
                this.$store.dispatch('orders/set_OUTDEPID', depId)


            },

            PrintRow() {
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

