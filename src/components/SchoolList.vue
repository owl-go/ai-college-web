<template>
  <div class="school-list">
    <div v-if="schools.length === 0" class="empty-state">
      <el-empty description="暂无推荐院校" />
    </div>

    <div v-else class="schools-grid">
      <div
        v-for="school in schools"
        :key="school.id"
        class="school-card"
        :class="`school-card--${type}`"
      >
        <!-- 学校基本信息 -->
        <div class="school-header">
          <div class="school-logo">
            <el-icon><School /></el-icon>
          </div>
          <div class="school-info">
            <h3 class="school-name">{{ school.name }}</h3>
            <div class="school-meta">
              <span class="location">
                <el-icon><Location /></el-icon>
                {{ school.location }}
              </span>
              <span class="level">{{ school.level }}</span>
            </div>
          </div>
          <div
            class="probability-badge"
            :class="`probability-badge--${getProbabilityClass(
              school.admissionProbability
            )}`"
          >
            {{ school.admissionProbability }}
          </div>
        </div>

        <!-- 分数对比 -->
        <div class="score-comparison">
          <div class="score-item">
            <span class="label">2023年最低分</span>
            <span class="value">{{ school.minScore2023 }}分</span>
          </div>
          <div class="score-item">
            <span class="label">分差</span>
            <span
              class="value"
              :class="school.scoreDiff >= 0 ? 'positive' : 'negative'"
            >
              <el-icon v-if="school.scoreDiff > 0"><ArrowUp /></el-icon>
              <el-icon v-else-if="school.scoreDiff < 0"><ArrowDown /></el-icon>
              {{ Math.abs(school.scoreDiff) }}分
            </span>
          </div>
          <div class="score-item">
            <span class="label">2023年最低排名</span>
            <span class="value">{{ school.minRank2023 }}名</span>
          </div>
          <div class="score-item">
            <span class="label">排名差</span>
            <span
              class="value"
              :class="school.rankDiff >= 0 ? 'positive' : 'negative'"
            >
              <el-icon v-if="school.rankDiff > 0"><ArrowUp /></el-icon>
              <el-icon v-else-if="school.rankDiff < 0"><ArrowDown /></el-icon>
              {{ Math.abs(school.rankDiff) }}名
            </span>
          </div>
        </div>

        <!-- 热门专业 -->
        <div class="majors-section">
          <h4 class="majors-title">热门专业</h4>
          <div class="majors-list">
            <el-tag
              v-for="major in school.majors"
              :key="major"
              size="small"
              type="info"
              class="major-tag"
            >
              {{ major }}
            </el-tag>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="school-actions">
          <el-button
            type="primary"
            @click="handleAddToWishlist(school)"
            :disabled="isInWishlist(school.id)"
          >
            <el-icon><Plus /></el-icon>
            {{ isInWishlist(school.id) ? "已添加" : "加入志愿表" }}
          </el-button>
          <el-button @click="viewSchoolDetail(school.id)">
            <el-icon><View /></el-icon>
            查看详情
          </el-button>
        </div>

        <!-- 录取概率进度条 -->
        <div class="probability-bar">
          <div class="probability-label">录取概率</div>
          <el-progress
            :percentage="getProbabilityPercentage(school.admissionProbability)"
            :color="getProbabilityColor(school.admissionProbability)"
            :show-text="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";

export default {
  name: "SchoolList",
  props: {
    schools: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "stable",
    },
  },
  emits: ["add-to-wishlist"],
  computed: {
    userStore() {
      return useUserStore();
    },
  },
  methods: {
    isInWishlist(schoolId) {
      return this.userStore.wishlist.some((item) => item.id === schoolId);
    },
    handleAddToWishlist(school) {
      this.$emit("add-to-wishlist", school);
    },
    viewSchoolDetail(schoolId) {
      this.$router.push(`/school/${schoolId}`);
    },
    getProbabilityClass(probability) {
      const classMap = {
        风险较高: "high-risk",
        较稳: "stable",
        很稳: "safe",
      };
      return classMap[probability] || "stable";
    },
    getProbabilityPercentage(probability) {
      const percentageMap = {
        风险较高: 30,
        较稳: 70,
        很稳: 90,
      };
      return percentageMap[probability] || 50;
    },
    getProbabilityColor(probability) {
      const colorMap = {
        风险较高: "#f56c6c",
        较稳: "#e6a23c",
        很稳: "#67c23a",
      };
      return colorMap[probability] || "#409eff";
    },
  },
};
</script>

<style scoped lang="scss">
.school-list {
  .empty-state {
    text-align: center;
    padding: 60px 0;
  }

  .schools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
  }
}

.school-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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
}

.school-header {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;

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

  .school-info {
    flex: 1;

    .school-name {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 8px 0;
      line-height: 1.3;
    }

    .school-meta {
      display: flex;
      align-items: center;
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

  .probability-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;

    &--high-risk {
      background: #fef0f0;
      color: var(--danger-color);
      border: 1px solid #fde2e2;
    }

    &--stable {
      background: #fdf6ec;
      color: var(--warning-color);
      border: 1px solid #faecd8;
    }

    &--safe {
      background: #f0f9ff;
      color: var(--success-color);
      border: 1px solid #d9f7be;
    }
  }
}

.score-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;

  .score-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .label {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 4px;

      &.positive {
        color: var(--danger-color);
      }

      &.negative {
        color: var(--success-color);
      }
    }
  }
}

.majors-section {
  margin-bottom: 20px;

  .majors-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 10px;
  }

  .majors-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .major-tag {
      font-size: 12px;
    }
  }
}

.school-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;

  .el-button {
    flex: 1;
  }
}

.probability-bar {
  .probability-label {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }
}

@media (max-width: 768px) {
  .school-list .schools-grid {
    grid-template-columns: 1fr;
  }

  .school-card {
    padding: 15px;
  }

  .school-header {
    flex-direction: column;
    gap: 10px;

    .school-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }

  .score-comparison {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .school-actions {
    flex-direction: column;
  }
}
</style>
