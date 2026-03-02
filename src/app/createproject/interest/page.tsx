import { Suspense } from 'react';
import InterestClient from './InterestClient';

export const dynamic = "force-dynamic";

export default function InterestPage() {
    return (
        <Suspense fallback={<div className="theme-page min-h-screen" />}>
            <InterestClient />
        </Suspense>
    );
}
