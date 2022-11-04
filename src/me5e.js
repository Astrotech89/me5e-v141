//Changing out deprecated 5e skills to their replacements
dnd5e.config.skills.arc = {label: "Electronics" , ability: "int"};
dnd5e.config.skills.nat = {label: "Engineering" , ability: "int"};
dnd5e.config.skills.rel = {label: "Science" , ability: "int"};
dnd5e.config.skills.veh = {label: "Vehical Handling" , ability: "dex"};
// Deletes animal handling from system
delete dnd5e.config.skills.ani;

//Adding equipment types
dnd5e.config.equipmentTypes["prog"] = "Program";
dnd5e.config.equipmentTypes["armMod"] = "Armor Mod";
dnd5e.config.equipmentTypes["wepMod"] = "Weapon Mod"
dnd5e.config.equipmentTypes["bodArm"] = "Body Armor"


// //Changing and adding consumable types
dnd5e.config.consumableTypes["wand"] = "Single-Use Program"
dnd5e.config.consumableTypes["rod"] = "Grenade";
dnd5e.config.consumableTypes["narc"] = "Narcotic";

const prep = dnd5e.documents.Actor5e.prototype.prepareBaseData
function extendActorData() {
	let myActorList = game.actors.filter(a => (a.type === 'character' || a.type === 'npc') === true);
	const dat = this.system.skills
	const keys =Object.keys(myActorList)
	keys.forEach((key, index) => {myActorList[key].system.skills.veh.ability = "dex"});

	const health = this.system.attributes.hp;
	
	if (this.type === "npc" || this.type === "character") {
		health["shields"] = health["shields"] || 0;
		health["shieldsMax"] = health["shieldsMax"] || 0;
		health["shieldsRegen"] = health["shieldsRegen"] || 0;
	}


    return prep.call(this);
}

//Changing "schools" of magic
dnd5e.config.spellSchools['abj'] = 'Biotics';
dnd5e.config.spellSchools['con'] = 'Tech';
dnd5e.config.spellSchools['div'] = 'Combat Powers';

//Adding weapon types
dnd5e.config.weaponTypes['ars'] = 'Assault Rifle';
dnd5e.config.weaponTypes['hps'] = 'Heavy Pistol';
dnd5e.config.weaponTypes['smg'] = 'SMG';
dnd5e.config.weaponTypes['sht'] = 'Shotgun';
dnd5e.config.weaponTypes['snp'] = 'Sniper Rifle';
dnd5e.config.weaponTypes['hvy'] = 'Heavy Weapon';

//Adding weapon properties
dnd5e.config.weaponProperties['arc'] = 'Arc';
dnd5e.config.weaponProperties['bst'] = 'Burst Fire';
dnd5e.config.weaponProperties['dtp'] = 'Double Tap';
dnd5e.config.weaponProperties['het'] = 'Heat';
dnd5e.config.weaponProperties['hip'] = 'Hip Fire';
dnd5e.config.weaponProperties['snt'] = 'Silent';
dnd5e.config.weaponProperties['coi'] = 'Recoil';

//Changing currencies, all other currencies appear as 0 with no labels
dnd5e.config.currencies = {
    pp: 'Credits',
};
//Currency conversion option now does nothing to avoid accidental user error
//(also to avoid mishaps with player curiosity for 'what does this button do?')
//The answer is nothing. The button does nothing now
dnd5e.config.currencyConversion = {};

//Adding condition types
dnd5e.config.conditionTypes['indoctrinated'] = 'Indoctrinated';
dnd5e.config.conditionTypes['lifted'] = 'Lifted';
dnd5e.config.conditionTypes['primed'] = 'Primed';
dnd5e.config.conditionTypes['targeting'] = 'Targeting';

//Changing and adding some tool proficiencies
dnd5e.config.toolProficiencies['herb'] = "Chemist's Supplies";
dnd5e.config.toolProficiencies['navg'] = 'Starship System (Navigation)';
dnd5e.config.toolProficiencies['pois'] = "Brewer's Supplies";
dnd5e.config.toolProficiencies['aswb'] = "Armorsmith's Workbench";
dnd5e.config.toolProficiencies['h4ck'] = 'Hacking Tools';
dnd5e.config.toolProficiencies['mdcn'] = 'Medical Kit';
dnd5e.config.toolProficiencies['pntr'] = "Painter's Supplies";
dnd5e.config.toolProficiencies['ssdr'] = 'Starship Systems (Drive)';
dnd5e.config.toolProficiencies['sshe'] = 'Starship Systems (Helm)';
dnd5e.config.toolProficiencies['sssc'] = 'Starship Systems (SSC)';
dnd5e.config.toolProficiencies['ssew'] = 'Starship Systems (EWS)';
dnd5e.config.toolProficiencies['sswp'] = 'Starship Systems (Weapons)';
dnd5e.config.toolProficiencies['tail'] = "Tailor's Tools";
dnd5e.config.toolProficiencies['tink'] = "Tinker's Tools";
dnd5e.config.toolProficiencies['wswb'] = "Weaponsmith's Workbench";

