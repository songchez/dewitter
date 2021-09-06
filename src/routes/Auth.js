import { useState } from "react";
import Auth from "firebase/auth";

function Auth_signIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) =>{
        const {target: {name, value}} = event;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
    }

  const onSubmit =  async (event) =>{
        event.preventDefault();
        const auth = Auth.getAuth();
        if (newAccount) {
          //create account
          await Auth.createUserWithEmailAndPassword(auth, email, password);
        } else {
          //login
          await Auth.signInWithEmailAndPassword(auth, email,password);
        }
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
            onChange = {onChange}
          />
          <p/>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange = {onChange}
          />
          <input type="submit" value={newAccount ? "Sign Up" : "Login"} />
        </form>
        <div>
          <p/>
          <button type="button">Sign Up</button><p/>
          <button type="button">Continue with Google</button><p/>
          <button type="button">Continue with Github</button>
        </div>
      </div>
    );
}

export default Auth_signIn;
