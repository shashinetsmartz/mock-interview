export const MockIntCurrentUser = () => {
    // const { loginToken, user, accesses } = useSelector(
    //   (state) => ({
    //     loginToken: get(state, "LoginSlice.loginToken", null),
    //     user: get(state, "LoginSlice.user", null),
    //     accesses: get(state, "LoginSlice.accesses", []),
    //   }),
    //   shallowEqual
    // );
  
    // const sessionToken = sessionStorage.getItem("sessionToken") || loginToken;
    const sessionToken = sessionStorage.getItem("sessionToken");
    return { sessionToken };
  };