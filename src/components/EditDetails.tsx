import { Redo, Undo } from "@mui/icons-material";
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/system';
import {
  CellChange,
  CellStyle,
  Column,
  DateCell,
  DropdownCell,
  ReactGrid,
  Row,
  TextCell
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

import * as React from 'react';

interface EditDetailsProps {
  open: boolean;
  handleClose: () => void;
}

interface Submission {
  "Internal Remarks": string;
  "Updates for UW": string;
  country: string;
  "Initial Submission": Date;
  "Globex Review": Date;
  "Complete Submission": Date;
  "LI Approach": Date;
  "Coverage Confirmed": Date;
  "Bound": Date;
  "BO to LI": Date;
  "Connect Locals": Date;
  "Subjectivities Met": Date;
  "RA Signed by PM": Date;

  isOpen?: boolean;
}

const columnTypeValueSetting = [
  { type: "text", value: "text" },
  { type: "dropdown", value: "selectedValue" },
  { type: "date", value: "date" }
];
const columnTypeValueMap = Object.fromEntries(
  columnTypeValueSetting.map((item) => [item.type, item.value])
);

const dateFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

const style: CellStyle = {
  paddingLeft: '8px',
  overflow: "hidden",
};

const columnDefine = [
  {
    id: "country",
    type: "text",
    label: "Country",
    width: 120
  },
  ...[
    "Internal Remarks",
    "Updates for UW",
    "Initial Submission",
    "Globex Review",
    "Complete Submission",
    "LI Approach",
    "Coverage Confirmed",
    "Bound",
    "BO to LI",
    "Connect Locals",
    "Subjectivities Met",
    "RA Signed by PM",

  ].map((label) => ({
    id: label,
    type: ["Internal Remarks", "Updates for UW"].includes(label) ? "text" : "date",
    label,
    format: ["Internal Remarks", "Updates for UW"].includes(label) ? undefined : dateFormat
  }))
];

const getColumns = (): Column[] =>
  columnDefine.map((item) => ({
    columnId: item.id,
    width: ["Internal Remarks", "Updates for UW"].includes(item.id) ? 200 : 125
  }));

const countries = ["El Salvador", "Saudi Arabia", "Mexico", "Germany", "Switzerland"];


const getSubmissions = (): Submission[] =>
  countries.map((country, i) => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + i * 7);

    const createDate = (offset: number) => {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + offset);
      return d;
    };

    return {
      country,
      "Initial Submission": createDate(0),
      "Globex Review": createDate(3),
      "Complete Submission": createDate(5),
      "LI Approach": createDate(7),
      "Coverage Confirmed": createDate(10),
      "Bound": createDate(12),
      "BO to LI": createDate(14),
      "Connect Locals": createDate(16),
      "Subjectivities Met": createDate(18),
      "RA Signed by PM": createDate(21),
      "Internal Remarks": "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Updates for UW": "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };
  });

const headerRow: Row = {
  rowId: "header",
  height: 35,
  resizable: true,
  cells: columnDefine.map((item) => ({
    type: "header",
    text: item.label,
    style: {
      ...style,
      textOverflow: "ellipsis",
      overflow: "hidden",
      fontSize: '11px',
      fontWeight: 600,
      textAlign: "left",
    },
  }))
};


const getRows = (data: Submission[]): Row[] => [
  headerRow,
  ...data.map<Row>((submission, idx) => ({
    rowId: idx,
    height: 40,
    cells: columnDefine.map((col) => {
      if (col.type === "text") {
        return {
          type: "text",
          text: submission[col.id as keyof Submission] as string,
          style: style, 
        } as TextCell;
      } else if (col.type === "dropdown") {
        return {
          type: "dropdown",
          selectedValue: submission[col.id as keyof Submission] as string,
          values: "values" in col ? col.values : undefined,
          isOpen: submission.isOpen,
          style: style, 
        } as DropdownCell;
      } else if (col.type === "date") {
        return {
          type: "date",
          date: submission[col.id as keyof Submission] as Date,
          format: "format" in col ? col.format : undefined,
          style: style, 
        } as DateCell;
      }
      throw new Error(`Unsupported column type: ${col.type}`);
    }),
  })),
];

