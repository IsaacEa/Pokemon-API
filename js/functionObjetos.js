function processListaObj()
{
    if((this.readyState == 4) && (this.status==200))
    {

        remove(p);
        var m=JSON.parse(this.responseText);

        for(var i = 0; i < m.items.length; i++)
        {
            j = document.createElement('option');
            j.value = m.items[i].url;
            console.log(j.value);
            j.innerHTML = m.items[i].name;
            p.appendChild(j);
        }
    }
}

function processItemInfo()
{
    if((this.readyState == 4) && (this.status==200))
    {
        var m=JSON.parse(this.responseText);

        nameObjArriba.innerHTML = m.name;
        imageObj.src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"+m.name+".png"
        dataObj.innerHTML = "Atributos: || ";

        for(var t = 0; t < m.attributes.length; t++)
        {
            dataObj.innerHTML += m.attributes[t].name + " || ";

            console.log("orueba");
            
        }

        dataObj.innerHTML += "<br><br>Efecto:" + m.effect_entries[0].effect + "<br><br>Coste:" + m.cost;

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

function processImagenes()
{
    
    if((this.readyState == 4) && (this.status==200))
    {
        
        var m=JSON.parse(this.responseText);

        for(var i = 0; i < m.results.length; i++)
        {
            loadProcessImagenes2(i+1);
        }


    }
}

function loadProcessImagenes2(indice)
{
    console.log(indice);
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processImagenes2;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/item/"+(indice+offset)+"/");
    xmlhttp.send();
    console.log("funciona");
}

function processImagenes2()
{
    
    if((this.readyState == 4) && (this.status==200))
    {
        var m=JSON.parse(this.responseText);
        console.log("pruebaif");
        infoImagenes.innerHTML+="<img src=' " + m.sprites.default + " '/>"
        nameObj.innerHTML+="| |"+m.name;
        nameObj.innerHTML+="| |";
        
        
    }
    
}

function show()
{
    n = s.value;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processListaObj;
    xmlhttp.open("GET", "" + n +"");
    xmlhttp.send();
    console.log(n);
}

function showObjetos()
{
    b = p.value;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processItemInfo;
    xmlhttp.open("GET", ""+b);
    xmlhttp.send();
    console.log(p.value);
}

function loadEvents()
{
    offset = 0;
    limit = 10;

    s=document.getElementById("listaCatObj");
    p=document.getElementById("listaObj");
    nameObjArriba=document.getElementById("nombreObj");
    dataObj=document.getElementById("datosObj");
    imageObj=document.getElementById("imgObj");
    infoImagenes=document.getElementById("infoObjetos");
    nameObj=document.getElementById("nombresObjetos");
    botonDerecha=document.getElementById("derecha");
    botonIzquierda=document.getElementById("izquierda");
    
    botonDerecha.addEventListener('click', nextItems);
    botonIzquierda.addEventListener('click', beforeItems);
    s.addEventListener('change', show);
    p.addEventListener('change', showObjetos);
    loadSelect();
}

function loadSelect()
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processJSON;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/item-category?offset=0&limit=54");
    xmlhttp.send();
}

function nextItems()
{
    if(offset!=2050)
    {
        infoImagenes.innerHTML="";
        nameObj.innerHTML="";
        offset = offset + 10;
        
        loadImagenes();
    }
    
}

function beforeItems()
{
    if(offset!= 0)
    {
        infoImagenes.innerHTML="";
        nameObj.innerHTML="";
        offset = offset - 10;
        
        loadImagenes();
    }
    
}


function loadImagenes()
{

    console.log("loadimagenes");

    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=processImagenes;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/item?offset="+offset+"&limit="+limit+"");
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

        loadImagenes();
        
    }
}