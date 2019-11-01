<template>

    <div class="my_panel">



            <div class="">

                <div class="panel panel-default">
                    <!-- Default panel contents -->
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h4 class="pull-left">
                                221个商品
                            </h4>
                            <div class="pull-right">

                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        选择产品类别
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                        <li><a href="#">猪肉</a></li>
                                        <li><a href="#">肠</a></li>
                                        <li><a href="#"></a></li>
                                        <li role="separator" class="divider"></li>
                                        <li><a href="#">Separated link</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="panel-body no-padding">
                            <div class="box-footer no-padding">
                                <ul class="nav nav-pills nav-stacked">
                                    <li><a href="#">天丰利<span class="pull-right ">21种商品<i
                                            class="fa fa-angle-right"></i></span></a></li>
                                    <li><a href="#">鲜汇 <span class="pull-right ">21种商品<i
                                            class="fa fa-angle-right"></i></span></a></li>
                                    <li><a href="#">美林湾华联 <span class="pull-right ">21种商品<i
                                            class="fa fa-angle-right"></i></span></a></li>
                                </ul>
                            </div>
                    </div>

                </div>

            </div>






    </div>




</template>

<script>


    export default {
        name: "OutGoodsPanel",
        mounted() {

        }, components: {
        },
        methods: {},
        data() {
            return {
                title: "出货商品",
            }
        }


    }

</script>

<style scoped>
    /*.content{*/
    /*background: #fff;*/
    /*}*/
    .padding {
        padding: 20px 5px;
    }

    .panel-title {
        height: 40px;
    }


</style>
