<template>

    <div class="box box-primary">

        <div class="box-header with-border">
            <h3>{{depName}}</h3>
            <div v-if="printMax">今天已经打印vvv{{printMax}}次</div>
            <div v-else>今天没有打印</div>
            <!--<button @click='confirmAlert'>确认弹框弹出</button>-->

            <!--<Confirm ref='confirm' text='确定删除该数据吗？' @confirm='deleteItem'></Confirm>-->


        </div>


        <div class="box-body table-responsive no-padding">

            <table class="table table-striped " id="apply-table">
                <tbody>
                <tr>
                    <th style="width:30px;">序号</th>
                    <th>商品名称</th>
                    <th>申请</th>
                    <th>申请总数</th>
                    <th>库存</th>
                    <th>库存情况</th>
                </tr>
                <tr v-for="(item, index) in applyArr">
                    <td>{{index + 1}}</td>
                    <td>{{item.goodsName}}</td>
                    <td>
                        <div class="" style="display: flex;flex-flow: row wrap;">

                            <div class="apply-item" v-for="(apply, index) in item.applys" style="margin-right: 25px;"
                                 :apply_id="apply.applyId">
                                {{apply.storeEntity.printLabel}}: {{apply.applyNumber}}{{item.applyStandardName}}
                            </div>
                        </div>

                    </td>
                    <td>{{item.totalNumber}}{{item.applyStandardName}}</td>
                    <td>{{item.stockApplyStandard}}{{item.applyStandardName}}</td>
                    <td v-if="item.status == 1"><span class='label label-success'> 库存充足</span></td>
                    <td v-else-if="item.status == 2"><span class='label label-danger'> 库存不足</span></td>
                    <td v-else><span class='label label-warning'> 已加入采购计划</span></td>


                </tr>

                </tbody>
            </table>

        </div>
        <div style="display: none" id="test">

        </div>


    </div>


</template>

<script>
    import api from '../../../../api/background/goods'
    import addGoods from '@/components/Background/Goods/AddGoods.vue'
    import apia from '@/api/out/orderApplication'
    import {mapState, mapGetters} from 'vuex'
    import Confirm from '@/components/Confirm'

    export default {
        name: "NewApplyTable",
        props: ['depId', 'depName'],
        components: {Confirm},
        watch: {
            depId: function (newVal, oldVal) {
                this.depId = newVal;
                this.getApplyData();
            },
            depName: function (newVal, oldVal) {
                this.depName = newVal;
            },

        },

        mounted() {

            this.getApplyData();
            this.getPrintMax();

            //chormes 浏览器不起作用！
            window.onbeforeprint = function () {
                console.log("hahahh")
            }
            window.addEventListener("afterprint", function (event) {
                console.log("event after!!!!!")


                var $applys = $('body').children().find('.one-goods-apply');
                var printMax = $('body').children('h2').attr('printmax');
                console.log( $('body').children('h2').attr('printmax'))
                console.log(printMax)

                var ids = [];
                for (var i = 0; i < $applys.length; i++) {
                    var id = $($applys[i]).attr('id');
                    ids.push(id)
                }
                console.log(ids)

                var applyArr = [];
                for (var i =0 ; i< ids.length; i++) {

                    var apply = {
                        applyId : ids[i],
                        pageNumber: parseInt(printMax) + 1
                    }
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

                            if(data.code == 0){
                                window.location.reload();
                                this.getPrintMax();

                            }
                        }
                    })
                })


                $('body').on('click', '#cancelPrint', function () {
                    window.location.reload();

                })



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
            }
        },

        methods: {


            PrintRow: function () {

                var header = `<h2 class="header" id="title" style="text-align: center;" printmax=`+this.printMax+`>` + this.printMax + `</h2>`
                $('#test').append(header);

                var applysArr = this.printArr;

                for (var i = 0; i < applysArr.length; i++) {

                    var oneGoods = `<div class="goods-applys" style="width: 100%;background: yellow; display: inline-block"></div>`
                    $('#test').append(oneGoods);

                    var goodsName = applysArr[i]['goodsName'];
                    var applyStandardName = applysArr[i]['applyStandardName'];
                    var h3 = `<h3 style="background: green; width: 100%">` + goodsName + `</h3>`

                    $('.goods-applys:eq(' + i + ')').append(h3);
                    var row = `<div class="goods-applys-row" style="background: red; width: 100%;display: inline-block;"></div>`
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
                var ch = `<div style="width: 100%; height: 100%; background: #f0ad4e; position: fixed; left:0; top:0;">
<button id="successPrint">打印成功</button>
<button id="cancelPrint">打印失败</button>
</div>`
                $('body').append(ch)

            },

            getPrintMax() {
                apia.getPirntMax().then(res => {
                    if (res) {
                        console.log(res)
                        this.printMax = res.data;
                    }
                })
            },


            //获取表格数据
            getApplyData: function () {

                var query = {
                    sortType: this.sortType,
                    arr: this.queryIds
                }

                var data = "status=" + "0" + "&depId=" + this.depId + "&queryIds=" + JSON.stringify(query);
                this.bus.$emit('loading', true);

                apia.outDepQueryApplys(data).then(res => {
                    if (res) {
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
