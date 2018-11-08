let durationTime = 0;
const duration = {
    namespaced:true,
    state:{
        duration:durationTime
    },
    mutations:{
        updataTime(state,msg){
            state.duration = msg;
        }
    },
    actions:{
        changeTime({commit},msg){
            commit('updataTime',msg)
        }
    }
}

export default duration;