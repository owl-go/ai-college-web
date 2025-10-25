<template>
  <div class="login">
    <div class="login-container">
      <div class="login-header">
        <h1 class="login-title">志愿通</h1>
        <p class="login-subtitle">高考志愿填报助手</p>
      </div>

      <div class="login-form-container">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="phone">
            <el-input
              v-model="loginForm.phone"
              placeholder="请输入手机号"
              size="large"
              :prefix-icon="Phone"
            />
          </el-form-item>

          <el-form-item prop="code">
            <div class="code-input-group">
              <el-input
                v-model="loginForm.code"
                placeholder="请输入验证码"
                size="large"
                :prefix-icon="Message"
              />
              <el-button
                :disabled="countdown > 0"
                @click="sendCode"
                class="code-btn"
                size="large"
              >
                {{ countdown > 0 ? `${countdown}s` : "获取验证码" }}
              </el-button>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-btn"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 分割线 -->
        <div class="divider">
          <span class="divider-text">或</span>
        </div>

        <!-- 第三方登录 -->
        <div class="social-login">
          <div class="social-buttons">
            <el-button
              class="social-btn wechat-btn"
              @click="handleWechatLogin"
              :loading="wechatLoading"
              size="small"
            >
              <el-icon class="social-icon"><ChatDotRound /></el-icon>
              微信
            </el-button>
            <el-button
              class="social-btn qq-btn"
              @click="handleQQLogin"
              :loading="qqLoading"
              size="small"
            >
              <el-icon class="social-icon"><Message /></el-icon>
              QQ
            </el-button>
            <el-button
              class="social-btn alipay-btn"
              @click="handleAlipayLogin"
              :loading="alipayLoading"
              size="small"
            >
              <el-icon class="social-icon"><Wallet /></el-icon>
              支付宝
            </el-button>
          </div>
        </div>

        <div class="login-footer">
          <p class="agreement-text">
            登录即表示同意
            <a href="#" class="agreement-link">《用户协议》</a>
            和
            <a href="#" class="agreement-link">《隐私政策》</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { Phone, Message, ChatDotRound, Wallet } from "@element-plus/icons-vue";

export default {
  name: "Login",
  components: {
    Phone,
    Message,
    ChatDotRound,
    Wallet,
  },
  data() {
    return {
      loading: false,
      wechatLoading: false,
      qqLoading: false,
      alipayLoading: false,
      countdown: 0,
      loginForm: {
        phone: "",
        code: "",
      },
      loginRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位数字验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async sendCode() {
      if (!this.loginForm.phone) {
        ElMessage.warning("请先输入手机号");
        return;
      }

      if (!/^1[3-9]\d{9}$/.test(this.loginForm.phone)) {
        ElMessage.warning("请输入正确的手机号");
        return;
      }

      try {
        // 模拟发送验证码
        await new Promise((resolve) => setTimeout(resolve, 1000));
        ElMessage.success("验证码已发送");

        // 开始倒计时
        this.countdown = 60;
        const timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(timer);
          }
        }, 1000);
      } catch (error) {
        ElMessage.error("发送验证码失败，请重试");
      }
    },

    async handleLogin() {
      try {
        await this.$refs.loginFormRef.validate();
        this.loading = true;

        // 模拟登录API调用
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // 模拟验证码验证
        if (this.loginForm.code !== "123456") {
          ElMessage.error("验证码错误，请输入123456");
          this.loading = false;
          return;
        }

        // 登录成功，保存用户信息
        const userInfo = {
          phone: this.loginForm.phone,
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        ElMessage.success("登录成功");

        // 跳转到主页
        this.$router.push("/");
      } catch (error) {
        console.error("登录失败:", error);
      } finally {
        this.loading = false;
      }
    },

    // 微信登录
    async handleWechatLogin() {
      this.wechatLoading = true;
      try {
        // 模拟微信登录
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 模拟获取微信用户信息
        const userInfo = {
          phone: "138****8888",
          loginType: "wechat",
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        ElMessage.success("微信登录成功");
        this.$router.push("/");
      } catch (error) {
        ElMessage.error("微信登录失败，请重试");
      } finally {
        this.wechatLoading = false;
      }
    },

    // QQ登录
    async handleQQLogin() {
      this.qqLoading = true;
      try {
        // 模拟QQ登录
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 模拟获取QQ用户信息
        const userInfo = {
          phone: "139****9999",
          loginType: "qq",
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        ElMessage.success("QQ登录成功");
        this.$router.push("/");
      } catch (error) {
        ElMessage.error("QQ登录失败，请重试");
      } finally {
        this.qqLoading = false;
      }
    },

    // 支付宝登录
    async handleAlipayLogin() {
      this.alipayLoading = true;
      try {
        // 模拟支付宝登录
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 模拟获取支付宝用户信息
        const userInfo = {
          phone: "137****7777",
          loginType: "alipay",
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        ElMessage.success("支付宝登录成功");
        this.$router.push("/");
      } catch (error) {
        ElMessage.error("支付宝登录失败，请重试");
      } finally {
        this.alipayLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.login-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .login-title {
    font-size: 36px;
    font-weight: 700;
    margin: 0 0 10px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .login-subtitle {
    font-size: 16px;
    margin: 0;
    opacity: 0.9;
  }
}

.login-form-container {
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-form {
  .el-form-item {
    margin-bottom: 24px;
  }

  .code-input-group {
    display: flex;
    gap: 12px;

    .el-input {
      flex: 1;
    }

    .code-btn {
      min-width: 120px;
    }
  }

  .login-btn {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
  }
}

.divider {
  margin: 30px 0;
  text-align: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border-light);
  }

  .divider-text {
    background: white;
    padding: 0 20px;
    color: var(--text-secondary);
    font-size: 14px;
    position: relative;
    z-index: 1;
  }
}

.social-login {
  .social-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;

    .social-btn {
      flex: 1;
      height: 40px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.3s;

      .social-icon {
        font-size: 16px;
      }

      &.wechat-btn {
        background: #07c160;
        border-color: #07c160;
        color: white;

        &:hover {
          background: #06ad56;
          border-color: #06ad56;
        }
      }

      &.qq-btn {
        background: #12b7f5;
        border-color: #12b7f5;
        color: white;

        &:hover {
          background: #0ea5e9;
          border-color: #0ea5e9;
        }
      }

      &.alipay-btn {
        background: #1677ff;
        border-color: #1677ff;
        color: white;

        &:hover {
          background: #4096ff;
          border-color: #4096ff;
        }
      }
    }
  }
}

.login-footer {
  margin-top: 30px;
  text-align: center;

  .agreement-text {
    color: var(--text-secondary);
    font-size: 14px;
    margin: 0;

    .agreement-link {
      color: var(--primary-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .login-container {
    max-width: 400px;
  }

  .login-header {
    padding: 30px 20px;

    .login-title {
      font-size: 28px;
    }

    .login-subtitle {
      font-size: 14px;
    }
  }

  .login-form-container {
    padding: 30px 20px;
  }

  .social-login {
    .social-buttons {
      .social-btn {
        height: 36px;
        font-size: 13px;
        gap: 4px;

        .social-icon {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
