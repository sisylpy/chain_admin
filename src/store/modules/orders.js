
const orders = {
    namespaced: true,
    types: {


    },

    state: {
        orders_depId: "99",
        applyType: "",

    },
    mutations: {
        SET_ORDERSDEPID: (state, data) => {
            state.orders_depId = data
        },
        SET_APPLYTYPE: (state, data) => {
            state.applyType = data;
        }


    },
    actions: {
        set_ORDERSDEPID(context, data) {
            console.log(data);

            context.commit('SET_ORDERSDEPID', data)
        },
        set_APPLYTYPE (context, data) {
            context.commit('SET_APPLYTYPE', data);
        }



    }
}

export default orders
