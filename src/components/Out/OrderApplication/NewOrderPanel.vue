<template>

    <div class="my_panel">


        <div class="panel panel-info">
            <!-- Default panel contents -->
            <div class="panel-heading ">

                <div class="print_header row no-padding" >
                    <div class="col-md-10" style="padding-left: 0; padding-right: 0" >
                        <h4>订货店铺：</h4>
                        <div class="btn-row">
                        <div v-for="(item, index) in storeArr" >
                            <label class="checkbox-inline" :id="item.storeId" style="margin-right: 20px; font-size: 16px;">
                                <input type="checkbox" :value="item.storeId" name="store"
                                       v-model="item.storeId !== null"/>
                                {{item.printLabel}}
                            </label>
                        </div>
                        </div>

                    </div>
                    <div class="col-md-2">
                        <button type="primary" class="btn-lg btn-primary" @click="PrintRow">打 印</button>
                    </div>
                </div>

            </div>


                <!--<div class="box-body table-responsive no-padding" style="min-height: 400px">-->

                    <div class="" id="body">
                        <OutDepApplyTable :depId='depId' :status="status" @printArr="getPrintArr"/>
                    </div>


            <!--<div id="printRecord" style="height：900px;page-break-after:always"></div>-->
            <div id="printRecord" style="position: relative;">
                <div class="goods first-col" id="left" style="width:50%;float: left; background: red"></div>
                <div class="goods second-col" id="right" style="width:50%;float: right;background: gold"></div>

            </div>
                <!--</div>-->


        </div>


    </div>


</template>

