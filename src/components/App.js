import AppRouters from "components/Router";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "m_base";
import { useEffect, useState } from "react";
import { ReactComponent as Loader } from "images/Loader.svg";

//파이어베이스 초기화

function App() {
  const [init, setInit] = useState(false);
  const [f_user, setF_user] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setF_user({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          updateProfile: (args) => updateProfile(auth, args),
        });
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    if (auth.currentUser) {
      const u = auth.currentUser;
      setF_user({
        displayName: u.displayName,
        photoURL: u.photoURL,
        uid: u.uid,
        updateProfile: (args) => updateProfile(auth, args),
      });
    } else {
      setF_user(null);
    }
  };

  return (
    <>
      {init ? (
        <AppRouters refreshUser={refreshUser} user={f_user} />
      ) : (
        <div className="align-center">
          <Loader width="150" height="150" />
        </div>
      )}
    </>
  );
}

export default App;
