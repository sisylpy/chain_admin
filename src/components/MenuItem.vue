    <template>

        <li class="mytreeview">
            <a v-if="item.type === 0" href="javascript:;">
                <i v-if="item.icon != null" :class="item.icon" class="fa fa-link"></i>
                <span>{{item.name}}</span>
                <span class="pull-right-container">
                   <i class="fa fa-angle-left pull-right"></i>
            </span>
            </a>

            <ul v-if="item.type === 0" class="treeview-menu">
                <menu-item :item="item" v-for="item in item.list" v-bind:key="item.id"
                           @click.native="goTo(''+item.url+'')"></menu-item>
            </ul>
            <a v-if="item.type === 1">
                <i v-if="item.icon != null" :class="item.icon"></i>
                <i v-else class="fa fa-circle-o"></i> {{item.name}}</a>
        </li>


    </template>

    <script>
        export default {
            name: "menuItem",
            props: {
                item: {}
            },
            methods: {
                changeIcon: function () {

                },
                goTo: function (path) {
                    this.$router.replace(path)


                }
            }

        }
    </script>

    <style>

    </style>
