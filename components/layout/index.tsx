import Drawer from "@/components/Drawer";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("");
  const router = useRouter();

  useEffect(() => {
    const pathname = router.pathname;
    const activeTabName = pathname.replace("/", "");

    setActiveTab(activeTabName);
  }, [router.pathname]);

  return (
    <main className="flex">
      <Drawer />
      <div className="w-full">
        <header
          className={cn("hidden w-full z-50", {
            "bg-white border-b": session?.user,
          })}
        >
          <nav className="flex items-center h-16 px-8">
            {/* <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <h1 className="text-gray-800 font-semibold text-xl">
                  LLM Report
                </h1>
              </Link> 
              <div className="flex-1" />

              {/* {session?.user && (
                <div className="flex justify-center items-center ml-auto">
                  <UserDropdownMenu />
                </div>
              )} */}
          </nav>
        </header>
        <div
          className={cn("w-full space-y-4 md:p-8 p-4 pt-6 h-screen", {
            "h-[calc(100vh-4rem)]": false,
            "overflow-auto": session?.user,
            "max-w-[1280px] mx-auto": !session?.user,
          })}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
