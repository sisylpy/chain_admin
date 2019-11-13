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
            <!-- 。/左侧店铺和商品-->


            <!-- 右侧列表-->
            <div class="col-md-10">

                <NewApplyTable :depId="depId" :depName="depName"/>


            </div>

            </div>

    </section>

</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '../../../api/background/outDep'
    import apia from '@/api/out/orderApplication'

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

        watch: {
            depId: function (newVal, oldVal) {
                this.depId = newVal;
            },


        },

        mounted() {


            this.getOutDepList();


        },

        components: {
            PageHeader,
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
                    }
                })
            },


            //点击出货部门
            onclick(index, depId, depName) {
                this.isactive = index;
                this.depName = depName;
                this.depId = depId;

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

