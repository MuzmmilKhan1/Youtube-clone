import { useState } from 'react';
import { styled, alpha, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../Images/youtube-logo-png-2069.png'
import { Link, useNavigate } from 'react-router-dom';



const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: '#0f0f0f', // Set your desired primary color
    },
  },
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      // width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useNavigate();

  const handleSearch = () => {
    // Perform search action using the searchQuery value
    console.log('Searching for:', searchQuery);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (searchQuery) {
      if (event.key === 'Enter') {
        history(`/searched/${searchQuery}`, { state: { keyword: searchQuery } });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Link to={'/'}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 0 }}
            >
            {/* Replace the following line with your logo component */}
            <img src={logo} width={'35px'} alt="Logo" />
          </IconButton>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            style={{
              fontWeight: "bold",
            }}
          >
            Youtube Clone
          </Typography>
          <Search
            style={{
              width: "60%",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              style={{
                width: "100%",
              }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </Search>
          {searchQuery && (

            <Link
              to={`/searched/${searchQuery}`}
              state={{ keyword: searchQuery }}
            >
              <IconButton
                color="inherit"
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
