<template>
  <div class="wishlist">
    <!-- 头部导航 -->
    <header class="header">
      <div class="container">
        <div class="nav">
          <router-link to="/" class="logo">
            <el-icon><School /></el-icon>
            志愿通
          </router-link>
          <nav class="nav-menu">
            <router-link to="/recommendation" class="nav-link">
              <el-icon><TrendCharts /></el-icon>
              智能推荐
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <!-- 志愿表头部 -->
        <section class="wishlist-header">
          <div class="card">
            <div class="header-content">
              <div class="title-section">
                <h1 class="page-title">我的志愿表</h1>
                <p class="page-desc">
                  管理您的志愿填报方案，智能分析梯度合理性
                </p>
              </div>
              <div class="action-buttons">
                <el-button
                  @click="clearWishlist"
                  :disabled="wishlist.length === 0"
                >
                  <el-icon><Delete /></el-icon>
                  清空志愿表
                </el-button>
                <el-button
                  type="primary"
                  @click="analyzeWishlist"
                  :disabled="wishlist.length === 0"
                >
                  <el-icon><DataAnalysis /></el-icon>
                  智能分析
                </el-button>
              </div>
            </div>
          </div>
        </section>

        <!-- 志愿表统计 -->
        <section class="wishlist-stats" v-if="wishlist.length > 0">
          <div class="card">
            <h2 class="section-title">志愿表统计</h2>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">{{ wishlist.length }}</div>
                <div class="stat-label">总志愿数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ rushCount }}</div>
                <div class="stat-label">冲刺院校</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ stableCount }}</div>
                <div class="stat-label">稳定院校</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ safeCount }}</div>
                <div class="stat-label">保底院校</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 志愿表列表 -->
        <section class="wishlist-content">
          <div v-if="wishlist.length === 0" class="empty-state">
            <el-empty description="志愿表为空">
              <el-button type="primary" @click="goToRecommendation">
                去添加志愿
              </el-button>
            </el-empty>
          </div>

          <div v-else class="wishlist-list">
            <div
              v-for="(school, index) in wishlist"
              :key="school.id"
              class="wishlist-item"
              :class="`wishlist-item--${getSchoolType(school)}`"
            >
              <div class="item-header">
                <div class="item-order">
                  <span class="order-number">{{ index + 1 }}</span>
                  <span class="order-label">第{{ index + 1 }}志愿</span>
                </div>
                <div class="item-actions">
                  <el-button
                    size="small"
                    @click="moveUp(index)"
                    :disabled="index === 0"
                  >
                    <el-icon><ArrowUp /></el-icon>
                  </el-button>
                  <el-button
                    size="small"
                    @click="moveDown(index)"
                    :disabled="index === wishlist.length - 1"
                  >
                    <el-icon><ArrowDown /></el-icon>
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="removeFromWishlist(school.id)"
                  >
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </div>

              <div class="item-content">
                <div class="school-info">
                  <div class="school-logo">
                    <el-icon><School /></el-icon>
                  </div>
                  <div class="school-details">
                    <h3 class="school-name">{{ school.name }}</h3>
                    <div class="school-meta">
                      <span class="location">
                        <el-icon><Location /></el-icon>
                        {{ school.location }}
                      </span>
                      <span class="level">{{ school.level }}</span>
                    </div>
                  </div>
                </div>

                <div class="school-data">
                  <div class="data-item">
                    <span class="label">最低分</span>
                    <span class="value">{{ school.minScore2023 }}分</span>
                  </div>
                  <div class="data-item">
                    <span class="label">最低排名</span>
                    <span class="value">{{ school.minRank2023 }}名</span>
                  </div>
                  <div class="data-item">
                    <span class="label">录取概率</span>
                    <span
                      class="value"
                      :class="`probability--${getProbabilityClass(
                        school.admissionProbability
                      )}`"
                    >
                      {{ school.admissionProbability }}
                    </span>
                  </div>
                </div>

                <div class="item-actions-mobile">
                  <el-button size="small" @click="viewSchoolDetail(school.id)">
                    查看详情
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 智能分析结果 -->
        <section class="analysis-section" v-if="analysisResult">
          <div class="card">
            <h2 class="section-title">智能分析结果</h2>

            <div class="analysis-content">
              <div
                class="analysis-item"
                v-for="item in analysisResult"
                :key="item.type"
              >
                <div
                  class="analysis-icon"
                  :class="`analysis-icon--${item.level}`"
                >
                  <el-icon v-if="item.level === 'success'"
                    ><CircleCheck
                  /></el-icon>
                  <el-icon v-else-if="item.level === 'warning'"
                    ><Warning
                  /></el-icon>
                  <el-icon v-else><CircleClose /></el-icon>
                </div>
                <div class="analysis-text">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 导出功能 -->
        <section class="export-section" v-if="wishlist.length > 0">
          <div class="card">
            <h2 class="section-title">导出志愿表</h2>
            <div class="export-actions">
              <el-button @click="exportToPDF">
                <el-icon><Document /></el-icon>
                导出PDF
              </el-button>
              <el-button @click="exportToExcel">
                <el-icon><DocumentCopy /></el-icon>
                导出Excel
              </el-button>
              <el-button @click="printWishlist">
                <el-icon><Printer /></el-icon>
                打印志愿表
              </el-button>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "Wishlist",
  data() {
    return {
      analysisResult: null,
    };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    wishlist() {
      return this.userStore.wishlist;
    },
    rushCount() {
      return this.wishlist.filter(
        (school) => this.getSchoolType(school) === "rush"
      ).length;
    },
    stableCount() {
      return this.wishlist.filter(
        (school) => this.getSchoolType(school) === "stable"
      ).length;
    },
    safeCount() {
      return this.wishlist.filter(
        (school) => this.getSchoolType(school) === "safe"
      ).length;
    },
  },
  methods: {
    getSchoolType(school) {
      const userScore = parseInt(this.userStore.userInfo.score);
      const userRank = parseInt(this.userStore.userInfo.rank);

      if (
        school.minScore2023 > userScore - 10 ||
        school.minRank2023 < userRank - 200
      ) {
        return "rush";
      } else if (
        school.minScore2023 < userScore - 10 ||
        school.minRank2023 > userRank + 200
      ) {
        return "safe";
      } else {
        return "stable";
      }
    },
    getProbabilityClass(probability) {
      const classMap = {
        风险较高: "high-risk",
        较稳: "stable",
        很稳: "safe",
      };
      return classMap[probability] || "stable";
    },
    moveUp(index) {
      if (index > 0) {
        const newWishlist = [...this.wishlist];
        const temp = newWishlist[index];
        newWishlist[index] = newWishlist[index - 1];
        newWishlist[index - 1] = temp;
        this.userStore.wishlist = newWishlist;
      }
    },
    moveDown(index) {
      if (index < this.wishlist.length - 1) {
        const newWishlist = [...this.wishlist];
        const temp = newWishlist[index];
        newWishlist[index] = newWishlist[index + 1];
        newWishlist[index + 1] = temp;
        this.userStore.wishlist = newWishlist;
      }
    },
    removeFromWishlist(schoolId) {
      ElMessageBox.confirm("确定要从志愿表中移除这所院校吗？", "确认删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.userStore.removeFromWishlist(schoolId);
          ElMessage.success("已从志愿表中移除");
        })
        .catch(() => {
          // 用户取消删除
        });
    },
    clearWishlist() {
      ElMessageBox.confirm(
        "确定要清空整个志愿表吗？此操作不可恢复。",
        "确认清空",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.userStore.clearWishlist();
          this.analysisResult = null;
          ElMessage.success("志愿表已清空");
        })
        .catch(() => {
          // 用户取消清空
        });
    },
    analyzeWishlist() {
      const analysis = [];

      // 分析冲刺院校数量
      if (this.rushCount === 0) {
        analysis.push({
          type: "rush",
          level: "warning",
          title: "缺少冲刺院校",
          description: "建议添加1-2所冲刺院校，增加冲击更好学校的机会",
        });
      } else if (this.rushCount > 3) {
        analysis.push({
          type: "rush",
          level: "error",
          title: "冲刺院校过多",
          description: "冲刺院校过多可能导致滑档风险，建议控制在2-3所",
        });
      } else {
        analysis.push({
          type: "rush",
          level: "success",
          title: "冲刺院校合理",
          description: `当前有${this.rushCount}所冲刺院校，数量合理`,
        });
      }

      // 分析稳定院校数量
      if (this.stableCount === 0) {
        analysis.push({
          type: "stable",
          level: "warning",
          title: "缺少稳定院校",
          description: "建议添加3-5所稳定院校，确保有合适的保底选择",
        });
      } else if (this.stableCount < 3) {
        analysis.push({
          type: "stable",
          level: "warning",
          title: "稳定院校偏少",
          description: "稳定院校偏少，建议增加到3-5所，降低滑档风险",
        });
      } else {
        analysis.push({
          type: "stable",
          level: "success",
          title: "稳定院校充足",
          description: `当前有${this.stableCount}所稳定院校，数量充足`,
        });
      }

      // 分析保底院校数量
      if (this.safeCount === 0) {
        analysis.push({
          type: "safe",
          level: "error",
          title: "缺少保底院校",
          description: "必须添加保底院校，避免滑档风险！",
        });
      } else if (this.safeCount < 2) {
        analysis.push({
          type: "safe",
          level: "warning",
          title: "保底院校偏少",
          description: "建议至少添加2所保底院校，确保录取安全",
        });
      } else {
        analysis.push({
          type: "safe",
          level: "success",
          title: "保底院校充足",
          description: `当前有${this.safeCount}所保底院校，录取安全有保障`,
        });
      }

      // 分析梯度合理性
      const totalCount = this.wishlist.length;
      if (totalCount < 6) {
        analysis.push({
          type: "gradient",
          level: "warning",
          title: "志愿数量偏少",
          description: "建议填报6-10个志愿，增加录取机会",
        });
      } else if (totalCount > 15) {
        analysis.push({
          type: "gradient",
          level: "warning",
          title: "志愿数量偏多",
          description: "志愿数量过多可能影响填报效率，建议控制在10-15个",
        });
      } else {
        analysis.push({
          type: "gradient",
          level: "success",
          title: "志愿数量合理",
          description: `当前${totalCount}个志愿，数量合理`,
        });
      }

      this.analysisResult = analysis;
      ElMessage.success("智能分析完成");
    },
    goToRecommendation() {
      this.$router.push("/recommendation");
    },
    viewSchoolDetail(schoolId) {
      this.$router.push(`/school/${schoolId}`);
    },
    exportToPDF() {
      ElMessage.info("PDF导出功能开发中...");
    },
    exportToExcel() {
      ElMessage.info("Excel导出功能开发中...");
    },
    printWishlist() {
      window.print();
    },
  },
};
</script>

<style scoped lang="scss">
.wishlist {
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

.main {
  padding: 20px 0 40px;
}

.wishlist-header {
  margin-bottom: 30px;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-section {
      .page-title {
        font-size: 28px;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 8px 0;
      }

      .page-desc {
        color: var(--text-regular);
        margin: 0;
      }
    }

    .action-buttons {
      display: flex;
      gap: 10px;
    }
  }
}

.wishlist-stats {
  margin-bottom: 30px;

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;

    .stat-item {
      text-align: center;
      padding: 20px;
      background: var(--bg-light);
      border-radius: 8px;

      .stat-value {
        font-size: 24px;
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 8px;
      }

      .stat-label {
        color: var(--text-secondary);
        font-size: 14px;
      }
    }
  }
}

.wishlist-content {
  margin-bottom: 30px;

  .empty-state {
    text-align: center;
    padding: 60px 0;
  }

  .wishlist-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}

.wishlist-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid transparent;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }

  &--rush {
    border-left-color: var(--danger-color);
  }

  &--stable {
    border-left-color: var(--warning-color);
  }

  &--safe {
    border-left-color: var(--success-color);
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .item-order {
      display: flex;
      align-items: center;
      gap: 10px;

      .order-number {
        width: 30px;
        height: 30px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
      }

      .order-label {
        color: var(--text-regular);
        font-weight: 500;
      }
    }

    .item-actions {
      display: flex;
      gap: 5px;
    }
  }

  .item-content {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;
    align-items: center;

    .school-info {
      display: flex;
      gap: 15px;
      align-items: center;

      .school-logo {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), #66b1ff);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        flex-shrink: 0;
      }

      .school-details {
        .school-name {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 8px 0;
        }

        .school-meta {
          display: flex;
          gap: 15px;

          .location {
            display: flex;
            align-items: center;
            gap: 4px;
            color: var(--text-secondary);
            font-size: 14px;
          }

          .level {
            background: var(--primary-color);
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
        }
      }
    }

    .school-data {
      display: flex;
      gap: 20px;

      .data-item {
        text-align: center;

        .label {
          display: block;
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .value {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);

          &.probability--high-risk {
            color: var(--danger-color);
          }

          &.probability--stable {
            color: var(--warning-color);
          }

          &.probability--safe {
            color: var(--success-color);
          }
        }
      }
    }

    .item-actions-mobile {
      display: none;
    }
  }
}

.analysis-section {
  margin-bottom: 30px;

  .analysis-content {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .analysis-item {
      display: flex;
      gap: 15px;
      align-items: flex-start;

      .analysis-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;

        &--success {
          background: #f0f9ff;
          color: var(--success-color);
        }

        &--warning {
          background: #fdf6ec;
          color: var(--warning-color);
        }

        &--error {
          background: #fef0f0;
          color: var(--danger-color);
        }
      }

      .analysis-text {
        flex: 1;

        h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 8px 0;
        }

        p {
          color: var(--text-regular);
          line-height: 1.5;
          margin: 0;
        }
      }
    }
  }
}

.export-section {
  .export-actions {
    display: flex;
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .wishlist-header .header-content {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  .wishlist-stats .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .wishlist-item .item-content {
    grid-template-columns: 1fr;
    gap: 15px;

    .school-data {
      justify-content: space-around;
    }

    .item-actions-mobile {
      display: block;
      text-align: center;
    }
  }

  .export-section .export-actions {
    flex-direction: column;
  }
}
</style>