//Character sheets
class ME5eCharacterSheet extends dnd5e.applications.actor.ActorSheet5eCharacter {
    static get defaultOptions() {
        console.log('~~~~~~~~~~~ME5E CHARACTER SHEET ACTIVE~~~~~~~~~~~');
        const options = super.defaultOptions;
        options.classes.push('me5e');
        return options;
    }
}

class ME5eParagonCharacterSheet extends dnd5e.applications.actor.ActorSheet5eCharacter {
    static get defaultOptions() {
        console.log('~~~~~~~~~~~PARAGON CHARACTER SHEET ACTIVE~~~~~~~~~~~');
        const options = super.defaultOptions;
        options.classes.push('paragon');
        return options;
    }
}

class ME5eRenegadeCharacterSheet extends dnd5e.applications.actor.ActorSheet5eCharacter {
    static get defaultOptions() {
        console.log('~~~~~~~~~~~RENEGADE CHARACTER SHEET ACTIVE~~~~~~~~~~~');
        const options = super.defaultOptions;
        options.classes.push('renegade');
        return options;
    }
}

console.log(`Registering character sheets for ME5e Module`);

Actors.registerSheet('DND5E', ME5eCharacterSheet, {
    types: ['character'],
    makeDefault: true,
});

Actors.registerSheet('DND5E', ME5eParagonCharacterSheet, {
    types: ['character'],
    makeDefault: false,
});

Actors.registerSheet('DND5E', ME5eRenegadeCharacterSheet, {
    types: ['character'],
    makeDefault: false,
});
//Other sheets
class ME5eNPCSheet extends dnd5e.applications.actor.ActorSheet5eNPC {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push('me5e');
        return options;
    }
}
Actors.registerSheet('DND5E', ME5eNPCSheet, {
    types: ['npc'],
    makeDefault: true,
});
class ME5eItemSheet extends dnd5e.applications.item.ItemSheet5e {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push('me5e');
        return options;
    }
}
Items.registerSheet('DND5E', ME5eItemSheet, {
    types: [
        'spell',
        'weapon',
        'equipment',
        'loot',
        'tool',
        'backpack',
        'consumable',
        'class',
        'feat',
    ],
    makeDefault: true,
});

//Adding a field to the header for shield tracker
Hooks.on('renderActorSheet', (app, html, data) => {
    const healthdiv = html
        .find('header.sheet-header')
        .find('ul.attributes.flexrow');
    healthdiv.prepend(`
		  		<li class="attribute shields">
                    <h4 class="attribute-name box-title">Shields</h4>
                    <div class="attribute-value multiple">
                        <input name="system.attributes.hp.shields" type="text" value="${data.system.attributes.hp.shields}" data-dtype="Number" placeholder="5"/>
                        <span class="sep"> / </span>
                        <input name="system.attributes.hp.shieldsMax" type="text" value="${data.system.attributes.hp.shieldsMax}" data-dtype="Number" placeholder="5"/>
                    </div>
                    <footer class="attribute-footer">
                        <input name="system.attributes.hp.shieldsRegen" type="text" class="shieldsRegen" placeholder="Shield Regen." value="${data.system.attributes.hp.shieldsRegen}" data-dtype="Number"/>
                    </footer>
                </li>
	  `);


    const col = html
        .find('section.center-pane.flexcol')
        .find('ul.attributes.flexrow');
    const counters = html.find('div.counters');
    const flags = data.actor.flags.me5e || {};

    counters.append(`
	<div class="counter flexrow indoctrination">
    <h4> Indoctrination </h4>
    <div class="counter-value">
      <input type="text" name="flags.me5e.indoctrination" placeholder="0" value="${
          flags.indoctrination ?? 0
      }" data-dtype="Number"/>
    </div>
	</div>
	
	`);
    col.prepend(`
	
    <li class="attribute reputation">
        <h4 class="attribute-name box-title">Reputation</h4>
        <div class="attribute-value attributable">
        <input type="text" name="flags.me5e.paragon" placeholder="0" value="${
            flags.paragon ?? 0
        }" data-dtype="Number"/>
            <span class="sep"> / </span>
            <input type="text" name="flags.me5e.renegade" placeholder="0" value="${
                flags.renegade ?? 0
            }" data-dtype="Number"/>
            
        </div>


        <footer class="attribute-footer">
            <span class="spell-dc" >Paragon</span>
            <span class="sep"> / </span>
            <span class="spell-dc" >Renegade</span>
        </footer>
            
        
    </li>

	
	`);
});
