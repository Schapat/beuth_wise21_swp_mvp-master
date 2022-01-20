/**
 * Subkomponente zum Auflisten der vorhandenen Charaktere
 * 
 * @author Tim Jaap <s77284@beuth-hochschule.de>
 */

 // Bibliotheken importieren
import React, { Component } from 'react';
import './CharactersList.css';

 // Import weiterer Komponenten
 // ...

 class CharactersList extends Component {
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
            action: null
        };
    }

    /**
     * Gibt die gerenderte Anzeige wieder
     */
    render() {
        // temporäres Styling
        const spanCursorStyle = { cursor: 'pointer' };

        // temporäre Variable zum Aufnehmen der Tabelleninhalte
        let tblcontent;
        
        // Tabelleninhalte aufbereiten, wenn Charaktere in der Datenbank gespeichert sind
        if( this.props.cl.length > 0 ) {
            // Liste sortieren
            this.props.cl.sort( (a, b) => ( a.name > b.name ) ? 1 : ( ( a.name < b.name ) ? -1 : 0 ) );

            // Tabelleninhalte erzeugen
            tblcontent     = this.props.cl.map( ( char ) => {
                // Spielsysteminformationen finden
                let gamesystem      = this.props.gs.find( item => parseInt( item.id ) === parseInt( char.gamesys_id ) );

                if( gamesystem === undefined ) {
                    gamesystem      = { id: 0, name: 'Allgemein', attributes: {} }
                }

                return(
                    <tr  key={ char.id } >
                        <td>
                            <span
                            className="link-primary"
                            style={ spanCursorStyle }
                            data-bs-toggle="modal"
                            data-bs-target="#viewChar"
                            onClick={ () => this.props.actn( "view", char.id, char ) }
                            >
                                {char.name}
                            </span>
                        </td>
                        <td>{ gamesystem.name }</td>
                        <td>{ char.player_controlled ? 'PC' : 'NPC' }</td>
                        <td>
                            <button
                            type="button"
                            className="btn btn-primary eye"
                            data-bs-toggle="modal"
                            data-bs-target="#viewChar"
                            onClick={ () => this.props.actn( "view", char.id, char, gamesystem ) }>
                                <span className="bi-eye"></span>
                            </button>
                            &nbsp;
                            <button
                                type="button"
                                className="btn btn-success pencil"
                                data-bs-toggle="modal"
                                data-bs-target="#editChar"
                                onClick={ () => this.props.actn( "edit", char.id, char, gamesystem ) }>
                                <span className="bi-pencil"></span>
                            </button>
                            &nbsp;
                            <button
                            type="button"
                            className="btn btn-danger trash"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteChar"
                            onClick={ () => this.props.ackDelFun( char.id, char ) }>
                                <span className="bi-trash"></span>
                            </button>
                        </td>
                    </tr>
                )
            } )
        } else {
            // Ausgabe für den Fall, dass keine Charaktere in der Datenbank gespeichert sind
            tblcontent     = <tr><td colSpan="4">Es sind keine Charaktere gespeichert.</td></tr>
        }
        
        return(
            <table className="table table-striped table-hover">
                <thead>
                    <tr key={0}>
                        <th>Charaktername</th>
                        <th>Spielsystem</th>
                        <th>Art</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    { tblcontent }
                </tbody>
            </table>
        );
    }
}

export default CharactersList;