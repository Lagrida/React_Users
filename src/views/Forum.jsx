import React from 'react';
import Container from '@material-ui/core/Container';
import SubHeader from './components/SubHeader';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 80,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      background: '#fff'
    },
    forumTitle:{
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 10,
            marginBottom: 10
        },
    },
    breakPoint:{
        display:'initial',
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    }
  }));
function Forum(){
    const classes = useStyles();
    const [page, setPage] = React.useState(1);

    const handleChange = (event) => {
        setPage(event.target.value);
    };
    return(
        <Container fixed style={{ marginTop: 90 }}>
            <SubHeader />
            <div>
                <Grid container>
                    <Grid item xs={12} sm={12} md={4}>
                        <div className={ classes.forumTitle } style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                            <Link to="/forum/5" className="forum_title">
                                <img src={process.env.PUBLIC_URL + "/images/forums/img17.gif"} style={{verticalAlign:'middle'}} /> 
                                Algébre générale
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} style={{ textAlign:'right' }} className={classes.breakPoint}>
                            <Card style={{height:"100%", display:'inline-block', width: 100}} variant="outlined">
                                <div style={{ textAlign:'center', position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                                    <img src={process.env.PUBLIC_URL + "/images/folders/folder_new_topic.gif"} style={{verticalAlign:'middle'}} /><br />
                                        Add Topic
                                    </div>
                            </Card>
                            <Card style={{height:"100%", display:'inline-block', width: 100}} variant="outlined">
                                <div style={{ textAlign:'center', position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                                    Your Topics<br />
                                        In this forum
                                </div>
                            </Card>
                            <Card style={{height:"100%", display:'inline-block', width: 100}} variant="outlined">
                                <div style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        Page
                                        </InputLabel>
                                        <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        value={page}
                                        onChange={handleChange}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        >
                                        <MenuItem value="1">
                                            <em>1</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Card>
                            <Card style={{height:"100%", display:'inline-block', width: 230}} variant="outlined">
                                <div style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        Forums
                                        </InputLabel>
                                        <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        value={page}
                                        onChange={handleChange}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        style={{ width: 200 }}
                                        >
                                        <MenuItem value="1">
                                            <em>1</em>
                                        </MenuItem>
                                        <MenuItem value={1}>General Algebra</MenuItem>
                                        <MenuItem value={2}>Pur Math</MenuItem>
                                        <MenuItem value={3}>Hello World</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Card>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
export default Forum;
