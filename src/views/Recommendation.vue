<template>
  <div class="recommendation">
    <!-- 头部导航 -->
    <header class="header">
      <div class="container">
        <div class="nav">
          <router-link to="/" class="logo">
            <el-icon><School /></el-icon>
            志愿通
          </router-link>
          <nav class="nav-menu">
            <router-link to="/wishlist" class="nav-link">
              <el-icon><List /></el-icon>
              我的志愿表
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- 用户信息卡片 -->
    <section class="user-info-section">
      <div class="container">
        <div class="card user-info-card">
          <div class="user-info">
            <div class="info-item">
              <span class="label">省份：</span>
              <span class="value">{{
                getProvinceText(userStore.userInfo.province)
              }}</span>
            </div>
            <div class="info-item">
              <span class="label">科目：</span>
              <span class="value">{{
                userStore.userInfo.subjectCombination ||
                getSubjectText(userStore.userInfo.subject)
              }}</span>
            </div>
            <div class="info-item">
              <span class="label">分数：</span>
              <span class="value score">{{ userStore.userInfo.score }}分</span>
            </div>
            <div class="info-item">
              <span class="label">排名：</span>
              <span class="value rank">{{ userStore.userInfo.rank }}名</span>
            </div>
          </div>
          <el-button @click="goBack" type="primary" plain>
            <el-icon><ArrowLeft /></el-icon>
            重新填报
          </el-button>
        </div>
      </div>
    </section>

    <!-- 推荐结果 -->
    <main class="main">
      <div class="container">
        <div class="result-header">
          <h2 class="result-title">智能推荐结果</h2>
          <p class="result-desc">基于您的分数和排名，为您推荐以下院校</p>
        </div>

        <!-- 筛选条件 -->
        <div class="filter-section">
          <div class="card filter-card">
            <div class="filter-header">
              <h3 class="filter-title">
                <el-icon><Filter /></el-icon>
                筛选条件
              </h3>
              <el-button
                type="primary"
                size="small"
                @click="applyFilters"
                :disabled="!hasActiveFilters"
              >
                <el-icon><Search /></el-icon>
                应用筛选
              </el-button>
            </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-select
                  v-model="filters.region"
                  placeholder="选择地区"
                  multiple
                  :max-collapse-tags="2"
                  style="width: 100%"
                >
                  <el-option label="全国" value="全国" />
                  <el-option label="北京" value="beijing" />
                  <el-option label="上海" value="shanghai" />
                  <el-option label="广东" value="guangdong" />
                  <el-option label="江苏" value="jiangsu" />
                  <el-option label="浙江" value="zhejiang" />
                  <el-option label="山东" value="shandong" />
                  <el-option label="河南" value="henan" />
                  <el-option label="四川" value="sichuan" />
                  <el-option label="湖北" value="hubei" />
                  <el-option label="湖南" value="hunan" />
                  <el-option label="河北" value="hebei" />
                  <el-option label="安徽" value="anhui" />
                  <el-option label="福建" value="fujian" />
                  <el-option label="江西" value="jiangxi" />
                  <el-option label="辽宁" value="liaoning" />
                  <el-option label="吉林" value="jilin" />
                  <el-option label="黑龙江" value="heilongjiang" />
                  <el-option label="山西" value="shanxi" />
                  <el-option label="陕西" value="shaanxi" />
                  <el-option label="甘肃" value="gansu" />
                  <el-option label="青海" value="qinghai" />
                  <el-option label="宁夏" value="ningxia" />
                  <el-option label="新疆" value="xinjiang" />
                  <el-option label="西藏" value="xizang" />
                  <el-option label="云南" value="yunnan" />
                  <el-option label="贵州" value="guizhou" />
                  <el-option label="广西" value="guangxi" />
                  <el-option label="海南" value="hainan" />
                  <el-option label="内蒙古" value="neimenggu" />
                  <el-option label="天津" value="tianjin" />
                  <el-option label="重庆" value="chongqing" />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select
                  v-model="filters.level"
                  placeholder="院校层次"
                  clearable
                  style="width: 100%"
                >
                  <el-option label="985" value="985" />
                  <el-option label="211" value="211" />
                  <el-option label="双一流" value="shuangyiliu" />
                  <el-option label="普通本科" value="normal" />
                  <el-option label="高职（专科）" value="gaozhi" />
                  <el-option label="其他" value="other" />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="filters.major"
                  placeholder="搜索专业"
                  clearable
                  style="width: 100%"
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
              </el-col>
            </el-row>
            <div class="filter-actions">
              <el-button
                size="small"
                @click="clearFilters"
                :disabled="!hasActiveFilters"
              >
                <el-icon><Refresh /></el-icon>
                清空筛选
              </el-button>
              <span class="filter-count" v-if="hasActiveFilters">
                已应用 {{ activeFilterCount }} 个筛选条件
              </span>
            </div>
          </div>
        </div>

        <!-- Tab切换 -->
        <el-tabs v-model="activeTab" class="recommendation-tabs">
          <el-tab-pane label="冲刺院校" name="rush">
            <template #label>
              <span class="tab-label rush">
                <el-icon><TrendCharts /></el-icon>
                冲刺 ({{ recommendationData.rush.length }})
              </span>
            </template>
            <SchoolList
              :schools="recommendationData.rush"
              type="rush"
              @add-to-wishlist="handleAddToWishlist"
            />
          </el-tab-pane>

          <el-tab-pane label="稳定院校" name="stable">
            <template #label>
              <span class="tab-label stable">
                <el-icon><CircleCheck /></el-icon>
                稳定 ({{ recommendationData.stable.length }})
              </span>
            </template>
            <SchoolList
              :schools="recommendationData.stable"
              type="stable"
              @add-to-wishlist="handleAddToWishlist"
            />
          </el-tab-pane>

          <el-tab-pane label="保底院校" name="safe">
            <template #label>
              <span class="tab-label safe">
                <el-icon><Shield /></el-icon>
                保底 ({{ recommendationData.safe.length }})
              </span>
            </template>
            <SchoolList
              :schools="recommendationData.safe"
              type="safe"
              @add-to-wishlist="handleAddToWishlist"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import SchoolList from "@/components/SchoolList.vue";

