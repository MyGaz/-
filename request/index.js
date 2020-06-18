let num=0;
export const request=(param)=>{
    num++,
    wx.showLoading({
        title: '加载中'
      })
    return new Promise((resolive,reject)=>{
        wx.request({
            ...param,
            url:param.url,
             success: (result) => {
                resolive(result);
             },
             fail: (err) => {
                reject(err);
             },
             complete(){
                 num--;
                 if (num===0) {
                    wx.hideLoading()
                 }
             }
         });
    })
      
}