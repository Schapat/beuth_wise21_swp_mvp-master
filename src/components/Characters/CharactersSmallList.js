/**
 * Subkomponente zum Auflisten der vorhandenen Charaktere
 * 
 * @author Tim Jaap <s77284@beuth-hochschule.de>
 */

// Bibliotheken importieren
import React, { Component } from 'react';
import './CharactersSmallList.css';
import CharacterView from './CharactersView.js';
 
// Import weiterer Komponenten
// ...

class CharactersSmallList extends Component {
    /**
     * Konstruktor
     * 
     * @param {*} props 
     */
    constructor( props ) {
        // Konstruktor der Elternklasse aufrufen
        super( props );
        
        // Initialisiere und Definiere das State Objekt
        this.state     = {
            charData: {},
            gamesystems: []
        };
    }

    componentDidMount() {
        //
        fetch( 'https://swp.benschdev.net/characters' )
        .then( response => response.json() )
        .then( response => {
            this.setState( { charData: response.data } );
        });

        fetch( 'https://swp.benschdev.net/gamesystem' )
        .then( response => response.json() )
        .then( response => {
            this.setState( { gamesystems: response.data } );
        } );
    }

    /**
     * Gibt die gerenderte Anzeige wieder
     */
    render() {
        // temporäre Variable zum Aufnehmen der Tabelleninhalte
        let tblcontent;
        
        // Tabelleninhalte aufbereiten, wenn Charaktere in der Datenbank gespeichert sind
        if( this.props.cl.length > 0 ) {
            // Liste sortieren
            this.props.cl.sort( (a, b) => ( a.name > b.name ) ? 1 : ( ( a.name < b.name ) ? -1 : 0 ) );

            // Tabelleninhalte erzeugen
            tblcontent     = this.props.cl.map( ( char ) => {
                return(
                    <tr  key={ char.id } >
                        <td>
                            <a href="" data-bs-toggle="modal" data-bs-target="#viewChar">
                                {char.name} ({char.system})
                            </a>
                        </td>
                    </tr>
                )
            } )
        } else {
            // Ausgabe für den Fall, dass keine Charaktere in der Datenbank gespeichert sind
            tblcontent     = <tr><td>Es sind keine Charaktere gespeichert.</td></tr>
        }
        
        return(
            <div key="smallCharList">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr key={0}>
                            <th>Charaktername (Spielsystem) </th>
                        </tr>
                    </thead>
                    <tbody>
                        { tblcontent }
                    </tbody>
                </table>

                <CharacterView />
            </div>
        );
    }
}

export default CharactersSmallList;