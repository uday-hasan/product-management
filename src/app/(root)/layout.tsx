import SideNav from "@/components/Navigation/SideNav";
import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="sticky top-0 mb-2">
        <Header />
      </div>
      <div className="flex ">
        <div className="hidden bg-foreground/10  md:flex w-[250px] justify-center h-screen fixed p-4">
          <SideNav />
        </div>
        <div className="md:pl-[260px] w-full p-4 ">{children}</div>
      </div>
    </>
  );
}
