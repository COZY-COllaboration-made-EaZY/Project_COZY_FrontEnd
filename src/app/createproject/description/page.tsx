import { Suspense } from 'react';
import DescriptionClient from './DescriptionClient';

export const dynamic = "force-dynamic";

export default function DescriptionPage() {
    return (
        <Suspense fallback={<div className="theme-page min-h-screen" />}>
            <DescriptionClient />
        </Suspense>
    );
}
