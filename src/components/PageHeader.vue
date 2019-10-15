<template>
    <section class="content-header">

        <h1>{{navTitle}}</h1>
        <ol class="breadcrumb" id="nav_title">
            <li class="active"><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
            <li class="active">{{navTitle}}</li>
        </ol>

    </section>
</template>

<script>
    export default {
        name: "PageHeader",


        data(){
            return{
                navTitle : this.$store.state.pageHeader.navTitle

        }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
