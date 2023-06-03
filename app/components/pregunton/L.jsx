import { useState } from "react";
import { Options } from "./common";

const DEFAULT_L = {
    locus: "",
    locus2: "",
    cAtk: false,
};

function reducer (l, action) {
    switch (action.action) {
        case "locus":
            const locus2 = lugaresExt[action.locus]?action.locus:'';
            return { ...l, locus: action.locus, locus2 };
        case "feature": 
            return { ...l,
                [action.feature]: action.value
            };
    }
    console.error("UNKNOWN ACTION", action, q);
}

export function PreguntonL ({ setSN, detailed }) {

    const [l, setL] = useState(DEFAULT_L);
    const dispatch = action => {
        const nl = reducer(l, action);
        setL(nl);
        setSN(signotation(nl));
    }

    const sep = <option disabled>──────────</option>;

    function YesNo ({ condition=true, feature, children }) {
        if (!condition) return null;
        return <p><label>
            <input type="checkbox" checked={l[feature]}
            onChange={() => dispatch({ action: "feature", feature, value: !l[feature]})} />
            {children}
        </label></p>;
    }

    return <>
        <h3>¿Dónde se encuentra la mano?</h3>
        <select value={l.locus} autoComplete="off"
            onChange={e => dispatch({action: "locus", locus: e.target.value})}>
            <option value="">En el espacio neutro (delante del cuerpo)</option>
            {sep}
            <Options opts={lugaresX} />
            {sep}
            <Options opts={lugaresBod} />
        </select>
        {l.locus2?<select value={l.locus2} autoComplete="off"
            onChange={e => dispatch({action: "feature", feature: "locus2", value: e.target.value})}>
            <Options opts={lugaresExt[l.locus]} />
        </select>:null}
        <YesNo feature="cAtk">tocando</YesNo>
    </>;
}

function signotation (l) {
    const snq = l.locus == "_" ? "_" : "";
    let snl;
    if (l.locus == "H2" || l.locus == "_") {
        snl = "[]";
    } else {
        snl = l.locus2 || l.locus;
    }
    if (l.cAtk) snl += "*";
    return [snq, snl];
}

const lugaresX = {
    "H2": "En la otra mano",
    "_": "El codo apoyado en la otra mano",
    "Bra": "En el otro brazo",
    "Cod": "En el otro codo",
    "Ant": "En el otro antebrazo",
    "Muñ": "En la otra muñeca",
};

const lugaresBod = {
    "Cab": "En la cabeza",
    "Fre": "En la frente",
    "Car": "En la cara",
    "Ore": "En la oreja",
    "Ojo": "En los ojos",
    "Nar": "En la nariz",
    "Boc": "En la boca",
    "Mej": "En la mejilla",
    "Bar": "En la barbilla",
    "Cue": "En el cuello",
    "Hom": "En el hombro",
    "Pec": "En el pecho",
    "Tri": "En la tripa",
};

// Tiene que haber un "sublugar" para el valor ppal (no undefined)
const lugaresExt = {
    "Cab": {
        "Cab": "por arriba en el centro",
        "Sie": "por arriba hacia el lado, en la sien",
        "Nuc": "por detrás, en la nuca",
    },
    "Ojo": {
        "Ojo": "en los dos a la vez",
        "OjoY": "el del mismo lado que la mano",
        "OjoX": "el del lado contrario que la mano",
    },
    "Boc": {
        "Boc": "en el centro",
        "BocY": "hacia el lado, en la comisura",
    },
    "Cue": {
        "Cue": "en el centro",
        "CueY": "en el mismo lado que la mano",
        "CueX": "en el lado contrario que la mano",
    },
    "Hom": {
        "Hom": "el del mismo lado que la mano",
        "HomX": "el del lado contrario que la mano",
    },
    "Pec": {
        "Pec": "en el centro",
        "PecY": "en el mismo lado que la mano",
        "PecX": "en el lado contrario que la mano",
    },
    "Tri": {
        "Tri": "en el centro",
        "TriY": "en el mismo lado que la mano",
    },
};
