App.hall = sumeru.controller.create(function(env, session){
    var getMsgs = function(){       
        session.messages = env.subscribe('pub-message', function(msgCollection){
            //manipulate synced collection and bind it to serveral view blocks.
            session.bind('message-hall', {
                data    :   msgCollection.find()
            });
        });
    };      
    //onload is respond for handle all data subscription
    env.onload = function(){            
        return [getMsgs];            
    };
    //sceneRender is respond for handle view render and transition
    env.onrender = function(doRender){
        doRender('hall', ['push', 'left']);
    };
    //onready is respond for event binding and data manipulate
    env.onready = function(){           
        Library.touch.on('.messageSubmit', 'touchstart', submitMessage);
        Library.touch.on('.clearHistory', 'touchstart', clearHistory);
    };

    var submitMessage = function(){
        var input = document.getElementById('messageInput'),
            inputVal = input.value.trim();      
        if (inputVal == '') {
           return false; 
        };
        session.messages.add({
           content : inputVal
        });
        session.messages.save();
        input.value = '';          
    };
    var clearHistory = function(){
        session.messages.destroy();
        session.messages.save();
    }       
});
sumeru.router.add(
    {
        pattern: '/hall',
        action : 'App.hall'
    }
);