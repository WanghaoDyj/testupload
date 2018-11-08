let storeListNup = 111;

const storeList = {
    namespaced:true,
    state:{
        storeList:storeListNup
    },
    mutations:{
        upLoadNum(state,msg){
            state.storeList = msg;
        }
    },
    actions:{
        changeNum({commit},msg){
            commit('upLoadNum',msg)
        }
    }
}

export default storeList;