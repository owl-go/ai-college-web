<template>
  <div class="school-detail">
    <!-- 头部导航 -->
    <header class="header">
      <div class="container">
        <div class="nav">
          <router-link to="/recommendation" class="back-btn">
            <el-icon><ArrowLeft /></el-icon>
            返回推荐
          </router-link>
          <router-link to="/" class="logo">
            <el-icon><School /></el-icon>
            志愿通
          </router-link>
          <div class="nav-spacer"></div>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <!-- 学校基本信息 -->
        <section class="school-info-section">
          <div class="card school-info-card">
            <div class="school-header">
              <div class="school-logo">
                <el-icon><School /></el-icon>
              </div>
              <div class="school-details">
                <h1 class="school-name">{{ schoolInfo.name }}</h1>
                <div class="school-meta">
                  <span class="location">
                    <el-icon><Location /></el-icon>
                    {{ schoolInfo.location }}
                  </span>
                  <span class="level">{{ schoolInfo.level }}</span>
                  <span class="type">{{ schoolInfo.type }}</span>
                </div>
                <p class="school-desc">{{ schoolInfo.description }}</p>
              </div>
              <div class="school-actions">
                <el-button
                  type="primary"
                  @click="addToWishlist"
                  :disabled="isInWishlist"
                >
                  <el-icon><Plus /></el-icon>
                  {{ isInWishlist ? "已添加" : "加入志愿表" }}
                </el-button>
                <el-button @click="shareSchool">
                  <el-icon><Share /></el-icon>
                  分享
                </el-button>
              </div>
            </div>
          </div>
        </section>

        <!-- 录取数据 -->
        <section class="admission-data-section">
          <div class="card">
            <h2 class="section-title">历年录取数据</h2>

            <!-- 数据概览 -->
            <div class="data-overview">
              <div class="overview-item">
                <div class="overview-value">{{ schoolInfo.minScore2023 }}</div>
                <div class="overview-label">2023年最低分</div>
              </div>
              <div class="overview-item">
                <div class="overview-value">{{ schoolInfo.minRank2023 }}</div>
                <div class="overview-label">2023年最低排名</div>
              </div>
              <div class="overview-item">
                <div class="overview-value">{{ schoolInfo.admissionRate }}</div>
                <div class="overview-label">录取率</div>
              </div>
              <div class="overview-item">
                <div class="overview-value">{{ schoolInfo.studentCount }}</div>
                <div class="overview-label">在校生人数</div>
              </div>
            </div>

            <!-- 分数线趋势图 -->
            <div class="chart-container">
              <h3 class="chart-title">近5年录取分数线趋势</h3>
              <v-chart class="chart" :option="scoreChartOption" autoresize />
            </div>
          </div>
        </section>

        <!-- 专业信息 -->
        <section class="majors-section">
          <div class="card">
            <h2 class="section-title">专业信息</h2>

            <!-- 专业筛选 -->
            <div class="major-filters">
              <el-input
                v-model="majorSearch"
                placeholder="搜索专业"
                clearable
                style="width: 300px"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
              <el-select
                v-model="majorCategory"
                placeholder="专业类别"
                clearable
              >
                <el-option label="工学" value="engineering" />
                <el-option label="理学" value="science" />
                <el-option label="文学" value="literature" />
                <el-option label="经济学" value="economics" />
                <el-option label="管理学" value="management" />
              </el-select>
            </div>

            <!-- 专业列表 -->
            <div class="majors-grid">
              <div
                v-for="major in filteredMajors"
                :key="major.id"
                class="major-card"
                @click="viewMajorDetail(major)"
              >
                <div class="major-header">
                  <h4 class="major-name">{{ major.name }}</h4>
                  <span class="major-category">{{ major.category }}</span>
                </div>
                <div class="major-info">
                  <div class="info-item">
                    <span class="label">最低分</span>
                    <span class="value">{{ major.minScore }}分</span>
                  </div>
                  <div class="info-item">
                    <span class="label">就业率</span>
                    <span class="value">{{ major.employmentRate }}</span>
                  </div>
                </div>
                <div class="major-desc">{{ major.description }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 学校特色 -->
        <section class="features-section">
          <div class="card">
            <h2 class="section-title">学校特色</h2>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><Trophy /></el-icon>
                </div>
                <h4>学科优势</h4>
                <p>{{ schoolInfo.disciplineAdvantage }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><Briefcase /></el-icon>
                </div>
                <h4>就业情况</h4>
                <p>{{ schoolInfo.employmentInfo }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><LocationInformation /></el-icon>
                </div>
                <h4>地理位置</h4>
                <p>{{ schoolInfo.locationAdvantage }}</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <el-icon><Star /></el-icon>
                </div>
                <h4>校园环境</h4>
                <p>{{ schoolInfo.campusEnvironment }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default {
  name: "SchoolDetail",
  components: {
    VChart,
  },
  data() {
    return {
      schoolInfo: {
        id: 1,
        name: "清华大学",
        location: "北京",
        level: "985",
        type: "综合类",
        description:
          "清华大学是中国著名高等学府，坐落于北京西北郊风景秀丽的清华园。学校始建于1911年，是中国高层次人才培养和科学技术研究的重要基地。",
        minScore2023: 685,
        minRank2023: 120,
        admissionRate: "0.8%",
        studentCount: "50000+",
        disciplineAdvantage: "工科实力雄厚，计算机、电子、机械等专业全国领先",
        employmentInfo: "毕业生就业率98%以上，平均薪资水平位居全国前列",
        locationAdvantage: "位于首都北京，地理位置优越，实习就业机会丰富",
        campusEnvironment: "校园环境优美，设施完善，学习氛围浓厚",
      },
      majorSearch: "",
      majorCategory: "",
      majors: [
        {
          id: 1,
          name: "计算机科学与技术",
          category: "工学",
          minScore: 680,
          employmentRate: "98%",
          description:
            "培养具有扎实的计算机科学与技术基础理论，具备系统分析、设计、开发和应用能力的高级专门人才。",
        },
        {
          id: 2,
          name: "电子信息工程",
          category: "工学",
          minScore: 675,
          employmentRate: "96%",
          description:
            "培养具备电子技术和信息系统的基础知识，能从事各类电子设备和信息系统的研究、设计、制造、应用和开发的高级工程技术人才。",
        },
        {
          id: 3,
          name: "机械工程",
          category: "工学",
          minScore: 670,
          employmentRate: "94%",
          description:
            "培养具备机械设计、制造、自动化基础知识与应用能力，能在工业生产第一线从事机械制造领域内的设计制造、科技开发、应用研究、运行管理和经营销售等方面工作的高级工程技术人才。",
        },
        {
          id: 4,
          name: "数学与应用数学",
          category: "理学",
          minScore: 665,
          employmentRate: "92%",
          description:
            "培养掌握数学科学的基本理论与基本方法，具备运用数学知识、使用计算机解决实际问题的能力，受到科学研究的初步训练的高级专门人才。",
        },
        {
          id: 5,
          name: "经济学",
          category: "经济学",
          minScore: 660,
          employmentRate: "90%",
          description:
            "培养具备比较扎实的马克思主义经济学理论基础，熟悉现代西方经济学理论，比较熟练地掌握现代经济分析方法的高级专门人才。",
        },
      ],
      scoreChartOption: {
        title: {
          text: "近5年录取分数线",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["最低分", "平均分"],
          top: 30,
        },
        xAxis: {
          type: "category",
          data: ["2019", "2020", "2021", "2022", "2023"],
        },
        yAxis: {
          type: "value",
          name: "分数",
        },
        series: [
          {
            name: "最低分",
            type: "line",
            data: [680, 682, 685, 683, 685],
            smooth: true,
            itemStyle: {
              color: "#409eff",
            },
          },
          {
            name: "平均分",
            type: "line",
            data: [690, 692, 695, 693, 695],
            smooth: true,
            itemStyle: {
              color: "#67c23a",
            },
          },
        ],
      },
    };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    filteredMajors() {
      let result = this.majors;

      if (this.majorSearch) {
        result = result.filter((major) =>
          major.name.includes(this.majorSearch)
        );
      }

      if (this.majorCategory) {
        result = result.filter(
          (major) => major.category === this.majorCategory
        );
      }

      return result;
    },
    isInWishlist() {
      return this.userStore.wishlist.some(
        (item) => item.id === this.schoolInfo.id
      );
    },
  },
  methods: {
    addToWishlist() {
      this.userStore.addToWishlist(this.schoolInfo);
      ElMessage.success(`已将 ${this.schoolInfo.name} 添加到志愿表`);
    },
    shareSchool() {
      ElMessage.success("分享链接已复制到剪贴板");
    },
    viewMajorDetail(major) {
      ElMessage.info(`查看 ${major.name} 详情功能开发中...`);
    },
  },
  mounted() {
    const schoolId = this.$route.params.id;
    // 这里可以根据schoolId加载具体的学校数据
    console.log("加载学校详情:", schoolId);
  },
};
</script>

<style scoped lang="scss">
.school-detail {
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
    align-items: center;
    padding: 15px 0;

    .back-btn {
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

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 24px;
      font-weight: 600;
      color: var(--primary-color);
      text-decoration: none;
      margin-left: 20px;
    }

    .nav-spacer {
      flex: 1;
    }
  }
}

.main {
  padding: 20px 0 40px;
}

.school-info-section {
  margin-bottom: 30px;

  .school-info-card {
    .school-header {
      display: flex;
      gap: 20px;
      align-items: flex-start;

      .school-logo {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--primary-color), #66b1ff);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 32px;
        flex-shrink: 0;
      }

      .school-details {
        flex: 1;

        .school-name {
          font-size: 28px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 15px 0;
        }

        .school-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;

          .location {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--text-secondary);
          }

          .level,
          .type {
            background: var(--primary-color);
            color: white;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
          }
        }

        .school-desc {
          color: var(--text-regular);
          line-height: 1.6;
          margin: 0;
        }
      }

      .school-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .el-button {
          min-width: 120px;
        }
      }
    }
  }
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.data-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;

  .overview-item {
    text-align: center;
    padding: 20px;
    background: var(--bg-light);
    border-radius: 8px;

    .overview-value {
      font-size: 24px;
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 8px;
    }

    .overview-label {
      color: var(--text-secondary);
      font-size: 14px;
    }
  }
}

.chart-container {
  .chart-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 20px;
  }

  .chart {
    height: 400px;
  }
}

.major-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.majors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  .major-card {
    background: var(--bg-light);
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .major-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      .major-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
      }

      .major-category {
        background: var(--primary-color);
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
      }
    }

    .major-info {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;

      .info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .label {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
      }
    }

    .major-desc {
      color: var(--text-regular);
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  .feature-item {
    text-align: center;
    padding: 20px;

    .feature-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 15px;
      background: linear-gradient(135deg, var(--primary-color), #66b1ff);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
    }

    h4 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 10px;
    }

    p {
      color: var(--text-regular);
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

@media (max-width: 768px) {
  .school-info-section .school-info-card .school-header {
    flex-direction: column;
    gap: 15px;

    .school-actions {
      flex-direction: row;
      width: 100%;

      .el-button {
        flex: 1;
      }
    }
  }

  .data-overview {
    grid-template-columns: repeat(2, 1fr);
  }

  .major-filters {
    flex-direction: column;
  }

  .majors-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
