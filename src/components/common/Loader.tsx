const Loader = ({ content }: { content?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="relative w-12 h-12">
        {/* Outer circle */}
        <div className="absolute w-full h-full border-4 border-gray-200 rounded-full"></div>
        {/* Spinning circle */}
        <div className="absolute w-full h-full border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="mt-4 text-lg text-gray-600 animate-pulse">
        {content ? content : "Searching products..."}
      </p>
    </div>
  );
};

export default Loader;
