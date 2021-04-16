import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SubHeader from './components/SubHeader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    widthContainer: {
        [theme.breakpoints.down("xl")]: {
            width:'80%'
        },
        [theme.breakpoints.down("lg")]: {
            width:'85%'
        },
        [theme.breakpoints.down("md")]: {
            width:'90%'
        },
        [theme.breakpoints.down("sm")]: {
            width:'100%'
        },
    },
    hideCat:{
        display: 'block',
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        },
    },
    hideForum:{
        display: 'flex',
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        },
    }
}));
function Body(){
    const classes = useStyles();
    useEffect(() => {
        document.title = "Forum";
    }, []);
    return(
        <Container maxWidth style={{ marginTop: 90 }} className={classes.widthContainer}>
        <SubHeader />
        <Box my={2} className="forum">
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Box className="cat" style={{ paddingLeft:'20px' }}>
                        Math supérieur
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box className={`cat ${classes.hideCat}`} style={{ textAlign:'center', whiteSpace: 'nowrap' }}>
                        <span style={{ fontWeight:'normal', fontSize:'15px' }}>Number of topics</span>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box className={`cat ${classes.hideCat}`} style={{ textAlign:'center' }}>
                        <span style={{ fontWeight:'normal', fontSize:'15px' }}>Last topic</span>
                    </Box>
                </Grid>
            </Grid>
            <Grid container style={{ borderBottom: '1px solid #E3E3E3' }}>
                <Grid item xs={12} md={6}>
                    <Grid container>
                        <Grid item sm={1} xs={2} style={{ 'textAlign':'center' }}>
                            <Box my={1}>
                                <img src={process.env.PUBLIC_URL + "/images/forums/img17.gif"} />
                            </Box>  
                        </Grid>
                        <Grid item sm={11} xs={10}>
                            <Box my={1}>
                                <Link to="/forum/5">Algébre générale</Link><br />
                                Le forum de l'algébre générale.
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} className="cat_topics">
                    <Box justifyContent="center" display="flex" alignItems="center" style={{with:'100%', height:'100%'}} className={classes.hideForum}>
                        10
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box justifyContent="left" display="flex" alignItems="center" style={{with:'100%', height:'100%', paddingLeft: '20px'}} className={classes.hideForum}>
                        <div><Link to="/">What is the number of permutations</Link><br />
                        By <Link to="/">Lagida</Link></div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Container>);
}
export default Body;
