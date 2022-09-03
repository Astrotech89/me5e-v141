// import Actor5e from '../../../systems/dnd5e/module/actor/entity.js';
// import { dnd5e } from '../../../systems/dnd5e/module/config.mjs';
// import ActorSheet5eCharacter from '../../../systems/dnd5e/module/actor/sheets/character.js';
// import ActorSheet5eNPC from '../../../systems/dnd5e/module/actor/sheets/npc.js';
// import ItemSheet5e from '../../../systems/dnd5e/module/item/sheet.js';

// New style of imports

// class MyCharacterSheet extends dnd5e.applications.actor.ActorSheet5eCharacter {}

//Changing out deprecated 5e skills to their replacements
dnd5e.skills['arc'] = 'Electronics';
dnd5e.skills['nat'] = 'Engineering';
dnd5e.skills['rel'] = 'Science';
//Added the skill of vehicle Handling for foundry to detect
dnd5e.skills['ani'] = 'Vehicle Handling';

//Adding equipment types
dnd5e.equipmentTypes['prog'] = 'Program';
dnd5e.equipmentTypes['armMod'] = 'Armor Mod';
dnd5e.equipmentTypes['wepMod'] = 'Weapon Mod';
dnd5e.equipmentTypes['bodArm'] = 'Body Armor';

//Changing and adding consumable types
dnd5e.consumableTypes['wand'] = 'Single-Use Program';
dnd5e.consumableTypes['rod'] = 'Grenade';
dnd5e.consumableTypes['narc'] = 'Narcotic';

const prep = Actor5e.prototype.prepareBaseData;
function extendActorData() {
    const dat = this.data.data;
    dat['newskills'] = dat['newskills'] || {
        veh: {
            value: '',
        },
    };

    const health = this.data.data.attributes.hp;
    //const shields = this.data.data.attributes.shields;

    if (this.data.type === 'npc' || this.data.type === 'character') {
        health['shields'] = health['shields'] || 0;
        health['shieldsMax'] = health['shieldsMax'] || 0;
        health['shieldsRegen'] = health['shieldsRegen'] || 0;

        //ShieldPoints
        //shields.value = health['shields'];
        //shields.max = health['shieldsMax'];
        //shields.min = health['shieldsRegen'];
    }

    return prep.call(this);
}
Actor5e.prototype.prepareBaseData = extendActorData;

//Changing "schools" of magic
dnd5e.spellSchools['abj'] = 'Biotics';
dnd5e.spellSchools['con'] = 'Tech';
dnd5e.spellSchools['div'] = 'Combat Powers';

//Adding weapon types
dnd5e.weaponTypes['ars'] = 'Assault Rifle';
dnd5e.weaponTypes['hps'] = 'Heavy Pistol';
dnd5e.weaponTypes['smg'] = 'SMG';
dnd5e.weaponTypes['sht'] = 'Shotgun';
dnd5e.weaponTypes['snp'] = 'Sniper Rifle';
dnd5e.weaponTypes['hvy'] = 'Heavy Weapon';

//Adding weapon properties
dnd5e.weaponProperties['arc'] = 'Arc';
dnd5e.weaponProperties['bst'] = 'Burst Fire';
dnd5e.weaponProperties['dtp'] = 'Double Tap';
dnd5e.weaponProperties['het'] = 'Heat';
dnd5e.weaponProperties['hip'] = 'Hip Fire';
dnd5e.weaponProperties['snt'] = 'Silent';
dnd5e.weaponProperties['coi'] = 'Recoil';

//Changing currencies, all other currencies appear as 0 with no labels
dnd5e.currencies = {
    pp: 'Credits',
};
//Currency conversion option now does nothing to avoid accidental user error
//(also to avoid mishaps with player curiosity for 'what does this button do?')
//The answer is nothing. The button does nothing now
dnd5e.currencyConversion = {};

//Adding condition types
dnd5e.conditionTypes['indoctrinated'] = 'Indoctrinated';
dnd5e.conditionTypes['lifted'] = 'Lifted';
dnd5e.conditionTypes['primed'] = 'Primed';
dnd5e.conditionTypes['targeting'] = 'Targeting';

