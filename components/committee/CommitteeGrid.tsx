

type Props = {
  title: string;
};

export default function CommitteeGrid({ title }: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-10 w-1.5 rounded bg-orange-500" />
        <h2 className="text-xl font-bold text-gray-900">
          {title}
        </h2>
      </div>
    </div>
  );
}