export default {
  name: "Recommendation",
  components: {
    SchoolList,
  },
  data() {
    return {
      activeTab: "rush",
      recommendationData: {
        rush: [],
        stable: [],
        safe: [],
      },
      filters: {
        region: ["全国"],
        level: "",
        major: "",
      },
    };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    userInfo() {
      return this.userStore.userInfo;
    },
    isUserInfoComplete() {
      return this.userStore.isUserInfoComplete;
    },
    hasActiveFilters() {
      return (
        (this.filters.region.length > 0 &&
          !this.filters.region.includes("全国")) ||
        this.filters.level ||
        this.filters.major
      );
    },
    activeFilterCount() {
      let count = 0;
      if (
        this.filters.region.length > 0 &&
        !this.filters.region.includes("全国")
      )
        count++;
      if (this.filters.level) count++;
      if (this.filters.major) count++;
      return count;
    },
  },
  methods: {
    getProvinceText(value) {
      const provinceMap = {
        beijing: "北京",
        shanghai: "上海",
        guangdong: "广东",
        jiangsu: "江苏",
        zhejiang: "浙江",
        shandong: "山东",
        henan: "河南",
        sichuan: "四川",
        hubei: "湖北",
        hunan: "湖南",
        hebei: "河北",
        anhui: "安徽",
        fujian: "福建",
        jiangxi: "江西",
        liaoning: "辽宁",
        jilin: "吉林",
        heilongjiang: "黑龙江",
        shanxi: "山西",
        shaanxi: "陕西",
        gansu: "甘肃",
        qinghai: "青海",
        ningxia: "宁夏",
        xinjiang: "新疆",
        xizang: "西藏",
        yunnan: "云南",
        guizhou: "贵州",
        guangxi: "广西",
        hainan: "海南",
        neimenggu: "内蒙古",
        tianjin: "天津",
        chongqing: "重庆",
      };
      return provinceMap[value] || value;
    },
    getSubjectText(subject) {
      const subjectMap = {
        wen: "文科",
        li: "理科",
        xin: "新高考",
      };
      return subjectMap[subject] || subject;
    },
    goBack() {
      this.$router.push("/");
    },
    handleAddToWishlist(school) {
      const userStore = useUserStore();
      userStore.addToWishlist(school);
      ElMessage.success(`已将 ${school.name} 添加到志愿表`);
    },
    applyFilters() {
      ElMessage.success(`已应用 ${this.activeFilterCount} 个筛选条件`);
      // 这里可以添加实际的筛选逻辑
    },
    clearFilters() {
      this.filters.region = ["全国"];
      this.filters.level = "";
      this.filters.major = "";
      ElMessage.info("已清空所有筛选条件");
    },
    generateMockData() {
      const userStore = useUserStore();
      const mockSchools = [
        {
          id: 1,
          name: "清华大学",
          logo: "",
          location: "北京",
          level: "985",
          minScore2023: 685,
          minRank2023: 120,
          admissionProbability: "风险较高",
          scoreDiff: 15,
          rankDiff: 200,
          majors: ["计算机科学与技术", "电子信息工程", "机械工程"],
        },
        {
          id: 2,
          name: "北京大学",
          logo: "",
          location: "北京",
          level: "985",
          minScore2023: 680,
          minRank2023: 150,
          admissionProbability: "风险较高",
          scoreDiff: 10,
          rankDiff: 150,
          majors: ["数学与应用数学", "物理学", "化学"],
        },
        {
          id: 3,
          name: "复旦大学",
          logo: "",
          location: "上海",
          level: "985",
          minScore2023: 670,
          minRank2023: 300,
          admissionProbability: "较稳",
          scoreDiff: 0,
          rankDiff: 0,
          majors: ["临床医学", "金融学", "新闻学"],
        },
        {
          id: 4,
          name: "上海交通大学",
          logo: "",
          location: "上海",
          level: "985",
          minScore2023: 665,
          minRank2023: 400,
          admissionProbability: "较稳",
          scoreDiff: -5,
          rankDiff: -100,
          majors: ["船舶与海洋工程", "材料科学与工程", "生物医学工程"],
        },
        {
          id: 5,
          name: "中山大学",
          logo: "",
          location: "广东",
          level: "985",
          minScore2023: 650,
          minRank2023: 800,
          admissionProbability: "很稳",
          scoreDiff: -20,
          rankDiff: -500,
          majors: ["工商管理", "法学", "汉语言文学"],
        },
        {
          id: 6,
          name: "华南理工大学",
          logo: "",
          location: "广东",
          level: "985",
          minScore2023: 640,
          minRank2023: 1000,
          admissionProbability: "很稳",
          scoreDiff: -30,
          rankDiff: -700,
          majors: ["建筑学", "土木工程", "化学工程与工艺"],
        },
        {
          id: 7,
          name: "华中科技大学",
          logo: "",
          location: "湖北",
          level: "985",
          minScore2023: 655,
          minRank2023: 600,
          admissionProbability: "较稳",
          scoreDiff: -15,
          rankDiff: -300,
          majors: ["光电信息科学与工程", "生物医学工程", "材料科学与工程"],
        },
        {
          id: 8,
          name: "西安交通大学",
          logo: "",
          location: "陕西",
          level: "985",
          minScore2023: 645,
          minRank2023: 900,
          admissionProbability: "很稳",
          scoreDiff: -25,
          rankDiff: -600,
          majors: ["能源与动力工程", "电气工程及其自动化", "机械工程"],
        },
        {
          id: 9,
          name: "哈尔滨工业大学",
          logo: "",
          location: "黑龙江",
          level: "985",
          minScore2023: 635,
          minRank2023: 1200,
          admissionProbability: "很稳",
          scoreDiff: -35,
          rankDiff: -900,
          majors: ["飞行器设计与工程", "材料科学与工程", "计算机科学与技术"],
        },
        {
          id: 10,
          name: "北京理工大学",
          logo: "",
          location: "北京",
          level: "985",
          minScore2023: 630,
          minRank2023: 1500,
          admissionProbability: "很稳",
          scoreDiff: -40,
          rankDiff: -1200,
          majors: ["武器系统与工程", "车辆工程", "光电信息科学与工程"],
        },
        {
          id: 11,
          name: "深圳职业技术学院",
          logo: "",
          location: "广东",
          level: "gaozhi",
          minScore2023: 450,
          minRank2023: 50000,
          admissionProbability: "很稳",
          scoreDiff: -220,
          rankDiff: -49700,
          majors: ["计算机应用技术", "电子信息工程技术", "机械设计与制造"],
        },
        {
          id: 12,
          name: "南京信息职业技术学院",
          logo: "",
          location: "江苏",
          level: "gaozhi",
          minScore2023: 420,
          minRank2023: 60000,
          admissionProbability: "很稳",
          scoreDiff: -250,
          rankDiff: -59700,
          majors: ["软件技术", "通信技术", "物联网应用技术"],
        },
        {
          id: 13,
          name: "山东商业职业技术学院",
          logo: "",
          location: "山东",
          level: "gaozhi",
          minScore2023: 400,
          minRank2023: 70000,
          admissionProbability: "很稳",
          scoreDiff: -270,
          rankDiff: -69700,
          majors: ["会计", "市场营销", "电子商务"],
        },
      ];

      // 根据分数和排名分配院校
      const userScore = parseInt(userStore.userInfo.score);
      const userRank = parseInt(userStore.userInfo.rank);

      // 清空之前的数据
      this.recommendationData.rush = [];
      this.recommendationData.stable = [];
      this.recommendationData.safe = [];

      // 为每个学校分配类型
      mockSchools.forEach((school) => {
        const scoreDiff = school.minScore2023 - userScore;
        const rankDiff = userRank - school.minRank2023;

        // 冲刺：分数高10分以上 或 排名低200名以上
        if (scoreDiff > 10 || rankDiff > 200) {
          this.recommendationData.rush.push(school);
        }
        // 保底：分数低10分以上 或 排名高200名以上
        else if (scoreDiff < -10 || rankDiff < -200) {
          this.recommendationData.safe.push(school);
        }
        // 稳定：分数和排名都在合理范围内
        else {
          this.recommendationData.stable.push(school);
        }
      });

      console.log("分组结果:", {
        rush: this.recommendationData.rush.length,
        stable: this.recommendationData.stable.length,
        safe: this.recommendationData.safe.length,
      });
    },
  },
  mounted() {
    const userStore = useUserStore();
    if (!userStore.isUserInfoComplete) {
      this.$router.push("/");
      return;
    }
    this.generateMockData();
  },
};
</script>

