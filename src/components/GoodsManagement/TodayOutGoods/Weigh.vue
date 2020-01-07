<template>

    <div>



        <div id="weighGoods" class="row">

            <div class="col-md-3">

                <!-- sidebar: style can be found in sidebar.less -->
                <section class="my-sidebar">

                    <!-- /.search form -->
                    <!-- sidebar menu: : style can be found in sidebar.less -->
                    <ul class="my-sidebar-menu" style="font-size: 16px; border: 1px solid lightgray; border-radius: 2px;">

                        <li class="my-treeview" v-for="(outDep,index) in outDepArr" style="padding: 5px; ">
                            <a style="line-height: 40px;color: #2b2b2b;" >
                                {{outDep.dep}}
                            </a>
                            <ul class="my-treeview-menu" style="width: 90%;margin-left: 5%;color: #2b2b2b;;">
                                <li style="padding: 5px; width: 100%; "
                                    v-for="(item, itemIndex) in outDep.fathers" @click="getApplysByFatherId(item.goodsId, index,itemIndex)">
                                    <a  class="fatherGoods" style="line-height: 30px;color: #3f3f3f; " :style='index == 0 && itemIndex == 0 ? "color:red" : ""'>{{item.goodsName}}</a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </section>
                <!-- /.sidebar -->


            </div>
            <div class="col-md-9" style="background: lightgray; padding-left: 20px; padding-right: 20px;">
                <!--<tr>-->
                <!--<th>出货数量</th>-->
                <!--</tr>-->

                <div>
                    <!--<td>-->
                    <div class="row" v-for="(item, index) in outApplyArr" :key="">
                        <div style="display: flex;flex-flow: row nowrap; justify-items: flex-start;align-items: center;">
                            <h4 style="margin-right: 10px;">{{item.goodsName}}</h4>
                            <button @click="saveOneQutantity(index)">保存</button>

                        </div>
                        <div class="store-apply" style="padding: 0;width: 100%; ">
                            <div v-for="(outApply) in item.applys" :key="outApply.applyId" class="one-apply col-md-4"
                                 style="position: relative; padding: 0;display: flex;flex-flow: row nowrap; justify-items: flex-start;align-items: center;">
                                <input type="hidden" :id="outApply.applyId" class="apply-id">
                                <input type="hidden" :inStoreId="outApply.applyStoreId" class="store-id">
                                <input type="hidden" :goodsId="item.goodsId" class="goods-id">
                                <input type="hidden" :price="item.price" class="price">
                                <input type="hidden" :outdepid="outApply.outDepId" class="out-dep-id">
                                <div style="line-height: 30px;padding: 5px; float: left; ">
                                    {{outApply.storeEntity.printLabel}}  {{outApply.applyNumber}}{{item.applyStandardName}}
                                </div >

                                <input type="number" class="outQuantity"
                                       style="float: left; width:30% ;font-size: 18px;margin-left: 10px;border:none; border-bottom:1px solid #ddd">
                                <div style="float: left; line-height: 30px;padding: 5px">{{item.purStandardName}}</div>
                            </div>
                        </div>
                    </div>
                    <!--</td>-->

                </div>

            </div>
        </div>


    </div>


</template>

