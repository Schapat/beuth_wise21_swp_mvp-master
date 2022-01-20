/**
 * Hauptkomponente zur Steuerung der Subkomponenten für die Verwaltung von Charakteren.
 * 
 * @author Tim Jaap <s77284@beuth-hochschule.de>
 */
import React, { Component } from 'react';
import './Characters.css';

// Import der einzelnen Komponenten
import CharactersList from './CharactersList.js';
import CharacterView from './CharactersView.js';
import CharacterDelete from './CharactersDelete.js';
import CharacterAdd from './CharacterAdd.js';
import CharacterEdit from './CharacterEdit.js';

class Characters extends Component {
    constructor( props ) {
        super( props );

        // Initialisierung des state Objekt
        this.state  = {
            characters: [],
            gamesystems: [],
            action: null,
            echaracter: null,
            tmpCId: 0,
            tmpCVal: {},
            tmpGsVal: {}
        };

        // Bindungs
        this.handleBtnActn      = this.handleBtnActn.bind( this );
        this.setDataforDeletingCharacter    = this.setDataforDeletingCharacter.bind( this );
        this.deleteCharacter    = this.deleteCharacter.bind( this );
        this.updateCharList     = this.updateCharList.bind( this );
    }

    /**
     * React Komponentenfunktion, welche beim Einbinden der Komponente automatisch aufgerufen wird.
     *      Veranlasst beim Einbinden der Komponente die Abfrage der Character- und Spielsystemlisten.
     * 
     */
    componentDidMount() {
        // Ruft die Funktion zum Abrufen der Characterliste auf
        this.getCharactersFromDb();

        // Ruft die Funktion zum Abrufen der Liste der Spielsysteme auf
        this.getGamesystemsFromDb();
    }

    /**
     * Legt beim Aufruf des Modals die Aktion fest.
     * 
     * @param {*} act 
     */
    handleBtnActn( act, id = 0, char = {}, gs = {} ) {
        // State anpassen
        this.setState( { action: act, tmpCId: id, tmpCVal: char, tmpGsVal: gs } );
        return;
    }

    /**
     * Aktualisiert die Charakterliste und fügt entweder einen neu angelegten Charakter hinzu oder speichert die
     *      Anpassungen an einem bestehenden Charakter. Wird benötigt, um die Rendering Funktion erneut auszulösen
     *      und die Aktualisierung anzuzeigen.
     * 
     * @param {*} actn
     * @param {*} char 
     */
    updateCharList( actn, char ) {
        // Letzten Stand der Charakterliste zwischenspeichern
        let ncl     = this.state.characters;

        // Neuer Charakter der Charakterliste hinzufügen
        if( actn === "add" ) {
            ncl.push( char );
        }

        // Bestehenden Charakter in der Charakterliste aktualisieren
        if( actn === "edit" ) {
            // Eintrag finden
            for( let ix = 0; ix < ncl.length; ix++ ) {
                if( ncl[ix].id === char.id ) {
                    ncl[ix]     = char;
                }
            }
        }

        // State aktualisieren, um das Rerendering auszulösen
        this.setState( { characters: ncl } );

        return;
    }

    /**
     * Setzt die ID und den Namen des zu löschen Characters für die Sicherheitsabfrage
     * 
     * @param {*} id 
     * @param {*} name 
     */
    setDataforDeletingCharacter( id, char ) {
        // State anpassen
        this.setState( { tmpCId: id, tmpCVal: char } );

        return;
    }

    /**
     * Ruft den Löschbefehl in der Datenbank auf, um den Character mit der entsprechenden ID zu löschen
     * 
     * @param {*} id 
     */
    deleteCharacter( id ) {
        // Löschanfrage an Datenbank senden
        fetch( 'https://swp.benschdev.net/characters?id=' + id, {
            method: "DELETE"
        } )
        .then( response => response.json() )
        .then( response => {} );

        // Datensatz aus Liste entfernen
        let ncl     = this.state.characters;

        // Array durchlaufen und Eintrag zum Entfernen finden
        for( let didx = 0; didx < ncl.length; didx++ ) {
            if( ncl[didx].id === id ) {
                // Eintrag aus Array entfernen
                ncl.splice( didx, 1 );
            }
        }

        // State zurücksetzen und aktualisieren
        this.setState( { tmpCId: 0, tmpCVal: {}, characters: ncl } );

        return;
    }

    /**
     * Lädt die Liste und Daten der vorhandenen Spielsysteme aus der Datenbank.
     * 
     */
    getGamesystemsFromDb() {
        fetch( 'https://swp.benschdev.net/gamesystem' )
        .then( response => response.json() )
        .then( response => {
            this.setState( { gamesystems: response.data } );
        } );
    }

    /**
     * * Ruft die Liste und Daten der existierenden Charactere auf
     * 
     * TODO: Im Prototyp werden derzeit alle vorhandenen Charactere abgerufen, da nur ein Benutzer existiert.
     *      Hier wären anhand der User ID dann die korrekten Charactere des Benutzers abzurufen.
     * 
     * @param {*} uid 
     */
    getCharactersFromDb( uid ) {
        //
        fetch( 'https://swp.benschdev.net/characters' )
        .then( response => response.json() )
        .then( response => {
            this.setState( { characters: response.data } );
        });
    }

    /**
     * Rendering Funktion zur Darstellung der Seite
     * 
     */
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="Characters-h1">Übersicht zu den Charaktere</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <CharactersList
                            gs={ this.state.gamesystems }
                            cl={ this.state.characters }
                            actn={ this.handleBtnActn }
                            ackDelFun={ this.setDataforDeletingCharacter }
                        />
                    </div>
                    <div className="col-4">
                        <ul className="nav flex-column mb-3">
                            <li className="nav-item">
                                <button
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addChar">
                                    Neuen Charakter anlegen
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <CharacterAdd
                    gs={ this.state.gamesystems }
                    cl={ this.state.characters }
                    clupdtfnc={ this.updateCharList }
                />

                <CharacterEdit
                    gs={ this.state.gamesystems }
                    cl={ this.state.characters }
                    id={ this.state.tmpCId }
                    cv={ this.state.tmpCVal }
                    gv={ this.state.tmpGsVal }
                    actnhndl={ this.handleBtnActn }
                    clupdtfnc={ this.updateCharList }
                />

                <CharacterView
                    gs={ this.state.gamesystems }
                    cv={ this.state.tmpCVal }
                    gv={ this.state.tmpGsVal }
                />

                <CharacterDelete
                    delfct={ this.deleteCharacter }
                    id={ this.state.tmpCId }
                    cv={ this.state.tmpCVal }
                />
            </div>
        )
    }
}

export default Characters;