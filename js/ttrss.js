
/** FUNZIONI TTRSS **/

function login(url, user, password) {
    var session_id= "";
    
    
var data = {
        op: "login",
        user: user,
        password: password
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content.session_id);
              if (data.status == "1") {
            if (localStorage.URL != "" && localStorage.URL !=  undefined) alert("Errore di accesso:" + data.content.error)
                session_id="";
              } else {
                session_id = data.content.session_id;
              }
          },
          error: function()
          {
            if (localStorage.URL!= "" && localStorage.URL != undefined)  { 
                alert("Host unreachable:" + url + "\nPlease Check Network");
            } else {
                //alert("configurazione");
                $.mobile.changePage("account.html");
            }
            
          }
      });
    return session_id;
}


function getCategories(url, session_id) {
    var categorie = "";
    var data = {
        op: "getCategories",
        sid: session_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              categorie= data.content;
                // $.each(data.content, function() {
                    //alert(this.id + " " + this.title);
                //});
          },
          error: function()
          {
            //alert("Errore di rete");
          }
      });
    return categorie;
}

function getCategoriesA(url, session_id, funzione) {
    //var categorie = "";
    var data = {
        op: "getCategories",
        sid: session_id,
        unread_only:false
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              //categorie= data.content;
                // $.each(data.content, function() {
                    //alert(this.id + " " + this.title);
                //});
              funzione(data.content);
          },
          error: function()
          {
            //alert("Errore di rete");
          }
      });
    //return categorie;
}



function getLabels(url, session_id) {
    var labels = "";
    var data = {
        op: "getLabels",
        sid: session_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              labels= data.content;
                /* $.each(data.content, function() {
                    alert(this.id + " " + this.caption);
                });*/
          },
          error: function()
          {
            //alert("Errore di rete");
          }
      });
    return labels;
}


function getLabelsA(url, session_id, funzione) {
    
    var data = {
        op: "getLabels",
        sid: session_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              //labels= data.content;
                /* $.each(data.content, function() {
                    alert(this.id + " " + this.caption);
                });*/
              funzione(data.content);
          },
          error: function()
          {
            //alert("Errore di rete");
          }
      });
    
}



function removeArticleLabels(url, session_id, article_id) {
    var labels = "";
    var data = {
        op: "getLabels",
        sid: session_id,
        article_id: article_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              
                $.each(data.content, function() {
                    //alert(this.id + " " + this.caption);
                    removeLabel(url, session_id,article_id,this.id);
                });
          },
          error: function()
          {
            //alert("Errore di rete");
          }
      });
    return labels;
}


function removeArticleLabelsA(url, session_id, article_id, funzione) {
    var labels = "";
    var data = {
        op: "getLabels",
        sid: session_id,
        article_id: article_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              
                $.each(data.content, function() {
                    //alert(this.id + " " + this.caption);
                    removeLabelA(url, session_id,article_id,this.id, function(){});
                });
                funzione();
          },
          error: function()
          {
            //alert("Errore di rete");
          }
      });
    return labels;
}



