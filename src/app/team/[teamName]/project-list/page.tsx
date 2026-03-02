import { ProjectList } from "@/components/landings/ProjectList";

export default function ProjectListPage() {
  return (
    <main className="theme-page min-h-[calc(100vh-4rem)]">
      <div className="theme-glow-1" />
      <div className="theme-glow-2" />
      <div className="theme-glow-3" />
      <div className="theme-stars" />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <section className="max-w-4xl mx-auto">
          <div className="theme-card p-6 md:p-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                Team Projects
              </span>
              <h1 className="text-2xl md:text-3xl font-semibold text-white">
                팀 프로젝트 리스트
              </h1>
              <p className="text-sm md:text-base text-white/70">
                진행 중이거나 완료된 프로젝트를 한눈에 확인하세요.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ProjectList />
          </div>
        </section>
      </div>
    </main>
  );
}
