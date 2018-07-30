
var contentEditableController = {
  elements: [],
  activeElement: false,
  controls: false,
  saveControl: false,
  dismissControl: false,

  init: function() {
    this.elements = document.querySelectorAll('[data-bp-field]');
    if(!this.elements) return;

    this.controls = document.querySelector('[data-contenteditable-controls]');
    if(!this.controls) return;

    this.saveControl = document.querySelector('[data-contenteditable-save]');
    if(!this.saveControl) return;

    this.dismissControl = document.querySelector('[data-contenteditable-dismiss]');
    if(!this.dismissControl) return;

    this.setupElements();
  },

  setupElements: function() {
    // Elements
    for(var i = 0; i < this.elements.length; i++) {
      var el = this.elements[i];

      el.setAttribute('contenteditable', 'true');

      el.addEventListener('keyup', function(e) {
        contentEditableController.inputChanged(this);
      });

      el.addEventListener('focus', function(e) {
        contentEditableController.presaveInput(this);
      });

      el.addEventListener('focusout', function(e) {
        contentEditableController.hideControls();
      });
    }

    // Controls
    this.saveControl.addEventListener('click', function(e) {
      contentEditableController.saveData(contentEditableController.activeElement);
    });

    this.dismissControl.addEventListener('click', function(e) {
      contentEditableController.discardData(contentEditableController.activeElement);
    });

  },

  hideControls: function() {
    this.controls.classList.remove('is-visible');
  },

  showControls: function() {
    this.controls.classList.add('is-visible');
  },

  presaveInput: function(el) {
    contentEditableController.showControls();
    contentEditableController.activeElement = el;

    if(!el.presavedInput) {
      el.presavedInput = el.innerHTML;
    }
  },

  inputChanged: function(el) {
    // contentEditableController.activeElement = el;
  },

  discardData: function(el) {
    if(el.presavedInput) {
      el.innerHTML = el.presavedInput;
    }

    this.hideControls();
  },

  saveData: function(el) {
    var field = el.getAttribute('data-bp-field');
    if(!field) return;

    var data = {
      field: field,
      value: el.innerHTML
    }

    var url = window.location.href + "/contenteditable"; // contentEditableController.sendData(url, JSON.stringify(data));
    var json = JSON.stringify(data);

    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    }
    else {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = this.onload;
    request.send(json);
  },

  onload: function (e) {
    var response = e.target.response;

    try {
      var data = JSON.parse(response);
      console.log(data);
    }
    catch(err) {
      console.log(response);
    }
  }


}

document.addEventListener("DOMContentLoaded", function() {
  contentEditableController.init();
});