const isMacOs = () => window.navigator.appVersion.indexOf("Mac") !== -1;

export default function EditDetails({ open, handleClose }: EditDetailsProps) {
  const [submissions, setSubmissions] = React.useState<Submission[]>(getSubmissions());
  const [cellChangesIndex, setCellChangesIndex] = React.useState(() => -1);
  const [cellChanges, setCellChanges] = React.useState<CellChange<TextCell | DropdownCell | DateCell>[][]>([]);

  const applyNewValue = (
    changes: CellChange<TextCell | DropdownCell | DateCell>[],
    prevSubmissions: Submission[],
    usePrevValue: boolean = false
  ): Submission[] => {
    changes.forEach((change) => {
      const index = change.rowId as number;
      const key = change.columnId as keyof Submission;
      const cell = usePrevValue ? change.previousCell : change.newCell;
      if (cell.type === "text") {
        (prevSubmissions[index][key] as any) = (cell as TextCell).text;
      } else if (cell.type === "date") {
        (prevSubmissions[index][key] as any) = (cell as DateCell).date;
      }
    });
    return [...prevSubmissions];
  };

  const applyChanges = (
    changes: CellChange<TextCell | DropdownCell | DateCell>[],
    prevSubmissions: Submission[]
  ): Submission[] => {
    const updated = applyNewValue(changes, prevSubmissions);
    setCellChanges([...cellChanges.slice(0, cellChangesIndex + 1), changes]);
    setCellChangesIndex(cellChangesIndex + 1);
    return updated;
  };

  const undoChanges = (
    changes: CellChange<TextCell | DropdownCell | DateCell>[],
    prevSubmissions: Submission[]
  ): Submission[] => {
    const updated = applyNewValue(changes, prevSubmissions, true);
    setCellChangesIndex(cellChangesIndex - 1);
    return updated;
  };

  const redoChanges = (
    changes: CellChange<TextCell | DropdownCell | DateCell>[],
    prevSubmissions: Submission[]
  ): Submission[] => {
    const updated = applyNewValue(changes, prevSubmissions);
    setCellChangesIndex(cellChangesIndex + 1);
    return updated;
  };

  const handleChanges = (changes: CellChange<any>[]) => {
    const filteredChanges = changes.filter(
      (change) =>
        change.newCell.type === "text" ||
        change.newCell.type === "dropdown" ||
        change.newCell.type === "date"
    ) as CellChange<TextCell | DropdownCell | DateCell>[];
    setSubmissions((prev) => applyChanges(filteredChanges, prev));
  };

  const handleUndo = (e: any) => {
    e.preventDefault();
    if (cellChangesIndex >= 0) {
      setSubmissions((prev) => undoChanges(cellChanges[cellChangesIndex], prev));
    }
  };

  const handleRedo = (e: any) => {
    e.preventDefault();
    if (cellChangesIndex + 1 <= cellChanges.length - 1) {
      setSubmissions((prev) => redoChanges(cellChanges[cellChangesIndex + 1], prev));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: 'none', minWidth: 'calc(100% - 80px)' },
        },
      }}
    >
      <DialogTitle>Edit Dates and Notes</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '100%', overflow: 'hidden' }}>
          <Box
            sx={{ overflowX: 'scroll', width: '100%', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}
            onKeyDown={(e) => {
              if ((!isMacOs() && e.ctrlKey) || e.metaKey) {
                switch (e.key) {
                  case "z":
                    handleUndo(e);
                    break;
                  case "y":
                    handleRedo(e);
                    break;
                }
              }
            }}
          >
            <ReactGrid
              rows={getRows(submissions)}
              columns={getColumns()}
              onCellsChanged={handleChanges}
              stickyLeftColumns={1}
              stickyTopRows={1}
              enableFillHandle
              enableRangeSelection
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Stack spacing={1} direction={"row"}>
            <Button onClick={handleUndo} startIcon={<Undo />}>Undo</Button>
            <Button onClick={handleRedo} startIcon={<Redo />}>Redo</Button>
          </Stack>
          <Stack spacing={2} direction={"row"}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit">Save</Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
