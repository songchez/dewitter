import { useState } from "react";

function Auth () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) =>{
        const {target: {name, value}} = event;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
    }
    const onSubmit = (event) =>{
        event.preventDefault();
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
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange = {onChange}
          />
          <input type="submit" value="Log In" />
        </form>
        <div>
          <button type="button">Continue with Google</button>
          <button type="button">Continue with Github</button>
        </div>
      </div>
    );
}
export default Auth;
