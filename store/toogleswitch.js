export const state = () => ({
    checked: false
})

export const getters = {
    getChecked (state) {
        return state.checked
    }
}

export const mutations = {
    change(state, toogleState) {
        state.checked = toogleState
      },
}
