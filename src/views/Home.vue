<template>
  <div class="home">
    <!-- 头部导航 -->
    <header class="header">
      <div class="container">
        <div class="nav">
          <h1 class="logo">
            <el-icon><School /></el-icon>
            志愿通
          </h1>
          <nav class="nav-menu">
            <router-link to="/wishlist" class="nav-link">
              <el-icon><List /></el-icon>
              我的志愿表
            </router-link>
            <div class="user-actions">
              <template v-if="isLoggedIn">
                <span class="user-info">{{ userPhone }}</span>
                <el-button @click="handleLogout" type="text" class="logout-btn">
                  <el-icon><SwitchButton /></el-icon>
                  退出
                </el-button>
              </template>
              <template v-else>
                <el-button @click="goToLogin" type="primary" size="small">
                  <el-icon><User /></el-icon>
                  登录
                </el-button>
              </template>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main">
      <div class="container">
        <!-- 欢迎区域 -->
        <section class="welcome-section">
          <div class="welcome-content">
            <h2 class="welcome-title">智能志愿填报，让每一分都更有价值</h2>
            <p class="welcome-desc">
              基于海量历史数据，为您精准推荐"冲稳保"三档院校
            </p>
          </div>
        </section>

        <!-- 核心输入区域 -->
        <section class="input-section">
          <div class="card input-card">
            <h3 class="input-title">开始填报志愿</h3>
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-width="100px"
              class="input-form"
            >
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="所在省份" prop="province">
                    <el-select
                      v-model="form.province"
                      placeholder="请选择省份"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="province in provinces"
                        :key="province.value"
                        :label="province.label"
                        :value="province.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="科目类型" prop="subject">
                    <el-select
                      v-model="form.subject"
                      placeholder="请选择科目类型"
                      style="width: 100%"
                      @change="handleSubjectChange"
                    >
                      <el-option label="文科" value="wen" />
                      <el-option label="理科" value="li" />
                      <el-option label="新高考" value="xin" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 新高考科目选择 -->
              <el-row
                v-if="form.subject === 'xin'"
                :gutter="20"
                class="new-gaokao-section"
              >
                <el-col :span="24">
                  <div class="subject-tip">
                    <el-icon><InfoFilled /></el-icon>
                    <span
                      >新高考模式下，请选择首选科目（物理/历史）和2门再选科目</span
                    >
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="首选科目" prop="firstSubject">
                    <el-select
                      v-model="form.firstSubject"
                      placeholder="请选择首选科目"
                      style="width: 100%"
                    >
                      <el-option label="物理" value="physics" />
                      <el-option label="历史" value="history" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="再选科目" prop="secondSubjects">
                    <el-select
                      v-model="form.secondSubjects"
                      placeholder="请选择2门再选科目"
                      style="width: 100%"
                      multiple
                      :max-collapse-tags="2"
                    >
                      <el-option label="化学" value="chemistry" />
                      <el-option label="生物" value="biology" />
                      <el-option label="政治" value="politics" />
                      <el-option label="地理" value="geography" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="高考分数" prop="score">
                    <el-input
                      v-model="form.score"
                      placeholder="请输入高考分数"
                      type="number"
                      :min="0"
                      :max="750"
                    >
                      <template #append>分</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="省级排名" prop="rank">
                    <el-input
                      v-model="form.rank"
                      placeholder="请输入省级排名"
                      type="number"
                      :min="1"
                    >
                      <template #append>名</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button
                  type="primary"
                  size="large"
                  @click="handleSubmit"
                  :loading="loading"
                  class="submit-btn"
                >
                  <el-icon><Search /></el-icon>
                  一键生成我的志愿报告
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </section>

        <!-- 功能特色 -->
        <section class="features-section">
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <el-icon><TrendCharts /></el-icon>
              </div>
              <h4>智能推荐</h4>
              <p>基于历年录取数据，智能分析"冲稳保"三档院校</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <el-icon><DataAnalysis /></el-icon>
              </div>
              <h4>数据精准</h4>
              <p>与官方数据同步，确保信息准确及时</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <el-icon><Monitor /></el-icon>
              </div>
              <h4>可视化分析</h4>
              <p>直观的图表展示，让数据一目了然</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <el-icon><Document /></el-icon>
              </div>
              <h4>志愿表管理</h4>
              <p>自定义志愿表，智能分析梯度合理性</p>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 志愿通 - 让每一分都更有价值</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";

