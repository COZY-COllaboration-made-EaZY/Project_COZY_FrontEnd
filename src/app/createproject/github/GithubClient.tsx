'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { createProjectSaveRequest } from '@/api/requests/project';
import { useUserStore } from '@/store/userStore';
import ConfirmProjectDialog from '@/components/CreateProject/ConfirmProjectDialog';
import {useTeamStore} from "@/store/teamStore";

const GH_REGEX = /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;

export default function GithubClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useUserStore();
    const currentTeamId = useTeamStore((s) => s.currentTeamId);

    const projectName  = useMemo(() => searchParams.get('projectName')  || '', [searchParams]);
    const devInterest  = useMemo(() => searchParams.get('devInterest')  || '', [searchParams]);
    const description  = useMemo(() => searchParams.get('description')  || '', [searchParams]);

    const [githubUrl, setGithubUrl] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    console.log("currentTeamId :: ", JSON.stringify(currentTeamId));

    useEffect(() => {
        if (!projectName || !devInterest || !description) {
            router.replace('/createproject');
        }
    }, [projectName, devInterest, description, router]);

    const doCreate = async (finalUrl: string | null) => {
        try {
            if (!user?.nickname) {
                setError('濡쒓렇?몄씠 ?꾩슂?⑸땲??');
                return;
            }
            setSubmitting(true);
            await createProjectSaveRequest({
                projectName,
                devInterest,
                description,
                githubUrl: finalUrl ?? undefined,
                teamId:String(currentTeamId),
            });
            router.push(`/project/${encodeURIComponent(projectName)}`);
        } catch (e) {
            console.error(e);
            setError('CreateProjectSaveRequest Error');
            alert('CreateProjectSaveRequest Error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleNext = () => {
        if (githubUrl && !GH_REGEX.test(githubUrl)) {
            setError('?좏슚??GitHub ??μ냼 URL???낅젰?섏꽭?? ?? https://github.com/user/repo');
            return;
        }
        setError('');
        setOpenConfirm(true);
    };

    const handleSkip = () => {
        setError('');
        setOpenConfirm(true);
    };

    const handleConfirm = async () => {
        await doCreate(githubUrl || null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto w-full max-w-3xl px-6 py-10">
                {/* ?ㅽ뀦 ?ㅻ뜑 */}
                <div className="mb-6 flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">4</span>
                    <h1 className="text-2xl font-bold tracking-tight">GitHub URL (?좏깮)</h1>
                </div>

                {/* ?붿빟 諛곗? */}
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200">
            <span className="text-gray-500">Project:</span>{' '}
              <span className="font-medium text-gray-900">{projectName}</span>
          </span>
                    <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200">
            <span className="text-gray-500">DevInterest:</span>{' '}
                        <span className="font-medium text-gray-900">{devInterest}</span> {/* ??蹂寃?*/}
          </span>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 ring-1 ring-blue-200">Step 4 of 4</span>
                </div>

                {/* 移대뱶 */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        ??μ냼 URL
                        <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 ring-1 ring-gray-200">?좏깮</span>
                    </label>

                    <input
                        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="https://github.com/owner/repository"
                        value={githubUrl}
                        onChange={(e) => { setGithubUrl(e.target.value.trim()); setError(''); }}
                    />

                    <p className="mt-2 text-xs text-gray-500">
                        * 媛쒖씤/議곗쭅 ??μ냼??硫붿씤 URL???낅젰?섏꽭?? 釉뚮옖移??댁뒋/PR 留곹겕??沅뚯옣?섏? ?딆뒿?덈떎.
                    </p>

                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

                    {/* ?명꽣 踰꾪듉 */}
                    <div className="mt-6 flex items-center justify-between">
                        <button
                            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
                            onClick={() =>
                                router.push(
                                    `/createproject/description?projectName=${encodeURIComponent(projectName)}&devInterest=${encodeURIComponent(devInterest)}&description=${encodeURIComponent(description)}`
                                )
                            }
                            disabled={submitting}
                        >
                            ?댁쟾
                        </button>

                        <div className="flex gap-2">
                            <button
                                className="rounded-lg bg-stone-500 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-600 disabled:opacity-50"
                                onClick={handleSkip}
                                disabled={submitting}
                            >
                                嫄대꼫?곌린
                            </button>
                            <button
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50"
                                onClick={handleNext}
                                disabled={submitting}
                            >
                                ?꾨즺
                            </button>
                        </div>
                    </div>
                </div>

                {/* ?꾩?留?*/}
                <p className="mt-4 text-xs text-gray-500">
                    ??μ냼媛 ?꾩쭅 ?녿떎硫??섏쨷???꾨줈?앺듃 ?ㅼ젙?먯꽌 異붽??????덉뼱??
                </p>
            </div>

            {/* 理쒖쥌 ?뺤씤 ?ㅼ씠?쇰줈洹?*/}
            <ConfirmProjectDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                onConfirm={handleConfirm}
                loading={submitting}
                data={{
                    projectName,
                    devInterest,
                    description,
                    gitHubUrl: githubUrl || '(none)',
                }}
            />
        </div>
    );
}