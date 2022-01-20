/**
 * Subkomponente zur Generierung des Charakterformulars.
 * 
 * @author Tim Jaap <s77284@beuth-hochschule.de>
 */
// Import der Bibliotheken
import React, { Component } from 'react';
import CharactersForm from './CharactersForm.js';

// Import minimale Standardstruktur des Charakterblatts
import cfgeneral from './res/generale.json';

class CharacterAdd extends Component {
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

        // Initial Standardwerte setzen
        this.state      = this.initState();

        // Bindings der Funktionen
        this.saveData   = this.saveData.bind( this );
        this.resetData  = this.resetData.bind( this );
    }

    /**
     * Setzt die Initialwerte für die State Variable
     * 
     */
    initState() {
        return {
            cv: {
                id: 0,
                gamesys_id: 0,
                author_id: 1,
                name: "",
                player_controlled: true,
                ready: false,
                attr_general: this.loadDefaultValues( cfgeneral ),
                attr_specific: {},
                lostNfound: {}
            }
        };
    }

    /**
     * Setzt beim Laden der Seite die Charakterbogenattribute automatisch auf die Anfangswerte.
     * 
     */
    loadDefaultValues( res ) {
        // temporäres Objekt
        let obj     = {};

        // ---- Setze minimale Charakterattribute
        // Sektionen zwischenspeichern
        let sections    = res.sections;

        // Durchlaufe Sektionen
        for( var i = 0; i < sections.length; i++ ) {
            // Shorthandle auf Attribute
            let attrls  = sections[i].attributes;

            // Durchlaufe die einzelnen Attribute der Sektionen
            for( var j = 0; j < attrls.length; j++ ) {
                // Name des Key zwischenspeichern
                let key     = Object.keys( attrls[j] )[0];

                // Wert in Key ablegen
                switch( attrls[j][key].inputtype ) {
                    case "check":
                        obj[key]    = attrls[j][key].defaultvalue;
                        break;
                    case "combo":
                        obj[key]    = attrls[j][key].defaultvalue;
                        break;
                    case "radio":
                        attrls[j][key].valuelist.forEach( elem => {
                            if( elem.hasOwnProperty( 'default' ) ) {
                                obj[key]    = elem.value;
                            }
                        } );
                        break;
                    case "range":
                        obj[key]    = attrls[j][key].min;
                        break;
                    default:
                        obj[key]    = attrls[j][key].value;
                        break;
                }
            }
        }

        return obj;
    }

    /**
     * Speichert die Daten des Charakters persistenten.
     * 
     * @param {*} event 
     */
    saveData( event, cv ) {
        // Characterdaten zwischenspeichern
        let charData    = cv;

        // ID des neuen Eintrags ermitteln
        let arrLen  = this.props.cl.length;
        let maxId   = -Infinity;

        while( arrLen-- ) {
            if( this.props.cl[arrLen].id > maxId ) {
                maxId       = this.props.cl[arrLen].id;
            }
        }

        // ermittelte ID setzen
        charData.id     = maxId + 1;

        // Fehlerfall kein Name gesetzt abfangen
        if( charData.name === "" ) {
            charData.name   = "NoName" + maxId;
        }

        // Eintrag anlegen
        fetch( "https://swp.benschdev.net/characters", {
            method: "post",
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
            } );

        // Werte zurücksetzen
        this.setState( this.initState() );

        // Funktion der Hauptcomponente zu aktualisieren der Charakterliste aufrufen
        this.props.clupdtfnc( "add", charData );

        return;
    }

    /**
     * Bricht das Anlegen eines neuen Charakters ab und gibt die reservierte ID wieder frei
     * 
     * @param {*} event 
     */
    resetData( event ) {
        // Formulardatenhandel setzen
        let form    = document.getElementById( 'charactersForm' );

        // Formulardaten durchlaufen
        for( let rv = 0; rv < form.length; rv++ ) {
            //console.log( form[rv].tagName );

            // Werte der Inputtypes zurücksetzen
            switch( form[rv].type ) {
                case 'number':
                    form[rv].value  = 0;
                    break;

                case 'range':
                    form[rv].value  = 0;
                    break;

                case 'color':
                    form[rv].value  = '#FF0000';
                    break;

                case 'radio':
                    // temporäre Variablen
                    let tmparr      = [];
                    let hndl        = document.getElementsByName( form[rv].name );

                    // Werteliste der Radio Inputs in temporären Array überführungen
                    for( let rvl = 0; rvl < hndl.length; rvl++ ) {
                        tmparr.push( hndl[rvl].value );
                    }

                    // Alle Items auf nicht vorgewählt setzen
                    form[rv].checked    = false;

                    // Vorgewählter Wert auf Standardwert setzen, wenn dieser 0 ist
                    if( tmparr.includes( "0" ) && form[rv].value === "0" ) {
                        form[rv].checked    = true;
                    }

                    // Vorgewählter Wert auf Standardwert setzen, wenn dieser 1 ist
                    if( tmparr.includes( "1" ) && !tmparr.includes( "0" ) && form[rv].value === "1" ) {
                        form[rv].checked    = true;
                    }

                    // Vorgewählter Wert auf Standardwert setzen, wenn dieser 'wahr' ist
                    if( tmparr.includes( "true" ) && form[rv].value === "true" ) {
                        form[rv].checked    = true;
                    }
                    break;
                
                case 'checkbox':
                    form[rv].checked    = false;
                    break;

                case 'text':
                    form[rv].value      = '';
                    break;

                case 'file':
                    form[rv].value      = '';
                    break;

                default:
                    // Tagname zwischenspeichern
                    let tmptn       = form[rv].tagName;

                    // Select Tag aussteuern
                    if( tmptn.toLowerCase() === 'select' ) {
                        // temporäre Variablen
                        let hndl        = document.getElementsByName( form[rv].name )[0];

                        // erste Option auf selected setzen
                        hndl[0].selected     = true;
                        break;
                    }

                    // Textarea Tag aussteuern
                    if( tmptn.toLowerCase() === 'textarea' ) {
                        form[rv].value      = '';
                        break;
                    }
            }
        }

        // bestehende Werte als Defaultvalues setzen
        this.setState( this.initState() );

        this.forceUpdate();
        return;
    }

    /**
     * Gibt die gerenderte Anzeige wieder
     * 
     */
    render() {
        // Ausgabe zurückgeben
        return(
            <div className="modal" tabIndex="-1" id="addChar">

                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        
                        <div className="modal-header">
                            <h5 className="modal-title">Neuen Charakter anlegen</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={ this.resetData }></button>
                        </div>

                        <CharactersForm
                            gs={ this.props.gs }
                            cv={ this.state.cv }
                            handleSave={ this.saveData }
                            handleReset={ this.resetData }
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default CharacterAdd;