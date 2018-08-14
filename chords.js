let chord_formulae=[
	{name: 'maj', 		intervals: ['1', '3', '5']},
	{name: 'min',		intervals: ['1', '3b', '5']},
	{name: 'aug',		intervals: ['1', '3', '5#']},
	{name: 'dim',		intervals: ['1', '3b', '5b']},
	{name: 'sus2',		intervals: ['1', '2', '5']},
	{name: 'sus4',		intervals: ['1', '4', '5']},
	{name: 'phr',		intervals: ['1', '2b', '5']},
	{name: 'lyd',		intervals: ['1', '4#', '5']},
	{name: 'maj7',		intervals: ['1', '3', '5', '7']},
	{name: '-7',		intervals: ['1', '3b', '5', '7b']},
	{name: '7',		intervals: ['1', '3', '5', '7b']},
	{name: '-7b5',		intervals: ['1', '3b', '5b', '7b']},
	{name: 'dim7',		intervals: ['1', '3b', '5b', '7bb']},
	{name: 'maj7#5',	intervals: ['1', '3', '5#', '7']},
	{name: 'maj7b5',	intervals: ['1', '3', '5b', '7']},
	{name: 'minmaj7',	intervals: ['1', '3b', '5', '7']}
];

function chord_formula_by_name(_name) {

	let result=chord_formulae.find( (_item) => {
		return _item.name===_name;
	});

	if(undefined===result) {
		throw new Error("Invalid chord type "+_name);
	}

	return result.intervals;
}

function get_chord(_root, _type) {

	let root=_root.toUpperCase();

	//Just to validate...
	try {
		let index=normalize_note_to_index(root);
	}
	catch(e) {
		throw new Error('Invalid root '+_root);
	}

	let tones=[];
	chord_formula_by_name(_type).forEach( (_item) => {
		tones.push(calculate_interval_target(root, _item));
	});

	return tones;
}
/*
console.log(get_chord('C', 'maj'));
console.log(get_chord('Db', 'maj'));
console.log(get_chord('B', 'aug'));
console.log(get_chord('G', '7'));
console.log(get_chord('C', 'maj7'));
console.log(get_chord('A', '7'));
*/