export default {
  name: "Home",
  data() {
    return {
      formRef: null,
      loading: false,
      form: {
        province: "",
        subject: "",
        firstSubject: "",
        secondSubjects: [],
        score: "",
        rank: "",
      },
      rules: {
        province: [
          { required: true, message: "请选择所在省份", trigger: "change" },
        ],
        subject: [
          { required: true, message: "请选择科目类型", trigger: "change" },
        ],
        firstSubject: [
          {
            validator: (rule, value, callback) => {
              if (this.form.subject === "xin" && !value) {
                callback(new Error("请选择首选科目"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
        secondSubjects: [
          {
            validator: (rule, value, callback) => {
              if (
                this.form.subject === "xin" &&
                (!value || value.length === 0)
              ) {
                callback(new Error("请选择再选科目"));
              } else if (this.form.subject === "xin" && value.length !== 2) {
                callback(new Error("请选择2门再选科目"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
        score: [
          { required: true, message: "请输入高考分数", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              const num = Number(value);
              if (isNaN(num) || num < 0 || num > 750) {
                callback(new Error("分数应在0-750之间"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        rank: [
          { required: true, message: "请输入省级排名", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              const num = Number(value);
              if (isNaN(num) || num < 1) {
                callback(new Error("排名应大于0"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      provinces: [
        { label: "北京", value: "beijing" },
        { label: "上海", value: "shanghai" },
        { label: "广东", value: "guangdong" },
        { label: "江苏", value: "jiangsu" },
        { label: "浙江", value: "zhejiang" },
        { label: "山东", value: "shandong" },
        { label: "河南", value: "henan" },
        { label: "四川", value: "sichuan" },
        { label: "湖北", value: "hubei" },
        { label: "湖南", value: "hunan" },
        { label: "河北", value: "hebei" },
        { label: "安徽", value: "anhui" },
        { label: "福建", value: "fujian" },
        { label: "江西", value: "jiangxi" },
        { label: "辽宁", value: "liaoning" },
        { label: "吉林", value: "jilin" },
        { label: "黑龙江", value: "heilongjiang" },
        { label: "山西", value: "shanxi" },
        { label: "陕西", value: "shaanxi" },
        { label: "甘肃", value: "gansu" },
        { label: "青海", value: "qinghai" },
        { label: "宁夏", value: "ningxia" },
        { label: "新疆", value: "xinjiang" },
        { label: "西藏", value: "xizang" },
        { label: "云南", value: "yunnan" },
        { label: "贵州", value: "guizhou" },
        { label: "广西", value: "guangxi" },
        { label: "海南", value: "hainan" },
        { label: "内蒙古", value: "neimenggu" },
        { label: "天津", value: "tianjin" },
        { label: "重庆", value: "chongqing" },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("userInfo");
    },
    userPhone() {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        return parsed.phone
          ? parsed.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
          : "";
      }
      return "";
    },
  },
  methods: {
    // 科目文本转换
    getSubjectText(value) {
      const subjectMap = {
        wen: "文科",
        li: "理科",
        xin: "新高考",
        physics: "物理",
        history: "历史",
        chemistry: "化学",
        biology: "生物",
        politics: "政治",
        geography: "地理",
      };
      return subjectMap[value] || value;
    },

    // 处理科目类型变更
    handleSubjectChange(value) {
      if (value !== "xin") {
        // 如果不是新高考，清空新高考相关字段
        this.form.firstSubject = "";
        this.form.secondSubjects = [];
      }
    },

    async handleSubmit() {
      try {
        await this.$refs.formRef.validate();

        // 检查用户是否已登录
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
          // 未登录，跳转到登录页面
          this.$router.push("/login");
          return;
        }

        this.loading = true;

        // 保存用户信息到store，确保数字类型正确
        const userStore = useUserStore();
        const formData = {
          ...this.form,
          score: Number(this.form.score),
          rank: Number(this.form.rank),
          // 构建科目组合描述
          subjectCombination:
            this.form.subject === "xin"
              ? `${this.getSubjectText(
                  this.form.firstSubject
                )} + ${this.form.secondSubjects
                  .map(this.getSubjectText)
                  .join(" + ")}`
              : this.getSubjectText(this.form.subject),
        };
        userStore.updateUserInfo(formData);

        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 跳转到推荐结果页
        this.$router.push("/recommendation");

        ElMessage.success("正在为您生成志愿推荐...");
      } catch (error) {
        console.error("表单验证失败:", error);
      } finally {
        this.loading = false;
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    handleLogout() {
      localStorage.removeItem("userInfo");
      ElMessage.success("已退出登录");
      // 刷新页面以更新登录状态
      this.$router.go(0);
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
      margin: 0;
    }

    .nav-menu {
      display: flex;
      gap: 20px;
      align-items: center;

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

      .user-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: auto;

        .user-info {
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 500;
        }

        .logout-btn {
          color: var(--text-secondary);

          &:hover {
            color: var(--danger-color);
          }
        }
      }
    }
  }
}

.main {
  flex: 1;
  padding: 40px 0;
}

.welcome-section {
  text-align: center;
  margin-bottom: 60px;

  .welcome-content {
    max-width: 600px;
    margin: 0 auto;

    .welcome-title {
      font-size: 36px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 20px;
      line-height: 1.4;
    }

    .welcome-desc {
      font-size: 18px;
      color: var(--text-regular);
      line-height: 1.6;
    }
  }
}

.input-section {
  margin-bottom: 80px;

  .input-card {
    max-width: 800px;
    margin: 0 auto;

    .input-title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 30px;
    }

    .input-form {
      .submit-btn {
        width: 100%;
        height: 50px;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
}

.features-section {
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;

    .feature-card {
      text-align: center;
      padding: 30px 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      }

      .feature-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, var(--primary-color), #66b1ff);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
      }

      h4 {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 15px;
      }

      p {
        color: var(--text-regular);
        line-height: 1.6;
      }
    }
  }
}

.footer {
  background: var(--text-primary);
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: auto;
}

@media (max-width: 768px) {
  .welcome-section .welcome-content .welcome-title {
    font-size: 28px;
  }

  .features-section .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.new-gaokao-section {
  margin-top: 20px;

  .subject-tip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #f0f9ff;
    border: 1px solid #b3d8ff;
    border-radius: 6px;
    margin-bottom: 20px;
    color: var(--primary-color);
    font-size: 14px;

    .el-icon {
      font-size: 16px;
    }
  }
}
</style>
