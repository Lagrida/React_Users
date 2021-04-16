import Box from '@material-ui/core/Box';

function SubHeader(){
    return(<Box my={2} style={{ textAlign: 'center' }}>
        <img src={process.env.PUBLIC_URL + "/logo.png"} />
    </Box>);
}

export default SubHeader;
