import {
    Button,
    TextField,
    Box
  } from '@material-ui/core';
import handleChange from '../../../handleChange';

function CatForm({cat, setCat, findError}) {
    return (
        <>
            <Box my={2}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    onChange={ event => handleChange(event, setCat) }
                    value={cat.title}
                    variant="outlined"
                    error={findError("title").match}
                    helperText={findError("title").message}
                />
            </Box>
            <Box my={2}>
                <TextField
                    fullWidth
                    label="Order"
                    name="o_rder"
                    onChange={ event => handleChange(event, setCat) }
                    type="number"
                    value={cat.o_rder}
                    variant="outlined"
                    error={findError("o_rder").match}
                    helperText={findError("o_rder").message}
                />
            </Box>
        </>
    );
}

export default CatForm;
