import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React, { useMemo, useState } from "react";

type SearchSelectProps = {
    options: string[];
    label: string;
    value: string; // Add the value property
    onChange: (value: string) => void;
};


const containsText = (text: string, searchText: string) =>
    text.toLowerCase().includes(searchText.toLowerCase());

const SearchSelect: React.FC<SearchSelectProps> = ({ options, label }) => {
    const [selectedOption, setSelectedOption] = useState<string>(options[0] || "");
    const [searchText, setSearchText] = useState<string>("");

    const displayedOptions = useMemo(
        () => options.filter((option) => containsText(option, searchText)),
        [searchText, options]
    );

    return (
        <Box sx={{ m: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="search-select-label">{label}</InputLabel>
                <Select
                    MenuProps={{ autoFocus: false }}
                    labelId="search-select-label"
                    id="search-select"
                    value={selectedOption}
                    label={label}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    onClose={() => setSearchText("")}
                    renderValue={() => selectedOption}
                >
                    <ListSubheader>
                        <TextField
                            size="small"
                            autoFocus
                            placeholder="Type to search..."
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key !== "Escape") {
                                    e.stopPropagation();
                                }
                            }}
                        />
                    </ListSubheader>
                    {displayedOptions.map((option, i) => (
                        <MenuItem key={i} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SearchSelect;
