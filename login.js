(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.com/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));

window.extAsyncInit = function() {
    var messageData;
    var first_name;
        var last_name;
        var psid;
    document.getElementById('signonButtonID').onclick = function(){
      MessengerExtensions.getUserID(function success(uids) {
    
        psid = uids.psid;
        
        console.log('psid : '+psid);
        $.ajax({
          url: "https://graph.facebook.com/v2.6/"+psid+"?fields=first_name,last_name,profile_pic&access_token=EAACIzXqKrzYBAHcoQrfpGPsIAQpmgKHU8BFIqTl9ugjia5vesZAIZCk8iRnS6PHzkP2LvLM4I5IQtuho1guZCNTVvkzZBCJ6K0a93QN8QZAO4OW6w3CLiNfqvXUFM7SrPpfZCTxvUBz55px8EUQotS4h8b6ADSCajlntCCM2EzZCgZDZD",
          error: function(error) {
            document.getElementById('userid').innerHTML = 'error '+error;
          },
          type: 'GET', 
          success: function(result){
            first_name = result.first_name;
            last_name = result.last_name;
            document.getElementById('userid').innerHTML = 'Welcome '+ result.last_name +', '+result.first_name+ " " +psid;

            messageData = {
            recipient: {
              id: psid
            },
            message: {
              text: 'Welcome '+last_name+", "+first_name
            }
        }
       $.ajax({
          url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAACIzXqKrzYBAHcoQrfpGPsIAQpmgKHU8BFIqTl9ugjia5vesZAIZCk8iRnS6PHzkP2LvLM4I5IQtuho1guZCNTVvkzZBCJ6K0a93QN8QZAO4OW6w3CLiNfqvXUFM7SrPpfZCTxvUBz55px8EUQotS4h8b6ADSCajlntCCM2EzZCgZDZD",
          data: messageData,
          error: function(error) {
            //document.getElementById('userid').innerHTML = 'error '+error;
            console.log(error);
          },
          type: 'POST', 
          success: function(result){
            //document.getElementById('userid').innerHTML = 'Welcome '+ result.last_name +', '+result.first_name+ " " +psid;
            console.log(result);
          }
          });
          }
      });
    });

      setTimeout(function () {
          MessengerExtensions.requestCloseBrowser(function success() {
            window.location.href = "https://www.messenger.com/closeWindow/?image_url=&display_text=Welcome User";
            console.log('redirected.');
        })  
    },3000);
  }
};