function getFeeds(url, session_id, cat_id) {
    var feeds = "";
    var data = {
        op: "getFeeds",
        sid: session_id,
        cat_id: cat_id,
        unread_only: false,
        limit: 0,
        offset: 0,
        include_nested: false
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              feeds= data.content;
                /* $.each(data.content, function() {
                    alert(this.id + " " + this.title);
                });*/
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return feeds;
}


function getFeedsA(url, session_id, cat_id, funzione) {
    var feeds = "";
    var data = {
        op: "getFeeds",
        sid: session_id,
        cat_id: cat_id,
        unread_only: localStorage.unread,
        limit: 0,
        offset: 0,
        include_nested: false
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione(data.content);
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return feeds;
}


function getArticles(url, session_id, feed_id) {
    var articles = "";
    var data = {
        op: "getHeadlines",
        sid: session_id,
        feed_id: feed_id,
        is_cat:false,
        show_excerpt:true,
        show_content:false,
        view_mode: "all_articles",
        include_attachments:false,
        since_id:0,
        limit: 30,
        skip: 0,
        include_nested: false
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          cache:true,
          timeout:5000,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content.error);
              articles= data.content;
                 //$.each(data.content, function() {
                //    alert(this.id + " " + this.title);
                //});
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return articles;
}


function getArticlesA(url, session_id, feed_id, funzione) {
    var v_mode = "" 
    
    if (localStorage.unread=="true") {
        v_mode="unread";
    } else {
        v_mode="all_articles";
    }
    
    var data = {
        op: "getHeadlines",
        sid: session_id,
        feed_id: feed_id,
        is_cat:false,
        show_excerpt:true,
        show_content:false,
        view_mode: v_mode  ,
        include_attachments:false,
        since_id:0,
        limit: 30,
        skip: 0,
        include_nested: false
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content.error);
              //articles= data.content;
                 //$.each(data.content, function() {
                //    alert(this.id + " " + this.title);
                //});
              
              funzione(data.content);
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
}



function getArticle(url, session_id, article_id) {
    var article = "";
    var data = {
        op: "getArticle",
        sid: session_id,
        article_id: article_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              //article= data.content;
                $.each(data.content, function() {
                    //alert(this.id + " " + this.title);
                    article= this;
                });
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}


function getArticleA(url, session_id, article_id, funzione) {
    var article = "";
    var data = {
        op: "getArticle",
        sid: session_id,
        article_id: article_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              //article= data.content;
                $.each(data.content, function() {
                    //alert(this.id + " " + this.title);
                    //article= this;
                    funzione (this);
                });
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}



function setRead(url, session_id, article_id) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:0,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
             //alert(data.content.status);
              //article= data.content;
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}

function setReadA(url, session_id, article_id, funzione) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:0,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
             //alert(data.content.status);
              //article= data.content;
              funzione();
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}

function setAllReadA(url, session_id, feed_id, funzione) {
    var article = "";
    var data = {
        op: "catchupFeed",
        sid: session_id,
        feed_id: feed_id,
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
             //alert(data.content.status);
              //article= data.content;
              funzione(data.content.status);
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}




function setLabel(url, session_id, article_id, label_id) {
    var article = "";
    var data = {
        op: "setArticleLabel",
        sid: session_id,
        article_ids: article_id,
        label_id: label_id,
        assign:true,
        mode:0,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
             //alert(data.content.status);
              //article= data.content;
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}

function setLabelA(url, session_id, article_id, label_id, funzione) {
    
    var data = {
        op: "setArticleLabel",
        sid: session_id,
        article_ids: article_id,
        label_id: label_id,
        assign:true,
        mode:0,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
             //alert(data.content.status);
              //article= data.content;
              funzione();
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}


function removeLabel(url, session_id, article_id, label_id) {
    var article = "";
    var data = {
        op: "setArticleLabel",
        sid: session_id,
        article_ids: article_id,
        label_id: label_id,
        assign:false,
        mode:0,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
             //alert(data.content.status);
              //article= data.content;
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}

function removeLabelA(url, session_id, article_id, label_id, funzione) {
    var data = {
        op: "setArticleLabel",
        sid: session_id,
        article_ids: article_id,
        label_id: label_id,
        assign:false,
        mode:0,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
             //alert(data.content.status);
              //article= data.content;
              funzione();
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });

}


function setUnRead(url, session_id, article_id) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:1,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
             // alert(data.status);
              //article= data.content;
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}

function setUnReadA(url, session_id, article_id, funzione) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:1,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
             // alert(data.status);
              //article= data.content;
              funzione();
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}


function addStar(url, session_id, article_id) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:1,
        field:0
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert(data.content.status);
              //article= data.content;
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}

function addStarA(url, session_id, article_id, funzione) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:1,
        field:0
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert(data.content.status);
              //article= data.content;
              funzione();
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return article;
}



function subscribe(url, session_id, feedurl, categoryID) {
    var esito = "";
    var data = {
        op: "subscribeToFeed",
        sid: session_id,
        feed_url: feedurl,
        category_id:categoryID
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert(data.content.status);
              esito = data.content.status;
              //article= data.content;
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return esito;
}

function subscribeA(url, session_id, feedurl, categoryID, funzione) {
    var esito = "";
    var data = {
        op: "subscribeToFeed",
        sid: session_id,
        feed_url: feedurl,
        category_id:categoryID
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert(data.content.status);
              funzione(data.content.status);
              //esito = data.content.status;
              //article= data.content;
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return esito;
}

//feed_id
function unSubscribe(url, session_id, feed_id) {
    var esito = "";
    var data = {
        op: "unsubscribeFeed",
        sid: session_id,
        feed_id: feed_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert(data.content.status);
              esito = data.content.status;
              //article= data.content;
          },
          error: function()
          {
            alert("Network Error, Please Check Network");
          }
      });
    return esito;
}