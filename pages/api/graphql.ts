import { gql, ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";

const typeDefs = gql`
  type Query {
    hello: UserData!
  }
`;

const resolvers = {
  Query: {
    hello: (_parents, _args, _context) => {
      return {
        id: 1,
        email: "maurice@moss.com",
        password: "abcdefg",
        settings: {
          brightness: 100,
          showSeconds: false,
          is24Hour: false,
          blur: false,
          font: "Courier New",
          background: "/images/fall.jpg",
          timers: {
            pomodoroTime: 150000,
            shortBreakTime: 300000,
          },
          autoStartBreak: false,
          alertSound: "alarm.wav",
        },
      };
    },
  },
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
