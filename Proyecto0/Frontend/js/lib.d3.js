/***************************** 
	Libreria D3.js
*////////////////////////////

// Table Library
function table(dataset, columnas, container){  

  var tbody = d3.select(container).append('tbody');

  var rows = tbody.selectAll("tr")
    .data(dataset)
    .enter()
    .append("tr")
    .text(function(column) { //return column;
       return column.id + " " + column.name;
     });

  var cells = rows.selectAll("td")
    .data(function(row){
      return columnas.map(function(column){
        return {column:column, value:row[column]};
      });
    })
    .enter()
    .append("td")

    return tbody;
}

// Donut Library
function donut(indi, relleno, container) {
   
  var width = 120;
      height = 150,
      radius = Math.min(width, height) / 2;
        
  var color  = d3.scale.ordinal()
      .range(["rgb(165, 0, 38)","#EBE8E8"]);

  var pie = d3.layout.pie()
      .sort(null);

  var arc = d3.svg.arc()
      .innerRadius(radius - 5)
      .outerRadius(radius - 10);

  var svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var path = svg.selectAll("path")
      .data(pie(relleno))
      .enter().append("path")
      .attr("fill", function(d,i) { return color(i); })
      .attr("d", arc);
      
/*  if(indi[1] < 99) {
    svg.append("text")
    .text(indi[0]+"/"+indi[1])
    .attr("class", "units-label")
    .attr("x", ((radius/2)*-1)-4)
    .attr("y", radius-45)
    .attr("font-size", 25);  
  }
  else{
    svg.append("text")
    .text(indi[0]+"/"+indi[1])
    .attr("class", "units-label")
    .attr("x", ((radius/2)*-1)-9)
    .attr("y", radius-45)
    .attr("font-size", 23);
  }    */

var indi1 = indi[1].toString();
var indi0 = indi[0].toString();

    if(indi1.length > 3) {
	svg.append("text")
        .text(indi0.padStart(3,"0")+"/"+indi1.padStart(3,"0"))
        .attr("class", "units-label")
        .attr("x", ((radius/2)*-1)-16)
        .attr("y", radius-50)
        .attr("font-size", 22);
    }
    else{
        svg.append("text")
        .text(indi0.padStart(3,"0")+"/"+indi1.padStart(3,"0"))
        .attr("class", "units-label")
        .attr("x", ((radius/2)*-1)-10)
        .attr("y", radius-50)
    	.attr("font-size", 23);
    }

    svg.append("text")
       .text("Colab")
       .attr("x", ((radius/2)*-1)+15)
       .attr("y", radius-27)
       .attr("font-size", 12);

    
}

// Tabla Library 
function tabla(container){
    d3.json("web/tablebest/table.json", function(error, data) {
        var datasetmal = data; 
        d3.select(".titulos").text("Top - Mejores IPS");
        d3.select(container).selectAll("tr").data(datasetmal).enter().append("tr").attr("class","ipsre");
        d3.selectAll(".ipsre").append("td").attr("class",function(d,i){return "id";});
        d3.selectAll(".ipsre").append("td").attr("class",function(d,i){return "ips";});
        d3.selectAll(".ipsre").append("td").attr("class",function(d,i){return "goodbad";});
        d3.selectAll(".id").data(datasetmal).text(function(d){return d.id;});
        d3.selectAll(".ips").data(datasetmal).text(function(d){return d.name.toLowerCase();});
        d3.selectAll(".goodbad").append("i").attr("class","fa fa-chevron-circle-up greencolor");

        d3.select(".goodbutton").on("click",function(){
            d3.json("web/tableworst/table.json", function(error, data) {
                var dataset = data; 
                d3.select(".titulos").text("Top - IPS Deficientes");
                d3.selectAll(".id").data(dataset).text(function(d){return d.id;});
                d3.selectAll(".ips").data(dataset).text(function(d){return d.name.toLowerCase();});
                d3.selectAll("i").attr("class","fa fa-chevron-circle-down redcolor");
            });
        });
    });

    d3.select(".badbutton").on("click",function(){
        d3.json("web/tablebest/table.json", function(error, data) {
            var datasetmal = data; 
            d3.select(".titulos").text("Top - Mejores IPS");
            d3.selectAll(".id").data(datasetmal).text(function(d){return d.id;});
            d3.selectAll(".ips").data(datasetmal).text(function(d){return d.name.toLowerCase();});
            d3.selectAll("i").attr("class","fa fa-chevron-circle-up greencolor");
        });
    });
}

function percent_data_recover(data, container) {
  var dataset = data[0];
  d3.select(container).append("div").attr("class","row no-gutters percents-recover")
  d3.selectAll(".percents-recover").append('div').attr('class','col-sm-6 pl-4').text("Recuperados")
  d3.selectAll(".percents-recover").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text("Contagiados")
  d3.selectAll(".percents-recover").append('div').attr('class','col-sm-6 pl-4').text(dataset.recuperados_col)
  d3.selectAll(".percents-recover").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text(dataset.contagios_col)
  d3.selectAll(".percents-recover").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(((dataset.recuperados_col*100)/dataset.contagios_col).toFixed(2)+"%").style('font-size','40px')
  d3.selectAll(".percents-recover").style("font-family","Barlow Condensed")
  d3.selectAll(".percents-recover").style("font-size","15px !important")
  
}

function percent_data_deaths(data, container) {
  var dataset = data[0];
  d3.select(container).append("div").attr("class","row no-gutters percents-deaths")
  d3.selectAll(".percents-deaths").append('div').attr('class','col-sm-6 pl-4').text("Recuperados")
  d3.selectAll(".percents-deaths").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text("Contagiados")
  d3.selectAll(".percents-deaths").append('div').attr('class','col-sm-6 pl-4').text(dataset.muertes_col)
  d3.selectAll(".percents-deaths").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text(dataset.contagios_col)
  d3.selectAll(".percents-deaths").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(((dataset.muertes_col*100)/dataset.contagios_col).toFixed(2)+"%").style('font-size','40px')
  d3.selectAll(".percents-deaths").style("font-family","Barlow Condensed")
  d3.selectAll(".percents-deaths").style("font-size","15px !important")  
}

function camas_privado_generales(data, container) {
  var dataset = data;
  d3.selectAll(".camas_privado_generales").remove()
  d3.select(container).append("div").attr("class","row no-gutters camas_privado_generales")
  d3.selectAll(".camas_privado_generales").append('div').attr('class','col-sm-6 pl-4').text("Cap. Camas Generales")
  d3.selectAll(".camas_privado_generales").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text("Estimados Contagiados")
  d3.selectAll(".camas_privado_generales").append('div').attr('class','col-sm-6 pl-4').text(dataset.Cap_Adultos_Pri)
  d3.selectAll(".camas_privado_generales").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text(dataset.Camas_Generales_Pub_Pri)
  d3.selectAll(".camas_privado_generales").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(dataset.Cap_Adultos_Pri - dataset.Camas_Generales_Pub_Pri).style('font-size','40px')
  d3.selectAll(".camas_privado_generales").style("font-family","Barlow Condensed")
  d3.selectAll(".camas_privado_generales").style("font-size","15px !important")
}