<script>
    import api from '@/api/background/line'
    import apia from '@/api/out/orderApplication'
    import OutDepApplyTable from '@/components/Out/OrderApplication/OutDepApplyTable'


    export default {
        name: "NewOrderPanel",
        props: ['depId', 'depName'],
        components: {
            OutDepApplyTable,
        },
        data() {
            return {
                page: 1,
                limit: 10,

                storeArr: [],
                applyArr: [],
                printArr: [],
                status: 0


            }
        },
        watch: {
            depId: function (newVal, oldVal) {

                this.getStoresWithStauts(newVal);
            },

        },
        mounted() {
            this.getStoresWithStauts(this.depId);

            //chormes 浏览器不起作用！
            window.onbeforeprint = function () {
                console.log("hahahh")
            }
            window.addEventListener("afterprint", function (event) {
                console.log("event after!!!!!")
            });


        },

        methods: {
            getPrintArr: function(data) {
              this.printArr = data;

            },


            PrintRow(index, row) {
                // this.$print(this.$refs.print, ) // 使用

                var header = `<h2 class="header" style="text-align: center;">出库拣货单</h2>`


                var applysArr = this.printArr;

                var bbb = function () {

                    for (var i = 0; i < applysArr.length; i++) {

                        var leftHeight = $('#left').height()
                        console.log($('#right').height())

                        console.log("<<<<----------------->>>>>>")

                        if(leftHeight > 400) {
                            var rightGoods = `<div class="goods-applys"></div>`
                            $('#right').append(rightGoods);


                            var goodsName = applysArr[i]['goodsName'];
                            var applyStandardName = applysArr[i]['applyStandardName'];
                            var h3 = `<h3>` + goodsName + `</h3>`

                            $('.goods-applys:eq('+i+')').append(h3);
                            var ul = `<ul class="goods-applys-ul"></ul>`
                            $('.goods-applys:eq('+i+')').append(ul);

                            var applys = applysArr[i]['applys'];

                            for (var j = 0; j < applys.length; j++) {
                                var rightHeight = $('#right').height()
                                if(rightHeight > 200) {
                                    console.log(rightHeight);
                                    console.log("kaishi添加left")
                                    var leftGoods = `<div class="goods-applys"></div>`
                                    $('#left').append(leftGoods);

                                    var goodsName = applysArr[i]['goodsName'];
                                    var applyStandardName = applysArr[i]['applyStandardName'];
                                    var h3 = `<h3>` + goodsName + `</h3>`

                                    $('.goods-applys:eq('+i+')').append(h3);
                                    var ul = `<ul class="goods-applys-ul"></ul>`
                                    $('.goods-applys:eq('+i+')').append(ul);


                                    var applys = applysArr[i]['applys'];

                                    for (var j = 0; j < applys.length; j++) {
                                        var printLabel = applys[j]['storeEntity']['printLabel'];
                                        var applyNumber = applys[j]['applyNumber'];
                                        var oneApply = `<li class="one-goods-apply">` + printLabel + applyNumber + applyStandardName + `</li>`

                                        $('.goods-applys-ul:eq('+i+')').append(oneApply);

                                        $('.one-goods-apply').css({
                                            "color": "red",
                                            "line-height": "45px",
                                            "border-bottom": "1px solid #eee",
                                            "background": "gray",
                                            "width": "50%",
                                            "position": "float",
                                        })

                                    }

                                }else {
                                    var printLabel = applys[j]['storeEntity']['printLabel'];
                                    var applyNumber = applys[j]['applyNumber'];
                                    var oneApply = `<li class="one-goods-apply">` + printLabel + applyNumber + applyStandardName + `</li>`

                                    $('.goods-applys-ul:eq('+i+')').append(oneApply);

                                    $('.one-goods-apply').css({
                                        "color": "red",
                                        "line-height": "45px",
                                        "border-bottom": "1px solid #eee",
                                        "background": "gray",
                                        "width": "50%",
                                        "position": "float",
                                    })
                                }







                            }





                        } else {

                            var leftGoods = `<div class="goods-applys"></div>`
                            $('#left').append(leftGoods);

                            var goodsName = applysArr[i]['goodsName'];
                            var applyStandardName = applysArr[i]['applyStandardName'];
                            var h3 = `<h3>` + goodsName + `</h3>`

                            $('.goods-applys:eq('+i+')').append(h3);
                            var ul = `<ul class="goods-applys-ul"></ul>`
                            $('.goods-applys:eq('+i+')').append(ul);


                            var applys = applysArr[i]['applys'];

                            for (var j = 0; j < applys.length; j++) {
                                var printLabel = applys[j]['storeEntity']['printLabel'];
                                var applyNumber = applys[j]['applyNumber'];
                                var oneApply = `<li class="one-goods-apply">` + printLabel + applyNumber + applyStandardName + `</li>`

                                $('.goods-applys-ul:eq('+i+')').append(oneApply);

                                $('.one-goods-apply').css({
                                    "color": "red",
                                    "line-height": "45px",
                                    "border-bottom": "1px solid #eee",
                                    "background": "gray",
                                    "width": "50%",
                                    "position": "float",
                                })

                                // printHtml = printHtml + "<div id='page1' style='height：300px;page-break-after:always'></div>"

                            }
                        }






                    }


                };


                $("#printRecord").print({
                        globalStyles: true,//是否包含父文档的样式，默认为true
                        mediaPrint: false,//是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
                        stylesheet: null,//外部样式表的URL地址，默认为null

                        noPrintSelector: ".no-print",//不想打印的元素的jQuery选择器，默认为".no-print"
                        iframe: true,//是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
                        append: bbb(),//将内容添加到打印内容的后面
                        prepend: header,//将内容添加到打印内容的前面，可以用来作为要打印内容
                        deferred: $.Deferred().done(function () {
                            console.log('Printing done', arguments);

                            // $('#one-goods').remove();
                        })
                    }
                );


            },

            //获取申请店铺列表
            getStoresWithStauts: function (depId) {
                console.log("guailema???")
                var status = 0;
                var data = "status=" + status + "&depId=" + depId;
                apia.outDepQueryStores(data).then(res => {

                    if (res) {
                        this.storeArr = res.data
                    }

                    $("input[type='checkbox']").prop("checked", true);
                })

            },

        },


        // getLineData: function () {
        //     var data = "page=" + this.page + "&limit=" + this.limit;
        //     api.getLineList(data).then(res => {
        //         console.log(res);
        //
        //         this.lineArr = res.page.list;
        //         $("input[type='checkbox']").prop("checked", true);
        //
        //     });
        // },
        // initStore: function () {
        //     $("input[type='checkbox']").prop("checked", true);
        // }

        // liLineHover: function () {
        //
        //     $('#body').on('mouseover', '.li-line', function () {
        //         $(this).addClass('hover').siblings().removeClass('hover')
        //     })
        //
        //
        // },

    }


</script>


<style scoped>

    .print_header{
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
