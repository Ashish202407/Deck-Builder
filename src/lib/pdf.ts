"use client";

export async function generatePdf(
  onProgress?: (current: number, total: number) => void
): Promise<Blob> {
  const { default: html2canvas } = await import("html2canvas");
  const { jsPDF } = await import("jspdf");

  // Wait for all fonts to be loaded
  await document.fonts.ready;

  // PowerPoint 16:9 dimensions in inches
  const WIDTH_IN = 13.333;
  const HEIGHT_IN = 7.5;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [WIDTH_IN, HEIGHT_IN],
  });

  const slideElements = document.querySelectorAll(".slide");
  const total = slideElements.length;

  // Prepare slides for capture: remove transforms, hide grain, force dimensions
  const container = document.getElementById("pdf-capture-area");
  if (!container) {
    throw new Error("PDF capture area not found");
  }

  for (let i = 0; i < total; i++) {
    const slide = slideElements[i] as HTMLElement;

    onProgress?.(i + 1, total);

    // Temporarily force exact dimensions and remove any scaling
    const originalStyle = slide.getAttribute("style") || "";
    slide.style.width = "1280px";
    slide.style.height = "720px";
    slide.style.transform = "none";
    slide.style.margin = "0";
    slide.style.position = "relative";
    slide.style.overflow = "hidden";

    // Hide grain texture pseudo-element during capture
    slide.classList.add("no-grain");

    // Small delay to let styles settle
    await new Promise((r) => setTimeout(r, 100));

    const canvas = await html2canvas(slide, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#1e3a4f",
      width: 1280,
      height: 720,
      logging: false,
      // foreignObjectRendering uses browser's native renderer — fixes font issues
      foreignObjectRendering: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.92);

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, 0, WIDTH_IN, HEIGHT_IN);

    // Restore original styles
    slide.classList.remove("no-grain");
    if (originalStyle) {
      slide.setAttribute("style", originalStyle);
    } else {
      slide.removeAttribute("style");
    }
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
