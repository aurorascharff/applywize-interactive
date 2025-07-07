export default function Skeleton() {
  return (
    <div className="my-8 w-full max-w-xl p-4 pl-10 flex flex-col items-start">
      <div className="h-6 w-1/3 mb-4 rounded bg-gray-200 animate-pulse" />
      <div className="h-4 w-full mb-2 rounded bg-gray-100 animate-pulse" />
      <div className="h-4 w-5/6 mb-2 rounded bg-gray-100 animate-pulse" />
      <div className="h-4 w-2/3 rounded bg-gray-100 animate-pulse" />
    </div>
  );
}
