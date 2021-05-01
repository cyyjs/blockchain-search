import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
const prefix = window.blocklet ? window.blocklet.prefix : '';
const baseURL = prefix || '/';
// 与 API 的 HTTP 连接
const httpLink = createHttpLink({
  uri: baseURL + "graphql",
});

// 缓存实现
const cache = new InMemoryCache();

// 创建 apollo 客户端
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient
