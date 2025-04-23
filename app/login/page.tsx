'use client'
import '../styles/globals.css'; // Import css here to load it for all pages
import { useRouter } from "next/navigation";
import { login } from "../actions/login";

//login page for the site
export default function LoginPage() {
  const router = useRouter();

  {/*send user to signup page*/}
  const handleRedirect = () => {
    router.push("/signup");
  };

  return (
    <section className="wrapper">
          <div className="form signup">
            <header>LOGIN</header>
            {/*form taking login information from user*/}
            <form>
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" type="email" required />
        
              <label htmlFor="password">Password:</label>
              <input id="password" name="password" type="password" required />
        
              <button formAction={login}>Log in</button>
            </form>
          </div>
          {/*redirect user to sign up page*/}
          <button onClick={handleRedirect}>Go to Signup</button>
        </section>
  );
}
