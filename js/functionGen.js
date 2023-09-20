function processGen()
{
    if((this.readyState == 4) && (this.status==200))
    {
        console.log("exito");
        var m=JSON.parse(this.responseText);

        nameGen.innerHTML = m.name;
        dataGen.innerHTML ="Región principal:" +  m.main_region.name + "<br><br>Juegos:||";

        for(var v = 0; v < m.version_groups.length; v++)
        {
            
            console.log(v);
            
            dataGen.innerHTML += m.version_groups[v].name + " || ";

            console.log("orueba");
            
        }

        dataGen.innerHTML += " <br><br>Número de Pokémon:" + m.pokemon_species.length + "<br><br>Tipos introducidos: ||";

        for(var v = 0; v < m.types.length; v++)
        {
            
            dataGen.innerHTML += m.types[v].name + " || ";

            console.log("orueba");
            
        }

        dataGen.innerHTML +="<br><br>Movimientos introducidos:" + m.moves.length;
    }

    

    
}

function show()
{
    n = s.value;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processGen;
    xmlhttp.open("GET", "" + n +"");
    xmlhttp.send();
    console.log(s.value);
}

function loadEvents()
{
    nameGen = document.getElementById("nombreGen");
    dataGen = document.getElementById("datosGen");
    s=document.getElementById("listaGen");
    s.addEventListener('change', show);
    loadSelect();
}

function loadSelect()
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processJSON;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/generation");
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
            j.value = m.results[i].url;
            j.innerHTML = m.results[i].name;
            s.appendChild(j);
            console.log(j.value);
            
        }

    }
}