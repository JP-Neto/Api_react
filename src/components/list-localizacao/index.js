import { useEffect, useState } from 'react';
import apiLink from '../utils/http';
import './list-localizacao.css';
import Header from '../../pages/header/header';
import Footer from '../../pages/footer/footer';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import { useNavigate } from 'react-router-dom';
import { DataView } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react'
import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'


const ListLocation = (props) => {

    const [LocationList, setLocationList] = useState([]);
    const [totalLocation, setTotalLocation] = useState(0);
    const [quantidadeDeLinhas, setQuantidadeDeLinhas] = useState(0);
    const [numeroPaginaValor, setNumeroPaginaValor] = useState(0);
    const navegate = useNavigate();

    const getAllLocation = `/location/?page=`;

    const proximaPagina = async (e) => {
        let numeroPagina = (e.page + 1);

        const response = await apiLink.get(`${getAllLocation}${numeroPagina}`)
        setLocationList(response?.data?.results)
        totalLocation(response?.data?.info?.count)
        //setNumeroPaginaValor(response?.data?.pages)
        setNumeroPaginaValor(e.first)

    }

  
    useEffect(() => {

        const getLocation = async () => {
            const response = await apiLink.get(`${getAllLocation}/0`)
            setLocationList(response?.data?.results)
            setTotalLocation(response?.data?.info?.count)
            setQuantidadeDeLinhas(response?.data?.results.length)
        }
        getLocation();
      
    }, [])

    const gerarLink = (ids) => (id) => {
        return <Button link label="Detalhes" onClick={() => directEpisodio(id.id)} />
    }

    const directEpisodio = (id) => {
        navegate(`${id}`)
    }


    const itemTemplate = (Location) => {
        return (

            <>
                <div className="div-dimension">
                    <Card>

                        <Card.Content>
                            <Card.Header>{Location.name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{Location.type}</span>
                            </Card.Meta>
                            <Card.Description>
                                {Location.dimension}
                                {Location.location}
                               <div><Link to={`${Location.id}`}>Detalhes</Link></div>
                                                              
                               </Card.Description>
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
                <p>... </p>
            </div>
            <div>
           
              <DataView value={LocationList} itemTemplate={itemTemplate} />
              <Paginator first={numeroPaginaValor} rows={quantidadeDeLinhas} totalRecords={totalLocation} onPageChange={proximaPagina} />
            </div>
            <Footer />


        </>
    )

}


export default ListLocation