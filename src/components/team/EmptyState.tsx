interface Props {
    text: string;
}

export const EmptyState = ({ text }: Props) => {
    return (
        <p className="text-sm text-gray-400">
            {text}
        </p>
    );
};
