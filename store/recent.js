export const state = () => ({
    recentSearch: []
})

export const mutations = {
    add(state, data) {
        state.recentSearch = data
    }
}


export const actions = {
    async getRecentData({commit}) {
      await this.$axios.get('/recent')
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

