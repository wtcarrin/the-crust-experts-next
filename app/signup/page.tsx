'use client'
import '../styles/globals.css'; // Import CSS to load for all pages
import { useRouter } from "next/navigation";
import { signup } from "../actions/signup";

//singup page for the site
export default function SignupPage() {
  const router = useRouter();

  //redirect user to login page
  const handleRedirect = () => {
    router.push("/login");
  };

  return (
    <section className="wrapper">
      <div className="form signup">
        <header>SIGN UP</header>
        {/*form with account creation fields*/}
        <form>
          {/*name fields*/}
          <label htmlFor="first_name">First Name:</label>
          <input id="first_name" name="first_name" type="text" required />

          <label htmlFor="last_name">Last Name:</label>
          <input id="last_name" name="last_name" type="text" required />

          {/*number field*/}
          <label htmlFor="phone_number">Phone Number:</label>
          <input id="phone_number" name="phone_number" type="tel" required />

          {/*address field*/}
          <label htmlFor="address">Address:</label>
          <input id="address" name="address" type="text" required />

          {/*email field*/}
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />

          {/*password field*/}
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />

          {/*submit button (sign up)*/}
          <button formAction={signup}>Sign up</button>
        </form>
      </div>
      <button onClick={handleRedirect}>Go to Login</button>
    </section>
  );
}
