// API 接口配置
const API_BASE_URL = 'https://api.example.com'

// 模拟数据API
export const mockAPI = {
  // 获取推荐院校
  getRecommendations: async (params) => {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟推荐数据
    const mockSchools = [
      {
        id: 1,
        name: '清华大学',
        logo: '',
        location: '北京',
        level: '985',
        minScore2023: 685,
        minRank2023: 120,
        admissionProbability: '风险较高',
        scoreDiff: 15,
        rankDiff: 200,
        majors: ['计算机科学与技术', '电子信息工程', '机械工程']
      },
      {
        id: 2,
        name: '北京大学',
        logo: '',
        location: '北京',
        level: '985',
        minScore2023: 680,
        minRank2023: 150,
        admissionProbability: '风险较高',
        scoreDiff: 10,
        rankDiff: 150,
        majors: ['数学与应用数学', '物理学', '化学']
      },
      {
        id: 3,
        name: '复旦大学',
        logo: '',
        location: '上海',
        level: '985',
        minScore2023: 670,
        minRank2023: 300,
        admissionProbability: '较稳',
        scoreDiff: 0,
        rankDiff: 0,
        majors: ['临床医学', '金融学', '新闻学']
      },
      {
        id: 4,
        name: '上海交通大学',
        logo: '',
        location: '上海',
        level: '985',
        minScore2023: 665,
        minRank2023: 400,
        admissionProbability: '较稳',
        scoreDiff: -5,
        rankDiff: -100,
        majors: ['船舶与海洋工程', '材料科学与工程', '生物医学工程']
      },
      {
        id: 5,
        name: '中山大学',
        logo: '',
        location: '广东',
        level: '985',
        minScore2023: 650,
        minRank2023: 800,
        admissionProbability: '很稳',
        scoreDiff: -20,
        rankDiff: -500,
        majors: ['工商管理', '法学', '汉语言文学']
      },
      {
        id: 6,
        name: '华南理工大学',
        logo: '',
        location: '广东',
        level: '985',
        minScore2023: 640,
        minRank2023: 1000,
        admissionProbability: '很稳',
        scoreDiff: -30,
        rankDiff: -700,
        majors: ['建筑学', '土木工程', '化学工程与工艺']
      }
    ]
    
    // 根据分数和排名分配院校
    const userScore = parseInt(params.score)
    const userRank = parseInt(params.rank)
    
    const rush = mockSchools.filter(school => 
      school.minScore2023 > userScore - 10 || school.minRank2023 < userRank - 200
    )
    const stable = mockSchools.filter(school => 
      Math.abs(school.minScore2023 - userScore) <= 10 && Math.abs(school.minRank2023 - userRank) <= 200
    )
    const safe = mockSchools.filter(school => 
      school.minScore2023 < userScore - 10 || school.minRank2023 > userRank + 200
    )
    
    return {
      rush,
      stable,
      safe
    }
  },

  // 获取院校详情
  getSchoolDetail: async (schoolId) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      id: schoolId,
      name: '清华大学',
      location: '北京',
      level: '985',
      type: '综合类',
      description: '清华大学是中国著名高等学府，坐落于北京西北郊风景秀丽的清华园。学校始建于1911年，是中国高层次人才培养和科学技术研究的重要基地。',
      minScore2023: 685,
      minRank2023: 120,
      admissionRate: '0.8%',
      studentCount: '50000+',
      disciplineAdvantage: '工科实力雄厚，计算机、电子、机械等专业全国领先',
      employmentInfo: '毕业生就业率98%以上，平均薪资水平位居全国前列',
      locationAdvantage: '位于首都北京，地理位置优越，实习就业机会丰富',
      campusEnvironment: '校园环境优美，设施完善，学习氛围浓厚'
    }
  },

  // 获取专业信息
  getMajors: async (schoolId) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return [
      {
        id: 1,
        name: '计算机科学与技术',
        category: '工学',
        minScore: 680,
        employmentRate: '98%',
        description: '培养具有扎实的计算机科学与技术基础理论，具备系统分析、设计、开发和应用能力的高级专门人才。'
      },
      {
        id: 2,
        name: '电子信息工程',
        category: '工学',
        minScore: 675,
        employmentRate: '96%',
        description: '培养具备电子技术和信息系统的基础知识，能从事各类电子设备和信息系统的研究、设计、制造、应用和开发的高级工程技术人才。'
      },
      {
        id: 3,
        name: '机械工程',
        category: '工学',
        minScore: 670,
        employmentRate: '94%',
        description: '培养具备机械设计、制造、自动化基础知识与应用能力，能在工业生产第一线从事机械制造领域内的设计制造、科技开发、应用研究、运行管理和经营销售等方面工作的高级工程技术人才。'
      }
    ]
  }
}

// 工具函数
export const utils = {
  // 格式化分数
  formatScore: (score) => {
    return `${score}分`
  },

  // 格式化排名
  formatRank: (rank) => {
    return `${rank}名`
  },

  // 计算录取概率
  calculateProbability: (userScore, userRank, schoolMinScore, schoolMinRank) => {
    const scoreDiff = userScore - schoolMinScore
    const rankDiff = userRank - schoolMinRank
    
    if (scoreDiff > 10 && rankDiff > 200) {
      return '很稳'
    } else if (scoreDiff > 0 && rankDiff > 0) {
      return '较稳'
    } else {
      return '风险较高'
    }
  },

  // 获取概率颜色
  getProbabilityColor: (probability) => {
    const colorMap = {
      '风险较高': '#f56c6c',
      '较稳': '#e6a23c',
      '很稳': '#67c23a'
    }
    return colorMap[probability] || '#409eff'
  },

  // 获取概率百分比
  getProbabilityPercentage: (probability) => {
    const percentageMap = {
      '风险较高': 30,
      '较稳': 70,
      '很稳': 90
    }
    return percentageMap[probability] || 50
  },

  // 验证分数格式
  validateScore: (score) => {
    const num = parseInt(score)
    return !isNaN(num) && num >= 0 && num <= 750
  },

  // 验证排名格式
  validateRank: (rank) => {
    const num = parseInt(rank)
    return !isNaN(num) && num > 0
  },

  // 生成唯一ID
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}

// 本地存储工具
export const storage = {
  // 保存到localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('保存到localStorage失败:', error)
    }
  },

  // 从localStorage读取
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('从localStorage读取失败:', error)
      return defaultValue
    }
  },

  // 从localStorage删除
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('从localStorage删除失败:', error)
    }
  },

  // 清空localStorage
  clear: () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('清空localStorage失败:', error)
    }
  }
}
