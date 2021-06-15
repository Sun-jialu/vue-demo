import { getPageListByParam, getDataById, updateData, addData } from "../../api/sam/teacher"

const state = {
    studentArr: [],//学生数据
}
const mutations = {
    //设置数据
    setTeacherArr(state, payload) {
        state.studentArr = payload
    }
}
const actions = {
    //获取分页数据
    async getPageListByParam1({ commit }, payload) {
        let res = await getPageListByParam(payload)
        commit("setTeacherArr", res.data.data)
    },
    async addData1({ commit }, payload) {
        let res = await addData(payload)
        // console.log(res)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
