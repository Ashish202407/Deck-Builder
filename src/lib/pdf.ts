"use client";

export async function generatePdf(
  onProgress?: (current: number, total: number) => void
): Promise<Blob> {
  const { default: html2canvas } = await import("html2canvas");
  const { jsPDF } = await import("jspdf");

  // PowerPoint 16:9 dimensions in inches
  const WIDTH_IN = 13.333;
  const HEIGHT_IN = 7.5;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [WIDTH_IN, HEIGHT_IN],
  });

  const slides = document.querySelectorAll(".slide");
  const total = slides.length;

  for (let i = 0; i < total; i++) {
    const slide = slides[i] as HTMLElement;

    onProgress?.(i + 1, total);

    // Capture at 2x for crisp output
    const canvas = await html2canvas(slide, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      width: 1280,
      height: 720,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.92);

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, 0, WIDTH_IN, HEIGHT_IN);
  }

  return pdf.output("blob");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
