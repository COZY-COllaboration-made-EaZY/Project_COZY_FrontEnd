'use client';

import * as React from 'react';

export function AlertDialog({
                                open,
                                children,
                            }: {
    open: boolean;
    children: React.ReactNode;
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
            <div className="theme-card rounded-lg p-6 w-full max-w-sm text-white">
                {children}
            </div>
        </div>
    );
}

export function AlertDialogContent({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export function AlertDialogHeader({ children }: { children: React.ReactNode }) {
    return <div className="mb-4">{children}</div>;
}

export function AlertDialogTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-lg font-bold mb-2">{children}</h2>;
}

export function AlertDialogDescription({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-white/70">{children}</p>;
}

export function AlertDialogFooter({ children }: { children: React.ReactNode }) {
    return <div className="mt-4 flex justify-end space-x-2">{children}</div>;
}

export function AlertDialogCancel({
                                      children,
                                      onClick,
                                  }: {
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="theme-btn-secondary px-4 py-2 rounded transition hover:brightness-110"
        >
            {children}
        </button>
    );
}

export function AlertDialogAction({
                                      children,
                                      onClick,
                                  }: {
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="theme-btn-primary px-4 py-2 rounded transition hover:brightness-110"
        >
            {children}
        </button>
    );
}
