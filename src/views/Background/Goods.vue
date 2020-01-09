<template>
    <div class="">
        <PageHeader/>

            <section class="content">

                    <div class="nav-tabs-custom no-border">

                        <!-- Tabs within a box -->
                        <ul class="nav nav-tabs pull-left">
                            <li class="active"><a href="#stock" data-toggle="tab" @click='onclick("stock")'>库存商品</a></li>
                            <li><a href="#handling" data-toggle="tab" @click='onclick("handling")'>加工商品</a></li>
                            <li><a href="#daily" data-toggle="tab" @click='onclick("daily")'>日采商品</a></li>
                        </ul>

                        <div class="tab-content no-padding">

                            <div class="chart tab-pane active " id="stock" style="position: relative;">
                                <InventoryTypeGoodsPanel :goodsType="goodsType"/>
                            </div>

                            <div class="chart tab-pane" id="handling">
                                <HandlingTypeGoodsPanel :goodsType="goodsType"/>
                            </div>

                            <div class="chart tab-pane" id="daily">
                                <DailyTypeGoodsPanel :goodsType="goodsType" />
                            </div>

                        </div>
                    </div>




            </section>

    </div>
</template>

<script>
    import PageHeader from '@/components/PageHeader.vue'
    import InventoryTypeGoodsPanel from '@/components/Background/Goods/Inventory/InventoryTypeGoodsPanel.vue'
    import HandlingTypeGoodsPanel from '@/components/Background/Goods/Handling/HandlingTypeGoodsPanel.vue'
    import DailyTypeGoodsPanel from '@/components/Background/Goods/Daily/DailyTypeGoodsPanel.vue'



    export default {
        name: "Goods",
        data() {
            return {
                goodsType: "stock"
            }
        },


        components: {
            PageHeader,
            InventoryTypeGoodsPanel,
            HandlingTypeGoodsPanel,
            DailyTypeGoodsPanel,


    },
        methods: {
            //点击产品类别
            onclick(data) {
                // this.$refs.child.getCateGoods()
                this.goodsType = data;

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
