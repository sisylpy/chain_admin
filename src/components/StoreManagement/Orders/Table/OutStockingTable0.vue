<template>

    <div class="box box-primary" id="enterOutGoods">

        <div class="box-body">
            <div class="row my-drop-group">


                <div class="my-dropDown-group col-md-10">
                    <h5>打印次数</h5>
                    <div class="form-group" id="selectPrintTimes" style="background: yellow">
                        <select class="form-control select2"  data-placeholder="所有打印次数"
                                style="width: 100%;" id="changePrintTimes" >
                            <option v-for="(item) in printTimes" :value="item" :key="item"> {{item}}</option>
                        </select>

                    </div>

                </div>

                <div class="col-md-2">
                    <a class="btn my-warning btn-lg" @click="saveOutQutantity">保存</a>
                </div>
            </div>


            <table id="outStockTable">
                <tbody>
                <!--<tr>-->
                    <!--<th>出货数量</th>-->
                <!--</tr>-->

                <tr v-for="(item) in outStockingArr" :key="item.goodsId">
                    <td>
                        <div>
                            <h4>{{item.goodsName}}</h4>
                            <div class="store-apply row" style="padding: 0;width: 100%;">
                                <div v-for="(outApply) in item.applys" :key="outApply.applyId" class="one-apply col-md-4"
                                     style="position: relative; padding: 0;">
                                    <input type="hidden" :id="outApply.applyId" class="apply-id">
                                    <input type="hidden" :inStoreId="outApply.applyStoreId" class="store-id">
                                    <input type="hidden" :goodsId="item.goodsId" class="goods-id">
                                    <input type="hidden" :price="item.price" class="price">
                                    <div style="line-height: 30px;padding: 5px; float: left;">
                                        {{outApply.storeEntity.printLabel}}{{outApply.applyNumber}}{{item.applyStandardName}}
                                    </div>

                                    <input type="text" class="outQuantity"
                                           style="float: left; width:30% ;font-size: 18px;margin-left: 10px;border:none; border-bottom:1px solid #ddd">
                                    <div style="float: left; line-height: 30px;padding: 5px">{{item.purStandardName}}</div>
                                </div>
                            </div>
                        </div>
                    </td>

                </tr>

                </tbody>
            </table>

        </div>
    </div>


</template>

<script>
    import apia from '@/api/out/orderApplication'

    export default {
        name: "OutStockingTable",
        props: [ "depName"],

        data() {
            return {
                page: 1,
                limit: 21,
                outStockingArr: [],
                printTimes: [],
                showPrintTimes: '',


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
                set() {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                },

            },
        },

        watch: {

            outDepId: function (newVal) {
                if(this.applyType === "outStocking"){
                    this.depId = newVal
                    // this.getJqtableData();
                    this.getPrintTime();


                }

            },
            applyType: function (newVal) {
                if(newVal === "outStocking"){
                    this.depId = newVal
                    // this.getJqtableData();
                    this.getPrintTime();

                }


            },

        },
        mounted() {
            var that = this;

            $('.select2').select2();

            // selcct 产品
            $('#changePrintTimes').on('change', function (e) {
               that.selectPrintTime(e);
            });



            $('#outStockTable').on('keyup', '.outQuantity', function (e) {
                //获取当前输入框

                if (e.keyCode == 13) {
                    if ($(this).parent().next().children().length > 0) {
                        $(this).parent().next().children('.outQuantity').focus();

                    } else {
                        $(this).parents('tr').next().find('.store-apply').children(":first").children("input").focus();

                    }

                }
                if (e.keyCode == 40) {
                    if ($(this).parent().next().children().length > 0) {
                        $(this).parent().next().children('.outQuantity').focus();

                    } else {
                        $(this).parents('tr').next().find('.store-apply').children(":first").children("input").focus();

                    }
                }
            });


        },

        methods: {
            selectPrintTime(e) {
                console.log(1)
                console.log(e);

                this.showPrintTimes = parseInt(e.target.value)
                this.getJqtableData();
            },

            getPrintTime() {
                apia.getPrintTimes(this.outDepId).then(res => {
                    console.log(res)
                    if (res) {
                        this.printTimes = res.data;
                        if(res.data.length > 0){
                            this.showPrintTimes = res.data[0];
                            this.getJqtableData();
                        }else{
                            this.showPrintTimes = '';
                            this.outStockingArr = [];
                        }


                    }
                })
            },


            saveOutQutantity() {

                var outQuantityArr = [];
                var $applyIds = $('.apply-id');
                for (var i = 0; i < $applyIds.length; i++) {
                    var quantity = $('.outQuantity:eq(' + i + ')').val();

                    if (quantity.length > 0) {
                        var outQuantity = {
                            stApplyId: $('.apply-id:eq(' + i + ')').attr("id"),
                            quantity: quantity,
                            outDepId: this.outDepId,
                            stGoodsId: $('.goods-id:eq(' + i + ')').attr("goodsid"),
                            inStoreId: $('.store-id:eq(' + i + ')').attr("instoreid"),
                            discountPrice: $('.price:eq(' + i + ')').attr("price"),
                        }
                        outQuantityArr.push(outQuantity);
                    }

                }
                console.log(outQuantityArr)
                this.bus.$emit('loading', true);

                apia.saveOutQuantity(outQuantityArr).then(res => {
                    if (res) {
                        this.bus.$emit('loading', false);

                        $('.outQuantity').val("");

                        this.getJqtableData();
                        this.getPrintTime();

                    }
                })

            },

            //获取表格数据
            getJqtableData: function () {



                var data = "depId=" + this.outDepId + "&pageNumber=" + this.showPrintTimes;
                this.bus.$emit('loading', true);
                apia.outDepQueryApplysByPageNumber(data).then(res => {
                    console.log("outstocking res")
                    this.bus.$emit('loading', false);

                    this.outStockingArr = res.data;

                });

            },




        }


    }

</script>

<style scoped>
    .dropdown-menu {
        display: flex;
        flex-flow: column nowrap;

    }

    .dropdown-menu li {
        line-height: 30px;

    }

</style>
