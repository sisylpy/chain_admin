<template>

    <div>
        <PageHeader/>

        <div class="grid-btn">
            <a class="btn btn-default" @click="addLine">新增</a>
            <button type="button" class="btn btn-default" @click="">修改</button>
            <button type="button" class="btn btn-default" @click="">删除</button>
        </div>





        <!-- /.box-body -->

    </div>
</template>


<script>

    import PageHeader from '@/components/PageHeader.vue'
    import api from '@/api/background/lineMananger'

    export default {
        name: "CkLine",
        components: {
            PageHeader,
        },

        mounted() {


        },

        data() {
            return {
                page: 1,
                limit: 20,
                lineArr: [],
            }

        },

        methods: {

            getLineData: function () {
                var data = "page=" + this.page + "&limit=" + this.limit;
                api.getLineList(data).then(res => {
                    this.lineArr = res.page.list;
                });
            },

            /**
             *日期：2019/10/17
             *作者：lpy
             *状态：
             *功能：添加新路线
            */
            addLine: function () {
                console.log("why?");


                this.$router.push('/addLine')

            }

        },
    }

</script>


<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
