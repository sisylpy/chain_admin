// 一些全局的config配置
const modeUrlObj = {
  // 生产环境
  'production': {
    baseURL: 'https://grainservice.club:8080/chainOrder/',
    authBaseURL: ''
  },
  // 开发环境
  'development': {
    baseURL: 'https://grainservice.club:8080/chainOrder/',
    authBaseURL: ''
  },
  // 测试环境
  'test': {
    baseURL: 'https://grainservice.club:8080/chainOrder/',
    authBaseURL: ''
  }
}
export default modeUrlObj[process.env.NODE_ENV]