function camas_privado_uci(data, container) {
  var dataset = data;
  d3.selectAll(".camas_privado_uci").remove()
  d3.select(container).append("div").attr("class","row no-gutters camas_privado_uci")
  d3.selectAll(".camas_privado_uci").append('div').attr('class','col-sm-6 pl-4').text("Cap. Camas UCI")
  d3.selectAll(".camas_privado_uci").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text("Estimados Contagiados")
  d3.selectAll(".camas_privado_uci").append('div').attr('class','col-sm-6 pl-4').text(dataset.Cap_Intens_Adultos_Pri)
  d3.selectAll(".camas_privado_uci").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text(dataset.Camas_Generales_Pub_Pri)
  d3.selectAll(".camas_privado_uci").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(dataset.Cap_Intens_Adultos_Pri - dataset.Camas_Generales_Pub_Pri).style('font-size','40px')
  d3.selectAll(".camas_privado_uci").style("font-family","Barlow Condensed")
  d3.selectAll(".camas_privado_uci").style("font-size","15px !important")
}

function camas_privado_ucim(data, container) {
  var dataset = data;
  d3.selectAll(".camas_privado_ucim").remove()
  d3.select(container).append("div").attr("class","row no-gutters camas_privado_ucim")
  d3.selectAll(".camas_privado_ucim").append('div').attr('class','col-sm-6 pl-4').text("Cap. Camas UCIM")
  d3.selectAll(".camas_privado_ucim").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text("Estimados Contagiados")
  d3.selectAll(".camas_privado_ucim").append('div').attr('class','col-sm-6 pl-4').text(dataset.Cap_Interm_Adultos_Pri)
  d3.selectAll(".camas_privado_ucim").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text(dataset.Camas_Generales_Pub_Pri)
  d3.selectAll(".camas_privado_ucim").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(dataset.Cap_Interm_Adultos_Pri - dataset.Camas_Generales_Pub_Pri).style('font-size','40px')
  d3.selectAll(".camas_privado_ucim").style("font-family","Barlow Condensed")
  d3.selectAll(".camas_privado_ucim").style("font-size","15px !important")
}

function ventiladores(data, container) {
  var dataset = data;
  d3.selectAll(".ventiladores").remove()
  d3.select(container).append("div").attr("class","row no-gutters ventiladores")
  //d3.selectAll(".ventiladores").append('div').attr('class','col-sm-6 pl-4').text("Cap. Camas UCIM")
  //d3.selectAll(".ventiladores").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text("Estimados Contagiados")
  //d3.selectAll(".ventiladores").append('div').attr('class','col-sm-6 pl-4').text(dataset.Cap_Interm_Adultos_Pri)
  //d3.selectAll(".ventiladores").append('div').attr('class','col-sm-6 pr-4').style('text-align','right').text(dataset.Camas_Generales_Pub_Pri)
  d3.selectAll(".ventiladores").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(dataset.Ventilador).style('font-size','40px')
  d3.selectAll(".ventiladores").style("font-family","Barlow Condensed")
  d3.selectAll(".ventiladores").style("font-size","15px !important")
}

function percent_uci(data, container) {
  var dataset = data;
  d3.selectAll(".upper_main_uci").remove()
  d3.selectAll(".percent-adultos").remove()
  d3.selectAll(".percents-adultos-uci").remove()
  d3.selectAll(".percent-mayores").remove()
  d3.selectAll(".percents-mayores-uci").remove()
  d3.selectAll(container).append('div').attr("class","col-sm-4 pl-1 upper_main_uci").text("Adultos Hosp.")
  d3.selectAll(container).append('div').attr("class","col-sm-4 upper_main_uci").style('text-align','center').text("Estimados Hosp.")
  d3.selectAll(container).append('div').attr("class","col-sm-4 pr-1 upper_main_uci").style('text-align','right').text("Adu. May Hosp.")
  d3.selectAll(container).append('div').attr("class","col-sm-4 pl-1 upper_main_uci").text(dataset.Contagiados_Hosp_Adultos_UCI)
  d3.selectAll(container).append('div').attr("class","col-sm-4 upper_main_uci").style('text-align','center').text(dataset.Contagiados_Hosp_UCI)
  d3.selectAll(container).append('div').attr("class","col-sm-4 pr-1 upper_main_uci").style('text-align','right').text(dataset.Contagiados_Hosp_Mayores_UCI)
  d3.selectAll(container).style("font-family","Barlow Condensed")
  d3.selectAll(container).style("font-size","15px !important") 
  
  d3.select(container).append("div").attr("class", "col-sm-6 percent-adultos")
  d3.selectAll(".percent-adultos").append("div").attr("class","row no-gutters percents-adultos-uci")
  d3.selectAll(".percents-adultos-uci").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(dataset.Contagiados_Hosp_Adultos_UCI_P.toFixed(2)+"%").style('font-size','40px')
  d3.selectAll(".percents-adultos-uci").style("font-family","Barlow Condensed")
  d3.selectAll(".percents-adultos-uci").style("font-size","15px !important")  


  d3.select(container).append("div").attr("class", "col-sm-6 percent-mayores")
  d3.selectAll(".percent-mayores").append("div").attr("class","row no-gutters percents-mayores-uci")
  d3.selectAll(".percents-mayores-uci").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(dataset.Contagiados_Hosp_Mayores_UCI_P.toFixed(2)+"%").style('font-size','40px')
  d3.selectAll(".percents-mayores-uci").style("font-family","Barlow Condensed")
  d3.selectAll(".percents-mayores-uci").style("font-size","10px !important")  
}

