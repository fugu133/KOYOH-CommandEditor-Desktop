
// Initialize the editor
var editor = new JSONEditor(document.getElementById('editor_holder'), {
	// Enable fetching schemas via ajax
	ajax: true,
	theme: 'bootstrap5',
	iconlib: 'fontawesome4',
	disable_edit_json: false,

	// The schema for the editor
	schema: {
		$ref: "../resource/schema/input_converter_format.json",
		format: "normal"
	}
});


// editor.on('change', function () {
// 	// Get an array of errors from the validator
// 	var errors = editor.validate();

// 	var indicator = document.getElementById('valid_indicator');

// 	// Not valid
// 	if (errors.length) {
// 		indicator.className = 'label alert';
// 		indicator.textContent = 'not valid';
// 	}
// 	// Valid
// 	else {
// 		indicator.className = 'label success';
// 		indicator.textContent = 'valid';
// 	}
// });

document.getElementById('saveFile').addEventListener('click', saveJson);

async function saveJson() {
	const rt = await window.electronAPI.saveFile(editor.getValue());
	if (rt.status) {
		window.electronAPI.convCmd(rt.path);
	}
	console.log(rt);
}