"use client";
import { useTranslation } from "react-i18next";

type Help = {
    id: number;
    type: string;
    status: string;
    title: string;
    content: string;
    createdAt: string;
};

interface Props {
    data: Help[];
    loading: boolean;
    username: string;
    onSelect: (help: Help) => void;
}

export default function HelpTable({
                                      data,
                                      loading,
                                      username,
                                      onSelect,
                                  }: Props) {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="py-20 text-center text-sm text-gray-500">
                {t("common.loading")}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="py-20 text-center text-sm text-gray-500">
                {t("help.empty")}
            </div>
        );
    }

    return (
        <table className="w-full border-t text-sm">
            <thead className="bg-gray-50">
            <tr className="border-b">
                <th className="p-3 text-center">{t("help.type")}</th>
                <th className="p-3 text-center">{t("help.status")}</th>
                <th className="p-3 text-center">{t("help.title")}</th>
                <th className="p-3 text-center">{t("help.author")}</th>
                <th className="p-3 text-center">{t("help.createdAt")}</th>
            </tr>
            </thead>
            <tbody>
            {data.map((help) => (
                <tr key={help.id} className="border-b">
                    <td className="p-3 text-center">
                        {t(`help.${help.type}`)}
                    </td>
                    <td className="p-3 text-center">
                        {help.status === "WAIT"
                            ? t("help.status_wait")
                            : t("help.status_done")}
                    </td>
                    <td
                        className="p-3 text-center text-blue-600 cursor-pointer hover:underline"
                        onClick={() => onSelect(help)}
                    >
                        {help.title}
                    </td>
                    <td className="p-3 text-center">{username}</td>
                    <td className="p-3 text-center">
                        {new Date(help.createdAt).toISOString().slice(0, 10)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
