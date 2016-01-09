(function () {
    var systemPasteReady = false;
    var systemPasteContent;

    function copy(target) {
        // standard way of copying
        var textArea = document.createElement('textarea');
        textArea.setAttribute('style','width:1px;border:0;opacity:0;');
        document.body.appendChild(textArea);
        textArea.value = target.innerHTML;
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    var textArea;
    function paste(target) {

        if (window.clipboardData) {
            target.innerText = window.clipboardData.getData('Text');
            return;
        }
        function waitForPaste() {
            if (!systemPasteReady) {
                setTimeout(waitForPaste, 250);
                return;
            }
            target.innerHTML = systemPasteContent;
            systemPasteReady = false;
            document.body.removeChild(textArea);
            textArea = null;
        }
        // FireFox requires at least one editable 
        // element on the screen for the paste event to fire
        textArea = document.createElement('textarea');
        textArea.setAttribute('style', 'width:1px;border:0;opacity:0;');
        document.body.appendChild(textArea);
        textArea.select();
        
        waitForPaste();
    }


    function systemPasteListener(evt) {
        systemPasteContent = evt.clipboardData.getData('text/plain');
        systemPasteReady = true;
        evt.preventDefault();
    }

    function keyBoardListener(evt) {
        if (evt.ctrlKey) {
            switch(evt.keyCode) {
                case 67: // c
                    copy(evt.target);
                    break;
                case 86: // v
                    paste(evt.target);
                    break;
            }
        }
    }


    window.addEventListener('paste',systemPasteListener);

    document.getElementById('element1').addEventListener('keydown', keyBoardListener);
    document.getElementById('element2').addEventListener('keydown', keyBoardListener);
})();
