import { Suspense } from 'react';
import InterestClient from './InterestClient';

export const dynamic = "force-dynamic";

export default function InterestPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <InterestClient />
        </Suspense>
    );
}