function matrix_pub1(data,container) {
  var dataset = data;
  d3.selectAll(".pub1").remove()
  d3.select(container).append('div').attr("class","col-sm-8 pl-1 pub1 mb-1").text("Cantidad Estimados Contagiados")
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub1 mb-1").style('text-align','right').style('font-weight','bold').text(dataset.Camas_Generales_Pub_Pri)
  
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 mt-2 pub1")
  d3.select(container).append('div').attr("class","col-sm-4 pub1 pr-3").style('text-align','right').text("Cap. Actual")
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub1").style('text-align','right').text("Camas Disponibles")

  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pub1").text("General")
  d3.select(container).append('div').attr("class","col-sm-4 pub1 pr-3").style('text-align','right').text(dataset.Cap_Adultos_PubN1)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub1").style('text-align','right').text(dataset.Cap_Adultos_PubN1 - dataset.Camas_Generales_Pub_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pub1").text("UCIM")
  d3.select(container).append('div').attr("class","col-sm-4 pub1 pr-3").style('text-align','right').text(dataset.Cap_Interm_Adultos_PubN1)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub1").style('text-align','right').text(dataset.Cap_Interm_Adultos_PubN1 - dataset.Camas_Generales_Pub_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pub1").text("UCI")
  d3.select(container).append('div').attr("class","col-sm-4 pub1 pr-3").style('text-align','right').text(dataset.Cap_Intens_Adultos_PubN1)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pb-2 pub1").style('text-align','right').text(dataset.Cap_Intens_Adultos_PubN1 - dataset.Camas_Generales_Pub_Pri)
  d3.selectAll(container).style("font-family","Barlow Condensed")
  d3.selectAll(container).style("font-size","10px !important") 
  d3.selectAll(container).style("padding-bottom","1.2px") 
}

function matrix_pri(data,container) {
  var dataset = data;
  d3.selectAll(".pri").remove()
  d3.select(container).append('div').attr("class","col-sm-8 pl-1 pri mb-1").text("Cantidad Estimados Contagiados")
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pri mb-1").style('text-align','right').style('font-weight','bold').text(dataset.Camas_Generales_Pub_Pri)
  
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 mt-2 pri")
  d3.select(container).append('div').attr("class","col-sm-4 pri pr-3").style('text-align','right').text("Cap. Actual")
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pri").style('text-align','right').text("Camas Disponibles")

  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pri").text("General")
  d3.select(container).append('div').attr("class","col-sm-4 pri pr-3").style('text-align','right').text(dataset.Cap_Adultos_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pri").style('text-align','right').text(dataset.Cap_Adultos_Pri - dataset.Camas_Generales_Pub_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pri").text("UCIM")
  d3.select(container).append('div').attr("class","col-sm-4 pri pr-3").style('text-align','right').text(dataset.Cap_Interm_Adultos_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pri").style('text-align','right').text(dataset.Cap_Interm_Adultos_Pri - dataset.Camas_Generales_Pub_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pri").text("UCI")
  d3.select(container).append('div').attr("class","col-sm-4 pri pr-3").style('text-align','right').text(dataset.Cap_Intens_Adultos_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pb-2 pri").style('text-align','right').text(dataset.Cap_Intens_Adultos_Pri - dataset.Camas_Generales_Pub_Pri)
  d3.selectAll(container).style("font-family","Barlow Condensed")
  d3.selectAll(container).style("font-size","10px !important") 
  d3.selectAll(container).style("padding-bottom","1.2px") 
}

function matrix_pub2(data,container) {
  var dataset = data;
  d3.selectAll(".pub2").remove()
  d3.select(container).append('div').attr("class","col-sm-8 pl-1 pub2 mb-1").text("Cantidad Estimados Contagiados")
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub2 mb-1").style('text-align','right').style('font-weight','bold').text(dataset.Camas_Generales_Pub_Pri)
  
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 mt-2 pub2")
  d3.select(container).append('div').attr("class","col-sm-4 pub2 pr-3").style('text-align','right').text("Cap. Actual")
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub2").style('text-align','right').text("Camas Disponibles")

  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pub2").text("General")
  d3.select(container).append('div').attr("class","col-sm-4 pub2 pr-3").style('text-align','right').text(dataset.Cap_Adultos_PubN2)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub2").style('text-align','right').text(dataset.Cap_Adultos_PubN2 - dataset.Camas_Generales_Pub_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pub2").text("UCIM")
  d3.select(container).append('div').attr("class","col-sm-4 pub2 pr-3").style('text-align','right').text(dataset.Cap_Interm_Adultos_PubN2)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub2").style('text-align','right').text(dataset.Cap_Interm_Adultos_PubN2 - dataset.Camas_Generales_Pub_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pub2").text("UCI")
  d3.select(container).append('div').attr("class","col-sm-4 pub2 pr-3").style('text-align','right').text(dataset.Cap_Intens_Adultos_PubN2)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pb-2 pub2").style('text-align','right').text(dataset.Cap_Intens_Adultos_PubN2 - dataset.Camas_Generales_Pub_Pri)
  d3.selectAll(container).style("font-family","Barlow Condensed")
  d3.selectAll(container).style("font-size","10px !important") 
  d3.selectAll(container).style("padding-bottom","1px")
}

function matrix_pub3(data,container) {
  var dataset = data;
  d3.selectAll(".pub3").remove()
  d3.select(container).append('div').attr("class","col-sm-8 pl-1 pub3 mb-1").text("Cantidad Estimados Contagiados")
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub3 mb-1").style('text-align','right').style('font-weight','bold').text(dataset.Camas_Generales_Pub_Pri)
  
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 mt-2 pub3")
  d3.select(container).append('div').attr("class","col-sm-4 pub3 pr-3").style('text-align','right').text("Cap. Actual")
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub3").style('text-align','right').text("Camas Disponibles")

  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pub3").text("General")
  d3.select(container).append('div').attr("class","col-sm-4 pub3 pr-3").style('text-align','right').text(dataset.Cap_Adultos_PubN3)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub3").style('text-align','right').text(dataset.Cap_Adultos_PubN3 - dataset.Camas_Generales_Pub_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pub3").text("UCIM")
  d3.select(container).append('div').attr("class","col-sm-4 pub3 pr-3").style('text-align','right').text(dataset.Cap_Interm_Adultos_PubN3)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pub3").style('text-align','right').text(dataset.Cap_Interm_Adultos_PubN3 - dataset.Camas_Generales_Pub_Pri)
  d3.select(container).append('div').attr("class","col-sm-4 pl-1 pub3").text("UCI")
  d3.select(container).append('div').attr("class","col-sm-4 pub3 pr-3").style('text-align','right').text(dataset.Cap_Intens_Adultos_PubN3)
  d3.select(container).append('div').attr("class","col-sm-4 pr-1 pb-2 pub3").style('text-align','right').text(dataset.Cap_Intens_Adultos_PubN3 - dataset.Camas_Generales_Pub_Pri)
  d3.selectAll(container).style("font-family","Barlow Condensed")
  d3.selectAll(container).style("font-size","10px !important")  
  d3.selectAll(container).style("padding-bottom","1px")
}

