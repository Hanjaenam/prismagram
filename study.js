/**
 * - graphql은 prisma문법을 이해하지 못하기 때문에 datamodel.prisma를
 *   models.graphql로 복사해주고 "@ ~" 삭제해준 것.
 */

/**
 * 1. Prisma서버를 통해 타입을 지정해준다.
 * 2. prisma deploy를 해주면 prisma가 지정해준 타입을 기반으로 모델스키마와 여러가지 CRUD함수들을 생성해준다.
 * 3. prisma generate를 하면 현재 내 서버에 prisma가 만들어준 모델스키마와 여러가지 CRUD함수들을 연결시켜준다.
 * 4. 현재 내 서버는 prisma에 연결된 스키마와 CRUD함수들만 있을 뿐, 그에 대한 데이터를 가져오려면 Query와 Mutation을 생성해주어야 한다.
 */

/**
 * - prisma where은 unique타입들로만 확인가능하다.
 */

/**
 * 1. sendmail - google로 메일 한 번 보내볼 것
 * 2. mailgun, AWS SES도 한 번 해볼 것.
 */

/**
 * [URL]
 * 1. https://randomwordgenerator.com/
 * 2. randomkeygen.com
 */

/**
 * 1. GraphQLServer({schema, context: ({request}) => console.log(request)})
 *  - express의 request를 뜻한다.
 */

/**
 * [passport-jwt]
 * 1. server - server.express.use(authenticateJwt)
 * 2. authenticateJwt : passport.authenticate('jwt', callback)
 * 3. passport.use(new Strategy(jwtOptions, verifyUser))
 * 4. header에 넣어준 authorization: bearer "Token" 을 갖고 verifyUser 호출
 * 5. 이후 authenticate 의 callback함수 호출
 * 6. user가 있으면 req.user 에 user을 저장한다.
 */

/**
 * 1. computed Field
 *  - database에 schema를 만든 것은 아니다. ( database에 존재하진 않음 )
 *  - 하지만, server graphQL에서 필요한 field들
 *  - database에 존재하는 data 를 통해 가공하여 새로 만든 데이터를 가진 field
 * 2. models.graphql : [amIFollowing,itsMe,fullName,isLiked]
 */

export default {
  Query: {
    // me: (_, __, { request, isAuthenticated }) => {
    //   isAuthenticated(request);
    //   const { user } = request;
    //   return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
    // },
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();
      return {
        user: userProfile,
        posts,
      };
    },
  },
  User: {
    /**
     * 1. 여기서 parent는 위 함수 me에서 return한 user
     *    - 무조건 me에서 return한 user만 뜻하는 것은 아님
     *    - 이 fullName을 불러내는 상위 resolver를 뜻하는 것.
     *    - user { fullName } -> user
     *    - potato { fullName } -> potato ( potato가 user의 data를 가지고 있으면 정상 출력 )
     *    - ⭐️ fullName은 User내부에 schema type으로 이미 지정 되어 있고, 여기서 resolver를 만들어 준 것.
     *      - ⭐️ 즉 parent는 항상 그 schema field라는 것.
     * 2. Playground -> me { user { fullName } }
     * 3. 이 함수를 작성하지 않아도 me { user { fullName } } 은 정상적으로 실행된다.
     *    하지만, fullName field를 만든 이유는 first Name과 last Name을 붙여서
     *    출력하려고 사용하는 것이기 때문에 함수를 만든 것.
     * 4. 다른 Query에서 return을 user을 하는 곳이 있다면 그 Query 에서도 호출 가능하다.
     *    왜냐하면 schema.js에서 모두 merge하고 있기 때문에
     */
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
  },
  Post: {
    /**
     * 1. 여기서 parent는 위 함수 me에서 return한 posts
     * 2. Playground -> me { posts { isLiked } }
     */
    isLiked: (parent, __, { request }) => {
      console.log(parent);
      return false;
    },
  },
};
