define(['aloha', 'aloha/plugin', 'jquery',  'jquery19', 'ui/ui', 'aloha/console', 'aloha/ephemera', 'booktype', 'PubSub'],
  function(Aloha, Plugin, jQuery,  jQuery19, UI, Console, Ephemera, booktype, PubSub) {
    var myCodeMirror = null;

    return Plugin.create('htmledit', {
      init: function () {

      jQuery19("#htmleditDialog").on('shown.bs.modal', function() {
        var content = Aloha.getEditableById('contenteditor').getContents();
    
        myCodeMirror = myCodeMirror || CodeMirror.fromTextArea(jQuery19("#htmleditDialog TEXTAREA")[0], 
          {'mode': 'text/html', 'autofocus': true, 'lineNumbers': true, 'lineWrapping': true});

        myCodeMirror.getDoc().setValue(content);
        myCodeMirror.setSize("100%", "100%");

        jQuery19("#htmleditDialog .CodeMirror-scroll").scrollTop(0);
      });    

      jQuery19("#htmleditDialog BUTTON.operation-set").on('click', function (event) {
        var content = myCodeMirror.getDoc().getValue();

        Aloha.getEditableById('contenteditor').setContents(content);
        Aloha.trigger('aloha-my-undo', {'editable': Aloha.getEditableById('contenteditor')});
                        
        jQuery19('#htmleditDialog').modal('hide');

        booktype.editor.edit.disableSave(false);

        // publish message notification that raw html was set
        PubSub.pub('toolbar.action.triggered', {'event': event});

      });

      UI.adopt('htmledit', null, {
        click: function () {
          jQuery19('#htmleditDialog').modal('show');
        }
      });                   
    }
  });
});