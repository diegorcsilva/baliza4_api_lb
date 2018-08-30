import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 1,
        overflowX: 'auto',
    },
    table: {
        //minWidth: 700,
    },
});

function SimpleTable(props) {
    const { classes } = props;
    const serie = props.serie.serie;
    const raias = props.serie.raias;

    return (
        <div>
        {serie + "a Série"}
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell numeric>Raia</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Clube</TableCell>
                        <TableCell numeric>Tempo</TableCell>
                        <TableCell numeric>Tempo Final</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {raias.map(atleta => {
                        return (
                            <TableRow key={atleta.id}>
                                <TableCell component="th" scope="row" numeric>
                                    {atleta.raia}
                                </TableCell>
                                <TableCell>{atleta.nome}</TableCell>
                                <TableCell>{atleta.clube}</TableCell>
                                <TableCell numeric>{atleta.tempoInscricao}</TableCell>
                                <TableCell numeric>{atleta.tempoFinal}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
            <p></p>
        </div>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);