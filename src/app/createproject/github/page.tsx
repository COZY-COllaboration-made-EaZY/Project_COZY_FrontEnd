import { Suspense } from 'react';
import GithubClient from './GithubClient';

export const dynamic = "force-dynamic";

export default function GithubPage() {
    return (
        <Suspense fallback={<div className="theme-page min-h-screen" />}>
            <GithubClient />
        </Suspense>
    );
}
