// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkValue: "",
    linkString: "",
    linkStatus: false,
    video_link: ""
  },

  get_video_arr: function () {
    return ["douyin"];
  },
  linkInput: function (e) {
    this.setData({
      linkValue: e.detail.value
    });
  },
  pasteHandle: function (data) {
    wx.getClipboardData({
      success: (res) => {
        this.setData({
          linkValue: res.data
        });
        let start_time = Date.now();
        wx.showLoading({
          title: 'aaaaaaaaa',
        });
        setTimeout(()=>{
          wx.hideLoading({
            success: (res) => {
              console.log(res);
              wx.showToast({
                title: '加载失败',
              })
              console.log("消耗时间", Date.now() - start_time);
            },
          })
        },30000);
        // wx.showToast({
        //   title: 'loading',
        //   icon:"loading",
        //   duration:20000,
        //   mask:true
        // });
        // this.decodeLinkValue();
      },
    })
  },
  getLinkValue: function () {
    if (this.data.linkValue === "") {
      wx.showToast({
        title: '分享链接不能为空',
        icon: 'error',
        duration: 2000
      });
    }
    return this.data.linkValue.trim();
  },
  getVideoLink: function () {
    let video_str = this.getLinkValue();
    let video_info = video_str.match(/[a-zA-z]+:\/\/[^\s]*/);
    if (video_info) {
      console.log(video_info[0]);
      // this.setData({
      //   video_link:video_info[0]
      // });
      let share_url = video_info[0];
      if (share_url.search("douyin")) {
        this.getDyVideoInfo(share_url);
      }

    } else {
      wx.showToast({
        title: "分享链接不正确",
        icon: 'error',
        duration: 2000
      });
    }
  },
  getDyVideoInfo: function (url) {
    wx.request({
      url,
      method: "GET",
      success: function (res) {
        console.log(res.data);
        // let parser = new DOMParser();
        // let dy_html = parser.parseFromString(res.data,"text/xml");
        // let res_d = document.evaluate("//script[@id='RENDER_DATA']/text()",dy_html,null,XPathResult.ANY_TYPE);
        // console.log(res_d);
        let info_arr = res.data.match(/<script id="RENDER_DATA" type="application\/json">(.*)<\/script>/);
        // let info_arr = res.data.match(/谢谢谢谢谢谢/);
        if (info_arr != null && info_arr.length >= 2) {
          // 正常获取
          console.log(info_arr[1]);
        } else {
          // 获取失败
          console.log("eeeeeeeeee");
        }
        console.log(info_arr)
      }
    });
  },
  decodeLinkValue: function () {
    let video_link_arr = this.get_video_arr();
    video_link_arr.forEach(video_link => {
      if (this.getLinkValue().indexOf(video_link) != -1) {
        this.setData({
          linkStatus: true
        });
        this.getVideoLink();
      } else {
        wx.showToast({
          title: "链接暂不支持",
          icon: 'error',
          duration: 2000
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // wx.getClipboardData({
    //   success: (res) => {
    //       console.log(res);
    //   },
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})