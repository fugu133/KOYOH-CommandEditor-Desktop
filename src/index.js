
// Initialize the editor
var editor = new JSONEditor(document.getElementById('editor_holder'), {
	// Enable fetching schemas via ajax
	ajax: true,
	theme: 'bootstrap5',
	iconlib: 'fontawesome4',

	// The schema for the editor
	schema: {
		$ref: "../resource/schema/input_converter_format.json",
		format: "grid"
	}
});