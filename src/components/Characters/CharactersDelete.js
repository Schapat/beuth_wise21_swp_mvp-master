/**
 * Subkomponente zur Bestätigung der Löschung des gewählten Charakters
 * 
 * @author Tim Jaap <s77284@beuth-hochschule.de>
 */

 // Bibliotheken importieren
 import React, { Component } from 'react';
 import './CharactersDelete.css';
 
  // Import weiterer Komponenten
  // ...
 
  class CharactersDelete extends Component {
    /**
      * Konstruktor
      * 
      * @param {*} props 
      */
    constructor( props ) {
        // Konstruktor der Elternklasse aufrufen
        super( props );
        
        // Initialisiere und Definiere das State Objekt
        this.state     = {};
    }

    /**
     * Rendering der Komponente
     */
    render() {
        return(
            <div className="modal" tabIndex="-1" id="deleteChar">

                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Soll der Character wirklich gelöscht werden?</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="container-fluid">
                                    <p>
                                        Soll der Character <em>{ this.props.cv.name }</em> (ID: <em>{ this.props.id }</em>) wirklich gelöscht werden?
                                    </p>
                                    <p className="text-danger">
                                        <strong>ACHTUNG!</strong> Der Character wird unwiderruflich gelöscht!
                                    </p>
                                </div>
                            </div>
                            
                            <div className="modal-footer">
                                <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal">
                                    Abbrechen
                                </button>
                                <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={ () => this.props.delfct( this.props.id ) }>
                                    Character Löschen
                                </button>
                            </div>

                        </div>
                    </div>
            </div>
        );
    }
}

export default CharactersDelete;