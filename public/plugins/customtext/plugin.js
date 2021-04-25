document.getElementById("pluginMenu").innerHTML += `
<div class="card mt-3">
    <div class="card-header">Custom Text</div>
    <div class="card-body">
        <input type="text" class="form-control" id="customTextInput" placeholder="Text...">
        <input type="text" class="form-control mt-2" id="customTextClasses" placeholder="Class...">
        <a class="btn btn-primary mt-2" onclick="customTextAddText()">Add</a>
    </div>
</div>
`

function customTextAddText() {
    addLocalMessage($("#customTextInput").val(), $("#customTextClasses").val())
}