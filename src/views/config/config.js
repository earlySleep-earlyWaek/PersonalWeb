import { ElMessage } from 'element-plus'

export const systemConfig = {
  gis: {
    key: '',
  },
  save() {
    const data = JSON.stringify({
      gis: this.gis,
    })
    localStorage.setItem('config', data)
    ElMessage.success('保存成功!')
  },
  load() {},
  init() {
    const config = JSON.parse(localStorage.getItem('config'))
    this.gis = config['gis']
  },
}
