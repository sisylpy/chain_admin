<template>
    <div class="box-body row" id="body" style="">

        <div class="col-md-4" style="display: flex;flex-flow: column nowrap;" id="one">

            <div class="flex-row-applys" v-for="(item) in 9 "
                 style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;
                                            display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                <div class="body-item"
                     style=" color: gray; text-align: center; margin-right: 2%; background: grey; width: 5px; height: 5px; border-radius: 50%">
                </div>
                <div class="body-item" style="width: 40%; display: flex; ">
                    <input class="goodsName" :id='+ item + "_one_goodsName"'
                           placeholder=""
                           style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                </div>
                <div class="body-item"
                     style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                    <input type="number" class="quantity" :id='+ item + "_one_quantity"'
                           style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                    <a class="standard" style="color: gray;"></a>
                </div>
                <div class="body-item tools" style="width: 10%;">
                    <i class="fa fa-trash-o del"
                       style="width: 50%; display: none; color: red;"></i>
                </div>
            </div>
            <div class="flex-row-applys"
                 style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                <div class="body-item"
                     style="color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">
                    <!--20,-->
                </div>
                <div class="body-item" style="width: 40%; display: flex; ">
                    <input class="goodsName is-lastOne" id="10_one_goodsName"
                           placeholder=""
                           style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                </div>
                <div class="body-item"
                     style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                    <input type="number" class="quantity" id="10_one_quantity"
                           placeholder=""
                           style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                    <a class="standard" style="color: gray;"></a>
                </div>
                <div class="body-item tools" style="width: 10%;">
                    <i class="fa fa-trash-o del"
                       style="width: 50%; display: none; color: red;"></i>
                </div>
            </div>
        </div>

        <div class="col-md-4" style="display: flex;flex-flow: column nowrap;" id="two">

            <div class="flex-row-applys" v-for="(item) in 9 "
                 style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;
                                            display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                <div class="body-item"
                     style=" color: gray; text-align: center; margin-right: 2%; background: grey; width: 5px; height: 5px; border-radius: 50%">
                </div>
                <div class="body-item" style="width: 40%; display: flex; ">
                    <input class="goodsName" :id='+ item + "_two_goodsName"'
                           placeholder=""
                           style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                </div>
                <div class="body-item"
                     style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                    <input type="number" class="quantity" :id='+ item + "_two_quantity"'
                           style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                    <a class="standard" style="color: gray;"></a>
                </div>
                <div class="body-item tools" style="width: 10%;">
                    <i class="fa fa-trash-o del"
                       style="width: 50%; display: none; color: red;"></i>
                </div>
            </div>
            <div class="flex-row-applys"
                 style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                <div class="body-item"
                     style="color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">
                    <!--20,-->
                </div>
                <div class="body-item" style="width: 40%; display: flex; ">
                    <input class="goodsName is-lastOne" id="10_two_goodsName"
                           placeholder=""
                           style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                </div>
                <div class="body-item"
                     style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                    <input type="number" class="quantity" id="10_two_quantity"
                           placeholder=""
                           style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                    <a class="standard" style="color: gray;"></a>
                </div>
                <div class="body-item tools" style="width: 10%;">
                    <i class="fa fa-trash-o del"
                       style="width: 50%; display: none; color: red;"></i>
                </div>
            </div>
        </div>

        <div class="col-md-4" style="display: flex;flex-flow: column nowrap; display: none;"
             id="three">

            <div class="flex-row-applys" v-for="(item) in 9 "
                 style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;
                                            display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                <div class="body-item"
                     style=" color: gray; text-align: center; margin-right: 2%; background: grey; width: 5px; height: 5px; border-radius: 50%">
                </div>
                <div class="body-item" style="width: 40%; display: flex; ">
                    <input class="goodsName" :id='+ item + "_three_goodsName"'
                           placeholder=""
                           style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                </div>
                <div class="body-item"
                     style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                    <input type="number" class="quantity" :id='+ item + "_three_quantity"'
                           style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                    <a class="standard" style="color: gray;"></a>
                </div>
                <div class="body-item tools" style="width: 10%;">
                    <i class="fa fa-trash-o del"
                       style="width: 50%; display: none; color: red;"></i>
                </div>
            </div>
            <div class="flex-row-applys"
                 style="padding-top: 5px; padding-bottom: 5px; position: relative;float: left; font-size: 14px;display: flex;flex-flow: row wrap;justify-content: flex-start;align-items: center;">
                <div class="body-item"
                     style="color: gray; text-align: center; margin-right: 2%;background: grey; width: 5px; height: 5px; border-radius: 50%">
                    <!--20,-->
                </div>
                <div class="body-item" style="width: 40%; display: flex; ">
                    <input class="goodsName is-lastOne" id="10_three_goodsName"
                           placeholder=""
                           style="width: 95%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                </div>
                <div class="body-item"
                     style="width: 40%; display: flex; flex-flow: row nowrap; align-items: center;">
                    <input type="number" class="quantity" id="10_three_quantity"
                           placeholder=""
                           style="width: 70%; padding: 5px; border: none; border-bottom: 1px solid lightgray;"/>
                    <a class="standard" style="color: gray;"></a>
                </div>
                <div class="body-item tools" style="width: 10%;">
                    <i class="fa fa-trash-o del"
                       style="width: 50%; display: none; color: red;"></i>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "EmptyOrder"
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
