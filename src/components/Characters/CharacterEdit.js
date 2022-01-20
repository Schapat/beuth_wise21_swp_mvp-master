/**
 * Subkomponente zur Generierung des Charakterformulars.
 * 
 * @author Tim Jaap <s77284@beuth-hochschule.de>
 */
// Import der Bibliotheken
import React, { Component } from 'react';
import CharactersForm from './CharactersForm.js';

class CharacterEdit extends Component {
    /**
     * Konstruktor
     * 
     * @param {*} props 
     */
    constructor( props ) {
        // Konstruktor der Elternklasse aufrufen
        super( props );

        // Initialisiere und Definiere das state Objekt
        this.state      = {};

        this.saveData   = this.saveData.bind( this );
        this.resetData  = this.resetData.bind( this );
    }

    /**
     * Speichert die Daten des Charakters persistenten.
     * 
     * @param {*} event 
     */
    saveData( event, cv ) {
        // Characterdaten zwischenspeichern
        let charData    = cv;
        
        // Fehlerfall kein Name gesetzt abfangen
        if( charData.name === "" ) {
            charData.name   = "NoName" + cv.id;
        }

        // Eintrag anlegen
        fetch( "https://swp.benschdev.net/characters?id=" + cv.id, {
            method: "POST",
            body: JSON.stringify( charData )
        } )
        .then(
            ( result ) => {
                this.setState( {
                    isLoaded: true,
                    items: result
                } );
            },
            // Fehlerbehandlung
            ( error ) => {
                this.setState( {
                    isLoaded: true,
                    error
                } );
            }
        );

        // Funktion der Hauptcomponente zu aktualisieren der Charakterliste aufrufen
        this.props.clupdtfnc( 'edit', charData );

        return;
    }

    /**
     * Leere Funktion aus Kompatibilitätsgrünen
     * 
     * @param {*} event 
     */
    resetData( event ) {
        return;
    }

    /**
     * Gibt die gerenderte Anzeige wieder
     * 
     */
    render() {
        // Zusätzliche Informationen für das Formular setzen// Ausgabe zurückgeben
        return(
            <div className="modal" tabIndex="-1" id="editChar">

                <div className="modal-dialog modal-lg" key={ 'ce' + this.props.cv.id }>
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Charakter { this.props.cv.name } bearbeiten</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={ this.resetData }></button>
                        </div>

                        <CharactersForm
                            gs={ this.props.gs }
                            cl={ this.props.cl }
                            handleSave={ this.saveData }
                            handleReset={ this.resetData }
                            action={ this.props.action }
                            actnhndl={ this.props.actnhndl }
                            clupdtfnc={ this.props.clupdtfnc }
                            id={ this.props.id }
                            cv={ this.props.cv }
                            gv={ this.props.gv }
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default CharacterEdit;