function percent_ucim(data, container) {
  var dataset = data;
  d3.selectAll(".upper_main_ucim").remove()
  d3.selectAll("._percent-adultos").remove()
  d3.selectAll(".percents-adultos-ucim").remove()
  d3.selectAll("._percent-mayores").remove()
  d3.selectAll(".percents-mayores-ucim").remove()
  d3.selectAll(container).append('div').attr("class","col-sm-4 pl-1 upper_main_ucim").text("Adultos Hosp.")
  d3.selectAll(container).append('div').attr("class","col-sm-4 upper_main_ucim").style('text-align','center').text("Estimados Hosp.")
  d3.selectAll(container).append('div').attr("class","col-sm-4 pr-1 upper_main_ucim").style('text-align','right').text("Adu. May. Hosp.")
  d3.selectAll(container).append('div').attr("class","col-sm-4 pl-1 upper_main_ucim").text(dataset.Contagiados_Hosp_Adultos_UCIM)
  d3.selectAll(container).append('div').attr("class","col-sm-4 upper_main_ucim").style('text-align','center').text(dataset.Contagiados_Hosp_UCIM)
  d3.selectAll(container).append('div').attr("class","col-sm-4 pr-1 upper_main_ucim").style('text-align','right').text(dataset.Contagiados_Hosp_Mayores_UCIM)
  d3.selectAll(container).style("font-family","Barlow Condensed")
  d3.selectAll(container).style("font-size","10px !important") 
  
  d3.select(container).append("div").attr("class", "col-sm-6 _percent-adultos")
  d3.selectAll("._percent-adultos").append("div").attr("class","row no-gutters percents-adultos-ucim")
  d3.selectAll(".percents-adultos-ucim").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(dataset.Contagiados_Hosp_Adultos_UCIM_P.toFixed(2)+"%").style('font-size','40px')
  d3.selectAll(".percents-adultos-ucim").style("font-family","Barlow Condensed")
  d3.selectAll(".percents-adultos-ucim").style("font-size","15px !important")  

  d3.select(container).append("div").attr("class", "col-sm-6 _percent-mayores")
  d3.selectAll("._percent-mayores").append("div").attr("class","row no-gutters percents-mayores-ucim")
  d3.selectAll(".percents-mayores-ucim").append('div').attr('class','col-sm-12').append('div').attr('class','row no-gutters justify-content-center').text(dataset.Contagiados_Hosp_Mayores_UCIM_P.toFixed(2)+"%").style('font-size','40px')
  d3.selectAll(".percents-mayores-ucim").style("font-family","Barlow Condensed")
  d3.selectAll(".percents-mayores-ucim").style("font-size","15px !important")  
  
}


// Tablavar Library
function tablavar(data,container){
    //d3.json("web/name-var/name.json", function(error, data) {
    var dataset = data; 
    d3.select(".card-title").text("Variables analizadas");
    d3.select(container).selectAll("tr").data(dataset).enter().append("tr").attr("class","var1");
    d3.selectAll(".var1").append("td").attr("class",function(d,i){return "numvar";});
    d3.selectAll(".var1").append("td").attr("class",function(d,i){return "var2";});
    d3.selectAll(".numvar").data(dataset).text(function(d){return d.var;});
    d3.selectAll(".var2").data(dataset).text(function(d){return d.name.toLowerCase();});
    
//});
}

function whiskercovid(data, container) {
  var margin = {
    top: 10, 
    right:80, 
    bottom: 45, 
    left: 30,
    padding: 20,
    padding2: 40,
    padding3: 28
  },
  height = 275 - margin.top - margin.bottom+5;
  width = parseInt(d3.select(container).style("width")) - margin.left - margin.right;
  
// append the svg object to the body of the page
  var svg = d3.select(container)
    .append("svg")
    .attr("width",width + margin.right + margin.left)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){ return d3.timeParse("%d/%m/%Y")(d.Fecha);}))
    .range([ 0, width ]);

  console.log(d3.extent(data, function(d){ return d3.timeParse("%d/%m/%Y")(d.Fecha)}));

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.Contagios_Max;})])
    .range([height, 0]);

  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + 235 + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", 'translate(' + margin.left  + ',' + margin.top + ')')
    .call(d3.axisLeft().scale(y));

  d3.selectAll(".domain").attr("stroke","#EBE8E8");
  d3.selectAll(".tick").attr("stroke","beige").attr("stroke-width","0.3");
}

function linechart(data, container) {
  var margin = {
    top: 10, 
    right:80, 
    bottom: 45, 
    left: 30,
    padding: 20,
    padding2: 40,
    padding3: 28
  },
  height = 275 - margin.top - margin.bottom+5;
  width = parseInt(d3.select(container).style("width")) - margin.left - margin.right;
  
// append the svg object to the body of the page
  var svg = d3.select(container)
    .append("svg")
    .attr("class","line")
    .attr("width",width + margin.right + margin.left)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){ return d3.timeParse("%d/%m/%Y")(d.Fecha);}))
    .range([ 0, width ]);

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.Contagios;})])
    .range([height, 0]);

  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + 235 + ")")
    .call(d3.axisBottom().scale(x));

  svg.append("g")
    .attr("transform", 'translate(' + margin.left  + ',' + margin.top + ')')
    .call(d3.axisLeft().scale(y));

  d3.selectAll(".domain").attr("stroke","#EBE8E8");
  d3.selectAll(".tick").attr("stroke","beige").attr("stroke-width","0.3");
  

  svg.append("path")
    .datum(data)
    .attr("class","line_graph")
    .attr("fill","none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("transform", 'translate(' + margin.left  + ',' + margin.top + ')')
    .attr("d",d3.line()
      .x(function(d) {return x(d3.timeParse("%d/%m/%Y")(d.Fecha));})
      .y(function(d) {return y(d.Contagios);})  
    )        
}


