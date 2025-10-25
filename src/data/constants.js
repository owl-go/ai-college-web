// 省份数据
export const provinces = [
  { label: '北京', value: 'beijing', code: '11' },
  { label: '上海', value: 'shanghai', code: '31' },
  { label: '广东', value: 'guangdong', code: '44' },
  { label: '江苏', value: 'jiangsu', code: '32' },
  { label: '浙江', value: 'zhejiang', code: '33' },
  { label: '山东', value: 'shandong', code: '37' },
  { label: '河南', value: 'henan', code: '41' },
  { label: '四川', value: 'sichuan', code: '51' },
  { label: '湖北', value: 'hubei', code: '42' },
  { label: '湖南', value: 'hunan', code: '43' },
  { label: '河北', value: 'hebei', code: '13' },
  { label: '安徽', value: 'anhui', code: '34' },
  { label: '福建', value: 'fujian', code: '35' },
  { label: '江西', value: 'jiangxi', code: '36' },
  { label: '辽宁', value: 'liaoning', code: '21' },
  { label: '吉林', value: 'jilin', code: '22' },
  { label: '黑龙江', value: 'heilongjiang', code: '23' },
  { label: '山西', value: 'shanxi', code: '14' },
  { label: '陕西', value: 'shaanxi', code: '61' },
  { label: '甘肃', value: 'gansu', code: '62' },
  { label: '青海', value: 'qinghai', code: '63' },
  { label: '宁夏', value: 'ningxia', code: '64' },
  { label: '新疆', value: 'xinjiang', code: '65' },
  { label: '西藏', value: 'xizang', code: '54' },
  { label: '云南', value: 'yunnan', code: '53' },
  { label: '贵州', value: 'guizhou', code: '52' },
  { label: '广西', value: 'guangxi', code: '45' },
  { label: '海南', value: 'hainan', code: '46' },
  { label: '内蒙古', value: 'neimenggu', code: '15' },
  { label: '天津', value: 'tianjin', code: '12' },
  { label: '重庆', value: 'chongqing', code: '50' }
]

// 科目类型
export const subjectTypes = [
  { label: '文科', value: 'wen' },
  { label: '理科', value: 'li' },
  { label: '新高考', value: 'xin' }
]

// 院校层次
export const schoolLevels = [
  { label: '985', value: '985' },
  { label: '211', value: '211' },
  { label: '双一流', value: 'shuangyiliu' },
  { label: '普通本科', value: 'normal' },
  { label: '专科', value: 'college' }
]

// 专业类别
export const majorCategories = [
  { label: '工学', value: 'engineering' },
  { label: '理学', value: 'science' },
  { label: '文学', value: 'literature' },
  { label: '经济学', value: 'economics' },
  { label: '管理学', value: 'management' },
  { label: '法学', value: 'law' },
  { label: '教育学', value: 'education' },
  { label: '医学', value: 'medicine' },
  { label: '农学', value: 'agriculture' },
  { label: '艺术学', value: 'arts' }
]

// 地区数据
export const regions = [
  { label: '华北', value: 'north', provinces: ['beijing', 'tianjin', 'hebei', 'shanxi', 'neimenggu'] },
  { label: '东北', value: 'northeast', provinces: ['liaoning', 'jilin', 'heilongjiang'] },
  { label: '华东', value: 'east', provinces: ['shanghai', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong'] },
  { label: '华中', value: 'central', provinces: ['henan', 'hubei', 'hunan'] },
  { label: '华南', value: 'south', provinces: ['guangdong', 'guangxi', 'hainan'] },
  { label: '西南', value: 'southwest', provinces: ['chongqing', 'sichuan', 'guizhou', 'yunnan', 'xizang'] },
  { label: '西北', value: 'northwest', provinces: ['shaanxi', 'gansu', 'qinghai', 'ningxia', 'xinjiang'] }
]

// 热门专业
export const popularMajors = [
  '计算机科学与技术',
  '软件工程',
  '电子信息工程',
  '通信工程',
  '自动化',
  '机械工程',
  '土木工程',
  '建筑学',
  '临床医学',
  '口腔医学',
  '金融学',
  '会计学',
  '工商管理',
  '市场营销',
  '法学',
  '汉语言文学',
  '英语',
  '数学与应用数学',
  '物理学',
  '化学'
]

// 院校类型
export const schoolTypes = [
  { label: '综合类', value: 'comprehensive' },
  { label: '理工类', value: 'science_engineering' },
  { label: '师范类', value: 'normal' },
  { label: '财经类', value: 'finance' },
  { label: '医药类', value: 'medical' },
  { label: '农林类', value: 'agriculture' },
  { label: '艺术类', value: 'arts' },
  { label: '体育类', value: 'sports' },
  { label: '军事类', value: 'military' }
]

// 录取概率等级
export const admissionProbabilities = [
  { label: '风险较高', value: 'high_risk', color: '#f56c6c', percentage: 30 },
  { label: '较稳', value: 'stable', color: '#e6a23c', percentage: 70 },
  { label: '很稳', value: 'safe', color: '#67c23a', percentage: 90 }
]

// 志愿填报建议
export const suggestions = {
  rush: {
    title: '冲刺院校建议',
    content: '建议选择1-2所冲刺院校，分数可以比自己的分数高10-20分，排名可以比自己的排名低200-500名。'
  },
  stable: {
    title: '稳定院校建议',
    content: '建议选择3-5所稳定院校，分数与自己的分数相近，排名与自己的排名相近，录取概率较高。'
  },
  safe: {
    title: '保底院校建议',
    content: '建议选择2-3所保底院校，分数比自己的分数低10-20分，排名比自己的排名高500-1000名，确保录取。'
  }
}
