import { Redo, Undo } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import {
    CellChange,
    Column,
    ReactGrid,
    Row,
    TextCell
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import * as React from "react";

interface InsuranceData {
    [key: string]: string;
}

const style = {
    paddingLeft: "4px",
    overflow: "hidden",
    whiteSpace: "nowrap",
};

const cellInlineStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: "0.75em",
    paddingLeft: "4px",
};

const getColumns = (): Column[] => [
    { columnId: "A", width: 220 },
    { columnId: "B", width: 340 },
    { columnId: "C", width: 120 },
    { columnId: "D", width: 120 },
    { columnId: "E", width: 120 },
    { columnId: "F", width: 80 },
    { columnId: "G", width: 120 },
    { columnId: "H", width: 340 },
    { columnId: "I", width: 120 },
    { columnId: "J", width: 120 },
    { columnId: "K", width: 120 },
    { columnId: "L", width: 80 },
    { columnId: "M", width: 120 },
];

const getData = (): InsuranceData[] => [
    {
        A: "Line of Business:",
        B: "Pollution/Environmental Liability",
        H: "Pollution/Environmental Liability",
    },
    { A: "Country:", B: "China", H: "Italy" },
    {
        A: "Reinsurer Name:",
        B: "Allied World Syndicate Services (Singapore) Pte, Ltd. on behalf of Lloyds Syndicate 2232",
        H: "Allied World",
    },
    {
        A: "Reinsurer Rating:",
        B: "Rated A (Excellent) by AM BEST,\nRated A+ by S&P,\nRated AA- by Fitch",
        H: "Rated A+",
    },
    {
        A: "Reinsurer Address:",
        B: "138 Market Street,\n#05-02 Capita Green Building,\n048946",
        H: "112233 Business Street, Malaysia",
    },
    {
        A: "Reinsured Name:",
        B: "Ping An Property & Casualty Insurance Company of China, Ltd.",
        H: "Malaysia Insurance Company",
    },
    {
        A: "Reinsured Address:",
        B: "16F Xinghe Center, Fuhua Road, Shenzhen, China 518048",
        H: "Some road 123, Malaysia",
    },
    {
        A: "Local Policy Certificate/Reference Number:",
        B: "C057157/005",
        H: "44ddd6GG",
    },
    {
        A: "Original Local Insured Name:",
        B: "Lendlease Project Management & Construction (Shanghai) Co. Ltd",
        H: "Not Applicable",
    },
    { A: "Original Local Insured Tax ID, if available:", B: "", H: "" },
    {
        A: "Original Local Insured Address:",
        B: "LLPMC - Room 502, K. Wah Centre No. 1010 Huai Hai Road (C), Shanghai, P.R. China",
        H: "Not Applicable",
    },
    { A: "Original Local Insured Type:", B: "Original Insured", H: "" },
    {
        A: "Original Local Insured Operations/Business Activity:",
        B: "Lendlease is an international property and infrastructure group with core expertise in shaping cities and creating strong and connected communities.",
        H: "Not Applicable",
    },
    { A: "Original Local Insured Contact Information, if applicable:", B: "", H: "" },
    {
        A: "Foreign Broker Company:",
        B: "",
        H: "",
    },
    {
        A: "-Contact Person:",
        B: "Li Fei",
        H: "Not Applicable",
    },
    {
        A: "-Organization Name:",
        B: "Marsh China",
        H: "",
    },
    {
        A: "-Address:",
        B: "",
        H: "",
    },
    {
        A: "-Phone Number:",
        B: "",
        H: "",
    },
    {
        A: "-Email:",
        B: "fei.li@marsh.com",
        H: "",
    },
    { A: "Foreign Broker Commission:", B: "0.00%", H: "0.00%" },
    { A: "Currency:", B: "Dollars(AUD)", H: "Dollars(AUD)" },
    {
        A: "Policy Period:",
        B: "October 02, 2024 - October 01, 2025",
        H: "October 02, 2024 - October 01, 2025",
    },
    { A: "Coverage:", B: "Contractors Pollution Liability", H: "Contractors Pollution Liability" },
    { A: "Primary or Excess:", B: "Primary", H: "Primary" },
    { A: "Claims Made or Occurrence:", B: "Occurrence", H: "Occurrence" },
    { A: "Territory:", B: "Local Territory", H: "Local Territory" },
    {
        A: "Limits of Liability:",
        B: "Limit Name",
        D: "Combined Limit",
        E: "Currency Amount",
        G: "Converted Amount",
        H: "Limit Name",
        J: "Combined Limit",
        K: "Currency Amount",
        M: "Converted Amount",
    },
    {
        B: "Limits of Liability",
        E: "Dollars(AUD) : 1,000,000.00",
        G: "Yuan Renminbi(CNY) : 4,652,530.00",
        H: "Limits of Liability",
        K: "Dollars(AUD) : 1,000,000.00",
    },
    {
        A: "Deductible:",
        B: "Deductible Name",
        D: "Deductible Type",
        E: "Currency Amount",
        G: "Converted Amount",
        H: "Deductible Name",
        J: "Deductible Type",
        K: "Currency Amount",
        M: "Converted Amount",
    },
    {
        B: "Deductible",
        E: "Dollars(AUD) : 500,000.00",
        G: "Yuan Renminbi(CNY) : 2,326,265.00",
        H: "Deductible",
        K: "Dollars(AUD) : 500,000.00",
    },
    { A: "Retroactive Date:", B: "September 29, 2022", H: "October 01, 2019" },
    { A: "Tie-in Limits:", B: "Dollars(AUD) : 0.00", H: "Dollars(AUD) : 0.00" },
    { A: "Insuring Conditions:", B: "Per Local Policy Wording", H: "Per Local Policy Wording" },
    { A: "Additional Terms and Conditions:", B: "", H: "" },
    { A: "Local Underlying Policy:", B: "", H: "" },
    {
        A: "Exposure Information:",
        B: "",
        H: "",
    },
    {
        A: "- Total Sales:",
        B: "Dollars(AUD) : 0.00",
        E: "Yuan Renminbi(CNY) : 0.00",
        H: "Dollars(AUD) : 0.00",
    },
    {
        A: "- Total Revenue:",
        B: "Dollars(AUD) : 32,666,892.00",
        E: "Yuan Renminbi(CNY) : 151,983,695.04",
        H: "Dollars(AUD) : 0.00",
    },
    {
        A: "- List of Locations with Values:",
        B: "",
        H: "",
    },
    { A: "Rating Type:", B: "Flat Annual", H: "Flat Annual" },
    { A: "Reinsurer's Reinsurance Share:", B: "80.00%", H: "" },
    {
        A: "Breakdown of Risk Premium:",
        B: "Dollars(AUD) : 6,300.00",
        E: "Yuan Renminbi(CNY) : 29,310.94",
        H: "Dollars(AUD) : 0.00",
    },
    { A: "Premium Calculation:", B: "", H: "Premium Calculation:" },
    {
        A: "Gross Billable to Insured Premium:",
        B: "Dollars(AUD) : 6,678.00",
        E: "Yuan Renminbi(CNY) : 31,069.60",
        H: "Gross Billable to Insured Premium:",
        I: "Dollars(AUD) : 0.00",
    },
    {
        A: "Value Added Tax (%):",
        B: "Dollars(AUD) : 378.00",
        H: "Base Premium:",
        I: "Dollars(AUD) : 0.00",
    },
    {
        A: "Base Premium:",
        B: "Dollars(AUD) : 6,300.00",
        E: "Yuan Renminbi(CNY) : 29,310.94",
        H: "Retention (100.00%):",
        I: "Dollars(AUD) : 100.00",
    },
    {
        A: "Retention (20.00%):",
        B: "Dollars(AUD) : 1,260.00",
        E: "Yuan Renminbi(CNY) : 5,862.19",
        H: "Foreign Brokerage (0.00%):",
        I: "Dollars(AUD) : 0.00",
    },
    {
        A: "Foreign Brokerage (0.00%):",
        B: "Dollars(AUD) : 0.00",
        E: "Yuan Renminbi(CNY) : 0.00",
        H: "Net Premium to Reinsurer:",
        I: "0",
    },
    {
        A: "Ceding Commission (Flat):",
        B: "Dollars(AUD) : 1,897.60",
        E: "Dollars(USD) : 1,212.70",
    },
    { A: "Ceding Commission (%) (%):", B: "", H: "" },
    { A: "Ceding Commission:", B: "", H: "" },
    {
        A: "Net Premium to Reinsurer:",
        B: "Dollars(AUD) : 3,827.30",
        E: "Yuan Renminbi(CNY) : 17,806.63",
    },
    { A: "Premium Collection Location:", B: "Australia", H: "Malaysia" },
    {
        A: "Law and Jurisdiction for the Original Policy (issued by the local insurer):",
        B: "China",
        H: "Malaysia",
    },
    { A: "Law and Jurisdiction for Reinsurance:", B: "China", H: "Malaysia" },
    {
        A: "Claim Handling Guidelines:",
        B: "Per Agreed Claim Handling Guidelines",
        H: "Per Agreed Claim Handling Guidelines",
    },
    {
        A: "Contact Information for Loss Notice:",
        B: "Organization Name",
        C: "Contact Type",
        D: "Address",
        F: "Phone Number",
        G: "Email Id",
        H: "Organization Name",
        I: "Contact Type",
        J: "Address",
        L: "Phone Number",
        M: "Email Id",
    },
    {
        B: "Ping An Property & Casualty Insurance Company of China, Ltd.",
        C: "External",
        G: "HUBIN440@pingan.com.cn",
        H: "Etiqa Insurance & Takaful",
        I: "External",
    },
    { A: "Loss Information for the Past 3 to 5 Years:", B: "Nil", H: "Nil" },
    {
        A: "Any Certificate Required for This Country and How Many, if applicable:",
        B: "No certifications needed",
        H: "No certifications needed",
    },
    {
        A: "Additional Information and Comments for this Country:",
        B: "No additional comments",
        H: "No additional comments",
    },
    {
        A: "Any Other Services Requested From the Local Insurer:",
        B: "Other services not needed",
        H: "Other services not needed",
    },
    { A: "Policy Specs Attachments:", B: "None", H: "None" },
    { A: "", B: "", H: "" },
    { A: "", B: "", H: "" },
    {
        A: "The information contained in this file is legally privileged and confidential information and is intended only for the use of the individual or entity it is directed to. All readers of this file other than the intended recipient are hereby notified that any dissemination, modification, distribution or reproduction of this file, is strictly prohibited. If you are not the intended recipient, please permanently delete it from your system immediately. Thank you. - Globex Underwriting Services",
    },
    { A: "© Copyright 2025 Globex International Group. All rights reserved." },
];

