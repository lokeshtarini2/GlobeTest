import ExpandMoreIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/Remove';
import { Button, Chip, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import * as React from 'react';
import UploadRAFileDailog from './UploadRAFileDialog';

interface RAFile {
  name: string;
}

interface LOB {
  name: string;
  raFiles: RAFile[];
}

interface Branch {
  name: string; // Expected format: Country / City
  lobs: LOB[];
}

interface Organization {
  id: number;
  name: string;
  branches: Branch[];
}

// Sample hierarchical data
const orgData: Organization[] = [
  {
    "id": 1,
    "name": "Abeille Assurances IARD & Santé",
    "branches": [
      {
        "name": "Australia / Singapore",
        "lobs": [
          {
            "name": "Operations",
            "raFiles": [
              { "name": "abeille_assurances_iard_&_santé_operations_1.overview.docx" },
              { "name": "abeille_assurances_iard_&_santé_operations_2.report.pdf" }
            ]
          }
        ]
      },
      {
        "name": "India / Mumbai",
        "lobs": [
          {
            "name": "Finance",
            "raFiles": [
              { "name": "abeille_assurances_iard_&_santé_finance_1.summary.pdf" },
              { "name": "abeille_assurances_iard_&_santé_finance_2.report.pdf" },
              { "name": "abeille_assurances_iard_&_santé_finance_3.data.xlsx" }
            ]
          },
          {
            "name": "Finance",
            "raFiles": [
              { "name": "abeille_assurances_iard_&_santé_finance_1.report.pdf" }
            ]
          }
        ]
      },
      {
        "name": "Australia / Toronto",
        "lobs": [
          {
            "name": "Claims",
            "raFiles": [
              { "name": "abeille_assurances_iard_&_santé_claims_1.summary.pdf" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Allied World Assurance Company",
    "branches": [
      {
        "name": "France / London",
        "lobs": [
          {
            "name": "Underwriting",
            "raFiles": [
              { "name": "allied_world_assurance_company_underwriting_1.data.xlsx" },
              { "name": "allied_world_assurance_company_underwriting_2.report.pdf" },
              { "name": "allied_world_assurance_company_underwriting_3.overview.docx" }
            ]
          }
        ]
      },
      {
        "name": "France / New York",
        "lobs": [
          {
            "name": "Actuarial",
            "raFiles": [
              { "name": "allied_world_assurance_company_actuarial_1.report.pdf" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "Asian Business Accounts",
    "branches": [
      {
        "name": "China / Beijing",
        "lobs": [
          {
            "name": "Operations",
            "raFiles": [
              { "name": "asian_business_accounts_operations_1.overview.docx" },
              { "name": "asian_business_accounts_operations_2.report.pdf" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "name": "Aviva Insurance Limited",
    "branches": [
      {
        "name": "UK / London",
        "lobs": [
          {
            "name": "Underwriting",
            "raFiles": [
              { "name": "aviva_insurance_limited_underwriting_1.report.pdf" },
              { "name": "aviva_insurance_limited_underwriting_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "Axis Capital",
    "branches": [
      {
        "name": "USA / New York",
        "lobs": [
          {
            "name": "Risk Management",
            "raFiles": [
              { "name": "axis_capital_risk_management_1.report.pdf" },
              { "name": "axis_capital_risk_management_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "name": "Bangalore Seo PM",
    "branches": [
      {
        "name": "India / Bangalore",
        "lobs": [
          {
            "name": "Project Management",
            "raFiles": [
              { "name": "bangalore_seo_pm_project_management_1.report.pdf" },
              { "name": "bangalore_seo_pm_project_management_2.summary.docx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "name": "Beazley Solutions Limited",
    "branches": [
      {
        "name": "UK / London",
        "lobs": [
          {
            "name": "Claims",
            "raFiles": [
              { "name": "beazley_solutions_limited_claims_1.data.xlsx" },
              { "name": "beazley_solutions_limited_claims_2.report.pdf" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "Best Client Ever",
    "branches": [
      {
        "name": "USA / Los Angeles",
        "lobs": [
          {
            "name": "Marketing",
            "raFiles": [
              { "name": "best_client_ever_marketing_1.report.pdf" },
              { "name": "best_client_ever_marketing_2.summary.docx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 9,
    "name": "Convex",
    "branches": [
      {
        "name": "Germany / Berlin",
        "lobs": [
          {
            "name": "Underwriting",
            "raFiles": [
              { "name": "convex_underwriting_1.data.xlsx" },
              { "name": "convex_underwriting_2.report.pdf" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 10,
    "name": "Everest Insurance Management and Professional Lines",
    "branches": [
      {
        "name": "USA / Chicago",
        "lobs": [
          {
            "name": "Professional Lines",
            "raFiles": [
              { "name": "everest_insurance_management_professional_lines_1.report.pdf" },
              { "name": "everest_insurance_management_professional_lines_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 11,
    "name": "Everest Insurance Property and Casualty",
    "branches": [
      {
        "name": "Canada / Toronto",
        "lobs": [
          {
            "name": "Property",
            "raFiles": [
              { "name": "everest_insurance_property_and_casualty_1.report.pdf" },
              { "name": "everest_insurance_property_and_casualty_2.summary.docx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 12,
    "name": "Falvey Cargo Underwriting",
    "branches": [
      {
        "name": "USA / Boston",
        "lobs": [
          {
            "name": "Cargo",
            "raFiles": [
              { "name": "falvey_cargo_underwriting_1.data.xlsx" },
              { "name": "falvey_cargo_underwriting_2.report.pdf" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 13,
    "name": "FÖRSÄKRINGSAKTIEBOLAGET ALANDIA",
    "branches": [
      {
        "name": "Sweden / Stockholm",
        "lobs": [
          {
            "name": "Claims",
            "raFiles": [
              { "name": "forsakringsaktiebolaget_alandia_claims_1.report.pdf" },
              { "name": "forsakringsaktiebolaget_alandia_claims_2.summary.docx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 14,
    "name": "Helvetia",
    "branches": [
      {
        "name": "Switzerland / Zurich",
        "lobs": [
          {
            "name": "Risk Management",
            "raFiles": [
              { "name": "helvetia_risk_management_1.report.pdf" },
              { "name": "helvetia_risk_management_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 15,
    "name": "ICICI Lombard",
    "branches": [
      {
        "name": "India / Mumbai",
        "lobs": [
          {
            "name": "Underwriting",
            "raFiles": [
              { "name": "icici_lombard_underwriting_1.report.pdf" },
              { "name": "icici_lombard_underwriting_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 16,
    "name": "Liberty Mutual",
    "branches": [
      {
        "name": "USA / Boston",
        "lobs": [
          {
            "name": "Claims",
            "raFiles": [
              { "name": "liberty_mutual_claims_1.report.pdf" },
              { "name": "liberty_mutual_claims_2.summary.docx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 17,
    "name": "Mapfre Headquarter",
    "branches": [
      {
        "name": "Spain / Madrid",
        "lobs": [
          {
            "name": "Finance",
            "raFiles": [
              { "name": "mapfre_headquarter_finance_1.summary.pdf" },
              { "name": "mapfre_headquarter_finance_2.report.pdf" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 18,
    "name": "Markel Specialty",
    "branches": [
      {
        "name": "USA / New York",
        "lobs": [
          {
            "name": "Risk Management",
            "raFiles": [
              { "name": "markel_specialty_risk_management_1.report.pdf" },
              { "name": "markel_specialty_risk_management_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 19,
    "name": "Munich Re Specialty - Global Markets UK",
    "branches": [
      {
        "name": "UK / London",
        "lobs": [
          {
            "name": "Underwriting",
            "raFiles": [
              { "name": "munich_re_specialty_global_markets_uk_underwriting_1.report.pdf" },
              { "name": "munich_re_specialty_global_markets_uk_underwriting_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 20,
    "name": "Northbridge General Insurance Corporation",
    "branches": [
      {
        "name": "Canada / Vancouver",
        "lobs": [
          {
            "name": "Claims",
            "raFiles": [
              { "name": "northbridge_general_insurance_corporation_claims_1.report.pdf" },
              { "name": "northbridge_general_insurance_corporation_claims_2.summary.docx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 21,
    "name": "Other",
    "branches": [
      {
        "name": "USA / Miami",
        "lobs": [
          {
            "name": "Risk Management",
            "raFiles": [
              { "name": "other_risk_management_1.report.pdf" },
              { "name": "other_risk_management_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 22,
    "name": "Old Mutual",
    "branches": [
      {
        "name": "South Africa / Johannesburg",
        "lobs": [
          {
            "name": "Underwriting",
            "raFiles": [
              { "name": "old_mutual_underwriting_1.report.pdf" },
              { "name": "old_mutual_underwriting_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 23,
    "name": "QBE Insurance Group",
    "branches": [
      {
        "name": "Australia / Sydney",
        "lobs": [
          {
            "name": "Operations",
            "raFiles": [
              { "name": "qbe_insurance_group_operations_1.report.pdf" },
              { "name": "qbe_insurance_group_operations_2.summary.docx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 24,
    "name": "Religare",
    "branches": [
      {
        "name": "India / Delhi",
        "lobs": [
          {
            "name": "Actuarial",
            "raFiles": [
              { "name": "religare_actuarial_1.report.pdf" },
              { "name": "religare_actuarial_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 25,
    "name": "Reinsurance Group of America",
    "branches": [
      {
        "name": "USA / Chesterfield",
        "lobs": [
          {
            "name": "Risk Management",
            "raFiles": [
              { "name": "reinsurance_group_of_america_risk_management_1.report.pdf" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 26,
    "name": "Swiss Re",
    "branches": [
      {
        "name": "Switzerland / Zurich",
        "lobs": [
          {
            "name": "Claims",
            "raFiles": [
              { "name": "swiss_re_claims_1.report.pdf" },
              { "name": "swiss_re_claims_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 27,
    "name": "The Hartford",
    "branches": [
      {
        "name": "USA / Hartford",
        "lobs": [
          {
            "name": "Risk Management",
            "raFiles": [
              { "name": "the_hartford_risk_management_1.report.pdf" },
              { "name": "the_hartford_risk_management_2.summary.docx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 28,
    "name": "Towers Watson",
    "branches": [
      {
        "name": "UK / London",
        "lobs": [
          {
            "name": "Risk Management",
            "raFiles": [
              { "name": "towers_watson_risk_management_1.report.pdf" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 29,
    "name": "Travellers",
    "branches": [
      {
        "name": "USA / Hartford",
        "lobs": [
          {
            "name": "Underwriting",
            "raFiles": [
              { "name": "travellers_underwriting_1.report.pdf" },
              { "name": "travellers_underwriting_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 30,
    "name": "UnitedHealth Group",
    "branches": [
      {
        "name": "USA / Minneapolis",
        "lobs": [
          {
            "name": "Claims",
            "raFiles": [
              { "name": "unitedhealth_group_claims_1.report.pdf" },
              { "name": "unitedhealth_group_claims_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 31,
    "name": "Vanguard",
    "branches": [
      {
        "name": "USA / Malvern",
        "lobs": [
          {
            "name": "Operations",
            "raFiles": [
              { "name": "vanguard_operations_1.report.pdf" },
              { "name": "vanguard_operations_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 32,
    "name": "XL Group",
    "branches": [
      {
        "name": "Ireland / Dublin",
        "lobs": [
          {
            "name": "Claims",
            "raFiles": [
              { "name": "xl_group_claims_1.report.pdf" },
              { "name": "xl_group_claims_2.data.xlsx" }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 33,
    "name": "Zurich Insurance",
    "branches": [
      {
        "name": "Switzerland / Zurich",
        "lobs": [
          {
            "name": "Risk Management",
            "raFiles": [
              { "name": "zurich_insurance_risk_management_1.report.pdf" },
              { "name": "zurich_insurance_risk_management_2.summary.docx" }
            ]
          }
        ]
      }
    ]
  }
];

//
// RowType definition:
//
//   • For an organization row: level = 0 and orgRow is true.  
//     • Only “Organization” column is populated (with an expand button).
//
//   • For detail rows, level = 1.  
//     • They will have values for branch, lob, file.  
//     • To simulate merged cells, if multiple detail rows come from the same branch or LOB,
//       we output that value only on the first row.
//
type RowType = {
  id: string;
  level: number;
  orgRow?: boolean;
  organization?: string;
  branch?: string;
  lob?: string;
  file?: string;
};

export default function OrganizationHierarchyTable() {
  // For toggling an organization's expansion we use its generated id (e.g. "org-1")
  const [expandedOrgs, setExpandedOrgs] = React.useState<Set<string>>(new Set());
  const [newOpen, setNewOpen] = React.useState(false);

  const toggleOrg = (orgId: string) => {
    setExpandedOrgs(prev => {
      const next = new Set(prev);
      if (next.has(orgId)) {
        next.delete(orgId);
      } else {
        next.add(orgId);
      }
      return next;
    });
  };

  // Generate rows to display.
  // For each organization, first add a row with the organization name.
  // If expanded, add one row per RA file under each branch/LOB. In those rows, repeat
  // branch or LOB only once per group.
  const generateRows = (): RowType[] => {
    const rows: RowType[] = [];

    for (const org of orgData) {
      const orgId = `org-${org.id}`;
      // Organization row
      rows.push({
        id: orgId,
        level: 0,
        orgRow: true,
        organization: org.name,
      });

      if (expandedOrgs.has(orgId)) {
        // For each branch under the organization
        org.branches.forEach(branch => {
          let branchWritten = false;
          // For each LOB under this branch
          branch.lobs.forEach(lob => {
            let lobWritten = false;
            // For each RA file under this LOB
            lob.raFiles.forEach(file => {
              rows.push({
                id: `${orgId}-${branch.name}-${lob.name}-${file.name}`,
                level: 1,
                // Do not repeat the organization name in detail rows.
                organization: '',
                // Only display branch on its first occurrence.
                branch: !branchWritten ? branch.name : '',
                // Only display LOB on its first occurrence.
                lob: !lobWritten ? lob.name : '',
                file: file.name,
              });
              branchWritten = true;
              lobWritten = true;
            });
          });
        });
      }
    }

    return rows;
  };

  const rows: GridRowsProp = generateRows();

  const columns: GridColDef[] = [
    {
      field: 'organization',
      headerName: 'Organization',
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => {
        const row: RowType = params.row;
        // Only organization-level rows get an expand icon.
        if (row.orgRow) {
          return (
            <Stack display="flex" sx={{ alignItems: 'center', height: '100%' }} spacing={1} direction="row">
              <IconButton size="small" onClick={() => toggleOrg(row.id)}>
                {expandedOrgs.has(row.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
              <Typography variant="body2">{row.organization}</Typography>
            </Stack>
          );
        }
        return <Typography variant="body2" />;
      },
    },
    {
      field: 'branch',
      headerName: 'Branch (Country/City)',
      flex: 0.8,
      renderCell: (params: GridRenderCellParams) => (
        <Stack display="flex" sx={{ alignItems: 'center', height: '100%' }} spacing={1} direction="row"><Typography variant="body2">{params.value || ''}</Typography></Stack>
      ),
    },
    {
      field: 'lob',
      headerName: 'LOB',
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) => (
        <Stack display="flex" sx={{ alignItems: 'center', height: '100%' }} spacing={1} direction="row"><Typography variant="body2">{params.value || ''}</Typography></Stack>
      ),
    },
    {
      field: 'file',
      headerName: 'RA Files',
      flex: 1.2,
      renderCell: (params: GridRenderCellParams) => (
        params.value && <Stack display="flex" sx={{ alignItems: 'center', height: '100%' }} spacing={1} direction="row"><Chip label={params.value || ''} /></Stack>
      ),
    },
  ];

  return (
    <Stack sx={{ height: 'calc(100vh - 270px)', width: '100%' }} spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ m: 0, p: 0 }}>
        <Typography variant="h6" gutterBottom sx={{ flexGrow: 1, m: 0 }}>
          Manage RA Documents
        </Typography>
        <Button variant="contained" onClick={() => setNewOpen(true)}>
          Upload RA Files
        </Button>
      </Stack>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        hideFooter
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0',
            fontWeight: 'bold',
          },
        }}
      />
      <UploadRAFileDailog open={newOpen} handleClose={() => setNewOpen(false)} />
    </Stack>
  );
}
