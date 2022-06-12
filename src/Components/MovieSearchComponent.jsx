import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export function MovieSearchComponent(props) {

    return (
        <div className="search-bar">
        <TextField
        id="input-with-icon-textfield"
        // label="TextField"
        onKeyDown={props.handleKeyDown}
        onChange={props.handleChange}
        variant="outlined"
        placeholder="Search Movies"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={props.value || ''}

        //variant="standard"
      />
        </div>
    );
}

