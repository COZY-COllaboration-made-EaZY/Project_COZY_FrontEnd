import RecruitList from "@/components/recruit/RecruitList";

export default function RecruitPage() {
  return(
      <main className="theme-page relative min-h-[calc(100vh-4rem)] w-full overflow-hidden py-8 md:py-12">
          <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
          <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
          <div className="theme-stars pointer-events-none absolute inset-0" />
          <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
              <RecruitList />
          </div>
      </main>
  )
}
