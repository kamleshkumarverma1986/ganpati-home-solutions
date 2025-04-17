import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    return (
        <Backdrop
            sx={{
                color: '#ffffff',
                zIndex: 999
            }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
