<template>

    <div class="my_panel">

        <div class="panel panel-default">

            <OutStockingTable/>

        </div>
    </div>


</template>

<script>
    import OutStockingTable from '@/components/Out/OrderApplication/OutStockingTable'


    export default {
        name: "OutStockingPanel",
        components: {
            OutStockingTable,
        },



    }


</script>


<style scoped>


</style>
