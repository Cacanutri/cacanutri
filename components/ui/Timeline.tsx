export function Timeline({ items }: { items: string[] }) {
  return (
    <ol className="relative border-l border-black/10 pl-6">
      {items.map((item, idx) => (
        <li key={item} className="mb-4">
          <span className="absolute -left-2 mt-1 h-3 w-3 rounded-full bg-ocean" />
          <p className="text-sm">{idx + 1}. {item}</p>
        </li>
      ))}
    </ol>
  );
}
