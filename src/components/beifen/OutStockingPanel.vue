<template>

    <div class="my_panel">

        <div class="panel panel-default">

            <!-- Default panel contents -->
            <div class="panel-heading ">

                <div class="print_header row no-padding">
                    <div class="col-md-10" style="padding-left: 0; padding-right: 0">
                        <h4>录入数量：</h4>
                    </div>
                    <div class="col-md-2">
                        <button type="primary" class="btn-lg btn-primary" @click="save">保存</button>
                    </div>
                </div>

            </div>

            <div class="panel-body">
                <OutStockingTable ref="save"/>
            </div>


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
        methods: {

            save() {

                this.$refs.save.saveOutQutantity();

            }
        },


    }


</script>


<style scoped>


</style>
