const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

/*


*/

const resolvers = {
  Query: {
    //USER RESOLVERS
    users: (parent, args, context, info) => {
      // console.log(context);
      // console.log(info);
      if (UserList) return { users: UserList };
      return { message: "There was an error." };
    },
    user: (parent, args, context, info) => {
      const id = args.id;
      return _.find(UserList, { id: Number(id) });
    },

    //MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      return _.find(MovieList, { name });
    },
  },

  User: {
    favoriteMovies: (parent) => {
      // console.log(parent)

      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const id = Number(args.input.id);
      const newUsername = args.input.newUsername;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === id) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },

  UsersResult: {
    __resolveType(obj) {
      if (obj.users) return "UsersSuccessfulResult";

      if (obj.message) return "UsersErrorResult";

      return null
    },
  },
};

module.exports = { resolvers };
