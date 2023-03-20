import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiLink from '../utils/http';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'semantic-ui-css/semantic.min.css'
import './card.css'
import { Tag } from 'primereact/tag';

const CardCharacter = () => {

    const header = (url) => <img src='${url}' />;
    const [Character, setCharacter] = useState({});
    const [listaEpisodio, setListaEpisodio] = useState([])
    const navegate = useNavigate();
    const { id } = useParams();
    const getCharacterURL = "/character";

    useEffect(() => {
        const getCharacter = async () => {
            await apiLink.get(`${getCharacterURL}/${id}`)
             .then(response => {
                setCharacter(response?.data)
                carregaEpisodios(response?.data?.episode)
                    .then(resp => {
                        setListaEpisodio(resp.data)
                })
            })
           

        }

        getCharacter();
    }, [])

    const carregaEpisodios = async (nomeEpisodios) => {
        let listaEp = nomeEpisodios.reduce((acc, valor) => {
          return acc += valor.substr(valor.lastIndexOf('/')).replace('/', ',')
        }, '')
       return await apiLink.get(`/episode/${listaEp}`)
    } 

    const directEpisodio = (e) => {
        navegate(e)
    }

    const carregarCampo = (episodios) => (r) => {
        return <Button link onClick={() => directEpisodio(`/episodes/${r.id}`)} label={r.name} />
    }


    return (
        <>
            <div className="div-total">
                <div className="div-card">
                    <Card>
                        <Image src={Character?.image} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{Character?.name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{Character?.origin?.name}</span>
                            </Card.Meta>
                            <Card.Description>
                                <div><Tag severity="info" value={Character?.species} rounded /></div>
                                <div><Tag severity="info" value={Character?.status} rounded /></div>
                                <div><Tag severity="info" value={Character?.origin?.name} rounded /></div>
                            </Card.Description>
                            
                        </Card.Content>
                    </Card>
                </div>
                
                                <div >
                                    <DataTable value={listaEpisodio}>
                                        <Column header="Episódios" body={carregarCampo(listaEpisodio)}></Column>
                                    </DataTable>
                                </div>
            </div>
          
            <div className="div-button"><Link className='link-card' to={"/characters"}>Voltar</Link>  </div>

        </>
    )
}


export default CardCharacter;