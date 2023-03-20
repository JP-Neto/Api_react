import React from "react";
import './main.css'
import ListaPersonagem from "../../components/list-personagem";


const Main = (props) =>{
            return(

                <section>
                <div className="list-main">
                    <h2>{props.title}</h2>
                    <p>Selected </p>
                    <ListaPersonagem /> 
                    <ul class="character-list">
                        <li>
                             
                                                                       
                        </li>       
                        
                    </ul>
                    
                </div>
            </section>
  
    )
}

        export default Main