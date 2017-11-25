const domain = "http://vue.studyit.io/api";

// 导出 默认值
export default {
    // 轮播图接口
    getLunbo: `${domain}/getlunbo`,
    // 新闻接口
    getNL:`${domain}/getnewslist`,  // 新闻列表接口
    getND:`${domain}/getnew/`,   //  需要添加 id  新闻详情页接口
    // 图片接口
    photoC: `${domain}/getimgcategory`,  // 获取图片分类
    photoL: `${domain}/getimages/`,    // 获取图片列表 需要id
    photoD: `${domain}/getimageinfo/`,  //  图片列表的详情页接口 需要id
    photoT: `${domain}/getthumimages/`  //  详情页的缩略图接口 需要id
}