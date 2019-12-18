<template>

    <div class="box box-primary">

        <div class="row box-header">

            <div class="col-md-5">

                <div class="form-group" id="fatherSide" :depId="outDepId">
                    <label>出货部门</label>
                    <select class="form-control select2" multiple="multiple" data-placeholder="全部大类---可以选择产品类别"
                            style="width: 100%; " id="selectFatherId">
                        <option v-for="(item) in cateArr" :value="item.goodsId">{{item.goodsName}}</option>
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

        <div class="box-body">

            <table class="table table-striped " id="apply-table">
                <tbody>
                <tr>
                    <th style="width:60px;">序号</th>
                    <th style="width:100px;">商品名称</th>
                    <th style="width: 80px;">申请总数</th>
                    <th>申请</th>

                </tr>
                <tr v-for="(item, index) in applyArr">

                    <td>{{index + 1}}</td>
                    <td>{{item.goodsName}}</td>
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
    import apia from '@/api/out/orderApplication'

    export default {
        name: "NewApplyTable",
        computed: {
            outDepId: {
                get() {
                    return this.$store.state.orders.outDepId
                },
                set() {
                    // this.$store.commit('orders/set_ORDERSDEPID', value)
                }
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
            outDepId: function (newVal, oldVal) {

                if (this.applyType === "orderApplicaton") {
                    console.log("NewApplyTable la.....")
                    this.getGoodsandStoreSorts();
                    this.getApplyData();

                    //获取最大打印
                    this.getPrintMax();
                }
            },
            applyType: function (newVal, oldVal) {

                if (newVal === "orderApplicaton") {
                    console.log("NewApplyTable la.....")
                    this.getGoodsandStoreSorts();
                    this.getApplyData();

                    //获取最大打印
                    this.getPrintMax();
                }
            },

        },

        mounted() {
            var that = this;

            //获取产品和分店数据
            this.getGoodsandStoreSorts();
            this.getApplyData();

            //获取最大打印
            this.getPrintMax();

            // 产品和分店的选择插件
            $('.select2').select2();
            // selcct 产品
            $('#selectFatherId').on('change', function (e) {
                that.getSortIds(that);
            });
            // select分店
            $('#selectStoreId').on('change', function (e) {
                that.getSortIds(that);
            });


            //chormes 浏览器不起作用！
            //打印前监听方法
            window.onbeforeprint = function () {
                console.log("hahahh")
            }
            //打印后监听方法
            window.addEventListener("afterprint", function (event) {

                var $applys = $('body').children().find('.one-goods-apply');
                var printMax = $('body').children('h2').attr('printmax');
                console.log($('body').children('h2').attr('printmax'))
                console.log(printMax);

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
                queryStoreIds: [],
                queryFatherIds: [],
                storeArr: [],
                cateArr: [],

            }
        },

        methods: {




            // select 插件，根据选择到商品类别和分店，获取申请
            getSortIds(that) {

                var fatherIds = []; //商品类别
                var storeIds = []; //分店
                var gstr = '-1'; //默认商品类别全选
                var sstr = '-1'; //默认分店全选
                var selectFather = $("#selectFatherId").find("option:selected");
                var selectStore = $("#selectStoreId").find("option:selected");

                if (selectFather.length > 0) {
                    fatherIds = [];
                    for (var i = 0; i < selectFather.length; i++) {
                        var title = $(selectFather.eq(i)).attr('value');
                        fatherIds.push(title)
                    }
                    gstr = fatherIds.join()
                }

                if (selectStore.length > 0) {
                    storeIds = [];
                    for (var j = 0; j < selectStore.length; j++) {
                        var title2 = $(selectStore.eq(j)).attr('value');
                        storeIds.push(title2)
                    }
                    sstr = storeIds.join()
                }

                var depId = $('#fatherSide').attr('depid');

                var data = "status=0&depId=" + depId + "&queryFatherIds=" + gstr + "&queryStoreIds=" + sstr;
                $.ajax({
                    cache: true,
                    type: "get",
                    url: "http://localhost:8080/chainPro_war_exploded/sys/ckapplys/outDepQueryApplysBySorts",
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        console.log(data.data)
                        that.applyArr = data.data;
                        that.printArr = data.data;
                    }
                })
            },


            // 根据出货部门Id，获取select分店和商品大类下拉框数据
            getGoodsandStoreSorts: function () {
                console.log("getGoodsandStoreSortsgetGoodsandStoreSorts")
                var status = 0;
                var data = "status=" + status + "&depId=" + this.outDepId;
                apia.outDepQuerySorts(data).then(res => {
                    if (res) {
                        console.log(res);
                        this.queryStoreIds = [];
                        this.queryFatherIds = [];

                        this.cateArr = res.data.fatherGoodsList;
                        this.storeArr = res.data.storeList;
                        console.log("this.CateArr")
                        console.log(this.cateArr);
                        console.log("this.storeArr")
                        console.log(this.storeArr)

                        for (var i = 0; i < this.storeArr.length; i++) {
                            this.queryStoreIds.push(this.storeArr[i].storeId)
                        }

                        for (var j = 0; j < this.cateArr.length; j++) {
                            this.queryFatherIds.push(this.cateArr[j].goodsId)
                        }

                    }
                })

            },

            PrintRow: function () {
                console.log(this.printMax)
                var printTimes = parseInt(this.printMax)+1

                var header = `<h2 class="header" id="title" style="text-align: center;" printmax=` + this.printMax + `>今天第`  +  printTimes  + `次打印</h2>`
                $('#test').append(header);

                var applysArr = this.printArr;

                for (var i = 0; i < applysArr.length; i++) {

                    var oneGoods = `<div class="goods-applys" style="width: 100%; display: inline-block"></div>`
                    $('#test').append(oneGoods);

                    var goodsName = applysArr[i]['goodsName'];
                    var totalNumber = applysArr[i]['totalNumber'];
                    var applyStandardName = applysArr[i]['applyStandardName'];
                    var h3 = `<h3 style=" width: 100%">` + goodsName +`:  `+ totalNumber + applyStandardName +`</h3>`

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
                            <button id="successPrint">打印成功</button>
                            <button id="cancelPrint">打印失败</button>
                            </div>`
                $('body').append(ch)

            },

            getPrintMax() {
                apia.getPirntMax().then(res => {
                    if (res) {
                        this.printMax = res.data;
                    }
                })
            },


            //获取表格数据
            getApplyData: function () {

                var data = "status=" + "0" + "&depId=" + this.outDepId;
                this.bus.$emit('loading', true);

                apia.outDepQueryApplys(data).then(res => {
                    if (res) {
                        console.log(res)
                        this.bus.$emit('loading', false);

                        this.applyArr = res.data;
                        this.printArr = res.data;

                    }


                });

            },




        }


    }


</script>

<style scoped>
    .ui-jqgrid-bdiv {
        height: 100%;
    }


</style>
