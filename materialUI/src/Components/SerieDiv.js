import React from 'react';

function SerieDiv(props) {
    const serie = props.serie.serie;
    const raias = props.serie.raias;
    return (
        <div>
            {serie + "a Série"}
            <ol>
                {raias.map((atleta) => <li key={atleta.id}> {atleta.nome + " - " + atleta.clube + " - " + atleta.tempoInscricao} </li>)}
            </ol>
        </div>
    )
}

export default SerieDiv;