const fs = require('fs')
const path = require('path')
const clearDir = require('./utils/clearDir')
const { execSync } = require('child_process')

const rootPath = process.cwd()
const inputPath = path.resolve(rootPath, 'dist')

const uploadConfig = [
  {
    cname: 'fet.lanten.me',
    https: 'https://github.com/lanten/fire-emblem-tools.git',
    branch: 'gh-pages',
  },
]

uploadConfig.forEach(c => uploadToPages(c))

/**
 * 上传到 pages
 * @param {Object} uploadOptions
 * @param {String} name
 */
async function uploadToPages(uploadOptions) {
  const { branch } = uploadOptions

  // 用 index 替代 404
  fs.createReadStream(`${inputPath}/index.html`).pipe(fs.createWriteStream(`${inputPath}/404.html`))

  const { cname } = uploadOptions

  // 目前无法 强制返回 200 ok 等待 github 后续支持
  // fs.writeFile(`${inputPath}/.nojekyll`, '', err => err && chalk.redBright('=> 写入 .nojekyll 文件失败\n' + err))

  // 写入 CNAME
  if (cname) {
    fs.writeFile(`${inputPath}/CNAME`, cname, err => {
      if (!err) {
        console.log('=> 写入 CNAME 文件成功')
        gitCommit(uploadOptions)
      } else {
        console.log('=> 写入 CNAME 文件失败\n' + err)
      }
    })
  } else {
    gitCommit(uploadOptions)
  }
}

/**
 * Git 上传
 * @param {Object} uploadOptions
 */
function gitCommit({ branch = 'master', https, cname }) {
  const hash = Date.now()
  // Git 初始化
  syncExec('git init', 'Git 初始化')
  // Git 添加文件
  syncExec('git add .', 'Git 添加文件')
  // Git 添加 Commit
  syncExec(`git commit -m "commit by node [${hash}]"`, 'Git 添加 Commit')

  if (branch != 'master') {
    // Git 创建分支
    syncExec(`git branch ${branch}`, 'Git 创建分支')
    // Git 切换分支
    syncExec(`git checkout ${branch}`, 'Git 创建分支')
  }

  // Git 执行推送
  syncExec(`git remote add origin ${https}`, `Git 推送到 ${cname} `)
  // Git 执行同步（强制）
  console.log(`=> 正在同步到${https}....`)
  syncExec(`git push -u origin ${branch} -f`, `Git 同步到 ${cname} `)
  // 清除 .git 文件夹
  clearDir(inputPath + '/.git', true)
  console.log(`=> gitCommit 同步执行完成 [${hash}]`)
}

/**
 * 同步执行命令
 * @param {String} bash
 * @param {String} msg
 */
function syncExec(bash, msg) {
  try {
    execSync(bash, {
      cwd: inputPath,
    })
    console.log(`=> ${msg || bash}成功`)
  } catch (ex) {
    console.log(`=> ${msg || bash}失败\n`, ex)
  }
}
