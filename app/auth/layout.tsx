// import { Logo } from "./_components/logo"

const AuthLayout = ({ children }: {
  children: React.ReactNode

}) => {
  return (
    <div className="h-full">
      {children}
    </div>
  )
}

export default AuthLayout