// Scatter Treemap and HeatMap library
function scatreeheat(data, container) {
  var margin = {
    top: 20, 
    right:30, 
    bottom: 20, 
    left: 30,
    padding: 20,
    padding2: 40,
    padding3: 28
  },
  height = 275 - margin.top - margin.bottom;
  width = parseInt(d3.select(container).style("width")) - margin.left - margin.right;

  var color = d3.scaleSequential(d3.interpolateRdYlBu).domain([100, 0])

  var x = d3.scale.linear()
    .domain([d3.min(data, function(d){return d.cx-15; }), d3.max(data, function(d) { return d.cx+15; })])
    .range([ 0, width ]);

  var y = d3.scale.linear()
    .domain([d3.max(data, function(d){return d.cm+5}), 0])
    .range([0, height]);

  var yAxis = d3.axisLeft().scale(y);

  var legend = d3.select(container)
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', 15)
    .style("padding-left", "4%")

  var image = legend.append("svg:image")
    //attr("transform", 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', 15)
    .attr("xlink:href","legendV2.png")    

  var chart = d3.select(container)
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom);

  var axisLeft = chart.append("g")
    .call(yAxis)
    .attr("transform", 'translate(' + margin.left + ',' + margin.top + ')')

  var textAxisLeft = chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", ((height/2)+margin.top+margin.bottom)*-1)
    .attr("y", 10)
    .style("font-size", "0.8em")
    .text("Cantidad de IPS")
    .attr("fill","gray");

  var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom);

  var g = main.append("svg:g");

  g.selectAll("dots")
    .data(data)
    .enter()
    .append("svg:circle")
    .style("cursor","pointer")
    .attr("cx", function (d,i) { return x(d.cx); } )
    .attr("cy", function (d) { return y(d.cm); } )
    .attr("r", function (d) { return d.cm + 30; } )
    .attr("class", "dots")
    .attr("data-toggle", "modal")
    .attr("data-target", "#myModal")
    .attr("stroke", "white")
    .attr("fill", function(d) { return color(d.cx); })
    .on("mouseover", function(d,i) {
        var radio = d3.select(this)
        .transition()
        .duration(200)
        .attr("r", function(d) { return d.cm + 35});
    })
    .on("mouseout", function(d,i) {
        var radio = d3.select(this)
        .transition()
        .attr("r", function(d) { return d.cm + 30});
    })
    .on("click", function(d) {
        d3.selectAll(".trModal").remove();
        d3.selectAll("tdModal").remove();

        let modal_title = d3.selectAll(".modal-title-scatter")
        modal_title.text("Este grupo tiene " + d.cm + " IPS");
        d3.select(this).each(function(d) {
          d.m.forEach((ips, index) => {
            d3.selectAll(".modal-scatter")
              .append("tr")
              .attr("class", "trModal")
              .append("td")
              .attr("class", "tdModal")
              .text(ips)
              .style("border-bottom","1px solid #EBE8E8")
          })
        })
    })
    .append("title").text("Click para mas informacion")
    d3.selectAll(".trModal").remove();
    d3.selectAll("tdModal").remove();  
       
  g.selectAll("text")
    .data(data)
    .enter()
    .append("svg:text") 
    .attr("x", function (d,i){
      if(d.cm < 10){ return x(d.cx-2.5) }
      else{ return x(d.cx-5) }
    })
    .attr("y", function (d,i) { return y(d.cm-0.15); } )   
    .text(function(d) { return d.cm + " IPS"; } )    
    .attr("fill", "black")
    .style("font-weight","600")
    //.style("text-shadow","1px 1px white");    
}

