//	   0    1     2    3     4    5    6     7    8     9    10    11
let notes=['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let natural_notes=['C', 'D', 'E', 'F', 'G', 'A', 'B'];
let all_notes=['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'Eb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
let intervals_semitones={
	'1':	0,
	'2b': 	1,
	'2': 	2,
	'3b':	3,
	'3':	4,
	'4':	5,
	'4#':	6,
	'5b':	6,
	'5':	7,
	'5#':	8,
	'6b':	8,
	'6':	9,
	'7bb':	9,
	'7b':	10,
	'7':	11
};

function name_of_note(_note) {

	let note=_note.toUpperCase().substr(0, 1);
	if(-1==natural_notes.indexOf(note)) {
		throw new Error(note+' is not a valid note');
	}
	return note;
}

function skip_of_interval(_interval) {

	if(undefined===intervals_semitones[_interval]) {
		throw new Error(_interval+' is not a valid interval');
	}
	return parseInt(_interval.substr(0, 1), 10);
}

function semitones_from_interval(_interval) {

	if(undefined===intervals_semitones[_interval]) {
		throw new Error("Undefined interval ", _interval);
	}

	return intervals_semitones[_interval];
}

function normalize_note_to_index(_note) {

	_note=_note.toUpperCase();
	let note=notes.indexOf(_note);

	//Could not find a note by that name...
	if(note==-1) {

		if(_note.length==2) {

			let accidental=_note.substr(-1);
			let name=name_of_note(_note);
			let index=normalize_note_to_index(name);
			let displacement=0;
		
			switch(accidental) {
				case 'B': displacement=-1; break;
				case '#': displacement=1; break;
				default:
					throw new Error("Invalid tone "+_note);
				break;
			}

			let new_index=index+displacement;

			//Prevent negative indexes...
			new_index=new_index < 0 ? new_index+notes.length : new_index;
			return (new_index) % notes.length;
		}

		throw new Error("Invalid tone "+_note);
	}
	return note;
}

//Gets the sharp note name from the given note with the given interval.
function target_note_with_interval(_from, _interval) {

	let index=normalize_note_to_index(_from);
	let semitones=semitones_from_interval(_interval);

	return notes[(index+semitones) % notes.length];
}

//!Returns the name of the target note from _from to the interval... It will
//!just return the name, not the alterations.
function name_note_with_interval(_from, _interval) {

	let note=name_of_note(_from);
	let index=natural_notes.indexOf(note);

	let skip=skip_of_interval(_interval);
	let target_name=natural_notes[(index+skip-1)%natural_notes.length];

	return target_name;

}

//!Enharmonises _canonical so it is named like _expected...
function enharmonise(_canonical, _expected) {

	let index_c=notes.indexOf(_canonical);
	let index_e=notes.indexOf(_expected);

	//Edge case: same name for the two notes... just get the canonical.
	if(_canonical.substr(0,1)==_expected.substr(0,1)) {
		return _canonical;
	}

	//Rest of cases: find the smallest distance.
	function calculate_distance(_begin, _end, _direction) {

		let dist=0;
		while(_begin != _end) {
			++dist;
			_begin+=_direction;

			if(_begin >= notes.length) {
				_begin=0;
			}
			else if(_begin < 0) {
				_begin=notes.length-1;
			}
		}

		return dist;
	};

	let back_distance=calculate_distance(index_e, index_c, -1);
	let forward_distance=calculate_distance(index_e, index_c, 1);

	if(back_distance < forward_distance) {
		return _expected+'b'.repeat(back_distance);
	}
	else if(forward_distance < back_distance) {
		return _expected+'#'.repeat(forward_distance);
	}
	else {
		throw new Error("Could not enharmonise "+_canonical+" to "+_expected);
	}
}

function calculate_interval_target(_from, _interval) {

	//Ok, we know that from Eb, the -3rd must be named G.
	let target_name=name_note_with_interval(_from, _interval);

	//We also know the canonical name we need, which is F#.
	let target_note=target_note_with_interval(_from, _interval);

	//So... An f# named like G is actually Gb.
	let real_note=enharmonise(target_note, target_name);

	return real_note;
}
