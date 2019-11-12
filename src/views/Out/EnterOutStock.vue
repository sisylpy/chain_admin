<template>
    <div class="">

        <PageHeader/>

        <!--<section class="content">-->
        <section>
            <div class="row">

                <div class="col-md-2">

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

                </div>

                <div class="col-md-10">
                    <div class="box box-info" id="enterOutGoods">
                        <div class="box-header">
                            <h3>{{depName}}</h3>
                        </div>

                        <div class="box-body ">
                            <OutStockingTable :depId="depId"/>

                        </div>

                    </div>


                </div>


            </div>
        </section>
    </div>

</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import api from '../../api/background/outDep'

    import OutStockingTable from '@/components/Out/EnterOutStock/OutStockingTable'
    export default {
        name: "EnterOutGoods",
        data() {
            return {
                outDepList: [],
                isactive: 0,
                page: 1,
                limit: 20,

                depName: "",
                depId: "",

            }
        },
        mounted() {
            var type = 1;
            api.getOutDepList(type).then(res => {
                if (res) {
                    this.outDepList = res.data;
                    this.depName = res.data[0].depName;
                    this.depId  = res.data[0].depId;

                }
            })
        },

        components: {
            PageHeader,
            OutStockingTable,

        },
        methods:{
            //点击出货部门
            onclick(index, depId, depName) {
                this.isactive = index;
                this.depName = depName;
                this.depId = depId;

            },
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
