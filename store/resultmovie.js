export const state = () => ({
    data: [],
    inProgress: false
  })


  export const mutations = {
    fillData(state, data) {
        state.data = data
    },

    changeProgress(state, status) {
      state.inProgress= status
      
    },
    emptyData (state) {
      state.data = []
    }
    

}

export const actions = {
    async makeRequest({commit},searchObj,) {
      // console.log(searchObj)
      await this.$axios.get('/search?', {
            params: {
                'media': 'movie',
                'artist': searchObj['artist'],
                'song': searchObj['song'],
            }
            })
            .then((res) => {
              if (res.status === 200) {
                // console.log(res.data)  
                commit('fillData', res.data)
                commit('changeProgress', false)
              }
            })
            .catch(e => {
                console.log(e)
            })
    }
}