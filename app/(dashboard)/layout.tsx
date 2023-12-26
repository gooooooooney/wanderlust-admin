import { Header } from "./_components/header"
import Sidebar from "./_components/sidebar"

const DashboardLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex  flex-1">
        <Sidebar />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout