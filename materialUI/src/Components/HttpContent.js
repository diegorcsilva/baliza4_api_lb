import React from 'react';
import ProvaCard from './ProvaCard';
import './HttpContent.css';
const axios = require('axios');

class HttpContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: []}
    }

    componentDidMount() {
        // axios.get('http://10.6.2.91:3005/api/provas?filter[include]=inscricoes')
        //     .then((response) => console.log(response.data) /*this.setState({content: response.data})*/)
        //     .catch((error) => console.log(error));

        axios({
            method:'get',
            url:'http://localhost:3005/api/provas?filter={"include": {"relation": "inscricoes", "scope": {"order" : "tempoInscricao DESC"}}}',
            header: { 'Content-Type': 'application/json' ,
                'X-Requested-With': 'XMLHttpRequest',
                'mode': 'cors',
                'Access-Control-Allow-Origin': '*' ,
                'Access-Control-Allow-Headers':'origin, content-type, accept, authorization'
            },
        })
            .then((response) => {
                //console.log(response.data)
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i] = this.balizamento(response.data[i], 6);
                }
                //console.log(this.balizamento(response.data[0], 6))
                this.setState({
                    content: response.data
                })
            } /*this.setState({content: response.data})*/)
            .catch((error) => console.log(error));
    }

    balizamento(prova, numRaias) {
        //ordem = array(3, 2, 4, 1, 5);  // Para 5 raias
        const ordem =[3, 4, 2, 5, 1, 6];  // Para 6 raias
        //ordem = array(4, 5, 3, 6, 2, 7, 1, 8);  // Para 8 raias
        const numAtletas = prova.inscricoes.length;
        if (!numAtletas) {
            prova.balizamento = [];
            return prova;
        }
        var numSeries = Math.floor(numAtletas/numRaias);
        const resto = numAtletas % numRaias;
        var balizamento = [];

        if (resto > 0) {
            numSeries += 1;
            var puxa = 0;
            switch (resto) {
                case 1:
                    puxa = (numSeries === 1)? 0: 2;
                    break;
                case 2:
                    puxa = (numSeries === 1)? 0: 1;
                    break;
                default:
                    break;

            }
        }
        var k = 0; //Linha inicial das inscrições
        var atletasPorSerie;

        var numSerie;
        for(numSerie = 1; numSerie <= numSeries; numSerie++) {
            if(numSerie === 1) {
                atletasPorSerie = (resto > 0) ? resto + puxa : numRaias;
            } else if(numSerie === 2)
                atletasPorSerie = numRaias - puxa;
            else
                atletasPorSerie = numRaias;

            var atletaTemp = {};
            var serieAtual = [];
            for(let atleta = k + atletasPorSerie - 1, seq = 0; atleta >= k; atleta--, seq++) {
                atletaTemp = Object.assign({}, prova.inscricoes[atleta]);
                atletaTemp.raia = ordem[seq];
                serieAtual = serieAtual.concat(atletaTemp);
            }
            serieAtual.sort(this.compare);
            //var serieFinal = {};
            //serieFinal.serie = numSerie
            //serieFinal.raias =  Object.assign({}, serieAtual);
            //console.log(serieFinal);
            k = atletasPorSerie;
            balizamento = balizamento.concat({"serie" : numSerie, "raias" : serieAtual});
            //balizamento[numSeries] = {"serie" : numSerie, "raias" : serieAtual};
        }
        prova.balizamento = balizamento;
        return prova;
    }

    compare(a,b) {
        if (a.raia < b.raia)
            return -1;
        if (a.raia > b.raia)
            return 1;
        return 0;
    }

    render() {
        return (
            <div className="center">
                {this.state.content.map((prova) => <ProvaCard key={prova.id} prova={prova} />)}
            </div>
        )
    }
}

export default HttpContent;