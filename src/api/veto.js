import request from '@/utils/request'

export function createVetoForm(data) {
  return request({
    url: '/api/web/veto/create',
    method: 'post',
    data
  })
}

export function deleteVetoForm(vetoId) {
  return request({
    url: '/api/web/veto/delete/' + vetoId,
    method: 'delete'
  })
}

export function getEditVetoFormDetail(vetoId) {
  return request({
    url: '/api/web/veto/editDetail/' + vetoId,
    method: 'get'
  })
}

export function getVetoList(keyword) {
  return request({
    url: '/api/web/veto/list?keyword=' + keyword,
    method: 'get'
  })
}

export function pulishVetoForm(vetoId) {
  return request({
    url: '/api/web/veto/public/' + vetoId,
    method: 'put'
  })
}

export function getPublicVetoFormDetail(vetoId) {
  return request({
    url: '/api/web/veto/publicDetail/' + vetoId,
    method: 'get'
  })
}

export function saveVetoForm(data) {
  return request({
    url: '/api/web/veto/save',
    method: 'post',
    data
  })
}

export function veto(data) {
  return request({
    url: '/api/web/veto/veto',
    method: 'put',
    data
  })
}

export function getVetoFormStatistic(vetoFormId) {
  return request({
    url: '/api/web/veto/statistic/' + vetoFormId,
    method: 'get'
  })
}