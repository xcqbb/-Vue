export default {
    // 存储数据的封装
    set(key,val) {
        localStorage.setItem(key,JSON.stringify(val));
    },
    // 获取数据的封装
    get(key) {
        let val = loclaStorage.getItem(key);
        try {   // 因为解析的变量不是以json格式存储的字符串那么会报错，所以我们用try抛出 这样不会影响程序的正常执行
            val = JSON.parse(val);
        }finally {
            return val
        }
    },
    // 清除数据的封装
    clear(){
        localstorage.clear();
    }
}