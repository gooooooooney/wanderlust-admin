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
        <div className="p-4 rounded-b-none rounded-tr-none rounded-md w-full border-l border-t dark:border-gray-700">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout