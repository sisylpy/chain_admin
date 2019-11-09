<template>

    <div class="my_panel">

        <div class="panel panel-info">
            <!-- Default panel contents -->
            <div class="panel-heading ">

                <div class="print_header row no-padding">
                    <div class="col-md-10" style="padding-left: 0; padding-right: 0">
                        <h4>订货店铺：</h4>
                        <div class="btn-row">
                            <div v-for="(item, index) in storeArr">
                                <label class="checkbox-inline" :id="item.storeId"
                                       style="margin-right: 20px; font-size: 16px;">
                                    <input type="checkbox" :value="item.storeId" name="store"
                                           v-model="item.storeId !== null"/>
                                    {{item.printLabel}}
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-2">
                        <button type="primary" class="btn-lg btn-primary" @click="PrintRow()">打 印</button>
                    </div>
                </div>

            </div>


            <!--<div class="box-body table-responsive no-padding" style="min-height: 400px">-->

            <div class="panel-body no-padding">
                <NewApplyTable @printArr="getPrintArr"/>
            </div>


            <div id="printRecord" style="">

            </div>


        </div>

        <a class="print" href="javascript:;" @click="preview();">打印</a>
        <!--startprint-->
        <div class="container a4-endwise" id="test">

        </div>


    </div>


</template>

<script>
    import apia from '@/api/out/orderApplication'
    import NewApplyTable from '@/components/Out/OrderApplication/NewApplyTable'

    export default {
        name: "NewApplyPanel",
        components: {
            NewApplyTable,
        },
        props:['outDepName'],
        data() {
            return {
                page: 1,
                limit: 10,

                storeArr: [],
                printArr: [],
                applyType: "",

            }
        },
        computed: {
            orders_depId: {
                get() {
                    return this.$store.state.orders.orders_depId
                },
                set(value) {
                    this.$store.commit('orders/SET_ORDERSDEPID', value)
                }
            }

        },

        watch: {

            orders_depId: function (newVal, oldVal) {
                this.orders_depId = this.$store.state.orders.orders_depId;
                this.getStoresWithStauts();
            },


        },
        mounted() {

            this.getStoresWithStauts();

            //chormes 浏览器不起作用！
            window.onbeforeprint = function () {
                console.log("hahahh")
            }
            window.addEventListener("afterprint", function (event) {
                console.log("event after!!!!!")
                window.location.reload();

            });


        },

        methods: {


            getPrintArr: function (data) {
                this.printArr = data;

            },


            PrintRow: function () {
                var pageNumber = 1;

                var header = `<h2 class="header" style="text-align: center;">`+this.outDepName+`</h2>`
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
                        var printLabel = applys[j]['storeEntity']['printLabel'];
                        var applyNumber = applys[j]['applyNumber'];
                        var oneApply = `<div class="one-goods-apply" style="display: inline-block; width: 30%;line-height: 30px;font-size: 20px;margin-bottom: 10px">` + printLabel + applyNumber + applyStandardName + `</div>`

                        $('.goods-applys-row:eq(' + i + ')').append(oneApply);

                        $('.one-goods-apply').css({
                            "color": "red",
                            "line-height": "45px",
                            "border-bottom": "1px solid #eee",
                            "background": "gray",
                        })

                        var testHeight = $('#test').height();
                        if (testHeight > 420 ) {
                            console.log("!!!!!!!!")
                            console.log(goodsName)
                            console.log(printLabel)

                            console.log("> 1620",testHeight);
                            // var bottom = `<div>daodile!!!!!!!!!!!!!!!</div>`
                            // $('.goods-applys:eq(' + i + ')').append(bottom);

                            // var fenye = `<div style="page-break-after:always;"></div>`;
                            // $('.goods-applys:eq(' + i + ')').append(fenye);
                            pageNumber += 1;
                            console.log("=============================================")
                            console.log(pageNumber)



                        }
                    }


                }


                var test = $('#test').html();
                window.document.body.innerHTML = test
                window.print();

                // $("#test").print({
                //         globalStyles: true,//是否包含父文档的样式，默认为true
                //         mediaPrint: false,//是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
                //         stylesheet: null,//外部样式表的URL地址，默认为null
                //         operaSupport: true,
                //         noPrintSelector: ".no-print",//不想打印的元素的jQuery选择器，默认为".no-print"
                //         iframe: true,//是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
                //         append: ccc(),//将内容添加到打印内容的后面
                //         prepend: header,//将内容添加到打印内容的前面，可以用来作为要打印内容
                //         deferred: $.Deferred().done(function () {
                //             console.log('Printing done', arguments);
                //
                //             // $('#one-goods').remove();
                //         })
                //     }
                // );


            },

            //获取申请店铺列表
            getStoresWithStauts: function () {
                var status = 0;
                var data = "status=" + status + "&depId=" + this.orders_depId;
                apia.outDepQueryStores(data).then(res => {

                    if (res) {
                        this.storeArr = res.data
                    }

                    $("input[type='checkbox']").prop("checked", true);
                })

            },

        },

    }


</script>


<style scoped>
    li {
        line-height: 50px;
        font-size: 40px;
        border-bottom: 1px solid red;
    }

    .print_header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
    }

    .btn-row {
        display: flex;
        flex-flow: row wrap;
        /*background: yellow;*/
    }

    .table-header-content {
        line-height: 30px;
        /*background: yellow;*/
        padding: 5px;
    }

    .one-goods {
        background: red;
        width: 30px;
        height: 30px;
    }

    .margin-left {
        margin-left: 30px;
    }

    .table-body-content {
        margin-left: 0;
        line-height: 30px;
        /*background: yellow;*/
    }

    .line-content {
        /*background: yellow;*/
    }

    .whole-line {
        display: flex;
        flex-flow: row nowrap;
        padding: 5px;
        border-bottom: 1px solid #dddddd;
        /*background: red;*/

        border-bottom: 1px solid #ddd;
    }

    .whole-line {
        display: flex;
        flex-flow: row nowrap;
    }

    .col-md-2, .col-md-1, .col-md-5 {
        padding-left: 0;
        /*padding-right: 15px;*/
    }

    .applys {
        display: flex;
        flex-flow: row nowrap;
        font-weight: 400;
        margin-left: 5px;
        margin-right: 15px;
    }

    .part-two {
        display: flex;
        flex-flow: row wrap;
    }

    .aaa {

    }

    .one-apply {
        display: flex;
        flex-flow: row wrap;
        line-height: 20px;
    }

    #table-header {
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1px solid #ddd;
        padding-bottom: 0;
        font-weight: 500;
    }


</style>
