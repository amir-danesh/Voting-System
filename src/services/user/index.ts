import UserRepository from "../../repositories/user";

const userReposity = new UserRepository();

export const userLogin = (username: string, password: string) => {
    const user = userReposity.getUserByUsernameAndPassword(username, password);

    return user
        ? {
              status: 200,
              response: {
                  message: "login successful",
                  data: user,
              },
          }
        : {
              status: 401,
              response: {
                  message: "login failed",
              },
          };
};
