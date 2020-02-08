// pages/doubian/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'coming_soon',
    page: 0,
    size: 20,
    total: 1,
    movies: []
  },
  loadMorePage() {
    if (this.data.page > this.data.total) return
    this.data.page++
    this.retrieve()
  },
  retrieve() {
    let app = getApp()
    let start = (this.data.page - 1) * this.data.size
    wx.showLoading({
      title: '加载中',
    })
    return app.request(`https://api.douban.com/v2/movie/${this.data.type}?start=${start}&count=${this.data.size}&apikey=0df993c66c0c636e29ecbb5344252a4a `)
    .then(res => {
      if (res.subjects.length) {
        let movies = this.data.movies.concat(res.subjects)
        let total = Math.floor(res.total / this.data.size)
        this.setData({
          movies: movies,
          total: total,
          page: this.data.page 
          })
          wx.setNavigationBarTitle({
            title: res.title,
          })
        console.log(movies)
      }
    }).catch(err => {
      console.error(err)
    }).finally( () => {
      wx.hideLoading()
    })
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = options.type || this.data.type
    this.retrieve()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})