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
      await this.$axios.get('/recent', {
        headers: {
          locale: this.$i18n.locale
        }
      })
            .then((res) => {
              if (res.status === 200) {
                // console.log(this.$i18n.locale)
                commit('add', res.data.results)
              }
            })
            .catch(e => {
                console.log(e)
            })
    }
}