//Changing and adding some tool proficiencies
dnd5e.toolProficiencies['herb'] = "Chemist's Supplies";
dnd5e.toolProficiencies['navg'] = 'Starship System (Navigation)';
dnd5e.toolProficiencies['pois'] = "Brewer's Supplies";
dnd5e.toolProficiencies['aswb'] = "Armorsmith's Workbench";
dnd5e.toolProficiencies['h4ck'] = 'Hacking Tools';
dnd5e.toolProficiencies['mdcn'] = 'Medical Kit';
dnd5e.toolProficiencies['pntr'] = "Painter's Supplies";
dnd5e.toolProficiencies['ssdr'] = 'Starship Systems (Drive)';
dnd5e.toolProficiencies['sshe'] = 'Starship Systems (Helm)';
dnd5e.toolProficiencies['sssc'] = 'Starship Systems (SSC)';
dnd5e.toolProficiencies['ssew'] = 'Starship Systems (EWS)';
dnd5e.toolProficiencies['sswp'] = 'Starship Systems (Weapons)';
dnd5e.toolProficiencies['tail'] = "Tailor's Tools";
dnd5e.toolProficiencies['tink'] = "Tinker's Tools";
dnd5e.toolProficiencies['wswb'] = "Weaponsmith's Workbench";

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

Actors.registerSheet('dnd5e', ME5eCharacterSheet, {
    types: ['character'],
    makeDefault: true,
});

Actors.registerSheet('dnd5e', ME5eParagonCharacterSheet, {
    types: ['character'],
    makeDefault: false,
});

Actors.registerSheet('dnd5e', ME5eRenegadeCharacterSheet, {
    types: ['character'],
    makeDefault: false,
});
//Other sheets
class ME5eNPCSheet extends ActorSheet5eNPC {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push('me5e');
        return options;
    }
}
Actors.registerSheet('dnd5e', ME5eNPCSheet, {
    types: ['npc'],
    makeDefault: true,
});
class ME5eItemSheet extends ItemSheet5e {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push('me5e');
        return options;
    }
}
Items.registerSheet('dnd5e', ME5eItemSheet, {
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
                        <input name="data.attributes.hp.shields" type="text" value="${data.data.attributes.hp.shields}" data-dtype="Number" placeholder="5"/>
                        <span class="sep"> / </span>
                        <input name="data.attributes.hp.shieldsMax" type="text" value="${data.data.attributes.hp.shieldsMax}" data-dtype="Number" placeholder="5"/>
                    </div>
                    <footer class="attribute-footer">
                        <input name="data.attributes.hp.shieldsRegen" type="text" class="shieldsRegen" placeholder="Shield Regen." value="${data.data.attributes.hp.shieldsRegen}" data-dtype="Number"/>
                    </footer>
                </li>
	  `);

    //   const skillslist = html.find('section.sheet-body').find('ul.skills-list');
    //   skillslist.append(`
    // 	<li class="skill flexrow veh" data-skill="dex">
    // 		<input type="hidden" name="data.newskills.veh.value" data-dtype="Number">
    // 		<h4 class="skill-name">Vehicle Handling</h4>
    // 		<span class="skill-ability custom">Dex</span>
    // 		<span class="skill-mod custom"><input name="data.newskills.veh.total" type="text" value="${data.data.newskills.veh.total}" data-dtype="String" placeholder="+0"/></span>
    // 	</li>
    // `);

    const col = html
        .find('section.center-pane.flexcol')
        .find('ul.attributes.flexrow');
    const counters = html.find('div.counters');
    const flags = data.actor.flags.me5e || {};

    // counters.append(`
    // <div class="counter flexrow paragon">
    // <h4>Paragon</h4>
    // <div class="counter-value">
    //   <input type="text" name="flags.me5e.paragon" placeholder="0" value="${
    //       flags.paragon ?? 0
    //   }" data-dtype="Number"/>
    // </div>
    // </div>
    // <div class="counter flexrow renegade">
    // <h4>Renegade</h4>
    // <div class="counter-value">
    //   <input type="text" name="flags.me5e.renegade" placeholder="0" value="${
    //       flags.renegade ?? 0
    //   }" data-dtype="Number"/>
    // </div>
    // </div>
    // `);

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
