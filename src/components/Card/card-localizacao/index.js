import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Card, Image } from 'semantic-ui-react'

import apiLink from '../../utils/http';

const CardLocalizacao = () => {
    const [localizacao, setLocalizacao] = useState({});
    const [listaCharacter, setListaCharacter] = useState([]);
    const navegate = useNavigate();
    const {id} = useParams();
    const getLocalizacao = "/location";

    useEffect(() => {
        const getLocation = async () => {
            await apiLink.get(`${getLocalizacao}/${id}`)
                .then(response => {
                    setLocalizacao(response?.data);
                    carregaCharacter(response?.data?.residents)
                        .then(resp => setListaCharacter(resp.data))
                }
            )
        }

        getLocation();
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
                                <Button link onClick={() => directCharacter(`/characters/${Character.id}`)}>Informações do personagem</Button>
                            </Card.Content>
                        </Card>
                    </div>
                </div>

            </>    
        );
    }

    return (
        <>
        
            <div className="card">
                <div className="grid">
                    <div className="col-12">
                    <div className="col-offset-3">
                            <Card title="Detalhe da Localização" style={{width: '950px'}}>
                                <div>
                                    <p>
                                        <Badge value={`Nome da localização: ${localizacao.name}`} size="large" severity="info"></Badge>
                                    </p>
                                    <p>
                                        <Badge value={`Tipo da localização: ${localizacao.type}`} size="large" severity="info"></Badge>
                                    </p>
                                    <p>
                                        <Badge value={`Dimensão da Localização: ${localizacao.dimension}`} size="large" severity="info"></Badge>
                                    </p>
                                </div>
                                <div lassName="col-12">
                                    <DataView value={listaCharacter}  itemTemplate={itemTemplate} />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardLocalizacao