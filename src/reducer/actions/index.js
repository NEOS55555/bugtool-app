// import $const from '@/constant'

import {
  UPDATE_COM_DATA,
  UPDATE_DOWNLOAD_MANGA_DATA,
  UPDATE_MGB_DATA,
} from '@/constant'

// console.log(UPDATE_COM_DATA, menuList)
export const updateComData = (data) => ({ type: UPDATE_COM_DATA, data })
// export const updateMangabzData = data => ({ type: UPDATE_MANGABZ_DATA, data })
// export const updateBook5xData = data => ({ type: UPDATE_BOOK5X_DATA, data })
export const updateMGBData = (data) => ({ type: UPDATE_MGB_DATA, data })

// export const updateDownloadData = data => ({ type: UPDATE_DOWNLOAD_DATA, data })
export const updateDownloadMangaData = (data) => ({
  type: UPDATE_DOWNLOAD_MANGA_DATA,
  data,
})
// export const updateDownloadBookData = data => ({ type: UPDATE_DOWNLOAD_BOOK_DATA, data })
