/**
 * Subkomponente zur Generierung des Charakterformulars.
 * 
 * @author Tim Jaap <s77284@beuth-hochschule.de>
 */
// Import der Bibliotheken
import React, { Component } from 'react';

// Import minimale Standardstruktur des Charakterblatts
import cfgeneral from './res/generale.json';


class CharactersForm extends Component {
    /**
     * Konstruktor
     * 
     * @param {*} props 
     */
    constructor( props ) {
        // Konstruktor der Elternklasse aufrufen
        super( props );

        // Initialisiere und Definiere das state Objekt
        this.state      = {
            page: {
                gsattrs: null,
                specattrvis: 'invisible'
            },
            character: {}
        };

        // Werte initial setzen
        this.state.character    = this.props.cv;

        // Spielsystemspezifisiche Attribute setzen und sichtbar machen
        if( this.props.hasOwnProperty( 'gv' ) ) {
            if( this.props.gv.hasOwnProperty( 'attributes' ) && Object.keys( this.props.gv.attributes ).length > 0 ) {
                this.state.page.gsattrs     = this.props.gv.attributes;
                this.state.page.specattrvis = 'visible';
            }
        }

        // Funktionsbindings
        this.handleGsChange     = this.handleGsChange.bind( this );
        this.handleChangeValue  = this.handleChangeValue.bind( this );
    }


    /**
     * Event Handler zum Aktualisieren der zwischengespeicherten Werte für die eventuelle Speicherung des Charakters
     * 
     * @param {*} event 
     */
    handleChangeValue( event ) {
        // Daten des Input Tags
        const name      = event.target.name;
        const value     = event.target.value;

        // Handles auf Felder im state
        let char        = this.state.character;
        let charAttrGen = this.state.character.attr_general;
        let charAttrSpe = this.state.character.attr_specific;
        let charAttrLnF = this.state.character.lostNfound;

        // Werte an der entsprechenden Position setzen
        switch( name ) {
            case "name":
                char[name]  = value;
                break;
            case "player_controlled":
                if( value === "true" ) {
                    char[name]  = true;
                } else {
                    char[name]  = false;
                }
                break;
            case "ready":
                if( event.target.checked ) {
                    char[name]  = true;
                } else {
                    char[name]  = false;
                }
                break;
            default:
                // korrekten Container ermitteln
                if( charAttrGen.hasOwnProperty( name ) ) {
                    charAttrGen[name]   = value;
                    break;
                }
                if( charAttrSpe.hasOwnProperty( name ) ) {
                    charAttrSpe[name]   = value;
                    break;
                }

                // Auffangbecken für nicht zugeordnete Attribute
                charAttrLnF[name]   = value;
                break;
        }

        // Im state speichern
        this.setState( { character: char } );

        return;
    }

    /**
     * Verarbeitet die Auswahl eines Spielsystems durch den Benutzer.
     * 
     * @param {*} event 
     */
    handleGsChange( event ) {
        // Deklaration der Hilfsvariablen
        let obj         = this.state.page;

        // Handle erzeugen
        const target    = event.target;

        const val       = parseInt( target.value );

        // Werte Wert des Handle aus setze den state entsprechend
        if( val > 0 ) {
            // Wert zurücksetzen
            obj.gsattrs     = null;

            // Spielsystem finden, um Attributliste zu laden
            for( let g = 0; g < this.props.gs.length; g++ ) {
                if( this.props.gs[g].id === val ) {
                    obj.gsattrs     = this.props.gs[g].attributes;
                }
            }
            
            obj.specattrvis = 'visible';
        } else {
            obj.gsattrs     = 'none';
            obj.specattrvis = 'invisible';
        }

        // Setze Spielsystem ID und Character Sheet Struktur
        let char            = this.state.character;
        char['gamesys_id']  = target.value;
        char['attr_specific']   =  this.loadDefaultValues( obj.gsattrs );

        // Speicher Werte im state
        this.setState( { obj, char } );

        return;
    }

