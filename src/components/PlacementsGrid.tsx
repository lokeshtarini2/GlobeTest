import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from '../internals/data/placementsData';

export default function PlacementsGrid() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <DataGrid
        sx={{ width: '100%' }}
        autoHeight
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}

        disableRowSelectionOnClick
        density="standard"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto', p: 0 },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto', p: 0 },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