const getRows = (data: InsuranceData[]): Row[] => {
    const rows: Row[] = [];
    data.forEach((rowData, index) => {
        const cells: TextCell[] = [];
        const rowStyle = index < 2 ? { ...cellInlineStyle, backgroundColor: '#f5f5f5' } : cellInlineStyle;
        for (let i = 0; i < 13; i++) {
            const columnId = String.fromCharCode(65 + i);
            const text = rowData[columnId] || "";
            cells.push({
                type: "text",
                text,
                style: { ...rowStyle },
            });
        }
        const row: Row = {
            rowId: index.toString(),
            cells,
        };
        rows.push(row);
    });
    return rows;
};

export function InsuranceSpreadsheet() {
    const [data, setData] = React.useState<InsuranceData[]>(getData());
    const [cellChanges, setCellChanges] = React.useState<CellChange<any>[][]>([]);
    const [cellChangesIndex, setCellChangesIndex] = React.useState(-1);

    const applyValue = (changes: CellChange<any>[], usePrev: boolean) => {
        const updated = [...data];
        changes.forEach(({ rowId, columnId, newCell, previousCell }) => {
            const cell = usePrev ? previousCell : newCell;
            const rowIndex = parseInt(String(rowId));
            const columnKey = String(columnId);
            if (rowIndex >= 0 && rowIndex < updated.length) {
                if (cell.type === "text") {
                    updated[rowIndex][columnKey] = cell.text;
                }
            }
        });
        setData(updated);
    };

    const handleChange = (changes: CellChange<any>[]) => {
        const filtered = changes.filter((c) => c.newCell.type === "text" || c.newCell.type === "chevron");
        setCellChanges([...cellChanges.slice(0, cellChangesIndex + 1), filtered]);
        setCellChangesIndex(cellChangesIndex + 1);
        applyValue(filtered, false);
    };

    const handleUndo = () => {
        if (cellChangesIndex >= 0) {
            applyValue(cellChanges[cellChangesIndex], true);
            setCellChangesIndex(cellChangesIndex - 1);
        }
    };

    const handleRedo = () => {
        if (cellChangesIndex + 1 < cellChanges.length) {
            applyValue(cellChanges[cellChangesIndex + 1], false);
            setCellChangesIndex(cellChangesIndex + 1);
        }
    };

    return (
        <Box
            sx={{
                height: "calc(100vh - 60px)",
                width: "100vw",
                p: 0,
                m: 0,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                fontSize: "0.92rem",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    overflowX: "auto",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 0,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                }}
                onKeyDown={(e) => {
                    const isMac = navigator.appVersion.includes("Mac");
                    if ((e.ctrlKey && !isMac) || (e.metaKey && isMac)) {
                        if (e.key === "z") handleUndo();
                        if (e.key === "y") handleRedo();
                    }
                }}
            >
                <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                    <ReactGrid
                        rows={getRows(data)}
                        columns={getColumns()}
                        onCellsChanged={handleChange}
                        stickyTopRows={2}
                        enableFillHandle
                        enableRangeSelection
                    />
                </Box>
            </Box>
            <Stack direction="row" spacing={2} sx={{ p: 1, justifyContent: "center" }}>
                <Button onClick={handleUndo} startIcon={<Undo />}>
                    Undo
                </Button>
                <Button onClick={handleRedo} startIcon={<Redo />}>
                    Redo
                </Button>
            </Stack>
        </Box>
    );
}

export default InsuranceSpreadsheet;