<style scoped lang="scss">
.recommendation {
  min-height: 100vh;
  background: var(--bg-light);
}

.header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 24px;
      font-weight: 600;
      color: var(--primary-color);
      text-decoration: none;
    }

    .nav-menu {
      display: flex;
      gap: 20px;

      .nav-link {
        display: flex;
        align-items: center;
        gap: 5px;
        color: var(--text-regular);
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 6px;
        transition: all 0.3s;

        &:hover {
          background: var(--bg-light);
          color: var(--primary-color);
        }
      }
    }
  }
}

.user-info-section {
  padding: 20px 0;

  .user-info-card {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-info {
      display: flex;
      gap: 30px;

      .info-item {
        display: flex;
        align-items: center;

        .label {
          color: var(--text-secondary);
          margin-right: 8px;
        }

        .value {
          font-weight: 500;
          color: var(--text-primary);

          &.score {
            color: var(--primary-color);
            font-size: 18px;
          }

          &.rank {
            color: var(--success-color);
            font-size: 18px;
          }
        }
      }
    }
  }
}

.main {
  padding: 20px 0 40px;
}

.result-header {
  text-align: center;
  margin-bottom: 30px;

  .result-title {
    font-size: 28px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 10px;
  }

  .result-desc {
    color: var(--text-regular);
    font-size: 16px;
  }
}

