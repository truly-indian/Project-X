import "./globals.css";
import SideBar from "@/components/common/sidebar";

export default function RootLayout({ children }) {

  return (
    <div className="flex h-full bg-white">
      <SideBar />
      <main className="flex-1 ml-0 md:ml-50 p-4">
        {children}
      </main>
    </div>
  );
}
