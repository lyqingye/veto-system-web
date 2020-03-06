import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/doLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/web/member/getLoginUserInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
