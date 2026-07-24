"use client";

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  file: string;
  pageNumber: number;
  height?: number;
  width?: number;
  onLoadSuccess?: (pdf: { numPages: number }) => void;
}

export default function PdfViewer({
  file,
  pageNumber,
  height,
  width,
  onLoadSuccess,
}: PdfViewerProps) {
  return (
    <Document
      file={file}
      onLoadSuccess={onLoadSuccess}
      className="flex justify-center items-center overflow-hidden"
      loading={
        <div className="text-sm font-medium text-[#5A554E] animate-pulse py-16 text-center">
          Loading PDF...
        </div>
      }
    >
      <Page
        pageNumber={pageNumber}
        height={height}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        className="rounded-lg overflow-hidden shadow-lg"
      />
    </Document>
  );
}
