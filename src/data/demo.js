// 演示数据 - 用于展示更多院校和专业信息
export const demoData = {
  // 更多院校数据
  schools: [
    {
      id: 1,
      name: '清华大学',
      logo: '',
      location: '北京',
      level: '985',
      type: '综合类',
      minScore2023: 685,
      minRank2023: 120,
      admissionProbability: '风险较高',
      scoreDiff: 15,
      rankDiff: 200,
      majors: ['计算机科学与技术', '电子信息工程', '机械工程', '建筑学', '土木工程'],
      description: '清华大学是中国著名高等学府，坐落于北京西北郊风景秀丽的清华园。',
      admissionRate: '0.8%',
      studentCount: '50000+'
    },
    {
      id: 2,
      name: '北京大学',
      logo: '',
      location: '北京',
      level: '985',
      type: '综合类',
      minScore2023: 680,
      minRank2023: 150,
      admissionProbability: '风险较高',
      scoreDiff: 10,
      rankDiff: 150,
      majors: ['数学与应用数学', '物理学', '化学', '生物科学', '心理学'],
      description: '北京大学是中国第一所国立综合性大学，也是中国现代高等教育的发源地。',
      admissionRate: '0.9%',
      studentCount: '45000+'
    },
    {
      id: 3,
      name: '复旦大学',
      logo: '',
      location: '上海',
      level: '985',
      type: '综合类',
      minScore2023: 670,
      minRank2023: 300,
      admissionProbability: '较稳',
      scoreDiff: 0,
      rankDiff: 0,
      majors: ['临床医学', '金融学', '新闻学', '国际关系', '哲学'],
      description: '复旦大学是中国人自主创办的第一所高等院校，是一所世界知名、国内顶尖的综合性研究型大学。',
      admissionRate: '1.2%',
      studentCount: '35000+'
    },
    {
      id: 4,
      name: '上海交通大学',
      logo: '',
      location: '上海',
      level: '985',
      type: '理工类',
      minScore2023: 665,
      minRank2023: 400,
      admissionProbability: '较稳',
      scoreDiff: -5,
      rankDiff: -100,
      majors: ['船舶与海洋工程', '材料科学与工程', '生物医学工程', '机械工程', '电子信息工程'],
      description: '上海交通大学是我国历史最悠久、享誉海内外的高等学府之一，是教育部直属并与上海市共建的全国重点大学。',
      admissionRate: '1.5%',
      studentCount: '40000+'
    },
    {
      id: 5,
      name: '中山大学',
      logo: '',
      location: '广东',
      level: '985',
      type: '综合类',
      minScore2023: 650,
      minRank2023: 800,
      admissionProbability: '很稳',
      scoreDiff: -20,
      rankDiff: -500,
      majors: ['工商管理', '法学', '汉语言文学', '临床医学', '计算机科学与技术'],
      description: '中山大学由孙中山先生创办，有着一百多年办学传统，是教育部、国家国防科技工业局和广东省共建的综合性重点大学。',
      admissionRate: '2.1%',
      studentCount: '55000+'
    },
    {
      id: 6,
      name: '华南理工大学',
      logo: '',
      location: '广东',
      level: '985',
      type: '理工类',
      minScore2023: 640,
      minRank2023: 1000,
      admissionProbability: '很稳',
      scoreDiff: -30,
      rankDiff: -700,
      majors: ['建筑学', '土木工程', '化学工程与工艺', '材料科学与工程', '机械工程'],
      description: '华南理工大学是直属教育部的全国重点大学，校园分为五山校区、大学城校区和广州国际校区。',
      admissionRate: '2.8%',
      studentCount: '48000+'
    },
    {
      id: 7,
      name: '华中科技大学',
      logo: '',
      location: '湖北',
      level: '985',
      type: '理工类',
      minScore2023: 635,
      minRank2023: 1200,
      admissionProbability: '很稳',
      scoreDiff: -35,
      rankDiff: -900,
      majors: ['机械工程', '光学工程', '生物医学工程', '计算机科学与技术', '临床医学'],
      description: '华中科技大学是国家教育部直属重点综合性大学，由原华中理工大学、同济医科大学、武汉城市建设学院合并组建。',
      admissionRate: '3.2%',
      studentCount: '52000+'
    },
    {
      id: 8,
      name: '西安交通大学',
      logo: '',
      location: '陕西',
      level: '985',
      type: '理工类',
      minScore2023: 630,
      minRank2023: 1500,
      admissionProbability: '很稳',
      scoreDiff: -40,
      rankDiff: -1200,
      majors: ['机械工程', '材料科学与工程', '动力工程及工程热物理', '电气工程', '管理科学与工程'],
      description: '西安交通大学是国家教育部直属重点大学，为我国最早兴办的高等学府之一，是一所具有理工特色，涵盖理、工、医、经、管、文、法、哲、艺等9个学科门类的综合性研究型大学。',
      admissionRate: '3.8%',
      studentCount: '46000+'
    }
  ],

  // 专业详细信息
  majors: [
    {
      id: 1,
      name: '计算机科学与技术',
      category: '工学',
      description: '计算机科学与技术专业培养具有良好的科学素养，系统地、较好地掌握计算机科学与技术包括计算机硬件、软件与应用的基本理论、基本知识和基本技能与方法的高级专门科学技术人才。',
      employmentRate: '98%',
      avgSalary: '15000元/月',
      mainCourses: ['数据结构', '操作系统', '计算机网络', '数据库原理', '软件工程'],
      careerProspects: ['软件工程师', '系统架构师', '算法工程师', '产品经理', '技术总监'],
      minScore: 680,
      schoolCount: 500
    },
    {
      id: 2,
      name: '临床医学',
      category: '医学',
      description: '临床医学专业是一门实践性很强的应用科学专业，致力于培养具备基础医学、临床医学的基本理论和医疗预防的基本技能，能在医疗卫生单位、医学科研等部门从事医疗及预防、医学科研等方面工作的医学高级专门人才。',
      employmentRate: '95%',
      avgSalary: '12000元/月',
      mainCourses: ['人体解剖学', '生理学', '病理学', '药理学', '内科学', '外科学'],
      careerProspects: ['临床医生', '医学研究员', '医院管理', '医学教育', '公共卫生'],
      minScore: 650,
      schoolCount: 200
    },
    {
      id: 3,
      name: '金融学',
      category: '经济学',
      description: '金融学专业培养具有金融学理论知识及专业技能的专门人才，能在银行、证券、投资、保险及其他经济管理部门和企业从事相关工作的专门人才。',
      employmentRate: '92%',
      avgSalary: '13000元/月',
      mainCourses: ['货币银行学', '国际金融', '证券投资学', '保险学', '商业银行经营学'],
      careerProspects: ['银行职员', '证券分析师', '投资顾问', '保险经纪人', '基金经理'],
      minScore: 620,
      schoolCount: 300
    }
  ],

  // 历年录取数据
  admissionHistory: {
    1: { // 清华大学
      scores: [680, 682, 685, 683, 685],
      ranks: [150, 140, 120, 130, 120],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    2: { // 北京大学
      scores: [675, 678, 680, 678, 680],
      ranks: [180, 170, 150, 160, 150],
      years: ['2019', '2020', '2021', '2022', '2023']
    },
    3: { // 复旦大学
      scores: [665, 668, 670, 668, 670],
      ranks: [350, 320, 300, 310, 300],
      years: ['2019', '2020', '2021', '2022', '2023']
    }
  }
}

// 模拟推荐算法
export const recommendationAlgorithm = {
  // 根据分数和排名推荐院校
  recommendSchools: (userScore, userRank, schools) => {
    const rush = []
    const stable = []
    const safe = []

    schools.forEach(school => {
      const scoreDiff = userScore - school.minScore2023
      const rankDiff = userRank - school.minRank2023

      if (scoreDiff < -10 || rankDiff < -200) {
        // 冲刺院校：分数比用户高10分以上或排名比用户低200名以上
        rush.push(school)
      } else if (scoreDiff > 10 || rankDiff > 200) {
        // 保底院校：分数比用户低10分以上或排名比用户高200名以上
        safe.push(school)
      } else {
        // 稳定院校：分数和排名与用户相近
        stable.push(school)
      }
    })

    return { rush, stable, safe }
  },

  // 计算录取概率
  calculateProbability: (userScore, userRank, schoolMinScore, schoolMinRank) => {
    const scoreDiff = userScore - schoolMinScore
    const rankDiff = userRank - schoolMinRank

    if (scoreDiff > 15 && rankDiff > 300) {
      return '很稳'
    } else if (scoreDiff > 5 && rankDiff > 100) {
      return '较稳'
    } else if (scoreDiff > -5 && rankDiff > -100) {
      return '较稳'
    } else {
      return '风险较高'
    }
  }
}
