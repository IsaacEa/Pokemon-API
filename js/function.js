

function processPokemon()
{

    if((this.readyState == 4) && (this.status==404))
    {
        console.log("error");
        imagePokemon.src="";
        dataPokemon.innerHTML="";
        locationsPokemon.innerHTML="";
        namePokemon.innerHTML = "ERROR:NO ENCONTRADO";
    }
    
    if((this.readyState == 4) && (this.status==200))
    {

        
        console.log("exito");
        
        var m=JSON.parse(this.responseText);


        imagePokemon.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+m.id+".png";
        namePokemon.innerHTML ="Nombre:" + m.name;
        dataPokemon.innerHTML ="Generación:" + m.generation.name + "<br><br>Numero de Pokédex:" + m.id +"<br><br>Ratio de captura:" + m.capture_rate + "<br><br>Pasos para eclosionar:" + m.hatch_counter * 250;

        xmlhttp2=new XMLHttpRequest();
        xmlhttp2.onreadystatechange=processPokemon2;
        xmlhttp2.open("GET", "https://pokeapi.co/api/v2/pokemon/"+ m.id);
        xmlhttp2.send();
        

        xmlhttp2=new XMLHttpRequest();
        xmlhttp2.onreadystatechange=processLocations;
        xmlhttp2.open("GET", "https://pokeapi.co/api/v2/pokemon/"+ m.name +"/encounters");
        xmlhttp2.send();
        
    }   

    
}

function processPokemon2()
{
    if((this.readyState == 4) && (this.status==200))
    {
        
        console.log("exito2");
        var m=JSON.parse(this.responseText);


        dataPokemon.innerHTML += "<br><br>Peso:"+ m.weight / 10 + "kg" + "<br><br>Altura:" + m.height / 10 + "m" + "<br><br>Tipos: || " ;

        for(var t = 0; t < m.types.length; t++)
        {
            
            console.log(i);
            
            dataPokemon.innerHTML += m.types[t].type.name + " || ";

            console.log("orueba");
            
        }

        dataPokemon.innerHTML += "<br><br>Habilidades que puede aprender: || ";

        for(var g = 0; g < m.abilities.length; g++)
        {
            
            console.log(i);
            
            dataPokemon.innerHTML += m.abilities[g].ability.name + " || ";

            console.log("orueba");
            
        }
    } 

    
}

function processLocations()
{
    if((this.readyState == 4) && (this.status==200))
    {
        var m=JSON.parse(this.responseText);
        
        locationsPokemon.innerHTML ="|| ";

        for(var e = 0; e < m.length; e++)
        {
            
            console.log(e);
            
            locationsPokemon.innerHTML += m[e].location_area.name + " || ";

            console.log("orueba");
            
        }
    }
}



function showBusqueda()
{
    b = searchPokemon.value;
    if(b.length >= 1)
    {
        b=b.toLowerCase();

        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=processPokemon;
        xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon-species/"+b);
        xmlhttp.send();
        console.log(searchPokemon.value);
    }
    else
    {
        console.log("error");
        imagePokemon.src="";
        dataPokemon.innerHTML="";
        locationsPokemon.innerHTML="";
        namePokemon.innerHTML = "ERROR:NO ENCONTRADO";
    }
    
}

function show()
{
    n = s.value;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processPokemon;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon-species/"+n);
    xmlhttp.send();
    console.log(n);  
}

function loadEvents()
{
    namePokemon = document.getElementById("nombrePokemon");
    dataPokemon = document.getElementById("datosPokemon");
    imagePokemon = document.getElementById("imagenPokemon");
    locationsPokemon = document.getElementById("localizaciones");
    searchPokemon = document.getElementById("buscadorPokemon");
    s=document.getElementById("listaPokemon");
    p = document.getElementById("buscar");
    s.addEventListener('change', show);
    p.addEventListener('click', showBusqueda);
    loadSelect();
}

function loadSelect()
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processJSON;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=1008");
    xmlhttp.send();
}

function processJSON()
{
    if((this.readyState == 4) && (this.status==200))
    {

        var m=JSON.parse(this.responseText);

        for(i = 0; i < m.results.length; i++)
        {
            j = document.createElement('option');
            
            j.innerHTML = m.results[i].name;
            s.appendChild(j);
            
            
            
        }

    }
}