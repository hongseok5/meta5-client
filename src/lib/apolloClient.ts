// apollo-client.ts
import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// GraphQL 서버의 링크를 생성합니다.
/*
const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql', // GraphQL 서버의 URI
});


const authLink = setContext((_, { headers = {} }) => {
  const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰 가져오기
  console.log("apollo : " +token);
  console.log("apollo : " + JSON.stringify(headers));
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // 토큰이 있으면 Authorization 헤더에 추가
    },
  };
});

// Apollo Client 생성
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink), // authLink와 httpLink를 연결 uri
  cache: new InMemoryCache(),
});
*/


const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});
export default client;
