export const state = () => ({
    resentSearch: []
})

// export const getters = {
//   resentList (state) {
//     return state.resentSearch
//   }

// }

export const mutations = {
    add(state, data) {
        state.resentSearch = data
    }
}


export const actions = {
    async getResentData({commit}) {
      await this.$axios.get('/resent')
            .then((res) => {
              if (res.status === 200) {
                commit('add', res.data.results)
              }
            })
            .catch(e => {
                console.log(e)
            })
    }
}

