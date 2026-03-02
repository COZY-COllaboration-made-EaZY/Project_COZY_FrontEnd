import CreateProjectClient from "./CreateProjectClient";
import { Suspense } from "react";

export default function CreateProject() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <CreateProjectClient />
        </Suspense>
    );
}
