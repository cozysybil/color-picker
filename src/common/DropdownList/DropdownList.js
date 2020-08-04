import React, { useState } from "react";
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Menu,
} from "@material-ui/core";

const DropdownList = ({arr, label, setValue}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleItemClick = (event, index) => {
        setValue(arr[index])
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid>
            <List component="nav" aria-label="Item settings">
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label={label}
                    onClick={handleClickListItem}
                >
                    <ListItemText
                        primary={label}
                        secondary={arr[selectedIndex]}
                    />
                </ListItem>
            </List>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {arr.map((a, index) => (
                    <MenuItem
                        key={a}
                        selected={index === selectedIndex}
                        onClick={(event) => handleItemClick(event, index)}
                    >
                        {a}
                    </MenuItem>
                ))}
            </Menu>
        </Grid>
    );
};

export default DropdownList;
