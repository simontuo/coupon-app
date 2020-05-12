import Cookies from 'js-cookie'

const state = {
    amount: 28,
    classSize: 6,
    classAmount: 5,
    peopleCost: 0,
    monthlyCost: 0,
    fixedCost: 0,
    monthlyClassSize: 4
}

const mutations = {
    SET_AMOUNT(state, amount) {
        state.amount = amount;
        state.classAmount = Math.ceil(state.amount / state.classSize)
    },
    SET_CLASS_SIZE(state, size) {
        state.classSize = size;
        state.classAmount = Math.ceil(state.amount / state.classSize)
    },
    SET_MONTHLY_CLASS_SIZE(state, size) {
        state.monthlyClassSize = size;
    },
    SET_PROPLE_COST(state, totalAmount) {
        state.peopleCost = totalAmount
    },
    SET_MONTHLY_COST(state, totalAmount) {
        state.monthlyCost = totalAmount
    },
    SET_FIXED_COST(state, totalAmount) {
        state.fixedCost = totalAmount
    },
}

const actions = {
    setAmount({ commit }, { amount }) {
        commit("SET_AMOUNT", amount)
    },
    setClassSize({ commit }, { size }) {
        commit("SET_CLASS_SIZE", size)
    },
    setMonthlyClassSize({ commit }, { size }) {
        commit("SET_MONTHLY_CLASS_SIZE", size)
    },
    setPeopleCost({ commit }, { totalAmount }) {
        commit("SET_PROPLE_COST", totalAmount)
    },
    setMonthlyCost({ commit }, { totalAmount }) {
        commit("SET_MONTHLY_COST", totalAmount)
    },
    setFixedCost({ commit }, { totalAmount }) {
        commit("SET_FIXED_COST", totalAmount)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}