import dataStore from '@/util/plus/store'

export function setPageIndex({ bigType, showType, id }, title) {
  dataStore.setData(['readcord', bigType, showType, id, 'title'], title)
}
export function getPageIndex({ bigType, showType, id }) {
  return dataStore.getData(['readcord', bigType, showType, id, 'title'])
}
export function setMangaIndex({ bigType, showType, id }, mgIndex) {
  dataStore.setData(['readcord', bigType, showType, id, 'mgIndex'], mgIndex)
}
export function getMangaIndex({ bigType, showType, id }) {
  return dataStore.getData(['readcord', bigType, showType, id, 'mgIndex'])
}