    /**
     * Liste der Spielsysteme für die ComboBox/den Select-Tag aufbereiten
     * 
     */
    parseGsList() {
        // Deklaration der Variablen
        let list        = this.props.gs.sort( (a, b) => ( a.name > b.name ) ? 1 : ( ( a.name < b.name ) ? -1 : 0 ) );
        let findDuplicates  = arr => arr.filter( ( item, index ) => arr.indexOf( item ) !== index );
        let gsnames     = [];
        let gsgroup     = [];
        let optlist     = [];

        // Hole von allen Spielsystemobjekten die Namen und füge sie einer eigenständige Liste hinzu, um Spielsysteme mit mehreren Editionen zu finden
        list.forEach( item => {
            gsnames.push( item.name );
        });

        // Finde Spielsysteme mit mehreren Editionen, um diese gruppieren zu können
        gsgroup     = findDuplicates( gsnames );

        // HTML option Liste erzeugen
        for( var i = 0; i < list.length; i++ ) {
            // Füge die Optionen hinzu
            optlist.push( <option key={ list[i].id } value={ list[i].id }>{ list[i].name }</option> )
        }

        // Html optgroup hinzufügen, falls Spielsysteme mehrere Editionen haben
        for( var j = 0; j < gsgroup.length; j++ ) {
            // Indizies ermitteln
            let first       = optlist.map( ( item ) => { return item.props.children[0] } ).indexOf( gsgroup[j] );
            let last        = optlist.map( ( item ) => { return item.props.children[0] } ).lastIndexOf( gsgroup[j] );

            // Items zwischenspeichern
            let items       = optlist.slice( first, last+1 );

            // Füge optgroup Tag hinzu und lösche die gruppierten Einträge aus dem Quellarray
            optlist.splice( first, ( last - first + 1 ), <optgroup key={ "o" + i } label={ gsgroup[j] }>{ items }</optgroup> );
        }

        return optlist;
    }

