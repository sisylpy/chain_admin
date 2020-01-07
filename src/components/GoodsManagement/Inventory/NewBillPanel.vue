<template>

    <div class="my_panel">

            <!-- Default panel contents -->
                <div class="row flex-row">
                    <div class="form-group col-md-2">
                        <label>入库日期:</label>
                        <div> {{new Date().toLocaleDateString()}}</div>
                    </div>
                    <div class="form-group col-md-2">
                        <label>总金额:</label>
                        <div id="inTotal">0.0元</div>
                    </div>

                    <div class="form-group col-md-3">
                        <label>选择部门</label>
                        <select class="form-control select2" data-placeholder="选择部门"
                                style="width: 100%;" ref="selectDep">
                            <option></option>
                            <option v-for="(item) in depArr" :value="item.depId">{{item.depName}}</option>
                        </select>
                    </div>

                    <div class="form-group col-md-3">
                        <label>选择供货商</label>
                        <select class="form-control select2" data-placeholder="选择供货商"
                                style="width: 100%;" ref="select">
                            <option></option>
                            <option v-for="(item) in supArr" :value="item.supplierId">{{item.supplierName}}</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger" @click="saveGoods">
                            保存
                        </button>
                    </div>


                </div>


            <div class="no-padding">
                <div class="table-responsive no-padding">

                    <div class="table-header row no-padding" id="header">
                        <ul style="height: 100%; ">
                            <li class="table-header-content col-md-2">商品名称</li>
                            <li class="table-header-content col-md-2">入库数量</li>
                            <li class="table-header-content col-md-2">退货数量</li>
                            <li class="table-header-content col-md-2">采购价格</li>
                            <li class="table-header-content col-md-2">小计(元)</li>
                            <li class="table-header-content col-md-2">删除</li>
                        </ul>
                    </div>

                    <div class="table-body" id="body">

                        <!--商品表部分-->
                        <ul></ul>

                    </div>
                </div>
            </div>


    </div>


</template>

