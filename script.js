var quoteMachine = {
    quoteArray: [],
    count: 0,
    init: function(){
        $.getJSON("https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40&callback=", function(data) {
            quoteMachine.quoteArray = data;
            quoteMachine.placeQuote();
            $("#buttons").css("visibility", "visible");
        });
        $("#newQuote").on("click", this.newQuote);
        $("#tweetMe").on("click", this.tweet);
    },
    placeQuote: function(){
        $("#quoteContent").html("<h3>" + quoteMachine.quoteArray[quoteMachine.count].content + "</h3>");
        $("#quoteTitle").html("<h4> - " + quoteMachine.quoteArray[quoteMachine.count].title + "</h4>");
    },
    newQuote: function(){
        if(quoteMachine.count < 39){
            quoteMachine.count++;
        }else{
            quoteMachine.count = 0;
        }

        quoteMachine.placeQuote();
    },
    tweet: function(){
        var content = quoteMachine.quoteArray[quoteMachine.count].content;
        content = content.substring(3, content.length -5);
        content = content.replace(/&#.{4};/g, "");
        content = encodeURIComponent(content);
        var title = quoteMachine.quoteArray[quoteMachine.count].title;
        var message = content + " -" + title + "%20#randomQuote%20#FCC";
        window.location.href = "http://twitter.com/home/?status=" + message;
    }
};

quoteMachine.init();
