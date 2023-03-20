import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Card, Image } from 'semantic-ui-react';
import './card-episode.css'

import apiLink from '../../utils/http';

const CardEpisodio = () => {
    const [episodio, setEpisodio] = useState({});
    const [listaCharacter, setListaCharacter] = useState([]);
    const navegate = useNavigate();
    const {idEpisodio} = useParams();
    const {idCharacter} = useParams();
    const getEp = "/episode/";

    useEffect(() => {
        const getEpisodio = async () => {
            await apiLink.get(`${getEp}${idEpisodio}`)
                .then(response => {
                    setEpisodio(response?.data);
                    carregaCharacter(response?.data?.characters)
                        .then(resp => setListaCharacter(resp?.data))
                }
            )
        }

        getEpisodio()
    }, [])

    const carregaCharacter = async (nomeCharacter) => {
        let listaCharacter = nomeCharacter.reduce((acc, valor) => {
          return acc += valor.substr(valor.lastIndexOf('/')).replace('/', ',')
        }, '')
       return await apiLink.get(`/character/${listaCharacter}`)
    } 

    const directCharacter = (e) => {
        navegate(e)
    }

    const itemTemplate = (Character) => {
        return (
            <>
          
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
                        <Link to={`/characters/${Character.id}`}>Informações do Personagem</Link>
                    </Card>
                </div>
            
            </>    
        );
    }


    return (
        <>

    <div className="div-total">
            <Card title="Detalhes do Episódio" style={{ width: '950px' }}>
                <div>
                    <p>
                        <Badge value={`Nome do Episódio: ${episodio.name}`} size="large" severity="info"></Badge>
                    </p>
                    <p>
                        <Badge value={`Date de estreia: ${episodio.air_date}`} size="large" severity="info"></Badge>
                    </p>
                </div>
                <div className="col-12">
                    <DataView value={listaCharacter} itemTemplate={itemTemplate} />
                </div>
            </Card>
            
    </div>
    <div className="div-button"><Link className='link-card' to={"/characters"}>Voltar</Link>  </div>    

        </>
    )
}

export default CardEpisodio