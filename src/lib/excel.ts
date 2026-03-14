import * as XLSX from "xlsx";

export interface ParsedChartData {
  labels: string[];
  values: number[];
  categories?: string[];
}

export interface ParsedTableData {
  columns: string[];
  rows: (string | number)[][];
}

export function parseChartExcel(file: File): Promise<ParsedChartData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

        if (json.length === 0) {
          reject(new Error("No data found in the uploaded file."));
          return;
        }

        const keys = Object.keys(json[0]);
        const labels = json.map((row) => String(row[keys[0]] ?? ""));
        const values = json.map((row) => Number(row[keys[1]]) || 0);
        const categories =
          keys.length > 2
            ? json.map((row) => String(row[keys[2]] ?? ""))
            : undefined;

        resolve({ labels, values, categories });
      } catch (err) {
        reject(new Error("Failed to parse Excel file. Please check the format."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsArrayBuffer(file);
  });
}

export function parseTableExcel(file: File): Promise<ParsedTableData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const aoa = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, {
          header: 1,
        });

        if (aoa.length < 2) {
          reject(
            new Error("File must have at least a header row and one data row.")
          );
          return;
        }

        const columns = (aoa[0] || []).map(String);
        const rows = aoa.slice(1).map((row) =>
          columns.map((_, i) => (row[i] !== undefined ? row[i] : ""))
        );

        resolve({ columns, rows });
      } catch (err) {
        reject(new Error("Failed to parse Excel file. Please check the format."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Create a downloadable Excel template for chart data.
 */
export function downloadChartTemplate() {
  const wb = XLSX.utils.book_new();
  const data = [
    ["Label", "Value", "Category (optional)"],
    ["Q1 2024", 150000, ""],
    ["Q2 2024", 185000, ""],
    ["Q3 2024", 210000, ""],
    ["Q4 2024", 195000, ""],
  ];
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = [{ wch: 15 }, { wch: 12 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, ws, "Chart Data");
  XLSX.writeFile(wb, "chart-data-template.xlsx");
}

/**
 * Create a downloadable Excel template for table data.
 */
export function downloadTableTemplate() {
  const wb = XLSX.utils.book_new();
  const data = [
    ["Column A", "Column B", "Column C", "Column D"],
    ["Row 1 data", "100", "5%", "Active"],
    ["Row 2 data", "250", "12%", "Active"],
    ["Row 3 data", "180", "-3%", "Review"],
  ];
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!cols"] = [{ wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, ws, "Table Data");
  XLSX.writeFile(wb, "table-data-template.xlsx");
}
