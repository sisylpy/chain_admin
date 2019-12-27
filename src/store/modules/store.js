
const store = {
    namespaced: true,
    types: {


    },

    state: {
        storeId: "",
        storeName: "",
        storeType: "",
        storeOutType: "",
        storeOrderType: ""



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
        SET_STOREOUTTYPE: (state, data) => {
            state.storeOutType = data;
        },
        SET_STOREORDERTYPE: (state, data) => {
            state.storeOrderType = data;
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
        },
        set_STOREOUTTYPE (context, data) {
            context.commit('SET_STOREOUTTYPE', data);
        },
        set_STOREORDERTYPE (context, data) {
            context.commit('SET_STOREORDERTYPE', data);
        }




    }
}

export default store
