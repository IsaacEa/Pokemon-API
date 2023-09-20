function processPokemon()
{
    if((this.readyState == 4) && (this.status==404))
    {
        


        console.log("error");
        textSprite.innerHTML = "ERROR:NO ENCONTRADO";
        spriteImg.src="";
    }


    if((this.readyState == 4) && (this.status==200))
    {
        console.log("exito");
        var m=JSON.parse(this.responseText);
        spriteImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+m.id+".png";
        textSprite.innerHTML=m.name;
    }     
}


function showBusqueda()
{
    b = searchSprite.value;
    
    if(b.length >= 1)
    {
        b=b.toLowerCase();

        xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=processPokemon;
        xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon-species/"+b);
        xmlhttp.send();
        console.log(searchSprite.value);
    }
    else
    {
        textSprite.innerHTML = "ERROR:NO ENCONTRADO";
        spriteImg.src="";
    }
}

function show()
{
    n = s.value;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processPokemon;
    xmlhttp.open("GET", ""+n);
    xmlhttp.send();
    console.log(n);  
}

function nextSprites()
{
    if(offset>1008)
    {
        offset = 1008;
    }

    if(offset<=1008)
    {
        
        sprites.innerHTML="";
        textAbajoSprites.innerHTML="";
        
        offset = offset + 10;
        
        loadSprites();
    }
}

function beforeSprites()
{
    if(offset!= 0)
    {
       
        sprites.innerHTML="";
        textAbajoSprites.innerHTML="";
        
        offset = offset - 10;
        
        loadSprites();
    }
}


function loadEvents()
{
    offset = 0;
    limit = 10;

    listaPkmn=document.getElementById("listaPokemon");
    s=document.getElementById("listaPokemon");
    p=document.getElementById("buscar");
    searchSprite=document.getElementById("buscadorPokemon");
    spriteImg=document.getElementById("imgSprite");
    textSprite=document.getElementById("nombrePkmn");
    textAbajoSprites=document.getElementById("nombresSprites");
    sprites=document.getElementById("infoObjetos");
    s.addEventListener('change', show);
    p.addEventListener('click', showBusqueda);
    botonDerecha=document.getElementById("derecha");
    botonIzquierda=document.getElementById("izquierda");

    botonDerecha.addEventListener('click', nextSprites);
    botonIzquierda.addEventListener('click', beforeSprites);
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
            j.value = m.results[i].url;
            console.log(j.value);
            j.innerHTML = m.results[i].name;
            s.appendChild(j);
        }

        loadSprites();

    }
}

function loadSprites()
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processSprites;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon?offset"+offset+"&limit=10");
    xmlhttp.send();
}

function processSprites()
{
    if((this.readyState == 4) && (this.status==200))
    {
        
        var m=JSON.parse(this.responseText);

        for(var i = 0; i < m.results.length; i++)
        {
            loadProcessSprites2(i+1);
        }
    }
}

function loadProcessSprites2(indice)
{
    console.log(indice);
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processSprites2;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+(indice+offset)+"/");
    xmlhttp.send();
    console.log("funciona");
}

function processSprites2()
{
    if((this.readyState == 4) && (this.status==200))
    {
        var m=JSON.parse(this.responseText);
        console.log("pruebaif");
        sprites.innerHTML+="<img src=' " + m.sprites.front_default + " '/>"
        textAbajoSprites.innerHTML+="| |"+m.name;
        textAbajoSprites.innerHTML+="| |";
    }
}

