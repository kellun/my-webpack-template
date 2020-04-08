import request from './request'
import qs from 'qs'
//添加批注
export function AddNote (data) {
    return request({
      url: '/index/AddNote',
      method: 'post',
      data: qs.stringify(data)
    })
  }