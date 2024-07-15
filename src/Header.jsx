import {LogoutLink} from './LogoutLink'

export function Header() {
  return (
    <header>
      <nav>
      <a href="/">Home</a> | <a href="/signup">Signup</a> | <a href="login">Login</a> <LogoutLink />
      </nav>
    </header>
  )
}
