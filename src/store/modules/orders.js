
const orders = {
    namespaced: true,
    types: {


    },

    state: {
        orders_depId: "99",
        applyType: "",
        in_storeId:"",


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
        }




    }
}

export default orders
