<template>

    <div class="">

        <div class="row ">

            <div class="col-md-5">

                <div class="form-group" id="fatherSide">
                    <label>出货部门</label>
                    <select class="form-control select2" multiple="multiple" data-placeholder="全部出货部门---可以选择出货部门"
                            style="width: 100%; " id="selectOutDepId">
                        <option v-for="(item) in outDepArr" :value="item.depId">{{item.depName}}</option>
                    </select>
                </div>


            </div>

            <div class="col-md-5">

                <div class="form-group">
                    <label>分店</label>
                    <select class="form-control select2" multiple="multiple" data-placeholder="全部分店---可以选择分店"
                            style="width: 100%;" id="selectStoreId">
                        <option v-for="(item) in storeArr" :value="item.storeId">{{item.storeName}}</option>
                    </select>
                </div>


            </div>

            <div class="col-md-2">
                <a class="btn my-warning btn-lg" @click="PrintRow">打印拣货单</a>
            </div>
        </div>

        <div class="">

            <table class="table table-striped " id="apply_table">

                <thead>

                <tr>
                    <th style="width:60px;">序号</th>
                    <th style="width:100px;">商品名称</th>
                    <!--<th style="width:80px;">库存</th>-->
                    <!--<th style="width:120px;">采购数量</th>-->
                    <th style="width:80px;">申请总数</th>
                    <th>申请</th>
                </tr>

                </thead>
                <tbody>

                <tr v-for="(item, index) in applyArr">

                    <td>{{index + 1}}</td>
                    <td>{{item.goodsName}}</td>
                    <!--<td>{{item.stockPurStandard}}{{item.purStandardName}}</td>-->
                    <!--<td>-->
                        <!---->

                        <!--<input v-if='Number(item.stockPurStandard) - Number(item.alarmWeight) > Number(item.todayQuantity) && item.planPurchase == "0" '-->
                         <!--type="text" style='width: 80%; color: gray;'-->
                               <!--disabled-->
                               <!--:value="item.planPurchase"-->
                               <!--:id="item.goodsId" name="plan">-->


                        <!--<input v-else-if='Number(item.stockPurStandard) - Number(item.alarmWeight) < Number(item.todayQuantity) && item.planPurchase == "0" '-->
                            <!--style='width: 80%; color: red;'-->
                               <!--disabled-->
                               <!--:value="item.planPurchase"-->
                               <!--:id="item.goodsId" name="plan"/>-->
                        <!--<input v-else type="text" style='width: 80%; color: blue;'-->
                               <!--disabled-->
                               <!--:value="item.planPurchase"-->
                               <!--:id="item.goodsId" name="plan"/>-->


                        <!--{{item.purStandardName}}-->
                    <!--</td>-->
                    <td>{{item.totalNumber}}{{item.applyStandardName}}</td>
                    <td>
                        <div class="" style="display: flex;flex-flow: row wrap;">
                            <div class="apply-item" v-for="(apply, index) in item.applys" style="margin-right: 25px;"
                                 :apply_id="apply.applyId">
                                {{apply.storeEntity.printLabel}}: {{apply.applyNumber}}{{item.applyStandardName}}
                            </div>
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>


            <!-- 打印机内容载体-->
            <div style="display: none" id="test"></div>

        </div>
    </div>


</template>