<script>
    import api from '@/api/goodsManagement/outGoods'

    export default {
        name: "Weigh",
        props: ['outType'],
        watch: {

            outType: function (newVal) {
                if (newVal == "weigh") {

                    this.getApplysAndSortsData();
                }
            }


        },
        data() {
            return {
                page: 1,
                limit: 20,
                outDepArr: [],
                outApplyArr: [],
                fatherId: "",
                fatherIndex: "0",
                itemIndex: "0"


            }
        },


        mounted() {
            var that = this;

            $('.select2').select2();

            // selcct 产品
            $('#changePrintTimes').on('change', function (e) {
                that.selectPrintTime(e);
            });


            $('#weighGoods').on('keyup', '.outQuantity', function (e) {
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

            $('#weighGoods').children().find('.my-sidebar-menu').addClass('open-view')


        },

        methods: {

            getApplysByFatherId: function(fatherId, index, itemIndex){
                this.fatherId = fatherId;
                this.fatherIndex = index;
                this.itemIndex= itemIndex;

                api.getApplysForWeighByFatherId(this.fatherId)
                    .then(res => {
                        if(res) {
                            this.outApplyArr = res.data;
                            $('.fatherGoods').css('color', '#3f3f3f')
                            $('.my-treeview').eq(this.fatherIndex).children().find('.fatherGoods').eq(this.itemIndex).css('color','red')
                        }
                    })
            },


            // 获取select分店和商品大类的新申请
            getApplysAndSortsData: function () {
                api.initWeightData().then(res => {
                    if (res.data) {
                        console.log(res.data)
                        this.outDepArr = res.data.fatherList;
                        this.outApplyArr = res.data.applys;
                        this.fatherId = res.data['fatherList'][0]['fathers']['0']['goodsId'];
                    }else{
                        this.outDepArr = [];
                        this.outApplyArr = [];
                        this.fatherId = "";
                    }
                })
            },


            saveOneQutantity(index) {
                var outQuantityArr = [];
                var apply =  $('.store-apply').eq(index);

                var $applyIds = $('.store-apply').eq(index).find('.apply-id')
                console.log(index)
                console.log($('.store-apply').eq(index))
                // var $applyIds = $('.apply-id');

                if($applyIds.length > 0) {
                    for (var i = 0; i < $applyIds.length; i++) {
                        var quantity = $('.outQuantity:eq(' + i + ')').val();
                        var price =  $('.price:eq(' + i + ')').attr("price");

                        console.log("----->>>>>>>>>>>")
                        console.log(quantity);
                        console.log(price);
                        var subTotal = (Number(quantity) * Number(price)).toFixed(1);
                        console.log(subTotal)
                        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<,")

                        if (quantity.length > 0) {
                            var outQuantity = {
                                stApplyId: $('.apply-id:eq(' + i + ')').attr("id"),
                                quantity: quantity,
                                stGoodsId: $('.goods-id:eq(' + i + ')').attr("goodsid"),
                                inStoreId: $('.store-id:eq(' + i + ')').attr("instoreid"),
                                discountPrice: price,
                                outDepId: $('.out-dep-id:eq(' + i + ')').attr("outdepid"),
                                subTotal: subTotal

                            }
                            outQuantityArr.push(outQuantity);
                        }

                    }
                    console.log(outQuantityArr)
                    this.bus.$emit('loading', true);

                    api.saveOutQuantity(outQuantityArr).then(res => {
                        if (res) {
                            this.bus.$emit('loading', false);

                            $('.outQuantity').val("");

                            if($(apply).parent().siblings().length > 0){
                                this.getApplysByFatherId(this.fatherId,this.fatherIndex, this.itemIndex);
                            }else {
                                this.getApplysAndSortsData();
                            }
                        }
                    })
                }


            },

            /**
             * wait
             */
            saveOutQutantity() {

                var outQuantityArr = [];
                var $applyIds = $('.apply-id');
                for (var i = 0; i < $applyIds.length; i++) {
                    var quantity = $('.outQuantity:eq(' + i + ')').val();
                    var price =  $('.price:eq(' + i + ')').attr("price");

                    var subTotal = (Number(quantity) * Number(price)).toFixed(1);


                    if (quantity.length > 0) {
                        var outQuantity = {
                            stApplyId: $('.apply-id:eq(' + i + ')').attr("id"),
                            quantity: quantity,
                            outDepId: this.outDepId,
                            stGoodsId: $('.goods-id:eq(' + i + ')').attr("goodsid"),
                            inStoreId: $('.store-id:eq(' + i + ')').attr("instoreid"),
                            discountPrice: price,
                            subTotal: subTotal

                        }
                        outQuantityArr.push(outQuantity);
                    }

                }
                console.log(outQuantityArr)
                this.bus.$emit('loading', true);

                api.saveOutQuantity(outQuantityArr).then(res => {
                    if (res) {
                        this.bus.$emit('loading', false);

                        $('.outQuantity').val("");
                        this.getApplysByFatherId(this.fatherId);

                        // this.getJqtableData();
                        // this.getPrintTime();

                    }
                })

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
    .my-treeview > a .active {
        color: red;
    }

</style>