    /**
     * Setzt beim Laden der Seite die Charakterbogenattribute automatisch auf die Anfangswerte.
     * 
     */
    loadDefaultValues( res ) {
        // temporäres Objekt
        let obj     = {}

        // res ist null abfangen
        if( res === 'none' ) {
            return;
        }

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
     * Methode zum Generieren der Formularinputobjekte anhand der als JSON formulierten Struktur.
     * 
     * @param {*} json 
     */
    parseJsonToForm( json ) {
        let form    = [];

        // NULL Fall abfangen
        if( json == null ) {
            return;
        }

        // Fehler abfangen, falls keine sections angelegt wurden
        if( !json.hasOwnProperty( 'sections' ) ) {
            return;
        }

        // Generierung des Formulars
        // Durchlaufe die Abschnitte
        for( var i = 0; i < json.sections.length; i++ ) {
            // Struktur zur temporären Aufnahme der Formularstrukturelemente
            let tmp     = [];

            // Abschnittsüberschrift zwischenspeichern
            let subheader       = json.sections[i].subheader;

            // Selectorname erzeugen
            let selector        = "collapse" + subheader.replace( / /g, '' ).toLowerCase();
            let databstarget    = "#" + selector;

            // Die einzelnen Formularelemente erzeugen
            for( var j = 0; j < json.sections[i].attributes.length; j++ ) {
                let k       = Object.keys( json.sections[i].attributes[j] )[0];
                let elem    = json.sections[i].attributes[j][k];

                // einzelnen Formularelemente unterscheiden
                switch( elem.inputtype ) {
                    case "check":
                        // Formularelement erzeugen
                        tmp.push( <div className="row mb-3" key={ k + j }>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    name={ k }
                                    id={ k }
                                    className="form-check-input"
                                    value={ elem.value }
                                    defaultChecked={ this.props.cv.hasOwnProperty( 'attr_general' ) && this.props.cv.attr_general.hasOwnProperty( k ) ? this.props.cv.attr_general[k] : this.props.cv.hasOwnProperty( 'attr_specific' ) && this.props.cv.attr_specific.hasOwnProperty( k ) ? this.props.cv.attr_specific[k] : elem.value }
                                    onChange={ this.handleChangeValue }
                                />
                                <label htmlFor={ k } className="form-check-label">{ elem.label }</label>
                            </div>
                        </div>
                        );
                        break;

                    case "color":
                        // Formularelement erzeugen
                        tmp.push( <div className="row mb-3" key={ k + j }>
                                <label htmlFor={ k } className="col-3 col-form-label">{ elem.label }</label>
                                <div className="col-2">
                                    <input
                                        type="color"
                                        name={ k }
                                        id={ k }
                                        className="form-control form-control-color"
                                        defaultValue={ this.props.cv.hasOwnProperty( 'attr_general' ) && this.props.cv.attr_general.hasOwnProperty( k ) ? this.props.cv.attr_general[k] : this.props.cv.hasOwnProperty( 'attr_specific' ) && this.props.cv.attr_specific.hasOwnProperty( k ) ? this.props.cv.attr_specific[k] : elem.value }
                                        onChange={ this.handleChangeValue }
                                    />
                                </div>
                            </div>
                        );
                        break;

                    case "combo":
                        // Formularelement erzeugen
                        tmp.push( <div className="row mb-3" key={ k + j }>
                            <label htmlFor={ k } className="col-3 col-form-label">{ elem.label }</label>
                            <div className="col-9">
                                <select
                                    name={ k }
                                    id={ k }
                                    className="form-select"
                                    aria-label={ elem.label }
                                    defaultValue={ this.props.cv.hasOwnProperty( 'attr_general' ) && this.props.cv.attr_general.hasOwnProperty( k ) ? this.props.cv.attr_general[k] : this.props.cv.hasOwnProperty( 'attr_specific' ) && this.props.cv.attr_specific.hasOwnProperty( k ) ? this.props.cv.attr_specific[k] : elem.value }
                                    onChange={ this.handleChangeValue }
                                >
                                    {
                                        elem.valuelist.map( item  => {
                                            return <option value={ item.value } key={ k + j + item.key } >{ item.key }</option>
                                        } )
                                    }
                                </select>
                            </div>
                        </div> );
                        break;

                    case "file":
                        // Hilfstext aufbereiten, falls Vorgaben zu den erlaubten Dateiarten gegeben sind
                        let helptxt     = '';

                        if( elem.hasOwnProperty( 'permittedvalues' ) ) {
                            helptxt     += 'Erlaubte Dateiformate: ';

                            for( let kf = 0; kf < elem.permittedvalues.length; kf++ ) {
                                helptxt     += elem.permittedvalues[kf];

                                if( kf !== elem.permittedvalues.length - 1 ) {
                                    helptxt     += ', ';
                                }
                            }
                        }

                        // Formularelement erzeugen
                        tmp.push( <div className="row mb-3" key={ k + j }>
                            <label htmlFor={ k } className="col-3 col-form-label">{ elem.label }</label>
                            <div className="col-9">
                                <input
                                    type="file"
                                    name={ k }
                                    id={ k }
                                    className="form-control"
                                    defaultValue={ this.props.cv.hasOwnProperty( 'attr_general' ) && this.props.cv.attr_general.hasOwnProperty( k ) ? this.props.cv.attr_general[k] : this.props.cv.hasOwnProperty( 'attr_specific' ) && this.props.cv.attr_specific.hasOwnProperty( k ) ? this.props.cv.attr_specific[k] : elem.value }
                                    onChange={ this.handleChangeValue }/>
                                <div id={ k + "help" } className="form-text">{ helptxt }</div>
                            </div>
                        </div> );
                        break;

                    case "longtext":
                        // Formularelement erzeugen
                        tmp.push( <div className="row mb-3" key={ k + j }>
                                <label htmlFor={ k } className="col-3 col-form-label">{ elem.label }</label>
                                <div className="col-9">
                                    <textarea
                                        name={ k }
                                        id={ k }
                                        className="form-control"
                                        placeholder={ elem.placeholder }
                                        defaultValue={ this.props.cv.hasOwnProperty( 'attr_general' ) && this.props.cv.attr_general.hasOwnProperty( k ) ? this.props.cv.attr_general[k] : this.props.cv.hasOwnProperty( 'attr_specific' ) && this.props.cv.attr_specific.hasOwnProperty( k ) ? this.props.cv.attr_specific[k] : elem.value }
                                        onChange={ this.handleChangeValue }
                                    >                                        
                                    </textarea>
                                </div>
                            </div>
                        );
                        break;

                    case "number":
                        // Formularelement erzeugen
                        tmp.push( <div className="row mb-3" key={ k + j }>
                            <label htmlFor={ k } className="col-3 col-form-label">{ elem.label }</label>
                            <div className="col-9">
                                <input
                                    type="number"
                                    name={ k }
                                    id={ k }
                                    className="form-control"
                                    defaultValue={ this.props.cv.hasOwnProperty( 'attr_general' ) && this.props.cv.attr_general.hasOwnProperty( k ) ? this.props.cv.attr_general[k] : this.props.cv.hasOwnProperty( 'attr_specific' ) && this.props.cv.attr_specific.hasOwnProperty( k ) ? this.props.cv.attr_specific[k] : elem.value }
                                    onChange={ this.handleChangeValue }
                                />
                            </div>
                        </div> );
                        break;

                    case "radio":
                        // Liste aufbereiten
                        let radiolst    = [];

                        for( var kr = 0; kr < elem.valuelist.length; kr++ ) {
                            radiolst.push(
                                <div className="form-check" key={ k + j + "Radios" + elem.valuelist[kr].value }>
                                    <input type="radio"
                                        name={ k }
                                        id={ k + elem.valuelist[kr].value }
                                        className="form-check-input"
                                        value={ elem.valuelist[kr].value }
                                        defaultChecked={ this.props.cv.hasOwnProperty( 'attr_general' ) && this.props.cv.attr_general.hasOwnProperty( k ) ? ( elem.valuelist[kr].value === parseInt( this.props.cv.attr_general[k] ) ? true : false ) : ( this.props.cv.hasOwnProperty( 'attr_specific' ) && this.props.cv.attr_specific.hasOwnProperty( k ) ? ( elem.valuelist[kr].value === parseInt( this.props.cv.attr_specific[k] ) ? true : false ) : false ) }
                                        onChange={ this.handleChangeValue } />
                                    <label className="form-check-label" htmlFor={ k + elem.valuelist[kr].value }>{ elem.valuelist[kr].key }</label>
                                    
                                </div>
                            );
                        }

                        // Formularelement erzeugen
                        tmp.push( <div className="row mb-3" key={ k + j }>
                            <label htmlFor={ k } className="col-3 col-form-label">{ elem.label }</label>
                            <div className="col-9">
                                { radiolst }
                            </div>
                        </div> );
                        break;

                    case "range":
                        // Formularelement erzeugen
                        tmp.push( <div className="row mb-3" key={ k + j }>
                            <label htmlFor={ k } className="col-3 col-form-label">{ elem.label }</label>
                            <div className="col-1">
                                { elem.min }
                            </div>
                            <div className="col-7">
                                <input
                                    type="range"
                                    name={ k }
                                    id={ k }
                                    className="form-range"
                                    defaultValue={ this.props.cv.hasOwnProperty( 'attr_general' ) && this.props.cv.attr_general.hasOwnProperty( k ) ? this.props.cv.attr_general[k] : this.props.cv.hasOwnProperty( 'attr_specific' ) && this.props.cv.attr_specific.hasOwnProperty( k ) ? this.props.cv.attr_specific[k] : elem.min }
                                    min={ elem.min }
                                    max={ elem.max }
                                    step={ elem.step }
                                    onChange={ this.handleChangeValue }
                                />
                            </div>
                            <div className="col-1">
                                { elem.max }
                            </div>
                        </div> );
                        break;

                    case "text":
                        // Formularelement erzeugen
                        tmp.push( <div className="row mb-3" key={ k + j }>
                            <label htmlFor={ k } className="col-3 col-form-label">{ elem.label }</label>
                            <div className="col-9">
                                <input
                                    type="text"
                                    name={ k }
                                    id={ k }
                                    className="form-control"
                                    placeholder={ elem.placeholder }
                                    defaultValue={ this.props.cv.hasOwnProperty( 'attr_general' ) && this.props.cv.attr_general.hasOwnProperty( k ) ? this.props.cv.attr_general[k] : this.props.cv.hasOwnProperty( 'attr_specific' ) && this.props.cv.attr_specific.hasOwnProperty( k ) ? this.props.cv.attr_specific[k] : elem.value }
                                    onChange={ this.handleChangeValue }
                                />
                            </div>
                        </div> );
                        break;

                    default:
                        break;
                }
            }

            // Accordion Item erzeugen
            if( json.sections[i].attributes.length > 0 ) {
                form.push( <div className="accordion-item" key={ subheader }>
                    <h2 className="accordion-header" id="headingGeneral">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={ databstarget } aria-expanded="false" aria-controls={ selector }>
                            { subheader }
                        </button>
                    </h2>
                    <div id={ selector } className="accordion-collapse collapse" aria-labelledby="headingGeneral" data-bs-parent="#charform">
                        <div className="accordion-body">
                            <div className="row mb-3">
                                { tmp }
                            </div>
                        </div>
                    </div>
                </div> );
            }
        }

        // Gebe die Formularelemente zurück
        return form;
    }

    /**
     * Gibt die gerenderte Anzeige wieder
     * 
     */
    render() {
        // Ausgabe zurückgeben
        try {
            return(
                <div id="formChar">

                    <form id="charactersForm">

                        <div className="modal-body">
                            <div className="container-fluid">
                                { /* Formular */ }
                                <div key="charform" id="charform">
                                    <input type="hidden" name="id" id="id" value=""></input>

                                    <div className="row mb-3" key="ecname">
                                        <label htmlFor="name" className="form-label col-4">Charaktername:</label>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                id="name"
                                                placeholder="Charaktername eingeben..."
                                                defaultValue={ this.props.cv.name }
                                                onChange={ this.handleChangeValue }
                                                required></input>
                                        </div>
                                    </div>

                                    <div className="row mb-3" key="ecgs">
                                        <label htmlFor="chargamesystem" className="form-label col-4">Spielsystem:</label>
                                        <div className="col-8">
                                            <select className="form-select"
                                                name="chargamesystem"
                                                id="chargamesystem"
                                                aria-label="Spielsystem"
                                                defaultValue={ this.props.cv.gamesys_id }
                                                onChange={ this.handleGsChange }>
                                                
                                                <option value="0">allgemeiner Charakter</option>
                                                { this.parseGsList() }

                                            </select>
                                        </div>
                                    </div>                                

                                    <div className="row mb-3" key="ectype">
                                        <legend className="col-form-label col-4 pt-0">Art:</legend>
                                        <div className="col-8">
                                            <div className="form-check">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    name="player_controlled"
                                                    id="chartypepc"
                                                    value="true"
                                                    onChange={ this.handleChangeValue }
                                                    defaultChecked={ this.props.cv.player_controlled === true ? true : false }></input>
                                                <label className="form-check-label" htmlFor="charTypePC">Spielercharakter</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    name="player_controlled"
                                                    id="chartypenpc"
                                                    value="false"
                                                    onChange={ this.handleChangeValue }
                                                    defaultChecked={ this.props.cv.player_controlled === false ? true : false }></input>
                                                <label className="form-check-label" htmlFor="charTypeNPC">Nichtspielercharakter</label>
                                            </div>
                                        </div>
                                    </div>

                                    <br /><hr />

                                    <div>
                                        <h5>Allgemeine Charakterattribute</h5>
                                    </div>

                                    <div className="accordion" id="charformgeneral">
                                        { this.parseJsonToForm( cfgeneral ) }
                                    </div>

                                    <div className={ this.state.page.specattrvis }>

                                        <br /><hr />

                                        <div>
                                            <h5>Spielsystemspezifische Charakterattribute</h5>
                                        </div>

                                        <div className="accordion" id="charformspecific">
                                            { this.parseJsonToForm( this.state.page.gsattrs ) }
                                        </div>

                                    </div>
                                </div>

                                { /*

                                <br /><hr />

                                <div className="form-check" key="ecready">
                                    <input
                                        type="checkbox"
                                        name="ready"
                                        id="ready"
                                        className="form-check-input"
                                        value="true"
                                        onChange={ this.handleChangeValue }
                                    />
                                    <label htmlFor="ready" className="form-check-label">
                                        Der Charakter ist fertig. Veränderungen können nur noch über erworbene Fertigkeitspunkte verbessert werden.
                                    </label>
                                </div>
                                */ }

                            </div>
                        </div>
                        
                        <div className="modal-footer" key="mfooter">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={ this.props.handleReset }>Abrechnen</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                name="btnaction"
                                value="1"
                                data-bs-dismiss="modal"
                                onClick={ () => this.props.handleSave( this, this.state.character ) }>Speichern</button>
                        </div>

                    </form>

                </div>
            );
        } catch( error ) {}
    }
}

export default CharactersForm;