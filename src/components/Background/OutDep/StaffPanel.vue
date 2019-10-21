<template>

    <div class="my_panel">




        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">
                <div class="panel-title">
                    <h4 class="pull-left">
                            {{title}}
                    </h4>


                    <!--<div class="pull-right">-->

                        <!--<div class="dropdown ">-->
                            <!--<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"-->
                                    <!--data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">-->
                                <!--选择时间-->
                                <!--<span class="caret"></span>-->
                            <!--</button>-->
                            <!--<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">-->
                                <!--<li><a href="#">按销售额排名</a></li>-->
                                <!--<li><a href="#">按出货数量排名</a></li>-->
                                <!--<li><a href="#"></a></li>-->
                                <!--<li role="separator" class="divider"></li>-->
                                <!--<li><a href="#">Separated link</a></li>-->
                            <!--</ul>-->
                        <!--</div>-->


                    <!--</div>-->


                </div>



            </div>



        <div class="panel-body no-padding">
            <div class="box-body table-responsive no-padding">

                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th style="width: 10px">#</th>
                        <th>姓名</th>
                        <th>用户名</th>
                        <th>昵称</th>
                        <th>创建日期</th>
                    </tr>

                    <tr>
                        <td>1.</td>
                        <td>李沛谊</td>
                        <td>sisy</td>
                        <td>沛沛</td>
                        <td>2019-10-11</td>
                    </tr>


                    </tbody>
                </table>

            </div>

        </div>

        </div>


    </div>




</template>

<script>


    export default {
        name: "StaffPannel",
        mounted() {

        }, components: {
        },
        methods: {},
        data() {
            return {
                title: "1位员工",
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
