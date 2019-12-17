
const store = {
    namespaced: true,
    types: {


    },

    state: {
        storeId: "",
        storeName: "",
        storeType: "",



    },
    mutations: {
        SET_STOREID: () => {
          state.storeId = data ;
        },
        SET_STORENAME: () => {
            state.storeName = data ;
        },
        SET_STORETYPE: (state, data) => {
            state.storeType = data;
        },



    },
    actions: {
        set_STOREID: () => {
            context.commit('SET_STOREID', data);
        },
        set_STORENAME: () => {
            context.commit('SET_STORENAME', data);
        },
        set_STORETYPE (context, data) {
            context.commit('SET_STORETYPE', data);
        }




    }
}

export default store