<script>
    import api from '@/api/goodsManagement/outGoods'

    export default {
        name: "Prepare",
        props:['outType'],
        watch: {

            outType: function (newVal) {
                if (newVal == "orderApplicaton") {
                    //获取产品和分店数据
                    this.getApplysAndSortsData();

                    //获取最大打印
                    this.getPrintMax();
                }
            }


        },
        data() {
            return {
                page: 1,
                limit: 20,
                applyArr: [],
                printArr: [],
                printMax: '',
                printIds: [],

                orderFatherGoodsArr: [],

                storeArr: [],
                outDepArr: [],

            }
        },

        mounted() {
            var that = this;

            //获取产品和分店数据
            this.getApplysAndSortsData();

            //获取最大打印
            this.getPrintMax();

            // 产品和分店的选择插件
            $('.select2').select2();
            // selcct 产品
            $('#selectOutDepId').on('change', function (e) {
                that.getSortIds(that);
            });
            // select分店
            $('#selectStoreId').on('change', function (e) {
                that.getSortIds(that);
            });


            //chormes 浏览器不起作用！
            //打印前监听方法
            window.onbeforeprint = function (e) {
                console.log(e)
                console.log("hahahh")
            }
            //打印后监听方法
            window.addEventListener("afterprint", function (event) {
                console.log(event)

                var $applys = $('body').children().find('.one-goods-apply');
                var printMax = $('body').children('h2').attr('printmax');
                console.log($('body').children('h2').attr('printmax'))
                console.log(printMax);

                var trs = $('tr');
                    console.log(trs.length);
                    console.log("trs.length up")

                var ids = [];
                for (var i = 0; i < $applys.length; i++) {
                    var id = $($applys[i]).attr('id');
                    ids.push(id)
                }

                var applyArr = [];
                for (var i = 0; i < ids.length; i++) {

                    var apply = {
                        applyId: ids[i],
                        pageNumber: parseInt(printMax) + 1
                    };
                    applyArr.push(apply);
                }


                $('body').on('click', '#successPrint', function () {
                    console.log("success!!")
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/chainPro_war_exploded/sys/ckapplys/applysPrintSuccess/",
                        data: JSON.stringify(applyArr),
                        dataType: 'json',
                        success: function (data) {

                            if (data.code == 0) {
                                window.location.reload();
                                that.getPrintMax();
                            }
                        }
                    })
                });

                //取消打印
                $('body').on('click', '#cancelPrint', function () {
                    window.location.reload();
                });
            });

            // $('#apply_table').on('dblclick', 'input[name=plan]' ,function (e) {
            //     $(this).removeAttr("disabled");
            //     $(this).focus();
            //
            //
            // })
            //
            // $('#apply_table').on('keyup', 'input[name=plan]', function (e) {
            //
            //     if (e.keyCode == 13) {
            //         // var newPrice = $(this).val();
            //         console.log(e.currentTarget.id)
            //
            //
            //        var goodsId = e.currentTarget.id;
            //         var goods = {
            //            goodsId:  goodsId,
            //             planPurchase: $(this).val(),
            //         }
            //
            //         apig.updateGoods(goods).then(res =>{
            //             if(res.code == 0){
            //                 that.getApplysAndSortsData();
            //
            //                 $(e.currentTarget).blur();
            //                 $(e.currentTarget).attr("disabled")
            //
            //             }
            //         })
            //
            //
            //     }
            // });

        },




        methods: {


            // select 插件，根据选择到商品类别和分店，获取申请
            getSortIds(that) {

                var outDepIds = []; //出货部门
                var fatherIds = []; //商品类别
                var storeIds = []; //分店
                var ostr = '-1';
                var gstr = '-1'; //默认商品类别全选
                var sstr = '-1'; //默认分店全选
                var selectOutDep = $("#selectOutDepId").find("option:selected");
                var selectStore = $("#selectStoreId").find("option:selected");

                if (selectOutDep.length > 0) {
                    outDepIds = [];
                    for (var i = 0; i < selectOutDep.length; i++) {
                        var title = $(selectOutDep.eq(i)).attr('value');
                        outDepIds.push(title)
                    }
                    ostr = outDepIds.join()
                }

                if (selectStore.length > 0) {
                    storeIds = [];
                    for (var j = 0; j < selectStore.length; j++) {
                        var title2 = $(selectStore.eq(j)).attr('value');
                        storeIds.push(title2)
                    }
                    sstr = storeIds.join()
                }

                var data = "status=0&queryOutDepIds=" + ostr + "&queryFatherIds=" + gstr + "&queryStoreIds=" + sstr;
                $.ajax({
                    cache: true,
                    type: "get",
                    url: "http://localhost:8080/chainPro_war_exploded/sys/ckapplys/getGatherApplys",
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        that.applyArr = data.data;
                        that.printArr = data.data;
                    }
                })
            },


            // 获取select分店和商品大类的新申请
            getApplysAndSortsData: function () {
                this.bus.$emit('loading', true);
                api.initPrepareData().then(res => {
                    if (res) {
                        this.bus.$emit('loading', false);

                        this.outDepArr = res.data.outDepList;
                        this.storeArr = res.data.storeList;
                        this.applyArr = res.data.applys;
                        this.printArr = res.data.applys;
                    }
                })

            },

            PrintRow: function () {
                console.log(this.printMax)
                var printTimes = parseInt(this.printMax) + 1

                var header = `<h2 class="header" id="title" style="text-align: center;" printmax=` + this.printMax + `>今天第` + printTimes + `次打印</h2>`
                $('#test').append(header);

                var applysArr = this.printArr;

                for (var i = 0; i < applysArr.length; i++) {

                    var oneGoods = `<div class="goods-applys" style="width: 100%; display: inline-block"></div>`
                    $('#test').append(oneGoods);

                    var goodsName = applysArr[i]['goodsName'];
                    var totalNumber = applysArr[i]['totalNumber'];
                    var applyStandardName = applysArr[i]['applyStandardName'];
                    var h3 = `<h3 style=" width: 100%">` + goodsName + `:  ` + totalNumber + applyStandardName + `</h3>`

                    $('.goods-applys:eq(' + i + ')').append(h3);
                    var row = `<div class="goods-applys-row" style=" width: 100%;display: inline-block;"></div>`
                    $('.goods-applys:eq(' + i + ')').append(row);


                    var applys = applysArr[i]['applys'];

                    for (var j = 0; j < applys.length; j++) {
                        var applyId = applys[j].applyId;
                        var printLabel = applys[j]['storeEntity']['printLabel'];
                        var applyNumber = applys[j]['applyNumber'];
                        var oneApply = `<div class="one-goods-apply" id=` + applyId + ` style="display: inline-block; width: 30%;line-height: 30px;font-size: 20px;margin-bottom: 10px">` + printLabel + applyNumber + applyStandardName + `</div>`

                        $('.goods-applys-row:eq(' + i + ')').append(oneApply);

                        $('.one-goods-apply').css({
                            "color": "red",
                            "line-height": "45px",
                            "border-bottom": "1px solid #eee",
                            "background": "gray",
                        })
                    }
                }


                var test = $('#test').html();
                window.document.body.innerHTML = test
                window.print();

                var ch = `<div style="width: 100%; height: 100%; background: gray;position: fixed; left:0; top:0;">
                            <button id="successPrint">打印成功1</button>
                            <button id="cancelPrint">打印失败1</button>
                            </div>`


                $('body').append(ch)

            },

            getPrintMax() {
                this.bus.$emit('loading', true);

                api.getPirntMax().then(res => {
                    if (res) {
                        this.bus.$emit('loading', false);

                        this.printMax = res.data;
                    }
                })
            },


        }


    }


</script>

<style scoped>
    .ui-jqgrid-bdiv {
        height: 100%;
    }


</style>
