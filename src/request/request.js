import Vue from 'vue';
import {Toast} from 'vant';
import axios from 'axios';
//import { resolve } from 'core-js/fn/promise';
Vue.use(Toast);

//请求次数
let num = 0

const request = obj => {
    //动态键
    let type = obj.method == "post" ? "data" : "params"
    //次数加1
    num++;
    //公共的url
    const baseUrl = "http://www.kangliuyong.com:10002"
    return new Promise((reslove,reject) =>{
        //Toast.allowMultiple();
        //开启加载
        // const toast1 = Toast.loading({
        //     message:'加载中...',
        //     forbidClick:true,
        //     duration:0
        // });
        
        //发送请求
        axios({
            ...obj,
            url:baseUrl + obj.url,
            [type]:{
                ...obj[type],
                appkey:"U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
            }
        }).then(data =>{
            //console.log("请求方法",data);
            //判断是post还是get
            if(type == "params"){
                //成功
                reslove(data.data.result)
            }else if(type == "data"){
                reslove(data.data)
            }
            
            //次数减一
            num--
            //判断是否全部请求完毕
            if(num==0){
                //关闭加载提示
                // Toast.clear('loading')
                //toast1.clear();
            }
        }).catch(err =>{
            reject(err)
        })
    })
}
export default{
    request
}