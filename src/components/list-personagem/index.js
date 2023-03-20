import { useEffect, useState } from 'react';
import apiLink from '../utils/http';

import { Paginator } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import 'primeflex/primeflex.css';
import { Link } from 'react-router-dom';
import './list-personagem.css';

import { Card, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


const ListaPersonagem = () => {

    const [CharacterList, setCharacterList] = useState([]);
    const [totalCharacter, setTotalCharacter] = useState(0);
    const [quantidadeDeLinhas, setQuantidadeDeLinhas] = useState(0);
    const [numeroPaginaValor, setNumeroPaginaValor] = useState(0);

    const getAllPersonagens = `/character/?page=`;

    const proximaPagina = async (e) => {
        let numeroPagina = (e.page + 1);

        const response = await apiLink.get(`${getAllPersonagens}${numeroPagina}`)
        setCharacterList(response?.data?.results)
        totalCharacter(response?.data?.info?.count)
        setNumeroPaginaValor(e.first)

    }

    const exibirInfomacaoCharacter = async (event, id) => {
        event.preventDefault();
    }

    useEffect(() => {

        const getPersonagens = async () => {
            const response = await apiLink.get(`${getAllPersonagens}/0`)
            setCharacterList(response?.data?.results)
            setTotalCharacter(response?.data?.info?.count)
            setQuantidadeDeLinhas(response?.data?.results.length)

        }
        getPersonagens();
    }, [])

    const itemTemplate = (Character) => {
        return (

            <>
            <div className="character-div">
                <Card>
                    <Image src={Character.image} wrapped ui={false} onClick={(event, id) => exibirInfomacaoCharacter(event, Character.id)} />
                    <Card.Content>
                        <Card.Header>{Character.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{Character.origin.name}</span>
                        </Card.Meta>
                        <Card.Description>
                                <div>
                                <Tag severity="info" value={Character.species} rounded/>
                                </div>

                                <div>
                                <Tag severity="info" value={Character.status} rounded/> 
                                </div>
                                <div>
                                <Tag severity="info" value={Character.origin.name} rounded/> 
                                </div>
                                                                   
                        </Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                        
                        <Link to={`${Character.id}`}>Detalhes</Link>

                    </Card.Content>

                </Card>
            </div>    
            </>

        );
    }

    return (
        <>

            <div className="card">
                <DataView value={CharacterList} itemTemplate={itemTemplate} />
                <Paginator first={numeroPaginaValor} rows={quantidadeDeLinhas} totalRecords={totalCharacter} onPageChange={proximaPagina} />

            </div>


        </>
    )

}

export default ListaPersonagem

