import { useState } from "react";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,GithubAuthProvider} from "firebase/auth";
import f_app from "../m_base";

const auth = getAuth(f_app);

function Auth_signIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("")

  const onChange = (event) =>{
        const {target: {name, value}} = event;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
    }
  
  let data
  const onSubmit =  async (event) =>{
        event.preventDefault();
        try {
          if (newAccount) {
            //create account
            data = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
          } else {
            //login
            data = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
          }
          console.log(data);
        } catch (error) {
          setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev)=> !prev);
    const onSocialClick = async (event) => {
      const {
        target: { name },
      } = event;
      let provider;
      if (name === "google"){
        provider = new GoogleAuthProvider(auth);
      } else if(name === "github"){
        provider = new GithubAuthProvider(auth);
      }
      await signInWithPopup(auth, provider)
      .then((result) => {
        //This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        //const user = result.user;
      }).catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        // // Handle Errors here.
        // const errorCode = error.code;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
    } 
    return (
      <div>
        <h3>로그인페이지</h3>
        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            placeholder="E_mail"
            required
            value={email}
            onChange={onChange}
          />
          <p />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
          <input
            type="submit"
            value={newAccount ? "CreatAccount" : "Sign In"}
          />
        </form>
        <span onClick={toggleAccount}>
          {newAccount ? "Sign In" : "CreatAccount"}
        </span>
        <div>
          <p />
          <button onClick={onSocialClick} name="github">
            Continue with Github
          </button>
          <p />
          <button onClick={onSocialClick} name="google">
            Continue with Google
          </button>
          <p />
          <p>{error}</p>
        </div>
      </div>
    );
}

export default Auth_signIn;
