document.addEventListener("deviceready", global_pageinit);
//$("#MainPage").live('pageinit', global_pageinit);



function global_pageinit() {
	$.mobile.allowCrossDomainPages = true;
	
	var version = "0.0.1 Beta",
	foothtml = "Versione " + version,
	cright = "&copy; 2013 Andrea Fortuna";


	$( ".type-home .ui-content p.jqm-version" ).html( version );
	$( ".footer-docs p.jqm-version" ).html( foothtml );
	$( ".footer-docs p.af-copyright" ).html( cright );
	
	
	//local_pageinit();
	
}


function timeConverter(UNIX_timestamp){
 var a = new Date(UNIX_timestamp*1000);
 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     var date = a.getDate();
     var hour = a.getHours();
     var min = a.getMinutes();
     //var sec = a.getSeconds();
     var time = date+','+month+' '+year+' '+hour+':'+min ;
     return time;
 }



   function caricaCategorie() {
            sessionStorage.URL = localStorage.URL;
    
         sessionStorage.session_id=login(sessionStorage.URL,localStorage.Username,localStorage.Password);   
        if (sessionStorage.session_id=="" || sessionStorage.session_id=="undefined") {
            $.mobile.changePage("account.html", null, true, true);
        }
            
        //alert(session_id);
        var categorie =  getCategories(sessionStorage.URL, sessionStorage.session_id);
        
        var list = $('#categorieListView');
         $.each(categorie, function() {
            //alert(this.id + " " + this.title);
            if (this.unread > 0) list.append("<li><a href='feeds.html'  onclick=\"sessionStorage.catID='" + this.id + "';sessionStorage.catTitle='" + this.title + "'\">" + this.title + "</h4></a><span class=\"ui-li-count\">" + this.unread + "</span></li>");
					
        });
        list.listview("refresh");
        }
