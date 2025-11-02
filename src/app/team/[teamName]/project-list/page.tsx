import {ProjectList} from "@/components/landings/ProjectList";

export default function ProjectListPage(){
    return(
        <main className={"min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center"}>
            <div className={"mx-auto w-full max-w-6xl px-6"}>
                <section className={"max-w-4xl mx-auto px-6"}>
                    <ProjectList />
                </section>
            </div>
        </main>
    )
}