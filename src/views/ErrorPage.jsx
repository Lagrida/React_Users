import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

function ErrorPage(props){
    return(
        <Container component="main" style={{ marginTop: 90 }}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12}>
                    <Alert severity="error" style={{ padding: '20px', fontSize:'25px' }}>{props.errorMessage}</Alert>
                </Grid>
            </Grid>
        </Container>
    ); 
}
export default ErrorPage;
