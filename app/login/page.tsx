import {signup } from './actions'

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="first_name">First Name:</label>
      <input id="first_name" name="first_name" type="text" required />

      <label htmlFor="last_name">Last Name:</label>
      <input id="last_name" name="last_name" type="text" required />

      <label htmlFor="phone_number">Phone Number:</label>
      <input id="phone_number" name="phone_number" type="tel" required />

      <label htmlFor="address">Address:</label>
      <input id="address" name="address" type="text" required />

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />

      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />

      <button formAction={signup}>Sign up</button>
    </form>
  )
}
