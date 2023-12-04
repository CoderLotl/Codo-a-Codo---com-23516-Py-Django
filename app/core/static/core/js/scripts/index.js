
//#region [ EVENT LISTENER ]
document.addEventListener('DOMContentLoaded', () =>
{
    AssignSearch();
    AssignConsolesRedirection();
    //localStorage.removeItem('game');
});
//#endregion [ EVENT LISTENER ]

//#region [ FUNCTIONS ]
/**
 * Single use function intended to run at load. Gets all the images inside the element 'juegos1' and assigns an event on click,
 * which will redirect the user to the page detalles.html with the uri component that the page is going to be listening for.
 * This will make the page display the data of that particular game. 
 */
function AssignSearch()
{
    let images = document.getElementById('juegos1').getElementsByTagName('img');
    
    for(let i = 0; i < images.length; i++)
    {        
        let gameData =[ 
        {
            "name": images[i].name,
            "SKU": images[i].getAttribute("data-sku"),
        }];        
        
        images[i].addEventListener('click', ()=>
        {            
            localStorage.setItem('game', JSON.stringify(gameData));
            window.location.href = 'detalles';
        });
    }
}

/**
 * Single use hardcoded function intended to run at load. Assigns events to the different spans with the images of consoles
 * in order to redirect the client to the explorarConsola.html page and show the games of that console.
 */
function AssignConsolesRedirection()
{    
    document.getElementById('consola1-span').addEventListener('click', ()=>
    {
        localStorage.setItem('console', 'PS5');
        window.location.href = 'explorarConsola';
    });

    document.getElementById('consola2-span').addEventListener('click', ()=>
    {
        localStorage.setItem('console', 'XBOX');
        window.location.href = 'explorarConsola';
    });
    
    document.getElementById('consola3-span').addEventListener('click', ()=>
    {
        localStorage.setItem('console', 'SWITCH');
        window.location.href = 'explorarConsola';
    });
    
    document.getElementById('consola4-span').addEventListener('click', ()=>
    {
        localStorage.setItem('console', 'PC');
        window.location.href = 'explorarConsola';
    });
}
//#endregion [ FUNCTIONS ]