<script>
    import api from '../../../api/goodsManagement/inventory'
    import apisu from '@/api/supplier/supplier'
    import apid from '@/api/background/ckDep'


    export default {
        name: "NewBillPanel",

        mounted() {

            this.getAll();
            this.getOutDep();

            var indexGoods = 6;

            //初始化5条输入商品
            this.initFiveGoods();

            //给商品输入框初始化输入事件和选择搜索页面事件
            $('#body').on('keyup', '.goodsName', function (e) {


                console.log("heihei")
                console.log(e.currentTarget.id)
                //获取当前输入框
                var input = $('#' + e.currentTarget.id)

                //如果不是"回车，向下"2个按键
                if (e.keyCode !== 40 && e.keyCode !== 13) {



                    //1.1 删除原来查询结果
                    $('#search_result').remove();

                    //1.2 获取输入内容
                    var value = e.currentTarget.value;
                    console.log(value)

                    //1.3 接口返回商品
                    var reg = /^[a-zA-Z]+$/;

                    if (value.length === 0) {
                        $('#search_result').remove();

                    }

                    if (value.length > 0 && reg.test(value)) {


                        //1.3 接口返回商品
                        api.queryGoodsWithPinyin(value).then(res => {
                            console.log(res)
                            if (res) {

                                //1.0 获取商品数组
                                this.queryArr = res.data;

                                //1.1 删除原来查询结果
                                $('#query_result li').remove();

                                //1.3.1 获取当前光标位置
                                var top = input.offset().top;
                                var left = input.offset().left;
                                var width = input.width();
                                var height = input.height();

                                //1.3.2 添加绝对定位的div
                                var newdiv = ` <div class="search_result with-border" style="background: #fff; border: 1px solid #ddd" id="search_result">
                                <ul id="query_result" style="    padding-inline-start: 0;
">
                                </ul>
                            </div>`

                                //1.3.3 添加搜索页面到根元素#app
                                $('#app').append(newdiv);

                                //1.3.4 计算搜索页面到定位
                                var $search_result = $('#search_result');
                                $($search_result).width(width + 6);
                                $($search_result).css({position: "absolute"})
                                $($search_result).css("left", left);
                                $($search_result).css("top", top + height + 10);

                                //1.3.5 获取新搜索页面
                                var $query_result = $('#query_result');

                                //1.3.6 添加li到新搜索页面
                                for (var i = 0; i < this.queryArr.length; i++) {
                                    var goods = this.queryArr[i];
                                    if (i === 0) {
                                        //添加attr sel="select"
                                        $($query_result).append(`<li sel="select" class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px" id=` + goods.goodsId + ` standard=` + goods.purStandardName + `>` + goods.goodsName + `</li>`)
                                    } else {
                                        $($query_result).append(`<li class="query-item" style="list-style: none; line-height: 30px; padding-left: 5px; " id=` + goods.goodsId + ` standard=` + goods.standardName + `>` + goods.goodsName + `</li>`)
                                    }
                                }


                                //1.3.7 给第一条数据添加背景色
                                var item = $('.query-item')[0];
                                $(item).css('background', '#ddd');


                                // 2，点击搜索结果的商品
                                $('.query-item').on('click', function (e) {

                                    var goodsName = $(this).text();
                                    var goodsId = $(this).attr('id');
                                    var standardName = $(this).attr('standard')

                                    //选择点击商品到行内
                                    selectGoods(goodsName, goodsId, standardName);

                                });
                            }
                        })
                    }else {
                        this.warn = "请输入商品的名称的拼音"

                    }
                }
                //如果点击enter或者向下键
                else {
                    // 如果是向下键
                    if (e.keyCode == 40) {

                        //移除第一个商品到背景色
                        var sel = $('[sel="select"]');
                        $(sel).css('background', 'none').removeAttr('sel');

                        //如果背景色是最后一个商品，则从第一个商品开始
                        var selIndex = $(sel).index();
                        var xxx = $('#query_result').children("li").length - 1;


                        if (selIndex === xxx) {
                            $('#query_result').children(":first").attr('sel', 'select').css('background', '#ddd')
                        } else {
                            $(sel).next().css('background', '#ddd').attr('sel', 'select');
                        }
                    }
                    if (e.keyCode == 13) {

                        //如果点击enter键
                        var selEle = $('[sel="select"]');

                        var goodsName = $(selEle).text();
                        var goodsId = $(selEle).attr('id');
                        var standardName = $(selEle).attr('standard')

                        //选择商品到行
                        selectGoods(goodsName, goodsId, standardName);
                    }
                }

                //提取选择商品公共方法
                function selectGoods(goodsName, goodsId, standardName) {


                    if (goodsId) {
                        $(input).val(goodsName);
                        $(input).parent().siblings().children('.quantity').focus();
                        // $(input).parent().siblings().children('.standard').val(standardName)
                        console.log("hahahhahhah")
                        console.log($(input).parent().next().children('.standard'))
                        $(input).parent().next().children('.standard').html(standardName)

                        $(input).attr('goodsid', goodsId)
                    }else{
                        console.log($(input))
                        $(input).val("");
                    }
                    $('#search_result').remove();
                }
            })

            $('#body').on('keyup', '.quantity', function (e) {
                console.log(e.keyCode)

                //获取当前输入框
                var input = $('#' + e.currentTarget.id);
                var val = $(input).val();

                var goodsId = $(input).parent().prev().children('.goodsName').attr('goodsid');
                console.log()
                if (goodsId && val) {
                    var goodsName = $(input).parent().prev().children('.goodsName').val();

                    if (e.keyCode == 13 && goodsName.length > 0) {
                        $(input).parent().siblings().children('.price').focus();
                    }
                }




            })

            $('#body').on('keyup', '.price', function (e) {
                console.log(e.keyCode)
                //获取当前输入框
                var input = $('#' + e.currentTarget.id)
                var val = $(input).val();

                if (e.keyCode == 13 && val) {
                    $(input).parent().parent().parent().next().children().children().children('.goodsName').focus();
                    var inQuantity = $(input).parent().siblings('.item_quantity').children('.quantity').val();
                    var price = $(input).val();
                    $(input).parent().next('.subTotal').html((inQuantity * price).toFixed(1));

                   var allSub =  $('.subTotal');
                   console.log(allSub)
                   var total = "";

                   for(var i = 0; i< allSub.length; i++) {
                       console.log($(allSub).eq(i))

                       var sub =  $(allSub).eq(i).html();
                      if(sub){
                          total = Number(total) + Number(sub);
                      }

                   }
                   total =  total.toFixed(1);

                    console.log($('#inTotal'))
                   $('#inTotal').html(total + "元");
                }

            });



            $('#body').on('focus', '.goodsName', function (e      ) {
                var body = $('#body ul');

                if ($(this).hasClass('is-last')) {
                    $(this).removeClass('is-last')

                    var goods = ` <li>
                                <div class="row no-padding">
                                    <div class="body-item col-md-2">
                                        <input class="goodsName is-last"  style="width: 100%;"  id= ` + indexGoods + `_goodsName />
                                    </div>
                                    <div class="body-item col-md-2 item_quantity">
                                        <input  class="quantity"  type="number" style="width: 80%" id= ` + indexGoods + `_quantiry />
                                         <text class="standard" style="width: 10%;"></text>
                                    </div>
                                   <div class="body-item col-md-2">
                                        <input class="outQuantity" type="number" style="width: 100%; color: red;" />
                                    </div>
                                   <div class="body-item col-md-2">
                                        <input class="price" type="number" style="width: 100%"  id=` + indexGoods + `_price />
                                    </div>

                                      <div class="body-item col-md-2 subTotal">

                                    </div>

                                    <div class="body-item col-md-2">
                                        <button style="width: 50%;" class="btn btn-sm btn-default" id="delete">X</button>
                                    </div>

                                </div>
                            </li>`
                    $(body).append(goods);

                }
                indexGoods = indexGoods + 1;

            })

            $('#body').on('click', '#delete', function (e) {
                console.log($(this).parent().parent().parent('li'))
                $(this).parent().parent().parent('li').remove();

            })



        },

        components: {},

        data() {
            return {
                inputVal: "",
                inputIndex: '1',
                queryArr: [],
                bill: {},
                subBillArr: [],
                goodsTotal: 5,
                supArr: [],
                depType: '1',
                depArr: []
            }
        },
        methods: {
            getOutDep:function(){
              apid.getOutDepList(this.depType).then(res => {
                  console.log(res)
                  if(res) {
                      this.depArr = res.data;
                  }

              })
            },


            initFiveGoods: function () {
                var body = $('#body ul');
                for (var i = 0; i < 5; i++) {
                    var indexGoods = i + 1;
                    var goods = ` <li>
                                <div class="row no-padding">
                                    <div class="body-item col-md-2">
                                        <input class="goodsName"  style="width: 100%;"  id= ` + indexGoods + `_goodsName />
                                    </div>
                                    <div class="body-item col-md-2 item_quantity">
                                        <input  class="quantity"  type="number" style="width: 80%" id= ` + indexGoods + `_quantiry />
                                         <text class="standard" style="width: 10%;"></text>
                                    </div>
                                   <div class="body-item col-md-2">
                                        <input class="outQuantity" type="number" style="width: 100%; color: red;" />
                                    </div>
                                   <div class="body-item col-md-2">
                                        <input class="price" type="number" style="width: 100%" id=` + indexGoods + `_price />
                                    </div>

                                      <div class="body-item col-md-2 subTotal">

                                    </div>

                                    <div class="body-item col-md-2">
                                        <button style="width: 50%;" class="btn btn-sm btn-default" id="delete">X</button>
                                    </div>

                                </div>
                            </li>`
                    $(body).append(goods);
                }
                $(body).children().children(':last').children(':first').children('.goodsName').addClass('is-last')

            },


            next: function () {
                console.log("yeah")
                var inputting = $('.inputting')[0];
                console.log($(inputting).parent().parent().parent().next())
                $(inputting).parent().parent().parent().next().children().find('.goodsName').focus();

            },
            myEnter: function (e) {
                console.log(e)
                console.log("myEnter")
            },
            saveGoods: function (e) {
                var liCount = $('#body').children().children().length;
                var $ul = $('#body').children().children()
                var subBills = [];
                let optionV = this.$refs.select.value;
                let optinvD = this.$refs.selectDep.value;
                console.log(optionV)


                for (var i = 0; i < liCount; i++) {
                    var li = $($ul).children().eq(i);
                    var goodsName = $(li).find('.goodsName').val();
                    var goodsId = $(li).find('.goodsName').attr('goodsid');
                    var goodsQuantity = $(li).find('.quantity').val();
                    var unitPrice = $(li).find('.price').val();
                    var subTotal = $(li).find('.subTotal').html();
                    var billSum = $('#inTotal').html();

                    billSum = billSum.substring(0, billSum.lastIndexOf('元'));


                    if (goodsName.length > 0 && goodsQuantity.length > 0) {
                        var subbill = {
                            sGoodsId: goodsId,
                            inQuantity: goodsQuantity,
                            unitPrice: unitPrice,
                            inSubTotal: subTotal
                        }
                        subBills.push(subbill)
                    }
                }


                if(subBills.length > 0 && optionV && optinvD && billSum) {

                    this.subBillArr = subBills;
                    this.bill = {
                        inSupplierId: optionV,
                        subBillEntities: subBills,
                        inDepId: optinvD,
                        billSum: billSum

                    }
                    this.bus.$emit('loading', true);
                    api.saveInBill(this.bill).then(res => {
                        if (res.code == 0) {
                            this.bus.$emit('loading', true);
                            window.location.reload();
                        }else {
                            this.bus.$emit('loading', true);
                        }
                    })
                }



            },

            getAll: function () {
                apisu.getAll()
                    .then(res => {
                        if (res) {
                            this.supArr = res.data
                        }
                    })
            }

        }


    }

</script>


<style scoped>
    /*.content{*/
    /*background: #fff;*/
    /*}*/

    .panel-title {
        height: 40px;
    }

    .panel-heading {
        background: #fff;
    }

    .margin-left {
        margin-left: 50px;
    }

    /*表格部分*/

    .box-body {
        /*background: grey;*/
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .table-header {
        width: 100%;
        height: 100%;
        /*background: red;*/
    }

    .table-header ul {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #ddd;
    }

    .table-header li {
        line-height: 40px;
        display: inline-block;
    }

    .table-body {
        min-height: 200px;
    }

    .table-body input {
        height: 30px;
    }

    #header > ul:after {
        content: "";
        display: block;
        clear: both;
    }

    #body > ul:after {
        content: "";
        display: block;
        clear: both;
    }

    #body ul li {
        display: block;
        border-bottom: 1px solid #ddd;
        padding-top: 8px;
        padding-bottom: 8px;

    }


</style>
