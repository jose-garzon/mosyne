import AngelState from "../context/angel/angelState";
import AuthState from "../context/auth/authState";
import UserState from "../context/user/userState";

function MyApp({ Component, pageProps }) {
  return (
    <UserState>
      <AuthState>
        <AngelState>
          <Component {...pageProps} />
        </AngelState>
      </AuthState>
    </UserState>
  );
}

export default MyApp;
