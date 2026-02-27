export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-sage-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-sage-600 rounded-full border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
