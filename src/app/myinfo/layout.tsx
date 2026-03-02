import MyInfoShell from "@/components/Myinfo/MyInfoShell";

export default function MyInfoLayout({ children }: { children: React.ReactNode }) {
    return <MyInfoShell>{children}</MyInfoShell>;
}
