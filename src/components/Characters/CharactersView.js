/**
 * Subkomponente zum Anzeigen der Daten eines Charakters
 * 
 * @author Tim Jaap <s77284@beuth-hochschule.de>
 */

// Bibliotheken importieren
import React, { Component } from 'react';
import './CharactersView.css';

// Import minimale Standardstruktur des Charakterblatts
import cfgeneral from './res/generale.json';
 
class CharactersView extends Component {
    buildView() {
        // temporäre Variable zur Aufnahme des View Elements
        let view    = [];
        let tcv     = {};

        // ---- generelle Charakterdaten aufbereiten
        // Charakterart aufbereiten
        if( this.props.cv.player_controlled === true ) {
            tcv.type    = 'Spielercharakter';
        } else {
            tcv.type    = 'Nichtspielercharakter (NPC)'
        }

        // Charakterstatus aufbereiten
        if( this.props.cv.ready === true ) {
            tcv.status      = 'spielfertig';
        } else {
            tcv.status      = 'Entwurf';
        }

        // generelle Charakterdaten dem View hinzufügen
        view.push(
            <div className="row" key={ 'cvgd' + this.props.cv.id }>
                <div className="col-3">
                    <label>Charaktername:</label>
                </div>
                <div className="col-9">
                    <em>{ this.props.cv.name }</em>
                </div>

                <div className="col-3">
                    <label>Spielsystem:</label>
                </div>
                <div className="col-9">
                    <em>{ this.props.gv.name }</em>
                </div>

                <div className="col-3">
                    <label>Art:</label>
                </div>
                <div className="col-9">
                    <em>{ tcv.type }</em>
                </div>

                <div className="col-3">
                    <label>Status:</label>
                </div>
                <div className="col-9">
                    <em>{ tcv.status }</em>
                </div>
            </div>
        );

        // Horizontallinie mit Abstand der View hinzufügen
        view.push( <div key={ 'breaker1' }><br /><hr /></div> );

        // Überschrift der View hinzufügen
        view.push(
            <div className="row" key={ 'cvhac' + this.props.cv.id }>
                <h4>Allgemeine Charakterattribute</h4>
            </div>
        );

        // allgemeine Charakterattribute der View hinzufügen
        view.push( <div className="row" key={ 'cvac' + this.props.cv.id }> { this.parseViewFromJson( cfgeneral, this.props.cv.attr_general ) } </div> );

        // spielsystemspezifische Charakterattribute der View hinzufügen
        if( this.props.cv.gamesys_id > 0 ) {
            // Horizontallinie mit Abstand der View hinzufügen
            view.push( <div key={ 'breaker2' }><br /><hr /></div> );

            // Überschrift der View hinzufügen
            view.push(
                <div className="row" key={ 'cvhsc' + this.props.cv.id }>
                    <h4>Spielsystemspezifische Charakterattribute</h4>
                </div>
            );

            // spielsystemspezifische Attribute der View hinzufügen
            if( this.props.gv.hasOwnProperty( 'attributes' ) && Object.keys( this.props.gv.attributes ).length > 0 ) {
                view.push( <div className="row" key={ 'cvsc' + this.props.cv.id }>{ this.parseViewFromJson( this.props.gv.attributes, this.props.cv.attr_specific ) }</div> );
            }
        }

        // zusammengesetzte View zurückgeben
        return view;
    }

