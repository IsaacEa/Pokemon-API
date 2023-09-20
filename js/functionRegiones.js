function processReg()
{
    
    if((this.readyState == 4) && (this.status==200))
    {
        var m=JSON.parse(this.responseText);
        nameReg.innerHTML = m.name;
        if(m.main_generation != null)
        {
            dataReg.innerHTML = "Generación en la que aparece por primera vez:" + m.main_generation.name + "<br><br>Juegos en los que aparece: || ";
        }
        if(m.main_generation == null)
        {
            dataReg.innerHTML = "Generación en la que aparece por primera vez: Intergeneracional <br><br>Juegos en los que aparece: || ";
        }
        for(var i = 0; i < m.version_groups.length; i++)
        {  
            dataReg.innerHTML += m.version_groups[i].name + " || ";  
        }

        dataReg.innerHTML += "<br><br>Localizaciones:" ;

        for(var i = 0; i < m.locations.length; i++)
        {
            dataReg.innerHTML += m.locations[i].name + " || ";
        }    
        
        
        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=processPkmn;
        xmlhttp.open("GET", ""+m.pokedexes[0].url);
        xmlhttp.send();
        console.log(""+m.pokedexes[0].url);
    }
}

function processPkmn()
{
    if((this.readyState == 4) && (this.status==200))
    {

        remove(p);
        var m=JSON.parse(this.responseText);

        
        for(var i = 0; i < m.pokemon_entries.length; i++)
        {
            j = document.createElement('option');
            j.value = m.pokemon_entries[i].pokemon_species.name;
            console.log(j.value);
            j.innerHTML = m.pokemon_entries[i].pokemon_species.name;
            p.appendChild(j);
        }
    }
}

function remove(selectElement)
{
    var i, L = p.options.length - 1;
    for(i = L; i >= 0; i--) 
    {
        selectElement.remove(i);
    }
}


function processPokemonInfo()
{
    if((this.readyState == 4) && (this.status==200))
    {
        var m=JSON.parse(this.responseText);

        imagePkmn.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+m.id+".png";
        namePkmn.innerHTML = m.name;
        dataPkmn.innerHTML = "<br><br>Peso:"+ m.weight / 10 + "kg" + "<br><br>Altura:" + m.height / 10 + "m" + "<br><br>Tipos: || " ;
        
        for(var t = 0; t < m.types.length; t++)
        {
            
            
            
            dataPkmn.innerHTML += m.types[t].type.name + " || ";

            console.log("orueba");
            
        }
    }
}

function show()
{
    n = s.value;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processReg;
    xmlhttp.open("GET", "" + n +"");
    xmlhttp.send();
    console.log(n);
}

function showPokemon()
{
    b = p.value;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processPokemonInfo;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+b);
    xmlhttp.send();
    console.log(b);
    
}

function loadEvents()
{
    nameReg = document.getElementById("nombreReg");
    dataReg = document.getElementById("datosReg");
    namePkmn = document.getElementById("nombrePokemonReg");
    dataPkmn = document.getElementById("datosPokemonReg");
    imagePkmn = document.getElementById("pkmn");
    s=document.getElementById("listaReg");
    p=document.getElementById("listaPkmn");
    s.addEventListener('change', show);
    p.addEventListener('change', showPokemon);
    loadSelect();
   
}

function loadSelect()
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processJSON;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/region");
    xmlhttp.send();
}

function processJSON()
{
    if((this.readyState == 4) && (this.status==200))
    {

        var m=JSON.parse(this.responseText);

        for(var i = 0; i < m.results.length; i++)
        {
            j = document.createElement('option');
            j.value = m.results[i].url;
            console.log(j.value);
            j.innerHTML = m.results[i].name;
            s.appendChild(j);
        }

    }
}