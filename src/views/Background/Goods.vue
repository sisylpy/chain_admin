<template>
    <div class="">

        <PageHeader/>

            <div class="content">

                    <div class="nav-tabs-custom no-border">
                        <!-- Tabs within a box -->
                        <ul class="nav nav-tabs pull-left">
                            <li class="active"><a href="#products" data-toggle="tab" @click="onclick(1)">产品</a></li>
                            <li><a href="#rawMaterial" data-toggle="tab" @click="onclick(2)">原料</a></li>
                        </ul>

                        <div class="tab-content no-padding">

                            <div class="chart tab-pane active " id="products" style="position: relative;">
                                <GoodsPanel ref="child"/>
                            </div>

                            <!--<div class="chart tab-pane" id="rawMaterial">-->
                                <!--<GoodsPanel  ref="child"/>-->
                            <!--</div>-->

                        </div>
                    </div>
            </div>

    </div>
</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import GoodsPanel from '@/components/Background/Goods/GoodsPanel.vue'


    export default {
        name: "Goods",
        data() {
            return {

                type: ""


            }
        },


        components: {
            PageHeader,
            GoodsPanel,
        },
        methods: {
            //点击产品类别
            onclick(type) {
                this.type =type;
                console.log(this.type)
                this.$refs.child.getCateGoods(type)
            },
        }

    }
</script>

<style scoped>
.category{
    padding-left: 0;
}
.tab-content>.active {
    display: block;
    border: none;
}
</style>