    parseViewFromJson( json, values = null ) {
        let viewsection     = [];
        let tmpcounter      = 0;
        let tmpstring       = '';

        // Funktion beenden, wenn keine Werte gesetzt sind
        if( values === null ) {
            return;
        }

        //
        for( let j = 0; j < json.sections.length; j++ ) {
            // Überspringe Sektion, wenn keine Attrbute vorhanden sind
            if( json.sections[j].attributes.length < 1 ) {
                continue;
            }

            // Sektionsüberschrift hinzufügen
            viewsection.push( <h5 key={ json.sections[j].subheader + j }> { json.sections[j].subheader } </h5> );

            // Einzelne Felder hinzufügen
            // Die einzelnen Formularelemente erzeugen
            for( var k = 0; k < json.sections[j].attributes.length; k++ ) {
                let ky      = Object.keys( json.sections[j].attributes[k] )[0];
                let elem    = json.sections[j].attributes[k][ky];

                // einzelnen Formularelemente unterscheiden
                switch( elem.inputtype ) {
                    case "check":
                        // Kodierung durch Text ersetzen
                        tmpstring   = '';

                        if( values[ky] === 1 || values[ky] === true ) {
                            tmpstring   = 'ja';
                        } else {
                            tmpstring   = 'nein';                            
                        }

                        viewsection.push(
                            <div className="row" key={ ky + k + this.props.cv.id }>
                                <div className="col-3">
                                    <label>{ elem.label }</label>
                                </div>
                                <div className="col-9">
                                    <em>{ tmpstring }</em>
                                </div>
                            </div>
                        );
                        break;

                    case "color":
                        viewsection.push(
                            <div className="row" key={ ky + k + this.props.cv.id }>
                                <div className="col-3">
                                    <label>{ elem.label }</label>
                                </div>
                                <div className="col-9">
                                    <div style={ {width:50, height:20, backgroundColor: values[ky], border:1, borderColor: 'black' } }></div>
                                </div>
                            </div>
                        );
                        break;

                    case "combo":
                        // Kodierung durch Text ersetzen
                        tmpstring   = '';
                        tmpcounter      = elem.valuelist.length;

                        while( tmpcounter-- ) {
                            if( elem.valuelist[tmpcounter].value === parseInt( values[ky] ) ) {
                                tmpstring   = elem.valuelist[tmpcounter].key;
                            }
                        }
                        
                        viewsection.push(
                            <div className="row" key={ ky + k + this.props.cv.id }>
                                <div className="col-3">
                                    <label>{ elem.label }</label>
                                </div>
                                <div className="col-9">
                                    <em>{ tmpstring }</em>
                                </div>
                            </div>
                        );
                        break;

                    case "file":
                        viewsection.push(
                            <div className="row" key={ ky + k + this.props.cv.id }>
                                <div className="col-3">
                                    <label>{ elem.label }</label>
                                </div>
                                <div className="col-9">
                                    <em>{ values[ky] }</em>
                                </div>
                            </div>
                        );
                        break;

                    case "longtext":
                        viewsection.push(
                            <div className="row" key={ ky + k + this.props.cv.id }>
                                <div className="col-3">
                                    <label>{ elem.label }</label>
                                </div>
                                <div className="col-9">
                                    <em>{ values[ky] }</em>
                                </div>
                            </div>
                        );
                        break;

                    case "number":
                        viewsection.push(
                            <div className="row" key={ ky + k + this.props.cv.id }>
                                <div className="col-3">
                                    <label>{ elem.label }</label>
                                </div>
                                <div className="col-9">
                                    <em>{ values[ky] }</em>
                                </div>
                            </div>
                        );
                        break;

                    case "radio":
                        // Kodierung durch Text ersetzen
                        tmpstring   = '';
                        tmpcounter      = elem.valuelist.length;

                        while( tmpcounter-- ) {
                            if( elem.valuelist[tmpcounter].value === parseInt( values[ky] ) ) {
                                tmpstring   = elem.valuelist[tmpcounter].key;
                            }
                        }
                        
                        viewsection.push(
                            <div className="row" key={ ky + k + this.props.cv.id }>
                                <div className="col-3">
                                    <label>{ elem.label }</label>
                                </div>
                                <div className="col-9">
                                    <em>{ tmpstring }</em>
                                </div>
                            </div>
                        );
                        break;

                    case "range":
                        viewsection.push(
                            <div className="row" key={ ky + k + this.props.cv.id }>
                                <div className="col-3">
                                    <label>{ elem.label }</label>
                                </div>
                                <div className="col-9">
                                    <em>{ values[ky] }</em>
                                </div>
                            </div>
                        );
                        break;

                    case "text":
                        viewsection.push(
                            <div className="row" key={ ky + k + this.props.cv.id }>
                                <div className="col-3">
                                    <label>{ elem.label }</label>
                                </div>
                                <div className="col-9">
                                    <em>{ values[ky] }</em>
                                </div>
                            </div>
                        );
                        break;

                    default:
                        break;
                }
            }
        }

        return viewsection;
    }

    /**
     * Rendering der Komponente
     */
    render() {
        // gerenderte View zurückgeben
        return(
            <div className="modal" tabIndex="-1" id="viewChar">

                    <div className="modal-dialog modal-lg" key={ 'cv' + this.props.cv.id }>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Character Sheet</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div>
                                        { this.buildView() }
                                    </div>
                                </div>
                            </div>
                            
                            <div className="modal-footer">
                                <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal">
                                    Schließen
                                </button>
                            </div>

                        </div>
                    </div>
            </div>
        );
    }
}

export default CharactersView;