.recommendation-tabs {
  margin-bottom: 30px;

  :deep(.el-tabs__header) {
    margin-bottom: 20px;
  }

  :deep(.el-tabs__nav-wrap) {
    background: white;
    border-radius: 8px;
    padding: 0 20px;
  }

  .tab-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;

    &.rush {
      color: var(--danger-color);
    }

    &.stable {
      color: var(--warning-color);
    }

    &.safe {
      color: var(--success-color);
    }
  }
}

.filter-section {
  margin-bottom: 30px;

  .filter-card {
    border: 2px solid var(--border-light);
    transition: all 0.3s;

    &:hover {
      border-color: var(--primary-color);
      box-shadow: 0 4px 20px rgba(64, 158, 255, 0.1);
    }
  }

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .filter-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;

      .el-icon {
        color: var(--primary-color);
      }
    }
  }

  .filter-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid var(--border-light);

    .filter-count {
      color: var(--text-secondary);
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .user-info-section .user-info-card {
    flex-direction: column;
    gap: 20px;

    .user-info {
      flex-direction: column;
      gap: 10px;
      text-align: center;
    }
  }

  .result-header .result-title {
    font-size: 24px;
  }

  .filter-section {
    .filter-header {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;
    }

    .filter-actions {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
    }
  }
}
</style>
