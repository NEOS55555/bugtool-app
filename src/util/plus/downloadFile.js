import apiAxios from '@/api'

export function getDownloadPath(path = '') {
  if (!window.plus.io) {
    return ''
  }
  return window.plus.io.convertLocalFileSystemURL('_downloads/' + path)
}

function dowloadfile(fileurl, dirpath) {
  console.log('fileurl', fileurl, dirpath)
  return new Promise((resolve, reject) => {
    var dtask = window.plus.downloader.createDownload(
      fileurl,
      {
        filename: dirpath,
      },
      function (d, status) {
        // 下载完成
        if (status == 200) {
          console.log(
            'Download success: ' +
              window.plus.io.convertLocalFileSystemURL(d.filename)
          )
        } else {
          console.log('Download failed: ' + status)
        }
        resolve()
      }
    )
    dtask.start()
    /* dtask.addEventListener('DownloadCompletedCallback', (download) => {
      console.log(
        'statechanged',
        download.downloadedSize,
        download.totalSize * 100
      )
    }) */
  })
}
function deleteDir(dirpath) {
  return new Promise((resolve, reject) => {
    window.plus.io.requestFileSystem(
      window.plus.io.PUBLIC_DOWNLOADS,
      function (entry) {
        // 可通过fs进行文件操作
        entry.root.removeRecursively(
          dirpath,
          function () {
            console.log('resmove file system success!', dirpath)
            resolve({
              success: true,
              dirpath: dirpath,
            })
          },
          function (err) {
            console.log('创建目录失败', JSON.stringify(err))
            reject({
              success: false,
              err,
            })
          }
        )
      },
      function (e) {
        console.log('resmove file system failed: ' + e.message)
        reject({
          success: false,
          err: e.message,
        })
      }
    )
  })
}

function createDir(dirpath) {
  return new Promise((resolve, reject) => {
    window.plus.io.requestFileSystem(
      window.plus.io.PUBLIC_DOWNLOADS,
      function (entry) {
        // 可通过fs进行文件操作
        entry.root.getDirectory(
          dirpath,
          {
            create: true,
          },
          function () {
            console.log('Request file system success!', dirpath)
            resolve({
              success: true,
              dirpath: dirpath,
            })
          },
          function (err) {
            console.log('创建目录失败', JSON.stringify(err))
            reject({
              success: false,
              err,
            })
          }
        )
      },
      function (e) {
        console.log('Request file system failed: ' + e.message)
        reject({
          success: false,
          err: e.message,
        })
      }
    )
  })
}
// 不重复下载
function downloadChapterItem(option) {
  const {
    bigType,
    showType,
    mgcptItem,
    name,
    mgOutput,
    bgType: defbgType,
  } = option
  console.log('mgcptItem', option)
  return new Promise((resolve, reject) => {
    /* return resolve({
      success: true,
      code: 200,
    }) */
    const { maxPageCount, title, bgType } = mgcptItem
    createDir('_downloads/' + bigType).then((res) => {
      createDir(res.dirpath + '/' + showType).then((res) => {
        createDir(res.dirpath + '/' + name).then((res) => {
          createDir(res.dirpath + '/' + title).then((res) => {
            console.log('下载文件')
            // 开始下载了
            function redexc(cb, execCount = 0) {
              if (execCount >= 1) {
                return cb({
                  success: false,
                  info: '超过检测最大次数',
                })
              }
              const promisearr = []
              readFiles(res.dirpath, {
                onlyFile: true,
                getMap: true,
              }).then((filesaa) => {
                apiAxios
                  .getfiles({
                    params: { path: mgOutput + '/' + title },
                  })
                  .then((res1) => {
                    // console.log(JSON.stringify(res))
                    if (res1.success) {
                      const { files } = res1
                      for (let i = 0, len = files.length; i < len; i++) {
                        // const pigname = `${i + 1}.${bgType || defbgType}`
                        const pigname = files[i]
                        if (!filesaa.map[pigname]) {
                          promisearr.push(
                            dowloadfile(
                              `${window.SERVER_ADDRESS}/file?c=image/jpeg&path=${mgOutput}/${title}/${pigname}`,
                              res.dirpath + '/' + pigname
                            )
                            /* dowloadfile(
                              `${window.SERVER_ADDRESS}/file?c=image/jpeg&path=${mgOutput}/${title}/${pigname}`,
                              res.dirpath + '/' + pigname
                            ) */
                          )
                        }
                      }
                      if (promisearr.length > 0) {
                        Promise.all(promisearr).then((res) => {
                          redexc(cb, execCount + 1)
                        })
                      } else {
                        cb({
                          success: true,
                          code: 200, // 全部下载完了
                        })
                      }
                    }
                  })
                  .catch((err) => {
                    cb({ success: false, info: '检测问题' })
                  })
              })
            }

            redexc((res) => {
              resolve(res)
            })
          })
        })
      })
    })
  })
}
export { downloadChapterItem, deleteDir }

function readFiles(dirpath, options) {
  const { onlyFile, getMap } = options || {}
  return new Promise((resolve, reject) => {
    window.plus.io.requestFileSystem(
      window.plus.io.PUBLIC_DOWNLOADS,
      function (entry) {
        // 可通过fs进行文件操作
        entry.root.getDirectory(dirpath, {}, function (dir) {
          var directoryReader = dir.createReader()
          directoryReader.readEntries(
            function (entries) {
              var i
              var list = []
              var map = {}
              for (i = 0; i < entries.length; i++) {
                // console.log(entries[i].name)
                const item = entries[i]
                if (onlyFile) {
                  if (item.isFile) {
                    if (getMap) {
                      map[item.name] = true
                    } else {
                      list.push(item.name)
                    }
                  }
                } else {
                  if (getMap) {
                    map[item.name] = true
                  } else {
                    list.push(item.name)
                  }
                }
              }
              resolve({
                success: true,
                list,
                map,
              })
            },
            function (e) {
              console('Read entries failed: ' + e.message)
              reject(e)
            }
          )
        })
      },
      function (e) {
        console.log('Request file system failed: ' + e.message)
        reject(e)
      }
    )
  })
}

/* // 二维码
// img.src = imgsrc.value
		createBarcode()
		var barcode = null;
		// 扫码成功回调
		function onmarked(type, result) {
			var text = '未知: ';
			switch(type){
				case plus.barcode.QR:
				text = 'QR: ';
				break;
				case plus.barcode.EAN13:
				text = 'EAN13: ';
				break;
				case plus.barcode.EAN8:
				text = 'EAN8: ';
				break;
			}
			alert( text+result );
		}
		// 创建Barcode扫码控件
		function createBarcode() {
			if(!barcode){
				barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
					top:'100px',
					left:'0px',
					width: '100%',
					height: '500px',
					position: 'static'
				});
				barcode.onmarked = onmarked;
				plus.webview.currentWebview().append(barcode);
			}
			barcode.start();
		}
*/
