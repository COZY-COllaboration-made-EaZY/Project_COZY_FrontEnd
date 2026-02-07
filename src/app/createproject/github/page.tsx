import { Suspense } from 'react';
import GithubClient from './GithubClient';

export const dynamic = "force-dynamic";

export default function GithubPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <GithubClient />
        </Suspense>
    );
}