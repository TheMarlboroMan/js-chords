let chord_formulae={

	//Triads...
	'maj':		['1', '3', '5'],
	'min':		['1', '3b', '5'],
	'aug':		['1', '3', '5#'],
	'dim':		['1', '3b', '5b'],
	'sus2':		['1', '2', '5'],
	'sus4':		['1', '4', '5'],
	'phr':		['1', '2b', '5'],
	'lyd':		['1', '4#', '5'],
	'maj7':		['1', '3', '5', '7'],
	'-7':		['1', '3b', '5', '7b'],
	'7':		['1', '3', '5', '7b'],
	'-7b5':		['1', '3b', '5b', '7b'],
	'dim7':		['1', '3b', '5b', '7bb'],
	'maj7#5':	['1', '3', '5#', '7'],
	'maj7b5':	['1', '3', '5b', '7'],
	'minmaj7':	['1', '3b', '5', '7']
};

function chord(_root, _type) {

	let root=_root.toUpperCase();

	//Just to validate...
	try {
		let index=normalize_note_to_index(root);
	}
	catch(e) {
		throw new Error('Invalid root '+_root);
	}


	let formula=chord_formulae[_type];
	if(undefined===formula) {
		throw new Error("Invalid chord type "+_type);
	}

	let tones=[];
	formula.forEach( (_item) => {
		tones.push(calculate_interval_target(root, _item));
	});

	return tones;
}

console.log(chord('C', 'maj'));
console.log(chord('Db', 'maj'));
console.log(chord('B', 'aug'));
console.log(chord('G', '7'));
console.log(chord('C', 'maj7'));
console.log(chord('A', '7'));