function verticalbar(data, container,class_container,container_size) {
  d3.selectAll("."+class_container+"_legend").remove()
  d3.selectAll("."+class_container+"_bar").remove()
  var margin_container = {
    top: 5, 
    right:80, 
    bottom: 20, 
    left: 20,
    padding: 20,
    padding2: 40,
    padding3: 28
  },
  height_container = d3.select(container_size).node().getBoundingClientRect().height - margin_container.top - margin_container.bottom;
  width_container = parseInt(d3.select(container_size).style("width"));
  
  var svg_legend = d3.selectAll(container)
    .append("svg")
    .attr("width",width)
    .attr("class",class_container+"_legend")
    .attr("height",margin_container.padding),
    g_legend = svg_legend.append("g").attr("transform", "translate(" + margin_container.left + "," + margin_container.top + ")");

  var svg = d3.selectAll(container).append("svg").attr("width",width_container).attr("height",height_container)
      .attr("class",class_container+"_bar"),
      margin = {top: 10, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  

  // The scale spacing the groups:
  var x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);
    
  // The scale for spacing each group's bar:
  var x1 = d3.scaleBand()
      .padding(0.05);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
      .range(["#98abc5", "#B298C5", "#c598ab"]);

  
  var keys = data.columns.slice(1);
  
  min_y = d3.min(data, function(d) { return d3.min(keys, function(key) { return d[key]; }); })
  if (min_y >= 0) {
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  }
  else{
    y.domain([min_y, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  }

  x0.domain(data.map(function(d) { return d.Fecha; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    
  g.append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class","bar")
    .attr("transform", function(d) { return "translate(" + x0(d.Fecha) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .transition()
    .attr("x", function(d) { return x1(d.key);})
    .attr("y", function(d) { return y(Math.max(0,d.value));})
    .attr("width", x1.bandwidth())
    .attr("height", function(d) { return Math.abs(y(d.value) - y(0)); })
    .attr("fill", function(d) { return z(d.key); })
    .duration(1000);

  g.append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class","text title")
    .attr("transform", function(d) { return "translate(" + x0(d.Fecha) + ",0)"; })
    .selectAll("text")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("text")
    .transition()
    .attr("x", function(d) { if(d.value > 9){ return x1(d.key)+x1.bandwidth()/2-4 }else{return x1(d.key)+x1.bandwidth()/2-1.5}})
    .attr("y", function(d) { return y(Math.max(0,d.value))-1;})
    .attr("font-size","10px")
    .text(function(d) { return d.value; })
    .duration(1000); 

  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x0));
    
  d3.selectAll(".axis")
    .selectAll(".tick")
    .selectAll("text")
    //.attr("transform","rotate(45)")
    .style("font-family","Barlow Condensed")
    .style("font-weight","normal")
    .style("font-size","1em")

  var y_max = y.domain().slice(-1)[0]

  if(y_max <=4 ){
    g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y).tickValues(d3.range(0,y_max+1,1)).tickFormat(d3.format(".0f")))
    .append("text")
    .attr("x", 2)
    .attr("y", y(y.ticks().pop()) + 0.5)
    .attr("dy", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")
  }
  else{
    g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y).ticks(4).tickFormat(d3.format(".0f")))
    .append("text")
    .attr("x", 2)
    .attr("y", y(y.ticks().pop()) + 0.5)
    .attr("dy", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")
  }
  
  

    d3.selectAll(".y")
    .selectAll(".tick")
    .selectAll("text")
    //.attr("transform","rotate(45)")
    .style("font-family","Barlow Condensed")
    .style("font-weight","normal")
    .style("font-size","1em")

    var legend = g_legend.append("g")
    .attr("class","title_graphs")
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    //.attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });
    .attr("transform", function(d, i) { return "translate(" + i * 70 + ",0)"; });

  legend.append("rect")
    .attr("x", width - 180)
    .attr("width", 8)
    .attr("height", 8)
    .attr("fill", z)
    .attr("stroke", z)
    .attr("stroke-width",2)
    .on("click",function(d) { update(d) });

  legend.append("text")
    .attr("x", width - 185)
    .attr("y", 5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });

  var filtered = [];
    
    ////
    //// Update and transition on click:
    ////
    
  function update(d) {  
    
      //
      // Update the array to filter the chart by:
      //
    
      // add the clicked key if not included:
    if (filtered.indexOf(d) == -1) {
      filtered.push(d); 
        // if all bars are un-checked, reset:
      if(filtered.length == keys.length) filtered = [];
    }
      // otherwise remove it:
    else {
      filtered.splice(filtered.indexOf(d), 1);
    }
      
      //
      // Update the scales for each group(/states)'s items:
      //
    var newKeys = [];
    keys.forEach(function(d) {
      if (filtered.indexOf(d) == -1 ) {
        newKeys.push(d);
      }
    })

  
    x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);
    min_y = d3.min(data, function(d) { return d3.min(keys, function(key) { return d[key]; }); })
    if (min_y >= 0) {
      y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
    }
    else{
      y.domain([min_y, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
    }
      
      // update the y axis:
    var y_max = y.domain().slice(-1)[0]
    if(y_max <= 4){
      svg.select(".y")
      .transition()
      .call(d3.axisLeft(y).tickValues(d3.range(0,y_max+1,1)).tickFormat(d3.format(".0f")))
      .duration(500);
    }
    else{
      svg.select(".y")
      .transition()
      .call(d3.axisLeft(y).ticks(4).tickFormat(d3.format(".0f")))
      .duration(500);
    }
      
      //
      // Filter out the bands that need to be hidden:
      //
    var bars = svg.selectAll(".bar").selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      
    bars.filter(function(d) {
      return filtered.indexOf(d.key) > -1;
    })
    .transition()
    .attr("x", function(d) {
      return (+d3.select(this).attr("x")) + (+d3.select(this).attr("width"))/2;  
    })
    .attr("height",0)
    .attr("width",0)     
    .attr("y", function(d) { return height; })
    .duration(500);
        
      //
      // Adjust the remaining bars:
      //
    bars.filter(function(d) {
      return filtered.indexOf(d.key) == -1;
    })
    .transition()
    .attr("x", function(d) { return x1(d.key); })
    .attr("y", function(d) { return y(Math.max(0,d.value));})
    .attr("height", function(d) { return Math.abs(y(d.value) - y(0)); })
    .attr("width", x1.bandwidth())
    .attr("fill", function(d) { return z(d.key); })
    .duration(500);

    var texts = svg.selectAll(".text").selectAll("text")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })

    texts.filter(function(d) {
      return filtered.indexOf(d.key) > -1;
    })
    .transition()
    .attr("x", function(d) {
      return (+d3.select(this).attr("x")) + (+d3.select(this).attr("width"))/2;  
    })    
    .attr("y", function(d) { return height; })
    .attr("display","none")
    .duration(500);

    texts.filter(function(d) {
      return filtered.indexOf(d.key) == -1;
    })
    .transition()
    .attr("x", function(d) { if(d.value > 9){ return x1(d.key)+x1.bandwidth()/2-4 }else{return x1(d.key)+x1.bandwidth()/2-1.5}})
    .attr("y", function(d) { return y(Math.max(0,d.value))-1;})
    .attr("font-size","10px")
    .text(function(d) { return d.value; })
    .attr("display","block")    
    .duration(500);
      
    
      // update legend:
    legend.selectAll("rect")
    .transition()
    .attr("fill",function(d) {
      if (filtered.length) {
        if (filtered.indexOf(d) == -1) {
          return z(d); 
        }
        else {
          return "white"; 
        }
      }
      else {
        return z(d); 
      }
    })
    .duration(100);          
  }

  d3.selectAll(".domain").attr("display","none");
  //d3.selectAll(".axis").attr("display","none");
  d3.selectAll(".tick").attr("stroke","beige").attr("stroke-width","0.4");
}

function horizontalbar(data, container,class_container,container_size) {
  d3.selectAll("."+class_container+"_legend").remove()
  d3.selectAll("."+class_container+"_bar").remove()
  var margin_container = {
    top: 10, 
    right:80, 
    bottom: 50, 
    left: 30,
    padding: 20,
    padding2: 40,
    padding3: 28
  },
  height_container = d3.select(container_size).node().getBoundingClientRect().height - margin_container.top - margin_container.bottom;
  width_container = parseInt(d3.select(container_size).style("width"));
  
  var svg_legend = d3.selectAll(container)
    .append("svg")
    .attr("width",width)
    .attr("class",class_container+"_legend")
    .attr("height",margin_container.padding),
    g_legend = svg_legend.append("g").attr("transform", "translate(" + margin_container.left + "," + margin_container.top + ")");

  var svg = d3.selectAll(container).append("svg").attr("width",width_container).attr("height",height_container+margin_container.bottom)
      .attr("class",class_container+"_bar"),
      margin = {top: 10, right: 20, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  

  // The scale spacing the groups:
  var y0 = d3.scaleBand()
      .rangeRound([height, 0])
      .paddingInner(0.1);
    
  // The scale for spacing each group's bar:
  var y1 = d3.scaleBand()
      .padding(0.05);

  var x = d3.scaleLinear()
      .rangeRound([0,width]);

  var z = d3.scaleOrdinal()
    .range(["#98abc5", "#B298C5", "#c598ab"]);

  
  var keys = data.columns.slice(1);
  
  min_x = d3.min(data, function(d) { return d3.min(keys, function(key) { return d[key]; }); })
  if (min_x >= 0) {
    x.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  }
  else{
    x.domain([min_x, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  }

  y0.domain(data.map(function(d) { return d.Fecha; }));
  y1.domain(keys).rangeRound([y0.bandwidth(),0]);
  
  g.append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class","bar")
    .attr("transform", function(d) { return "translate(0," + y0(d.Fecha) + ")"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .transition()
    .attr("y", function(d) { return y1(d.key);})
    .attr("x", function(d) { return x(Math.max(d.value,0))-Math.abs(x(0)-x(d.value));})
    .attr("height", y1.bandwidth())
    .attr("width", function(d) { return Math.abs(x(0)-x(d.value)); })
    .attr("fill", function(d) { return z(d.key); })
    .duration(1000);

    g.append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class","text title")
    .attr("transform", function(d) { return "translate(0," + y0(d.Fecha) + ")"; })
    .selectAll("text")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("text")
    .transition()
    .attr("y", function(d) { return y1(d.key)+y1.bandwidth()/2+3})
    .attr("x", function(d) { return x(Math.max(0,d.value))+1;})
    .attr("font-size","10px")
    .text(function(d) { return d.value; })
    .duration(1000); 

  
  var x_max = x.domain().slice(-1)[0]

  if(x_max <=4){ 
    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickValues(d3.range(0,x_max+1,1)).tickFormat(d3.format(".0f")));
  }

  else{ 
    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(4).tickFormat(d3.format(".0f")));
  }
    
  d3.selectAll(".axis")
    .selectAll(".tick")
    .selectAll("text")
    //.attr("transform","rotate(45)")
    .style("font-family","Barlow Condensed")
    .style("font-weight","normal")
    .style("font-size","1em")

  g.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft().scale(y0).ticks(null, "s"))
    .append("text")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")

    d3.selectAll(".y")
    .selectAll(".tick")
    .selectAll("text")
    //.attr("transform","rotate(45)")
    .style("font-family","Barlow Condensed")
    .style("font-weight","normal")
    .style("font-size","1em")

  var legend = g_legend.append("g")
    .attr("class","title_graphs")
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    //.attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });
    .attr("transform", function(d, i) { return "translate(" + i * 70 + ",0)"; });

  legend.append("rect")
    .attr("x", width - 180)
    .attr("width", 8)
    .attr("height", 8)
    .attr("fill", z)
    .attr("stroke", z)
    .attr("stroke-width",2)
    .on("click",function(d) { update(d) });

  legend.append("text")
    .attr("x", width - 185)
    .attr("y", 5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });

  var filtered = [];
    
    ////
    //// Update and transition on click:
    ////
    
  function update(d) {  
    
      //
      // Update the array to filter the chart by:
      //
    
      // add the clicked key if not included:
    if (filtered.indexOf(d) == -1) {
      filtered.push(d); 
        // if all bars are un-checked, reset:
      if(filtered.length == keys.length) filtered = [];
    }
      // otherwise remove it:
    else {
      filtered.splice(filtered.indexOf(d), 1);
    }
      
      //
      // Update the scales for each group(/states)'s items:
      //
    var newKeys = [];
    keys.forEach(function(d) {
      if (filtered.indexOf(d) == -1 ) {
        newKeys.push(d);
      }
    })
    console.log(newKeys)
    y1.domain(newKeys).rangeRound([0, y0.bandwidth()]);
    //y1.rangeRound([0, y0.bandwidth()]);
    min_x = d3.min(data, function(d) { return d3.min(keys, function(key) { return d[key]; }); })
    if (min_x >= 0) {
      x.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
    }
    else{
      x.domain([min_x, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
    }
      
      // update the y axis:
    svg.select(".y")
    .transition()
    .call(d3.axisLeft(y0).ticks(null, "s"))
    .duration(500);
      
      
      //
      // Filter out the bands that need to be hidden:
      //
    var bars = svg.selectAll(".bar").selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      
    bars.filter(function(d) {
      return filtered.indexOf(d.key) > -1;
    })
    .transition()
    .attr("y", function(d) {
      return (+d3.select(this).attr("y")) + (+d3.select(this).attr("height"))/2;  
    })
    .attr("height",0)
    .attr("width",0)     
    .attr("x", function(d) { return width; })
    .duration(500);
        
      //
      // Adjust the remaining bars:
      //
    bars.filter(function(d) {
      return filtered.indexOf(d.key) == -1;
    })
    .transition()
    .attr("y", function(d) { return y1(d.key);})
    .attr("x", function(d) { return x(Math.max(d.value,0))-Math.abs(x(0)-x(d.value));})
    .attr("height", y1.bandwidth())
    .attr("width", function(d) { return Math.abs(x(0)-x(d.value)); })
    .attr("fill", function(d) { return z(d.key); })
    .duration(500);

    var texts = svg.selectAll(".text").selectAll("text")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })

    texts.filter(function(d) {
      return filtered.indexOf(d.key) > -1;
    })
    .transition()
    .attr("y", function(d) {
      return (+d3.select(this).attr("y")) + (+d3.select(this).attr("height"))/2;  
    })    
    .attr("x", function(d) { return width; })
    .attr("display","none")
    .duration(500);

    texts.filter(function(d) {
      return filtered.indexOf(d.key) == -1;
    })
    .transition()
    .attr("y", function(d) { return y1(d.key)+y1.bandwidth()/2+3})
    .attr("x", function(d) { return x(Math.max(0,d.value))+1;})
    .attr("font-size","10px")
    .text(function(d) { return d.value; })
    .attr("display","block")    
    .duration(500);    
      
    
      // update legend:
    legend.selectAll("rect")
    .transition()
    .attr("fill",function(d) {
      if (filtered.length) {
        if (filtered.indexOf(d) == -1) {
          return z(d); 
        }
        else {
          return "white"; 
        }
      }
      else {
        return z(d); 
      }
    })
    .duration(100);          
  }

  d3.selectAll(".domain").attr("display","none");
  //d3.selectAll(".axis").attr("display","none");
  d3.selectAll(".tick").attr("stroke","beige").attr("stroke-width","0.4");
}

////////////////FunciÃƒÂ³n principal////////////////////////////////////////
function principalBullet(data,container,title, ind){

   if(ind){
      var margin = {top: 5, right: 20, bottom: 20, left: 0},
      //width = parseInt(d3.select(container).style("width")) - margin.left - margin.right;
      width = 235
      height = 20;
    }
    else{
      var margin = {top: 5, right: 40, bottom: 20, left: 70},
      width = parseInt(d3.select(container).style("width")) - margin.left - margin.right;
      height = 25;
    }

    var chart = d3.bullet()
        .width(width)
        .height(height);
      var svg = d3.select(container).selectAll("svg")
          .data(data)
        .enter().append("svg")
          .attr("class", "bullet")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")        
          .call(chart);

       
      if(title) {
         var tabla = d3.select(container).append("div").attr("class","row titles pl-4 mb-1 ml-5 ");
        estados = ["Inicial (I)", "Repetible (R)", "Definido (D)", "Administrado (A)", "Optimizado (O)"]
        for (var i = 0 ; i <= estados.length; i++) {
          if (i == estados.length){
          var col = tabla.append("div").attr("class","col-sm-0 ");
          col.append("text").text(estados[i]);
        }
        else {
          var col = tabla.append("div").attr("class","col-sm-2 mr-3 ml-1 pl-3 pr-1");
          col.append("text").text(estados[i]);

        }
        }     
        var title = svg.append("g")
          .style("text-anchor", "end")
          .attr("transform", "translate(-6," + height / 2 + ") ");
          title.append("text")
            .attr("class", "title")
            .text(function(d) { return d.seccion; });
      } 
      else{
if(ind){
      var tabla = d3.select(container).append("div").attr("class","row titles pl-0 mb-0 ml-0 ");
        estados = ["Total desacuerdo","En desacuerdo","Neutral","De acuerdo","Total acuerdo"]
        for (var i = 0 ; i <= estados.length; i++) {
          if (i == estados.length){
          var col = tabla.append("div").attr("class","col-sm-0 ");
          col.append("text").text(estados[i]);
        }
        else {
          var col = tabla.append("div").attr("class","col-sm-2 mr-2 ml-0 pl-0 pr-0").style("text-align","center");
          col.append("text").text(estados[i]).style("font-size","8px").style("line-height","1px");
        }
        }  
}
else{
 var tabla = d3.select(container).append("div").attr("class","row titles pl-4 ml-4");
        estados = ["(I)", "(R)", "(D)", "(A)", "(O)"]
        for (var i = 0 ; i <= estados.length; i++) {
          if (i == estados.length){
          var col = tabla.append("div").attr("class","col-sm-0 ml-1");
          col.append("text").text(estados[i]);
        }
        else {
          var col = tabla.append("div").attr("class","col-sm-1 ml-4 pl-4 pr-3");
          col.append("text").text(estados[i]);
        }
        }     
      }
}


}

////////////////FunciÃƒÂ³n principal////////////////////////////////////////
function principalBullet2(data,container,title){
        var margin = {top: 5, right: 100, bottom: 50, left: 10},
    width = parseInt(d3.select(container).style("width")) - margin.left - margin.right;
    height = 25;
    var chart = d3.bullet()
        .width(width)
        .height(height);
      var svg = d3.select(container).selectAll("svg")
          .data(data)
        .enter().append("svg")
          .attr("class", "bullet")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")        
          .call(chart);

      if(title) {
        var title = svg.append("g")
          .style("text-anchor", "end")
          .attr("transform", "translate(-6," + height / 2 + ") ");

        title.append("text")
            .attr("class", "title")
            .text(function(d) { return d.seccion; });
      } 

       var tabla = d3.select(container).append("div").attr("class","row titles pl-0 ml-0");
        estados = ["(I)", "(R)", "(D)", "(A)", "(O)"]
        for (var i = 0 ; i <= estados.length; i++) {
          if (i == estados.length){
          var col = tabla.append("div").attr("class","col-sm-0 ml-2");
          col.append("text").text(estados[i]);
        }
        else {
          var col = tabla.append("div").attr("class","col-sm-1 ml-3 pl-4 pr-4");
          col.append("text").text(estados[i]);

        }
      } 
}
////////////////////////////// FunciÃƒÂ³n de atributos y parÃƒÂ¡metros de configuraciÃƒÂ³n//////////////////////////
 d3.bullet = function() {
    var orient = "left", 
        reverse = false,
        duration = 1000,
        ranges = bulletRanges,
        markers = bulletMarkers,
        questions = bulletQuestions,
        width = 380,
        height = 30;
  // For each small multipleÃ¢â‚¬Â¦
  function bullet(g) {
    g.each(function(d, i) {
      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
        markerz = markers.call(this, d, i).slice(),
        questionz = questions.call(this, d, i),
        g = d3.select(this);

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
        .domain([0, Math.max(rangez[0], markerz[0], 6)])
        .range(reverse ? [width, 0] : [0, width]);
      // Derive width-scales from the x-scales.
      w1 = bulletWidth(x1);

        if(ind){
        // Update the range rects.
        var range = g.selectAll("rect.range")
        .data(rangez);
        
        // Rect categories         
        range.enter().append("rect")
          .attr("class", function(d, i) { return "range m" + i; })
          .transition()
          .duration(duration)
          .attr("x", reverse ? x1 : 0)
          .attr("width", w1)
          .attr("height", height);

          for (var i = 0; i <= markerz.length - 1 ; i++) {
              valores = [questionz.preguntas[i]];

              var marker = g.selectAll("line.marker")
              .data(valores);

              marker.enter().append("text")
               .attr("class", "marker")
               .attr("x", x1((i*1.3)+1/2))
               .attr("y", height/1.6)
               .style("font-size", 11)
               .style("font-weight", 100)
               .text(function(d,i){return d.valor;})
               .style("cursor", "pointer")    
               .on("click", function(d){
                  var mark = d3.select(this)
                    .attr("data-toggle", "modal")
                    .attr("data-target", "#modalBullet");

                  d3.selectAll(".trModal").remove();
                  d3.selectAll("tdModal").remove();

                  let modal_title = d3.selectAll(".modal-title-bullet")
                  modal_title.text(d.seccion);
                  d3.select(this).each(function(d) {
                  d.preguntas.forEach((preguntas, index) => {
                    d3.selectAll(".modal-bullet")
                      .append("tr")
                      .attr("class", "trModal")
                      .append("td")
                      .attr("class", "tdModal")
                      .text(preguntas)
                      .style("border-bottom","1px solid #EBE8E8")
                      .style("font-size","1.2em");
                    })
                  })
               });
          }
        }
        else{
        // Update the range rects.
          var range = g.selectAll("rect.range")
            .data(rangez);
      // Rect categories         
          range.enter().append("rect")
            .attr("class", function(d, i) { return "range s" + i; })
            .transition()
            .duration(duration)
            .attr("x", reverse ? x1 : 0)
            .attr("width", w1)
            .attr("height", height);
        // Update the marker lines.
          var marker = g.selectAll("line.marker")
            .data(markerz);
        
          marker.enter().append("circle")
            .attr("class", "marker")
            .attr("cx", x1(1.268*markerz-(1/2)))
            .attr("cy", height / 2.15)
            .attr("r",4.5);
        
          marker.on("mouseover",function(d){
          marker.attr("r", 10);});

          marker.on("mouseout", function(d){
          marker.attr("r",4.5);})
          }
    });
  }
  
  // ranges (bad, satisfactory, good)
  bullet.ranges = function(x) {
    if (!arguments.length) return ranges;
    ranges = x;
    return bullet;
  };
  // markers (previous, goal)
  bullet.markers = function(x) {
    if (!arguments.length) return markers;
    markers = x;
    return bullet;
  };

  // ranges (bad, satisfactory, good)
  bullet.questions = function(x) {
    if (!arguments.length) return questions;
    questions = x;
    return bullet;
  };
  bullet.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return bullet;
  };
  bullet.height = function(x) {
    if (!arguments.length) return height;
      height = x;
      return bullet;
    };
    return bullet;
  };  

  function bulletRanges(d) {
    var count = d.contC;
    var array1 = [];

    for(var i=1;i<=count;i++)
    {
        var name = i;
        array1.push(name);
    }
    rango = array1; 
    return rango;
  }

  function bulletQuestions(d) {
    return d;
  }

  function bulletMarkers(d) {
    return d.valor;
  }

  function bulletWidth(x) {

    var x0 = x(0);
    return function(d) {
    return Math.abs(x(d)*1.3 - x0);
  };
}

function modalQuestions(data){
  var dataPr= data;
  //var dataPr= dataPr[i];
  console.log(dataPr);
  var table = d3.select(".modal_body").append("table").attr("class","table");
  var title = d3.select(".modal_title").append("text").text(dataPr.seccion);
  var row = table.selectAll("tr").data(dataPr).enter().append("tr").attr("class",function(d,i){ return "Fila"+i;});
    row.append("th").text(function(d,i){return i+1;});
    row.append("td").text(function(d){return d;});
}

