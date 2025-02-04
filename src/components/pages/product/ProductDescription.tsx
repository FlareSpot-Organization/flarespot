import { useState, useRef, useEffect } from "react";
import DOMPurify from "dompurify";

const ProductDescription = ({ htmlContent }: { htmlContent: string }) => {
  const [expanded, setExpanded] = useState(false);
  const [needsSeeMore, setNeedsSeeMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setNeedsSeeMore(contentRef.current.scrollHeight > 1000);
    }
  }, []);

  return (
    <div className="relative">
      <h1 className="text-xl font-semibold">Description</h1>
      {/* Description Box */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all ${
          expanded ? "max-h-none" : "max-h-[1000px]"
        }`}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
      />

      {/* Faint Fade Effect */}
      {!expanded && needsSeeMore && (
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      )}

      {/* "See More" Button */}
      {needsSeeMore && (
        <button
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-1000 text-sm px-3 py-1 rounded-md shadow-md hover:bg-gray-300 transition"
          onClick={() => setExpanded(!expanded)}>
          {expanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default ProductDescription;
