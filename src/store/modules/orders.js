
const orders = {
    namespaced: true,
    types: {


    },

    state: {
        orders_depId: "",
        applyType: "",
        in_storeId:"",
        in_storeName: "",
        sideBar: "guai",


    },
    mutations: {
        SET_ORDERSDEPID: (state, data) => {
            state.orders_depId = data
        },
        SET_APPLYTYPE: (state, data) => {
            state.applyType = data;
        },
        SET_INSTOREID: (state, data) => {
            state.in_storeId = data;
        },
        SET_INSTORENAME: (state, data) => {
            state.in_storeName = data;
        },
        SET_SIDEBAR: (state, data) => {
            state.sideBar = data;
        },


    },
    actions: {
        set_ORDERSDEPID(context, data) {
            console.log(data);

            context.commit('SET_ORDERSDEPID', data)
        },
        set_APPLYTYPE (context, data) {
            context.commit('SET_APPLYTYPE', data);
        },
        set_INSTOREID (context, data) {
            context.commit('SET_INSTOREID', data)
        },
        set_INSTORENAME (context, data) {
            context.commit('SET_INSTORENAME', data)
        },
        set_SIDEBAR (context, data) {
            context.commit('SET_SIDEBAR', data)
        }




    }
}

export default orders
