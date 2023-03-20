import { useEffect, useState } from 'react';
import apiLink from '../utils/http';

import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { DataView } from 'primereact/dataview';
import 'primeflex/primeflex.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import Header from '../../pages/header/header';
import Footer from '../../pages/footer/footer';
import './list-episode.css';



const ListaEpisodes = (props) => {

    const [EpisodesList, setEpisodesList] = useState([]);
    const [totalEpisodes, setTotalEpisodes] = useState(0);
    const [quantidadeDeLinhas, setQuantidadeDeLinhas] = useState(0);
    const [numeroPaginaValor, setNumeroPaginaValor] = useState(0);
    const navegate = useNavigate();

    const getAllEpisodes = `episode?page=`;

    const proximaPagina = async (e) => {
        let numeroPagina = (e.page + 1);

        const response = await apiLink.get(`${getAllEpisodes}${numeroPagina}`)
        setEpisodesList(response?.data?.results)
        totalEpisodes(response?.data?.info?.count)
        setNumeroPaginaValor(response?.data?.pages)
        setNumeroPaginaValor(e.first)

    }

    const exibirInfomacaoEpisodes = async (event, id) => {
        event.preventDefault();
    }

    useEffect(() => {

        const getEpisodes = async () => {
            const response = await apiLink.get(`${getAllEpisodes}/0`)
            setEpisodesList(response?.data?.results)
            setTotalEpisodes(response?.data?.info?.count)
            setQuantidadeDeLinhas(response?.data?.results.length)
        }
        getEpisodes();
       
    }, [])

     const gerarLink = (ids) => (id) => {
        return <Button link label="Detalhes" onClick={() => directEpisodio(id.id)} />
    }

    const directEpisodio = (id) => {
        navegate(`${id}`)
    }



    const itemTemplate = (Episodes) => {
        return (
            <>
            <div className="div-epgeral">
             <Card>
                   <Card.Content>
                        <Card.Header>{Episodes.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{Episodes.air_date}</span>
                        </Card.Meta>
                        {Episodes.episode} 
                        <div><Link to={`/episodes/${Episodes.id}`}>Detalhes do Episodio</Link></div> 
                    </Card.Content>  
                </Card>
            </div>
            </>
        );
    }


    return (
        <>

            <Header />
            <div className="list-main">

                <h2>{props.title}</h2>
                <p> ...  </p>
            </div>
            <div className="grid">
                <DataView value={EpisodesList} itemTemplate={itemTemplate} />
                <Paginator first={numeroPaginaValor} rows={quantidadeDeLinhas} totalRecords={totalEpisodes} onPageChange={proximaPagina} />
            </div>
            <Footer />

        </>
    )

}


export default ListaEpisodes