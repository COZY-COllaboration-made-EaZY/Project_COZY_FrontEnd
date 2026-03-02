interface Props {
    text: string;
}

export const EmptyState = ({ text }: Props) => {
    return (
        <p className="text-sm text-white/60">
            {text}
        </p>
    );
};
